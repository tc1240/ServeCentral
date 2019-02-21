import React from 'react';
import { Keyboard, StyleSheet, Image, View, TextInput, Text, Button, TouchableOpacity } from 'react-native';
import{StackNavigator} from 'react-navigation';
import * as constants from '../App';
import * as firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import colors from '../constants/Colors';
import Toast, {DURATION} from 'react-native-easy-toast';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  async login(username, password) {
    
    Keyboard.dismiss();
    try {
        await firebase.auth()
            .signInWithEmailAndPassword(username, password);

        console.log("Logged In!");
        //Example of Toast below
        this.refs.toast.show('Login Successful!', 1500);

        Actions.main();
        // Navigate to the Home page

    } catch (error) {
        console.log(error.toString())

        this.refs.toast.show('Incorrect Username or Password', 1500);
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
              source={require('../assets/images/icon1.png')}
              style={styles.imageStyle}
            />      
            <Text style={styles.header}>Login</Text>    
            <TextInput
            style={styles.loginItems}
            placeholder="Email"
            autoCapitalize={"none"}
            placeholderTextColor={colors.maroon}
            onChangeText={(text) => this.setState({username: text})}
            />
            <TextInput
            style={styles.loginItems}
            placeholder="Password"
            secureTextEntry={true}
            password={true}
            autoCapitalize={"none"}
            placeholderTextColor={colors.maroon}
            onChangeText={(text1) => this.setState({password: text1})}
            
            />
            <Button
            title="Login"
            style={styles.loginBtn}
            color={colors.maroon}
            onPress={() => this.login(this.state.username,this.state.password)}
            />
            <TouchableOpacity 
            style={styles.regHere} 
            onPress={this.register}>
              <Text>Don't have an account? Register here!</Text>
            </TouchableOpacity>
            <Toast ref="toast"/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tan,
    paddingTop: 45,
    alignItems: 'center'
  },
  header: {
    paddingTop: 10,
    color: '#000',
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
