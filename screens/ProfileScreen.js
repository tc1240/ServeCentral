import React from 'react';
import { 
  Text, 
  View,
  Image,
  ScrollView, 
  StyleSheet 

} from 'react-native';
import * as constants from '../App';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.profileRef = constants.firebaseApp.database().ref('Users/tcollins');
    this.state = {
      profileData: ''
    }
    this.profileRef.on('value', (snap) => {

      user = {
        email: snap.child('email').val(),
        name: snap.child('name').val(),
      };

      this.setState({
        profileData: user
      });

      console.log(this.state.profileData);
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Image source={require('../assets/images/icon1.png')} style={styles.profPic} /> 
          <Text style={styles.username}>{this.state.profileData.name}</Text>
          <Text style={styles.username}>{this.state.profileData.email}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  profPic: {
    marginTop: 25,
    marginLeft: 25,
    width: 125,
    height: 125,
  },
  username: {
    marginLeft: 50,
  }
});
