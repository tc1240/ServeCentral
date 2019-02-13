import React from 'react';
import * as constants from '../App';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { Platform } from 'react-native';
import colors from '../constants/Colors';
import { 
  Text, 
  View,
  Image,
  ScrollView, 
  StyleSheet,
  Dimensions,
  ListView,

} from 'react-native';

//Comment delete me please

var { height } = Dimensions.get('window'); 
var { width } = Dimensions.get('window'); 

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: '',
  };
  getUser(){
    try{
      if(firebase.auth().currentUser != null){
        var user = firebase.auth().currentUser;
        console.log(user.uid);
        return user.uid;
      }
    }
    catch (error) {
      console.log(error.toString())
    }
  }
  
  constructor(props) {
    super(props);

    this.eventsRef = constants.firebaseApp.database().ref('Events');
    
    const dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    this.state = {
      dataSource: dataSource,
    }
  }

  render() {
    return (
      
      <View style={styles.container}>
        <View style={[styles.top]}>
            <Image source={require('../assets/images/profPic.png')} style={styles.profPic} /> 
            <Text style={styles.text}>{this.state.dataSource.name}</Text>
        </View>
        <View style={[styles.mid]}>
          
        </View>
        <View style={[styles.bot]}>
            <Text style={styles.link}>Register for Event</Text>
        </View>
      </View>
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex is how much room this will take up, so flex 1 means that 1 is 100% of screenspace
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#EC8',
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
  link:{
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 20,
  },
  
});
