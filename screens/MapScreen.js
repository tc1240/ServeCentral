import React from 'react';
import * as firebase from 'firebase';
import * as constants from '../App';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class MapScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
        markerData: []
    }
}

componentDidMount() {
  // this.listenForMarkers(this.eventsRef);
}

listenForMarkers(eventsRef) {
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
    return(
        <MapView style={styles.map}
        region={{
          latitude: 40.1510,
          longitude: -76.9812,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
      >
            {/* {this.state.markerData.event(marker => (
              <Marker
                title={marker.name}
                key={marker.key}
                description={'Test'}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude
                }} />
            ))} */}
        
        <Marker
                  title={"You are here"}
                  description={'Like right here'}
                  coordinate={{
                    latitude: 40.1510,
                    longitude: -76.9812,
                  }} />

        </MapView>
    )
}

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  map: {
    flex: 1,
    position: 'absolute',
    paddingTop: 750,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
