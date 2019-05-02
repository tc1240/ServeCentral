import React, { Component } from 'react';
import { StyleSheet, Image, View, TextInput,Text,Button, CheckBox ,Keyboard } from 'react-native';
import * as firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import colors from '../constants/Colors';
import Toast from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class EventAddScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Event',
    headerStyle: {
      backgroundColor: colors.maroon
    }
  };
  state = {
    email: '',
    password: '',
    title: '',
    description: '',
    errors: [],
    errorsString: '',
  };
  async edit(title, email, date, description) {

    try {
      Keyboard.dismiss();

        // Validates the fields by returning an error if failed
        this.validate(title, email, date, description);

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

        // If any event field is empty it simply doesn't update the field in firebase
        firebase.database().ref('UnregisteredEvents/').push(
            {
                email: email,
                date: date,
                title: title,
                description: description,
                contacted: false
            }
        )

        // Bring user back to maps page
        Actions.main();
        console.log("Event Added");
        this.refs.toast.show('Check your email for confirmation', 1500);

    } catch (error) {
        console.log(error.toString())
        this.refs.toast.show("Oops! That was an unexpected error!", 2000);
    }
  }

  // Makes sure all fields entered meet the requirements for the specified field
  validate(title, email, date, description){
    if(email != '' && date != '' && description != '' && title != ''){
        // If email is entered make sure its a valid email address
        if(email != ''){
            var emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailTest.test(String(email))){
                this.state.errors.push("Please enter a valid email address ");
            }
        }
    } else {
        this.state.errors.push("Please fill out all fields");
    }
  };

  render() {
    //const { navigate } = this.props.navigation;
    return (
      
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={200} style={styles.scrollView}> 
      <View style={styles.container}>           
           
           <Text style={styles.header}>Add Event</Text>
           <Text>{"\n"}</Text>
           <Text>Event Title</Text>
           <TextInput
             style={styles.updateItems}
             onChangeText={(text) => this.setState({title:text})}
             placeholder="Service Day"
             ref={(input) => { this.title = input; }}
             onSubmitEditing={() => { this.email.focus(); }}
             placeholderTextColor={colors.maroon}
           /> 
           <Text>{"\n"}</Text>
           <Text>Coordinator Email</Text>
           <TextInput
             style={styles.updateItems}
             onChangeText={(text) => this.setState({email:text})}
             placeholder="example@test.com"
             autoCapitalize={"none"}
             ref={(input) => { this.email = input; }}
             onSubmitEditing={() => { this.date.focus(); }}
             placeholderTextColor={colors.maroon}
           /> 
           <Text>{"\n"}</Text>
           <Text>Event Date</Text>
           <TextInput
             style={styles.updateItems}
             onChangeText={(text) => this.setState({date:text.trim()})}
             placeholder="MM/DD/YYYY"
             placeholderTextColor={colors.maroon}
             ref={(input) => { this.date = input; }}
             onSubmitEditing={() => { this.description.focus(); }}
           />
           <Text>{"\n"}</Text>
           <Text>Event Description</Text>
           <TextInput
             style={styles.updateItems}
             onChangeText={(text) => this.setState({description:text})}
             placeholder="Description here..."
             multiline={true}
             numberOfLines = {4}
             ref={(input) => { this.description = input; }}
             placeholderTextColor={colors.maroon}
           />
           <Text>{"\n"}</Text>
           <Button
             title="Confirm Changes"
             style={styles.regBtn}
             color="#a9435b"
             onPress={() => this.edit(this.state.title,this.state.email,this.state.date, this.state.description)}
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
