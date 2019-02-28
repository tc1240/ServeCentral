import React, { Component } from 'react';
import * as constants from '../App';
import PieChart from 'react-native-pie-chart';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { Platform, Button } from 'react-native';
import colors from '../constants/Colors';
import { Actions } from 'react-native-router-flux';
import { 
  Text, 
  View,
  Image,
  ScrollView, 
  StyleSheet,
  Dimensions,
  ListView,
  TouchableHighlight,
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
    this.historyRef = constants.firebaseApp.database().ref('Users/'+this.getUser()+'/history');
    this.achieveRef = constants.firebaseApp.database().ref('Users/'+this.getUser()+'/achievements');
    this.eventsRef = constants.firebaseApp.database().ref('Events');
    this.allAchieveRef = constants.firebaseApp.database().ref('Achievements');
    
    const dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    const dataSource2 = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    
    this.state = {
      profileData: '',
      dataSource: dataSource,
      dataSource2: dataSource2,
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
    });
  }

  componentDidMount(){
    this.listenForEvents(this.historyRef);
    this.listenForAchievements(this.achieveRef);
  }

  listenForEvents(eventsRef) {
    eventsRef.on('value', (snap) => {

      snap.forEach((child) => {
        var eventVariableRef = this.eventsRef.child(child.val())
        var eventNameVariable;
        var eventDateVariable;
        eventVariableRef.once('value').then((snapshot) => {
          eventNameVariable = snapshot.child("Name").val()
          eventDateVariable = snapshot.child("Date").val()
          var events = [];
            
          events.push({
            event: eventNameVariable,
            _key: child.key,
            date: eventDateVariable,
          });
          
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(events)
          });
        });
      });
    });
  };

  listenForAchievements(allAchieveRef) {
    allAchieveRef.on('value', (snap) => {

      snap.forEach((child) => {
        var achieveVariableRef = this.allAchieveRef.child(child.val())
        var achieveNameVariable;
        achieveVariableRef.once('value').then((snapshot) => {
          achieveNameVariable = snapshot.val()
          var achievements = [];

          achievements.push({
            achievement: achieveNameVariable,
            _key: child.key,
          });
          
          this.setState({
            dataSource2: this.state.dataSource2.cloneWithRows(achievements)
          });
        });
      });
    });
  };

  acctmanagement() {
    Actions.acctmanagement();
  }
 
  render() {

    const chart_wh = 190;
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

    const sliceColor = ['#4CAF50','purple','#ED0','#FF9800','#2196F3','#F44336'];

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
      <ScrollView style={styles.container}>

        <View style={{borderBottomWidth: 1}}>
          <View style={[styles.ProfileInfoSection]}>
            <Image source={require('../assets/images/profPic.png')} style={styles.profPic} /> 
            <View style={[styles.userInformation]}>
              <Text style={[styles.text, styles.username]}>{this.state.profileData.name}</Text>
              <Text style={[styles.text, styles.email]}>{this.state.profileData.email}</Text>
            </View>
            <Image source={require('../assets/images/settingWheel.png')} style={styles.setting} />
          </View>
        </View>


        <View style={{borderBottomWidth: 1}}>
          <View style={[styles.PieChartSection]}>
            <PieChart style={styles.pieChart}
                chart_wh={chart_wh}
                series={series}
                sliceColor={sliceColor}
                doughnut={true} 
                coverRadius={0.45}
                coverFill={colors.tan}
              />
            
            <View style={styles.legend}>
              <Ionicons
                name={iconLeaf}
                size={28}
                style={[styles.icon]}
                color={'#4CAF50'}
              >Environmental</Ionicons>
              <Ionicons
                name={iconPeople}
                size={28}
                style={[styles.icon]}
                color={'purple'}
              >Social Support</Ionicons>
              <Ionicons
                name={iconConstruct}
                size={28}
                style={[styles.icon]}
                color={'#ED0'}
              >Construction</Ionicons>
              <Ionicons
                name={iconWalk}
                size={28}
                style={[styles.icon]}
                color={'#FF9800'}
              >Walk-A-Thon</Ionicons>
              <Ionicons
                name={iconCash}
                size={28}
                style={[styles.icon]}
                color={'#2196F3'}
              >Fundraiser</Ionicons>
              <Ionicons
                name={iconBible}
                size={28}
                style={[styles.icon]}
                color={'#F44336'}
              >Ministry</Ionicons>
            </View>
          </View>
        </View>

        <View style={{borderBottomWidth: 1}}>
          <View style={[styles.HistorySection]}>
            <Text style={[styles.historyHead]}>History ></Text>
            <ListView dataSource={this.state.dataSource}
                  renderRow={this._renderItem.bind(this)}
                  style={styles.container} />
          </View>
        </View>
      
        <View style={{borderBottomWidth: 1}}>
          <View style={[styles.achievementSection]}>
            <Text style={[styles.achievementHead]}>Achievements ></Text>
            <ListView dataSource={this.state.dataSource2}
                  renderRow={this._renderItem2.bind(this)}
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

  _renderItem2(achievements) {
    const onPress = () => {
      console.log('Pressed');
    };

    return (<ListItem2 achievements={achievements} />);
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

class ListItem2 extends Component {      
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.liText}>{this.props.achievements.achievement}</Text>
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
  // Top
  ProfileInfoSection: {
    // top is 30% of screen
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 15,
  },
  profPic: {
    width: 125,
    height: 125,
  },
  userInformation: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 25,
    flex: 1,
  },
  email: {
    fontSize: 18,
    flex: 2,
  },
  setting: {
    width: 25,
    height: 25,
  },


  // Middle
  PieChartSection: {
    // mid is 60%
    flex: 1,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieChart: {
    flex: 1.5,
  },
  legend: {
    flex: 1,
  },
  icon: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,

  },


  // Bottom
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
  container: {
    backgroundColor: colors.tan,
    flex: 1,
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
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  asideText: {
    color: '#333',
    fontSize: 16,
  },


  //Achievements
  achievementSection: {
    flex: 1,
    flexDirection: 'column',
    margin:10,
  },
  achievementHead: {
    fontSize: 30,
    color: colors.maroon,
  },

  
});


/* Notes:
pie chart info can be found at: https://www.npmjs.com/package/react-native-pie-chart
*/