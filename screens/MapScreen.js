import React from 'react';
import * as firebase from 'firebase';
import * as constants from '../App';
import { WebBrowser } from 'expo';
import {Actions} from 'react-native-router-flux'
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
    this.eventsRef = constants.firebaseApp.database().ref('Events');
    this.state = {
        markerData: [],
        initialPosition: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }
    }
  }

  componentDidMount() {
    this.listenForMarkers(this.eventsRef);
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }

      this.setState({initialPosition: initialRegion})
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
  }

  markerClick(event){
    Actions.eventinfo({event: event})
  }

  listenForMarkers(eventsRef) {
    eventsRef.on('value', (snap) => {
      var events = [];
      snap.forEach((child) => {
        events.push({
          event: child.val(),
          _key: child.key,
        });
      });
      // Take events gotten and push them onto marker data
      this.setState({
        markerData: events
      })
    });
  }

  render() {
      return(
        <MapView 
          style={styles.map}
          initialRegion={this.state.initialPosition}
          showsUserLocation={true}
          showsMyLocationButton={true}
          region={{
            latitude: 40.1510,
            longitude: -76.9812,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
        >
        
        {/* Loop markerData until all events are displayed as markers */}
        {this.state.markerData.map((marker, key) => { 
          return(
            <Marker
              title={marker.event.Name}
              key={key}
              description={marker.event.Information}
              coordinate={{
                latitude: marker.event.location.latitude,
                longitude: marker.event.location.longitude
              }} 
              onPress={() => this.markerClick(marker)}
            />
          );
        })} 
        </MapView>
      )
  }
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
