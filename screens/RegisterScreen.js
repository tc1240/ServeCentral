import React from 'react';
import { ToastAndroid, ScrollView, StyleSheet, Image, View, TextInput,Text,Button,TouchableOpacity } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import{StackNavigator} from 'react-navigation';
import * as firebase from 'firebase';
import * as constants from '../App';
import {Actions} from 'react-native-router-flux';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
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
          serviceHours: 0,
          tags: {
            environmental: 0,
            social: 0,
            construction: 0,
            walk:0,
            fundraiser:0,
            ministry:0,
          }
        }
      )
        Actions.login();
        console.log("Account created");
        ToastAndroid.showWithGravity("Account Created!", ToastAndroid.LONG, ToastAndroid.BOTTOM);

        // Navigate to the Home page, the user is auto logged in

    } catch (error) {
        console.log(error.toString())
        ToastAndroid.showWithGravity("Be sure all fields are filled, your password is longer than 6 characters, and contains a number", ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }

  }
  login() {
    Actions.login()
  }

  
  render() {
    //const { navigate } = this.props.navigation;
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
            <Text style={styles.header}>Register</Text>    
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
            password={true}
            secureTextEntry={true}
            />
            <TextInput
            style={styles.loginItems}
            onChangeText={(text) => this.setState({text})}
            placeholder="Confirm Password"
            password={true}
            secureTextEntry={true}
            />
            <Button
            title="Register"
            style={styles.regBtn}
            color="#a9435b"
            onPress={() => this.signup(this.state.email,this.state.pass,this.state.first,this.state.last)}
            />
            <TouchableOpacity style={styles.regHere} onPress={this.login}><Text>Already have an account? Login!</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  header: {
    paddingTop: 10,
    color: '#333',
    fontSize: 25,
    textDecorationLine: "underline",
    fontWeight: "bold"
  },
  loginItems:{
    marginTop: 10,
    marginBottom: 10,
    height: 40, 
    width: 250
  },
  imageStyle:{
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  regBtn:{
    marginTop: 10,
    borderWidth: 3
  },
  regHere:{
    marginTop: 20,
  }
});
