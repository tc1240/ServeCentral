import React from 'react';
import * as constants from '../App';
import { View, ListView, Text, TouchableHighlight, StyleSheet, Image, ScrollView, Dimensions,} from 'react-native';
import * as firebase from 'firebase';
import { Platform } from 'react-native';
import colors from '../constants/Colors';

var { height } = Dimensions.get('window'); 
var { width } = Dimensions.get('window'); 

export default class ProfileAchievements extends React.Component {
    static navigationOptions = {
      title: 'Achievements',
    };
    getUser(){
        try{
          if(firebase.auth().currentUser != null){
            var user = firebase.auth().currentUser;
            console.log(user.uid);
            return user;
          }
        }
        catch (error) {
          console.log(error.toString())
        }
    }
    constructor(props) {
        super(props);

        this.ProfileAchieve = constants.firebaseApp.database().ref('Users/'+this.getUser().uid);
        this.state = {
            ProfileAchieve: ''
          }
          this.ProfileAchieve.once('value', (snap) => {
            userAchievements= {
                achievements: snap.child('achievements').val(),
                //social: snap.child('tags/social').val()
              };
              this.setState({
                ProfileAchieve: userAchievements
              });
        
              console.log(this.state.ProfileAchieve.achievements);
            });
          }

          render() {
            //const { navigate } = this.props.navigation;
            return (              
                    <Text>Achievements here...</Text>
            )
          };
}
const styles = StyleSheet.create({

    container: {
      //flex is how much room this will take up, so flex 1 means that 1 is 100% of screenspace
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colors.tan,
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
      fontSize: 25,
      fontWeight: 'bold',
      marginLeft: 130,
      marginTop: 10,
    },
    
  });