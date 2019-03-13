import React from 'react';
import * as constants from '../App';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { Button } from 'react-native';
import colors from '../constants/Colors';
import Toast, {DURATION} from 'react-native-easy-toast';
import { 
  Text, 
  View,
  Image,
  ScrollView, 
  StyleSheet,
  Dimensions,
  ListView,

} from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Event Info',
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
        console.log(user.uid);
        return user.uid;
      }
    }
    catch (error) {
      console.log(error.toString())
    }
  }
  //This method will add the user to the event's list of participants, add the event to the 
  //  user's list of events, and change the color of the button to orange to show it has been clicked
  onRegister(){
    console.log('register clicked')

    try {      
      // Error stuff

      var eventKey = this.props.event._key;

      // IN order for both of these to work you must have a push instead of update, however this will
      //  require reworking the profile page code and any others that access the user's history path.
      //  What push does is creates a unique id that holds the field userId: currentUser, what we
      //  currently look for is events/userID rather than events/(unique id)/userID

      //Add users uid to event's attendees list
      firebase.database().ref('Events/'+eventKey+'/Attendees').update(
        {
          userId: this.getUser(),
        }
      )
      //Add event _key to user's history events list  
      firebase.database().ref('Users/'+this.getUser()+'/history').update(
        {
          event: eventKey,
        }
      )

      this.refs.toast.show('You\'re signed up!', 2000);

    } catch (error) {
        console.log(error.toString())
        this.refs.toast.show("Oops! That was an unexpected error!", 2000);
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
      <ScrollView style={styles.container}>
        <View style={[styles.top]}>
            <Image source={require('../assets/images/profPic.png')} style={styles.profPic} /> 
            <View style={styles.topInfo}>
              <Text style={styles.name}>{this.props.event.event.Name}</Text>
              <Text style={styles.text}>Event Date</Text>
              <Text style={styles.date}>{this.props.event.event.Date}</Text>
            </View>
        </View>
        <View style={{borderBottomWidth: 1}}></View>
        <View style={[styles.mid]}>
          <Text style={styles.text}>Description</Text>
          <Text style={styles.info}>{this.props.event.event.Information}</Text>
          <Text style={styles.text}>Start Time</Text>
          <Text style={styles.start}>{this.props.event.event.StartTime}</Text>
          <Text style={styles.text}>Address</Text>
          <Text style={styles.address}>{this.props.event.event.Address}</Text>
          <Text style={styles.text}>Duration</Text>
          <Text style={styles.duration}>{this.props.event.event.Duration} Hours</Text>
          <Text style={styles.text}>Event Type</Text>
          <Text style={styles.tag}>{this.props.event.event.PrimaryTag}</Text>
        </View>
        <Toast ref="toast"/>
        <View style={[styles.bot]}>
            <Button color={colors.maroon} title={'Register for Event'} onPress={() => this.onRegister()} style={styles.regForEvent}></Button>
        </View>
      </ScrollView>
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
  text:{
    flex: .5,
    textDecorationLine: 'underline',
    fontSize: 15,
    marginTop: 15,
  },
  // Top
  top: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: .50,
    marginTop: 10,
    marginBottom: 10
  },
  profPic: {
    width: 125,
    height: 125,
    flex: .70,
    marginLeft: 10,
    marginRight: 10
  },
  topInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.30
  },
  name: {
    fontSize: 22,
    flex: 1,
    marginTop: 10,
    flexWrap: 'wrap'
  },
  date: {
    fontSize: 22,
    flex: 1,
  },
  // Middle
  mid: {
    flex: 1.40,
    marginLeft: 10,
  },
  info: {
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap'
  },
  start: {
    fontSize: 20,
    flex: 1,
  },
  address: {
    fontSize: 20,
    flex: 1,
  },
  duration: {
    fontSize: 20,
    flex: 1,
  },
  tag: {
    fontSize: 20,
    flex: 1,
  },
  // Bottom
  bot: {
    // bottom is 10%
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  regForEvent: {
    fontWeight: 'bold',
    fontSize: 70,
    flex: 1,
    width: 100,
  },
  
});
