import React, { Component } from 'react';
import { View, ListView, Text, TouchableHighlight, StyleSheet } from 'react-native';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAHhF5RU-ODqvW4Sm8YxRo4d18Mys_x1qc",
  authDomain: "https://binthr-1508505021265.firebaseapp.com",
  databaseURL: "https://binthr-1508505021265.firebaseio.com",
  storageBucket: "binthr-1508505021265"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class EventsScreen extends React.Component {
  static navigationOptions = {
    title: 'Events',
  };

  constructor(props) {
    super(props);

    this.eventsRef = firebaseApp.database().ref('Events');

    const dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    this.state = {
      dataSource: dataSource,
    }
  }

  componentDidMount() {
    this.listenForEvents(this.eventsRef);
  }

  listenForEvents(eventsRef) {
    eventsRef.on('value', (snap) => {
      var events = [];
      snap.forEach((child) => {
        events.push({
          event: child.val(),
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(events)
      });
    });
  }

  render() {
    return (
      <ListView dataSource={this.state.dataSource}
                renderRow={this._renderItem.bind(this)}
                style={styles.container} />
    );
  }

  _renderItem(event) {
    const onPress = () => {
      alert('Hello There!');
    };

    return (<ListItem event={event} />);
  }
}

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
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
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
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
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  statusbar: {
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
});
