import React from 'react';
import { ToastAndroid, Platform, StatusBar, ScrollView, StyleSheet, Image, View, TextInput, Text, Button, TouchableOpacity } from 'react-native';
import{StackNavigator} from 'react-navigation';
import * as constants from '../App';
import * as firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {Alert} from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  async login(username, password) {
    
    try {
        await firebase.auth()
            .signInWithEmailAndPassword(username, password);

        console.log("Logged In!");
        //Example of Toast below
        ToastAndroid.showWithGravity("Login Successful!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        Actions.main();
        // Navigate to the Home page

    } catch (error) {
        console.log(error.toString())
        //ToastAndroid.showWithGravity("Incorrect Username or Password", ToastAndroid.LONG, ToastAndroid.BOTTOM);
        Alert.alert(
          'Incorrect Username or Password', '',
          [ {text: 'OK', onPress: () => console.log('OK Pressed')}, ],
          {cancelable: false},
        );
      }

}

state = {
  username: '',
  password: ''
}
  
  register() {
    Actions.register()
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
            <Text style={styles.header}>Login</Text>    
            <TextInput
            style={styles.loginItems}
            placeholder="Email"
            onChangeText={(text) => this.setState({username: text})}
            />
            <TextInput
            style={styles.loginItems}
            placeholder="Password"
            secureTextEntry={true}
            password={true}
            onChangeText={(text1) => this.setState({password: text1})}
            
            />
            <Button
            title="Login"
            style={styles.loginBtn}
            color="#a9435b"
            onPress={() => this.login(this.state.username,this.state.password)}
            />
            <TouchableOpacity 
            style={styles.regHere} 
            onPress={this.register}>
              <Text>Don't have an account? Register here!</Text>
            </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 45,
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
  loginBtn:{
    marginTop: 10,
    borderWidth: 3    
  },
  regHere:{
    marginTop: 20,
  }
});
