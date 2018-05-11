import React from 'react';
import { ScrollView, StyleSheet, Image, View, TextInput,Text,Button,TouchableOpacity } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import{StackNavigator} from 'react-navigation';
import * as firebase from 'firebase';

import {Actions} from 'react-native-router-flux';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };
  state = {
    emial: '',
    password: '',
    firstname: '',
    lastname: ''
  }
  async signup(e, pass, firstname, lastname) {

    try {
      console.log(e.toString());
      console.log(pass.toString());
      await firebase.auth().createUserWithEmailAndPassword(e, pass);
      var user = firebase.auth().currentUser.uid;
        firebase.database().ref('Users/'+user).set(
        {
          email: e,
          name: firstname + " " + lastname,
          serviceHours: 0

        }
      )
        Actions.login();
        console.log("Account created");

        // Navigate to the Home page, the user is auto logged in

    } catch (error) {
        console.log(error.toString())
    }

  }
  login() {
    Actions.login()
  }

  
  render() {
    const { navigate } = this.props.navigation;
    return (
      
      <View style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <Image
              source={
                __DEV__
                  ? require('../assets/images/icon1.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.imageStyle}
              
            />
            <TextInput
            style={styles.loginItems}
            onChangeText={(text) => this.setState({first:text})}
            placeholder="Firstname"
            />
            <TextInput
            style={styles.loginItems}
            onChangeText={(text) => this.setState({last:text})}
            placeholder="Lastname"
            />
            <TextInput
            style={styles.loginItems}
            onChangeText={(text1) => this.setState({email:text1})}
            placeholder="email"
            />
            <TextInput
            style={styles.loginItems}
            onChangeText={(text) => this.setState({pass:text})}
            placeholder="Password"
            />
            <TextInput
            style={styles.loginItems}
            onChangeText={(text) => this.setState({text})}
            placeholder="Confirm Password"
            />
            <Button
            title="Register"
            style={{
              borderWidth: 3,
              backgroundColor: 'blue'
            }}
            onPress={() => this.signup(this.state.email,this.state.pass,this.state.first,this.state.last)}
            />
            <TouchableOpacity onPress={this.login}><Text>Already have an account? Login!</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  loginItems:{
    marginTop: 10,
    marginBottom: 10,
    height: 40, 
    borderColor: 'gray', 
    borderBottomWidth: 3,
    width: 250
  },
  imageStyle:{
    width: 150,
    height: 150,
    resizeMode: 'contain'
  }
});
