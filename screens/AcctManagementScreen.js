import React, { Component } from 'react';
import { Form, StyleSheet, Image, View, TextInput,Text,Button, CheckBox ,Keyboard } from 'react-native';
import * as firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import colors from '../constants/Colors';
import Toast, {DURATION} from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class AcctManagementScreen extends React.Component {
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: colors.maroon
    }
  };
  state = {
    email: '',
    password: '',
    fullname: '',
    homeloc: '',
    errors: [],
    errorsString: '',
  };
  async edit(e, pass, fullname, cpass, homeloc) {

    try {
      Keyboard.dismiss();

      // Validates the fields by returning an error if failed
      this.validate(e, pass, fullname, cpass, homeloc);
      
      // Error stuff
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

      var user = firebase.auth().currentUser;

      // This string of if statements checks to see if each field is empty or filled as this page has
      //    optional fields. If it is empty it simply doesn't update the field in firebase
      if(e != ''){
        user.updateEmail(e)
        firebase.database().ref('Users/'+user.uid).update(
          {
            email: e,
          }
        )
      }
      if(fullname != ''){
        //user.updateProfile(fullname)
        firebase.database().ref('Users/'+user.uid).update(
          {
            name: fullname,
          }
        )
      }
      if(homeloc != ''){
        firebase.database().ref('Users/'+user.uid).update(
          {
            homeloc: homeloc,
          }  
        )
      }
      if(pass != null){
        user.updatePassword(pass)
      }

      // Bring user back to profile page
      Actions.main();
      console.log("Account Updated");
      this.refs.toast.show('Account Updated!', 1500);

    } catch (error) {
        console.log(error.toString())
        this.refs.toast.show("Oops! That was an unexpected error!", 2000);
    }
  }

  // Makes sure all fields entered meet the requirements for the specified field
  validate(email, password, fullname, cpass, homeloc){
    // If a new password was attempted
    if(password != null){
      // Password checks:
      if(String(password).length < 6){
        this.state.errors.push("Your password must be at least 6 characters ");
      }
      var hasNumber = /\d/;
      if(!hasNumber.test(String(password))){
        this.state.errors.push("Your password must contain a number ");
      }

      if(cpass != ''){
        if(cpass != password){
          this.state.errors.push("Your passwords do not match. ");
        }
      } else if(password != ''){
        this.state.errors.push("Please confirm your password")
      }
    }
    
    // If email is entered make sure its a valid email address
    if(email != ''){
      var emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailTest.test(String(email))){
        this.state.errors.push("Please enter a valid email address ");
      }
    }

    // If first name is entered the last must be entered too    
    if(fullname == ''){
      // check for space for first and last
    }

    // If home location is entered make sure it is a valid address
    console.log("Homeloc equals: "+homeloc+" :")
    if(homeloc != ''){
      var addressTest = /^\s*\S+(?:\s+\S+){2}/
      if(!addressTest.test(String(homeloc))){
        this.state.errors.push("Please enter a valid home address")
      }
    }
  };
  
  render() {
    //const { navigate } = this.props.navigation;
    return (
      
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={200} style={styles.scrollView}> 
      <View style={styles.container}>           
           
           <Image
             source={require('../assets/images/profPic.png')}
             style={styles.imageStyle}              
           />
           
           <Text style={styles.header}>Account Management</Text>
           <Text style={styles.textOptional}>*All fields are optional</Text>
           <Text>{"\n"}</Text>
           <Text>Change Email</Text>
           <TextInput
             style={styles.updateItems}
             onChangeText={(text) => this.setState({email:text})}
             placeholder="New Email"
             autoCapitalize={"none"}
             ref={(input) => { this.email = input; }}
             onSubmitEditing={() => { this.fullname.focus(); }}
             placeholderTextColor={colors.maroon}
           /> 
           <Text>{"\n"}</Text>
           <Text>Change Display Name</Text>
           <TextInput
             style={styles.updateItems}
             onChangeText={(text) => this.setState({fullname:text})}
             placeholder="New Full Name"
             ref={(input) => { this.fullname = input; }}
             placeholderTextColor={colors.maroon}
             onSubmitEditing={() => { this.password.focus(); }}
           />
           <Text>{"\n"}</Text>
           <Text>Change Password</Text>
           <TextInput
             style={styles.updateItems}
             onChangeText={(text) => this.setState({pass:text})}
             placeholder="New Password"
             autoCapitalize={"none"}
             password={true}
             secureTextEntry={true}
             placeholderTextColor={colors.maroon}
             ref={(input) => { this.password = input; }}
             onSubmitEditing={() => { this.confirmPassword.focus(); }}
           />
           <TextInput
             style={styles.updateItems}
             onChangeText={(text) => this.setState({cpass:text})}
             placeholder="Confirm New Password"
             autoCapitalize={"none"}
             password={true}
             placeholderTextColor={colors.maroon}
             secureTextEntry={true}
             ref={(input) => { this.confirmPassword = input; }}
             onSubmitEditing={() => { this.homeloc.focus(); }}
           />
           <Text>{"\n"}</Text>
           <Text>Change Home Location</Text>
           <TextInput
             style={styles.updateItems}
             onChangeText={(text) => this.setState({homeloc:text.trim()})}
             placeholder="New Home Location"
             placeholderTextColor={colors.maroon}
             ref={(input) => { this.homeloc = input; }}
           />
           <Text>{"\n"}</Text>
           <Button
             title="Confirm Changes"
             style={styles.regBtn}
             color="#a9435b"
             onPress={() => this.edit(this.state.email,this.state.pass,this.state.fullname, this.state.cpass, this.state.homeloc)}
           />
           <Text>{"\n"}</Text>
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
  textOptional: {
    color: colors.maroon
  },
  updateItems:{
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
