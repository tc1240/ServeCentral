import React, { Component } from 'react';
import { Form, StyleSheet, Image, View, TextInput,Text,Button,TouchableOpacity } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import{StackNavigator} from 'react-navigation';
import * as firebase from 'firebase';
import * as constants from '../App';
import {Actions} from 'react-native-router-flux';
import colors from '../constants/Colors';
import Toast, {DURATION} from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    errors: [],
    errorsString: '',
  };
  async signup(e, pass, firstname, lastname, cpass) {

    try {

      this.validate(e, pass, firstname, lastname, cpass);
      if(this.state.errors.length > 0){
        
        console.log(this.state.errors);
        var i;
        for(i = 0; i < this.state.errors.length; i++){
          if(i == this.state.errors.length - 1) {
            this.state.errorsString += this.state.errors[i];
          } else {
            this.state.errorsString += this.state.errors[i] + "\n";
          }
        }
        this.state.errors = [];

        console.log(this.state.errorsString);
        this.refs.toast.show(this.state.errorsString, 2000);
        this.state.errorsString = '';
        return;
      }

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
        this.refs.toast.show('Account Created!', 1500);

        // Navigate to the Home page, the user is auto logged in

    } catch (error) {
        console.log(error.toString())
        this.refs.toast.show("Oops! That was an unexpected error!", 2000);
    }
  }
  login() {
    Actions.login()
  }

  validate(email, password, firstname, lastname, cpass){

    if(firstname == null){
      this.state.errors.push("Fill out First Name. ");
    }
    if(lastname == null){
      this.state.errors.push("Fill out Last Name. ");
    }

    if(password == null){
      this.state.errors.push("Your password must be 6 characters ");
    } else if(String(password).length < 6){
      this.state.errors.push("Your password must be 6 characters ");
    }
    
    var hasNumber = /\d/;
    var emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!hasNumber.test(String(password))){
      this.state.errors.push("Your password must contain a number ");
    }

    if(cpass != null){
      if(cpass != password){
        this.state.errors.push("Your passwords do not match. ");
      }
    } else {
      this.state.errors.push("Please confirm your password")
    }

    if(email == null){
      this.state.errors.push("Please enter an email.");
    } else if (!emailTest.test(String(email))){
      this.state.errors.push("Please enter a valid email address ");
    }
  };
  
  render() {
    //const { navigate } = this.props.navigation;
    return (
      
      <KeyboardAwareScrollView style={styles.scrollView}> 
      <View style={styles.container}>
      
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
           
           
        <Image
              source={require('../assets/images/icon1.png')}
              style={styles.imageStyle}              
            />
            
            <Text style={styles.header}>Register</Text>  
              <TextInput
              style={styles.loginItems}
              onChangeText={(text) => this.setState({first:text})}
              placeholder="Firstname"
              placeholderTextColor={colors.maroon}
              onSubmitEditing={() => { this.lastName.focus(); }}
              />
              <TextInput
              style={styles.loginItems}
              onChangeText={(text) => this.setState({last:text})}
              placeholder="Lastname"
              ref={(input) => { this.lastName = input; }}
              onSubmitEditing={() => { this.email.focus(); }}
              placeholderTextColor={colors.maroon}
              />
              <TextInput
              style={styles.loginItems}
              onChangeText={(text1) => this.setState({email:text1})}
              placeholder="Email"
              ref={(input) => { this.email = input; }}
              onSubmitEditing={() => { this.password.focus(); }}
              placeholderTextColor={colors.maroon}
              />
              <TextInput
              style={styles.loginItems}
              onChangeText={(text) => this.setState({pass:text})}
              placeholder="Password"
              password={true}
              secureTextEntry={true}
              placeholderTextColor={colors.maroon}
              ref={(input) => { this.password = input; }}
              onSubmitEditing={() => { this.confirmPassword.focus(); }}
              />
              <TextInput
              style={styles.loginItems}
              onChangeText={(text) => this.setState({cpass:text})}
              placeholder="Confirm Password"
              password={true}
              placeholderTextColor={colors.maroon}
              secureTextEntry={true}
              ref={(input) => { this.confirmPassword = input; }}
              />
              <Button
              title="Register"
              style={styles.regBtn}
              color="#a9435b"
              onPress={() => this.signup(this.state.email,this.state.pass,this.state.first,this.state.last, this.state.cpass)}
              />
            <TouchableOpacity style={styles.regHere} onPress={this.login}><Text>Already have an account? Login!</Text></TouchableOpacity>
            {/*This is needed for the toast */}
            <Toast ref="toast"/>
            </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView:{
    display: 'flex',
    backgroundColor: colors.tan
  },
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: colors.tan,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
  regBtn:{
    marginTop: 10,
    borderWidth: 3
  },
  regHere:{
    marginTop: 20,
  },

});
