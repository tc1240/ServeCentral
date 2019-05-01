import React, { Component } from 'react';
import { Platform, View, ListView, Text, TouchableHighlight, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as firebase from 'firebase';
import * as constants from '../App';
import * as colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';

export default class EventsScreen extends React.Component {
  static navigationOptions = {
    title: 'Events',
    headerTitleStyle: {
      fontWeight: 'normal',
      backgroundColor: colors.maroon,
      color: colors.tan,
    },
    headerStyle: {
      backgroundColor: colors.maroon
    }
  };

  constructor(props) {
    super(props);

    this.eventsRef = constants.firebaseApp.database().ref('Events');
    
    const dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    this.state = {
      dataSource: dataSource,
      environmentColor: colors.default.tan,
      socialColor: colors.default.tan,
      constructionColor: colors.default.tan,
      walkColor: colors.default.tan,
      fundraiserColor: colors.default.tan,
      ministryColor: colors.default.tan,
      filterSelect: 'None'
    }

  }

  async _changeStyle(current) {
    var promise = new Promise((resolve, reject) => {
      if(current === "Environment"){
        var backgroundColor = colors.default.orange;
        this.setState({
          environmentColor: backgroundColor,
          socialColor: colors.default.tan,
          constructionColor: colors.default.tan,
          walkColor: colors.default.tan,
          fundraiserColor: colors.default.tan,
          ministryColor: colors.default.tan,
          filterSelect: 'Environmental'
        })
        resolve()
      } else if (current === 'Social') {
        var backgroundColor = colors.default.orange;
        this.setState({
          environmentColor: colors.default.tan,
          socialColor: backgroundColor,
          constructionColor: colors.default.tan,
          walkColor: colors.default.tan,
          fundraiserColor: colors.default.tan,
          ministryColor: colors.default.tan,
          filterSelect: 'Social'
        })
        resolve()
      } else if (current === 'Construction') {
        var backgroundColor = colors.default.orange;
        this.setState({
          environmentColor: colors.default.tan,
          socialColor: colors.default.tan,
          constructionColor: backgroundColor,
          walkColor: colors.default.tan,
          fundraiserColor: colors.default.tan,
          ministryColor: colors.default.tan,
          filterSelect: 'Construction'
        })
        resolve()
      } else if (current === 'Walk') {
        var backgroundColor = colors.default.orange;
        this.setState({
          environmentColor: colors.default.tan,
          socialColor: colors.default.tan,
          constructionColor: colors.default.tan,
          walkColor: backgroundColor,
          fundraiserColor: colors.default.tan,
          ministryColor: colors.default.tan,
          filterSelect: 'Walk'
        })
        resolve()
      } else if (current === 'Fundraiser') {
        var backgroundColor = colors.default.orange;
        this.setState({
          environmentColor: colors.default.tan,
          socialColor: colors.default.tan,
          constructionColor: colors.default.tan,
          walkColor: colors.default.tan,
          fundraiserColor: backgroundColor,
          ministryColor: colors.default.tan,
          filterSelect: 'Fundraiser'
        })
        resolve()
      } else if (current === 'Ministry') {
        var backgroundColor = colors.default.orange;
        this.setState({
          environmentColor: colors.default.tan,
          socialColor: colors.default.tan,
          constructionColor: colors.default.tan,
          walkColor: colors.default.tan,
          fundraiserColor: colors.default.tan,
          ministryColor: backgroundColor,
          filterSelect: 'Ministry'
        })
        resolve()
      }
    });
    let result = await promise;
    this.listenForEvents(this.eventsRef);
  }

  componentDidMount() {
    this.listenForEvents(this.eventsRef);
  }

  listenForEvents(eventsRef) {

    eventsRef.on('value', (snap) => {
      var events = [];
      snap.forEach((child) => {
        var eventValue = child.val();
        var primaryTag;
        var tagColor;
        if(eventValue.PrimaryTag == 'Environmental'){
          primaryTag =
            Platform.OS === 'ios'
              ? `ios-leaf`
              : 'ios-leaf';
          tagColor = '#4CAF50'
        } else if(eventValue.PrimaryTag == 'Social'){
          primaryTag =
            Platform.OS === 'ios'
              ? `ios-people`
              : 'md-people'; 
          tagColor = 'purple'
        } else if(eventValue.PrimaryTag == 'Construction'){
          primaryTag =
            Platform.OS === 'ios'
              ? `ios-construct`
              : 'md-construct';
          tagColor = '#ED0'
        } else if(eventValue.PrimaryTag == 'Walk'){
          primaryTag =
            Platform.OS === 'ios'
              ? `ios-walk`
              : 'md-walk';
          tagColor = '#FF9800'
        } else if(eventValue.PrimaryTag == 'Fundraiser'){
          primaryTag =
            Platform.OS === 'ios'
              ? `ios-cash`
              : 'md-cash'; 
          tagColor = '#2196F3'
        } else if(eventValue.PrimaryTag == 'Ministry'){
          primaryTag =
            Platform.OS === 'ios'
              ? `ios-bookmarks`
              : 'md-bookmarks'; 
          tagColor = '#F44336'
        }

        var run = false;
        if(eventValue.PrimaryTag === this.state.filterSelect){
          run = true;
        } else if (this.state.filterSelect === 'None'){
          run = true;
        }

        var today = new Date();
        var eventDate = new Date(eventValue.Date);
        if(eventDate.getTime() <= today.getTime()){
          run = false;
        }

        var VolunteerCount = Object.keys(child.val().Attendees).length;
        var Capacity = child.val().Capacity;
        var need = 'High!'
        var needColor = '#FF0000'
        if(Capacity - VolunteerCount <= 0){
          need = 'Met!'
          needColor = '#00FF00'
        } else if (Capacity - VolunteerCount <= 10){
          need = 'Low'
          needColor = '#0000FF'
        } else if (Capacity - VolunteerCount <= 30){
          need = 'Medium'
          needColor = '#FFFF00'
        }

        if(run){
          events.push({
            event: child.val(),
            _key: child.key,
            primaryTag: primaryTag,
            tagColor: tagColor,
            need: need,
            needColor: needColor
          });
        }  

      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(events)
      });
    });
  }

  async unfilter(){
    var promise = new Promise((resolve, reject) => {
      this.setState({
        environmentColor: colors.default.tan,
        socialColor: colors.default.tan,
        constructionColor: colors.default.tan,
        walkColor: colors.default.tan,
        fundraiserColor: colors.default.tan,
        ministryColor: colors.default.tan,
        filterSelect: 'None'
      })
      resolve()
    })

    let result = await promise;
    this.listenForEvents(this.eventsRef)
  }

  render() {
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

    const filterState = this.state.filterSelect;
    let button;
    if(filterState === 'None'){
      button = (<View></View>)
    } else {
      button = <Button color={colors.maroon} title={'Reset Filter'} onPress={() => this.unfilter()} style={styles.unfilterButton}/>
    }
    return (
      <View style={styles.container}>
        <Button color={colors.default.maroon} title={'Add Event'} onPress={() => Actions.eventaddscreen()} style={styles.addButton}/>
        <View style={styles.filterOptions}>
          <TouchableHighlight
          onPress={ () => this._changeStyle('Environment') }
          style={{backgroundColor: this.state.environmentColor, padding: 5}}>
            <Ionicons
              name={iconLeaf}
              size={30}
              style={[styles.icon]}
              color={'#4CAF50'}
            />
          </TouchableHighlight>

          <TouchableHighlight
          onPress={ () => this._changeStyle('Social') }
          style={{backgroundColor: this.state.socialColor, padding:5}}>
            <Ionicons
              name={iconPeople}
              size={30}
              style={[styles.icon]}
              color={'purple'}
            />
          </TouchableHighlight>
          <TouchableHighlight
          onPress={ () => this._changeStyle('Construction') }
          style={{backgroundColor: this.state.constructionColor, padding: 5}}>
            <Ionicons
              name={iconConstruct}
              size={30}
              style={[styles.icon]}
              color={'#ED0'}
            />
          </TouchableHighlight>
          <TouchableHighlight
          onPress={ () => this._changeStyle('Walk') }
          style={{backgroundColor: this.state.walkColor, padding: 5}}>
            <Ionicons
              name={iconWalk}
              size={30}
              style={[styles.icon]}
              color={'#FF9800'}
            />
          </TouchableHighlight>
          <TouchableHighlight
          onPress={ () => this._changeStyle('Fundraiser') }
          style={{backgroundColor: this.state.fundraiserColor, padding: 5}}>
            <Ionicons
              name={iconCash}
              size={30}
              style={[styles.icon]}
              color={'#2196F3'}
            />
          </TouchableHighlight>
          <TouchableHighlight
          onPress={ () => this._changeStyle('Ministry') }
          style={{backgroundColor: this.state.ministryColor, padding: 5}}>
            <Ionicons
              name={iconBible}
              size={30}
              style={[styles.icon]}
              color={'#F44336'}
            />
          </TouchableHighlight>
        </View>

        {button}

        <ListView dataSource={this.state.dataSource}
                  renderRow={this._renderItem.bind(this)}
                  style={styles.container} />
      </View>
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
    const needColor = this.props.event.needColor;
    return (
      <TouchableOpacity style={styles.card} onPress={() => this.onEventPress(this.props.event)}>
        <View style={styles.li}>
          <View style={styles.firstItem}>
            <Ionicons
              name={this.props.event.primaryTag}
              size={23}
              style={[styles.icon]}
              color={this.props.event.tagColor}
            />
            <Text style={styles.liText}> {this.props.event.event.Name}</Text>
          </View>
          <Text style={styles.asideText}>{this.props.event.event.Date}</Text>
        </View>
        <View style={styles.li}>
          <Text>{this.props.event.event.Address}</Text>
          <Text style={{color: needColor}}>{this.props.event.need}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  filterOptions:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  container: {
    backgroundColor: colors.default.tan,
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.default.orange,
    borderBottomColor: colors.default.tan,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  li: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  firstItem: {
    flexDirection: 'row',
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
  navbar: {
    alignItems: 'center',
    backgroundColor: colors.default.tan,
    borderBottomColor: colors.default.tan,
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: colors.default.tan,
    fontSize: 16,
    fontWeight: "500"
  },
  statusbar: {
    backgroundColor: colors.default.tan,
    height: 22,
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: colors.default.tan,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  unfilterButton: {
    backgroundColor: '#fff',
    color: '#fff'
  },
});
