import React, { Component } from 'react';
import * as constants from '../App';
import * as firebase from 'firebase';
import colors from '../constants/Colors';
import { Actions } from 'react-native-router-flux';
import { 
  View, 
  ListView, 
  Text, 
  TouchableHighlight, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Dimensions,} 
  from 'react-native';




var { height } = Dimensions.get('window'); 
var { width } = Dimensions.get('window'); 

export default class ProfileHistory extends React.Component {
    static navigationOptions = {
      title: 'History',
      headerTitleStyle: {
        fontWeight: 'normal',
        backgroundColor: colors.maroon,
        color: colors.tan,
      },
      headerStyle: {
        backgroundColor: colors.maroon
      }
    };
    getUser(){
        try{
          if(firebase.auth().currentUser != null){
            var user = firebase.auth().currentUser;
            
            return user.uid;
          }
        }
        catch (error) {
          console.log(error.toString())
        }
    }
    constructor(props) {
        super(props);

        this.ProfileHist = constants.firebaseApp.database().ref('Users/'+this.getUser().uid);
        this.eventsRef = constants.firebaseApp.database().ref('Events');
        this.historyRef = constants.firebaseApp.database().ref('Users/'+this.getUser()+'/history');


        const dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

        this.state = {
            ProfileHist: '',
            dataSource: dataSource
          }
          this.ProfileHist.once('value', (snap) => {
            userHistory = {
                events: snap.child('history').val(),
                //social: snap.child('tags/social').val()
              };
              this.setState({
                ProfileHist: userHistory
              });
        
              console.log(this.state.ProfileHist.events);
            });
    }
    componentDidMount(){
      this.listenForEvents(this.historyRef);
    }
    listenForEvents(eventsRef) {
      eventsRef.on('value', (snap) => {
        var events = new Array();
  
        snap.forEach((child) => {
          console.log(child);
          var eventVariableRef = this.eventsRef.child(child.child("eventID").val())
          var eventNameVariable;
          var eventDateVariable;
          eventVariableRef.once('value').then((snapshot) => {
            eventNameVariable = snapshot.child("Name").val()
            eventDateVariable = snapshot.child("Date").val()

            var atoday = new Date();
          var aeventDate = new Date(eventDateVariable);
          
          if(aeventDate.getTime() < atoday.getTime()){
            events.push({
              event: eventNameVariable,
              _key: child.key,
              date: eventDateVariable,
            });
          }
            

          
            
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(events)
            });
          });
        });
      });
    };

    acctmanagement() {
    Actions.acctmanagement();
  }
  render() {
    return (
      //NEEDS TO BE AN ON CLICK GET EVENT AND DISPLAY EVENT GOTTEN ON EVENT INFO
      <ScrollView style={styles.container}>
        <View style={{borderBottomWidth: 1}}>
          <View style={[styles.HistorySection]}>
            <TouchableHighlight onPress={() => Actions.profhistory()}>
              <Text style={[styles.historyHead]}>History ></Text>             
            </TouchableHighlight>
            <ListView dataSource={this.state.dataSource}
                  renderRow={this._renderItem.bind(this)}
                  style={styles.container} />
          </View>
        </View>
      
        

        

      </ScrollView>
    
    );
  }

    _renderItem(event) {
      const onPress = () => {
        console.log('Pressed');
      };
  
      return (<ListItem event={event} />);
    }
  }

    class ListItem extends Component {      
      render() {
        return (
          <TouchableHighlight onPress={this.props.onPress}>
            <View style={styles.li}>
              <Text style={styles.liText}>{this.props.event.event}</Text>
              <Text style={styles.asideText}>{this.props.event.date}</Text>
            </View>
          </TouchableHighlight>
        );
      }
    }
    

const styles = StyleSheet.create({

    container: {
      //flex is how much room this will take up, so flex 1 means that 1 is 100% of screenspace
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colors.tan,
    },
    liText:{
      fontSize: 25,
      fontWeight: 'bold',

    },
    asideText:{
      fontSize: 20,

    },
    text:{
      position: 'absolute',
      fontWeight: 'bold',
      fontSize: 25,
    },
    // Top
    top: {
      // top is 30% of screen
      flex: .30,
      borderBottomWidth: 1,
    },
    // Middle
    mid: {
      // mid is 60%
      flex: .60,
      borderBottomWidth: 1,
    },
    // Bottom
    bot: {
      // bottom is 10%
      flex: .10,
    },
    history: {
      fontSize: 27,
      fontWeight: 'bold',
      marginLeft: 130,
      marginTop: 10,
    },
    HistorySection: {
      // bottom is 10%
      flex: 1,
      flexDirection: 'column',
      margin:10,
    },
    historyHead: {
      fontSize: 40,
      fontWeight: 'bold',
      color: colors.maroon,
    },
    
  });