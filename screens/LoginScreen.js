import React from 'react';
import { ScrollView, StyleSheet, Image, View, TextInput,Text,Button,TouchableOpacity } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import{StackNavigator} from 'react-navigation';

import * as firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  async login(username, password) {
    
    try {
        await firebase.auth()
            .signInWithEmailAndPassword(username, password);

        console.log("Logged In!");
        Actions.main();
        // Navigate to the Home page

    } catch (error) {
        console.log(error.toString())
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
    const { navigate } = this.props.navigation;
    return (
      
      <View style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.imageStyle}
            />          
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
            style={{
              borderWidth: 3,
              backgroundColor: 'blue'
            }}
            onPress={() => this.login(this.state.username,this.state.password)}
            />
            <TouchableOpacity onPress={this.register}><Text>Don't have an account? Register!</Text></TouchableOpacity>
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
    width: 50,
    height: 50,
    resizeMode: 'contain'
  }
});
