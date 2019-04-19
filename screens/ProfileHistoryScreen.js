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
        
              console.log("ProfHist: "+this.state.ProfileHist.events);
            });
    }
    componentDidMount(){
      this.listenForEvents(this.historyRef);
    }
    listenForEvents(eventsRef) {
      eventsRef.on('value', (snap) => {
        var events = new Array();
  
        snap.forEach((child) => {
          //Get all events the user is registered for...
          var eventVariableRef = this.eventsRef.child(child.child("eventID").val())
          //Loop through each event...
          eventVariableRef.once('value').then((snapshot) => {

            var atoday = new Date();
            var aeventDate = new Date(snapshot.val().Date);
            //If that event is older than today then it belongs in the history page so keep it
            if(aeventDate.getTime() < atoday.getTime()){
              console.log("child : "+ snapshot.val().Date)
              events.push({
                event: snapshot.val(),
                _key: child.key,
              });
            }
            
            //Set state to all old events to be displayed in history listview
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
      <ScrollView style={styles.container}>
        <View style={{borderBottomWidth: 1}}>
          <View style={[styles.HistorySection]}>
            <Text style={[styles.historyHead]}>History ></Text>  
            <Text>{"\n"}</Text>   
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
      onEventPress(event){
        //Gets event clicked and passes it to eventinfo. It can be recieved on eventInfo using this.props.event.event
        Actions.eventinfo({event: event})
      }
 
      render() {
        return (
          <TouchableHighlight onPress={() => this.onEventPress(this.props.event)}>
            <View style={styles.li}>
              <Text style={styles.liText}>{this.props.event.event.Name}</Text>
              <Text style={styles.asideText}>{this.props.event.event.Date}</Text>
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
      color: '#333',
      fontSize: 16,
    },
    asideText:{
      color: '#333',
      fontSize: 16,
    },
    // text:{
    //   position: 'absolute',
    //   fontWeight: 'bold',
    //   fontSize: 25,
    // },

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
      fontSize: 30,
      color: colors.maroon,
    },
    li: {
      backgroundColor: colors.orange,
      borderBottomColor: colors.tan,
      borderColor: 'transparent',
      borderWidth: 1,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 14,
      paddingBottom: 16,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
    
  });