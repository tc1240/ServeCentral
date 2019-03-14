import React, { Component } from 'react';
import { Platform, View, ListView, Text, TouchableHighlight, StyleSheet } from 'react-native';
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
    console.log("changeSTyle" + this.state.filterSelect);
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

        console.log(eventValue.PrimaryTag + " :: " + this.state.filterSelect);

        var run = false;
        if(eventValue.PrimaryTag === this.state.filterSelect){
          run = true;
        } else if (this.state.filterSelect === 'None'){
          run = true;
        }

        if(run){
          events.push({
            event: child.val(),
            _key: child.key,
            primaryTag: primaryTag,
            tagColor: tagColor
          });
        }  

      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(events)
      });
    });
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
    return (
      <View style={styles.container}>
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
    return (
      <TouchableOpacity onPress={() => this.onEventPress(this.props.event)}>
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
  li: {
    backgroundColor: colors.default.orange,
    borderBottomColor: colors.default.tan,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 16,
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
});
