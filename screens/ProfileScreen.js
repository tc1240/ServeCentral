import React from 'react';
import * as constants from '../App';
import PieChart from 'react-native-pie-chart';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { Platform } from 'react-native';
import { 
  Text, 
  View,
  Image,
  ScrollView, 
  StyleSheet,
  Dimensions,

} from 'react-native';

var { height } = Dimensions.get('window'); 
var { width } = Dimensions.get('window'); 

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
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
    this.profileRef = constants.firebaseApp.database().ref('Users/'+this.getUser());
    this.state = {
      profileData: ''
    }
    this.profileRef.once('value', (snap) => {

      user = {
        email: snap.child('email').val(),
        name: snap.child('name').val(),
        serviceHours: snap.child('serviceHours').val(),
        environmental: snap.child('tags/environmental').val(),
        social: snap.child('tags/social').val(),
        construction: snap.child('tags/construction').val(),
        walk: snap.child('tags/walk').val(),
        fundraiser: snap.child('tags/fundraiser').val(),
        ministry: snap.child('tags/ministry').val(),
      };

      this.setState({
        profileData: user
      });

      console.log(this.state.profileData);
    });
  }

  render() {

    const chart_wh = 210;
    //sizes of slices

    var environmental = 0; 
    environmental += this.state.profileData.environmental;
    var social = 0; 
    social += this.state.profileData.social;
    var construction = 0; 
    construction += this.state.profileData.construction;
    var walk = 0; 
    walk += this.state.profileData.walk;
    var fundraiser = 0; 
    fundraiser += this.state.profileData.fundraiser;
    var ministry = 0; 
    ministry += this.state.profileData.ministry;

    //let pie chart = equal sides if the returned firebase data is either NaN or all 0's (all 0's and NaN cause the chart to break)
    let series =
      isNaN(environmental)||(environmental==0 && social==0 && construction==0 && walk==0 && fundraiser==0 && ministry==0)
        ? series = [1,1,1,1,1,1]
        : series = [
          environmental,
          social,
          construction,
          walk,
          fundraiser,
          ministry,];

    const sliceColor = ['#4CAF50','#800080','#FFEB3B','#FF9800','#2196F3','#F44336'];

    let iconLeaf =
      Platform.OS === 'ios'
        ? `ios-leaf`
        : 'ios-leaf';
    let iconPeople =
      Platform.OS === 'ios'
        ? `ios-people`
        : 'md-people';            
    let iconConstruct =
      Platform.OS === 'ios'
        ? `ios-construct`
        : 'md-construct';
    let iconWalk =
      Platform.OS === 'ios'
        ? `ios-walk`
        : 'md-walk';
    let iconCash =
      Platform.OS === 'ios'
        ? `ios-cash`
        : 'md-cash';  
    let iconBible =
      Platform.OS === 'ios'
        ? `ios-bookmarks`
        : 'md-bookmarks'; 
    return (
      //NEEDS TO BE AN ON CLICK GET EVENT AND DISPLAY EVENT GOTTEN ON EVENT INFO
      <View style={styles.container}>
        <View style={[styles.top]}>
          <Image source={require('../assets/images/profPic.png')} style={styles.profPic} /> 
          <Text style={[styles.text, styles.username]}>{this.state.profileData.name}</Text>
          <Text style={[styles.text, styles.email]}>{this.state.profileData.email}</Text>
        </View>
        <View style={[styles.mid]}>
          <PieChart style={styles.pieChart}
              chart_wh={chart_wh}
              series={series}
              sliceColor={sliceColor}
              doughnut={true}
              coverRadius={0.45}
              coverFill={'#FFF'}
              onPressIn={() => Alert.alert(`onPressIn clicked ${series}`)}
              onPressOut={() => Alert.alert(`onPressOut clicked ${series}`)}
          />
          <Text style={[styles.text, styles.hours]}>{this.state.profileData.serviceHours} Total Hours</Text>
          
          <View style={styles.legend}>
            <Ionicons
              name={iconLeaf}
              size={28}
              style={[styles.icon]}
              color={'#4CAF50'}
            />
            <Ionicons
              name={iconPeople}
              size={28}
              style={[styles.icon]}
              color={'#800080'}
            />
            <Ionicons
              name={iconConstruct}
              size={28}
              style={[styles.icon]}
              color={'#FFEB3B'}
            />
            <Ionicons
              name={iconWalk}
              size={28}
              style={[styles.icon]}
              color={'#FF9800'}
            />
            <Ionicons
              name={iconCash}
              size={28}
              style={[styles.icon]}
              color={'#2196F3'}
            />
            <Ionicons
              name={iconBible}
              size={28}
              style={[styles.icon]}
              color={'#F44336'}
            />
          </View>
          <View style={[styles.legend, styles.legendWords]}>
            <Text style={[styles.Text, styles.legendText]}>Environmental</Text>
            <Text style={[styles.Text, styles.legendText]}>Social Support</Text>
            <Text style={[styles.Text, styles.legendText]}>Construction</Text>
            <Text style={[styles.Text, styles.legendText]}>Walk-A-Thon</Text>
            <Text style={[styles.Text, styles.legendText]}>Fundraiser</Text>
            <Text style={[styles.Text, styles.legendText]}>Ministry</Text>
          </View>
        </View>
        <View style={[styles.bot]}>
          <Text style={[styles.history]}>History</Text>
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
    backgroundColor: '#fff',
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
  profPic: {
    position: 'absolute',
    marginTop: 15,
    marginLeft: 15,
    width: 125,
    height: 125,
  },
  username: {
    marginLeft: 150,
    marginTop: 30,
    fontSize: 25,
  },
  email: {
    position: 'relative',
    marginLeft: 150,
    marginTop: 60,
    fontSize: 18,
  },
  // Middle
  mid: {
    // mid is 60%
    flex: .60,
    borderBottomWidth: 1,
  },
  pieChart: {
    marginLeft: 15,
    marginTop: 70,
  },
  hours: {
    marginLeft: 76,
    marginTop: 152,
    width: 85,
    textAlign: 'center',
  },
  legend: {
    position: 'absolute',
    marginLeft: 235,
    marginTop: 93,
  },
  legendWords: {
    marginLeft: 262,
    marginTop: 98,
  },
  legendText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 9,
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


/* Notes:
pie chart info can be found at: https://www.npmjs.com/package/react-native-pie-chart
*/