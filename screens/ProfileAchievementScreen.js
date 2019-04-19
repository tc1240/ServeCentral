import React, { Component } from 'react';
import * as constants from '../App';
import { Platform } from 'react-native';
import colors from '../constants/Colors';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import { View, 
          ListView, 
          Text, 
          TouchableHighlight, 
          StyleSheet, 
          Image, 
          ScrollView, 
          Dimensions,
        } from 'react-native';

var { height } = Dimensions.get('window'); 
var { width } = Dimensions.get('window'); 

export default class ProfileAchievements extends React.Component {
    static navigationOptions = {
      title: 'Achievements',
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

        this.achieveRef = constants.firebaseApp.database().ref('Users/'+this.getUser()+'/achievements');
        this.achieveAllRef = constants.firebaseApp.database().ref('Achievements');

        const dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

        this.state = {
            ProfileAchieve: '',
            dataSource: dataSource
          }
          // this.ProfileAchieve.once('value', (snap) => {
          //   userAchievements= {
          //       achievements: snap.child('achievements').val(),
          //       //social: snap.child('tags/social').val()
          //     };
          //     this.setState({
          //       ProfileAchieve: userAchievements
          //     });
          //     console.log(this.state.ProfileAchieve.achievements);
          //   });
          }

          componentDidMount(){
            this.listenForAchievements(this.achieveRef);
          }

          listenForAchievements(allAchieveRef) {
            allAchieveRef.on('value', (snap) => {

              var achievements = new Array();
        
              snap.forEach((child) => {
                var achieveVariableRef = this.achieveAllRef.child(child.val())
                var achieveNameVariable;
                achieveVariableRef.once('value').then((snapshot) => {
                  achieveNameVariable = snapshot.val()
                  
        
                  achievements.push({
                    achievement: achieveNameVariable,
                    _key: child.key,
                  });
                  
                  this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(achievements)
                  });
                });
              });
            });
          };

          acctmanagement() {
            Actions.acctmanagement();
          }

          render() {
            //const { navigate } = this.props.navigation;
            return (              
              <ScrollView style={styles.container}>
                <View style={{borderBottomWidth: 1}}>
                  <View style={[styles.achievementSection]}>
                    <Text style={[styles.achievementHead]}>Achievements ></Text>
                    <Text>{"\n"}</Text>
                    <ListView dataSource={this.state.dataSource}
                      renderRow={this._renderItem.bind(this)}
                      style={styles.container} />
                  </View>
                </View>
              </ScrollView>
            );
          }
          _renderItem(achievements) {
            const onPress = () => {
              console.log('Pressed');
            };
        
            return (<ListItem achievements={achievements} />);
          }
        }
        class ListItem extends Component { 
          // Uncomment the following when/if an acheivementInfo page is created. (a page to see an achievement and its criteria)
          //    This will allow you to add a link to the listed achiements and pass the data to the achievement page
          // onAchievementPress(acheivement){
          //   //Gets event clicked and passes it to eventinfo. It can be recieved on eventInfo using this.props.event.event
          //   Actions.achieveInfo({achievement: acheivement})
          // }
         
          render() {
            return (
              //<TouchableHighlight onPress={() => this.onAchievementPress(this.props.achievements.achievement)}>
                <View style={styles.li}>
                  <Text style={styles.liText}>{this.props.achievements.achievement}</Text>
                </View>
              //</TouchableHighlight>
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
    text:{
      position: 'absolute',
      fontWeight: 'bold',
      fontSize: 20,
    },
    // Top
    top: {
      // top is 30% of screen
      flex: .30,
      
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
    achievementSection: {
      flex: 1,
      flexDirection: 'column',
      margin: 10,
    },
    achievementHead: {
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
    },
    
  });