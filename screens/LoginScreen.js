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
  
  register() {
    Actions.register()
  }
  goToMain() {
    Actions.main()
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
            onChangeText={(text) => this.setState({text})}
            value={this.state}
            placeholder="Username"
            />
            <TextInput
            style={styles.loginItems}
            onChangeText={(text) => this.setState({text})}
            value={this.state}
            placeholder="Password"
            secureTextEntry={true}
            />
            <Button
            title="Login"
            style={{
              borderWidth: 3,
              backgroundColor: 'blue'
            }}
            onPress={this.goToMain}
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
