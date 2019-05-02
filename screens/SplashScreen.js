import React from 'react';
import { StyleSheet, Image, View, Text, Button } from 'react-native';
import {Actions} from 'react-native-router-flux';
import colors from '../constants/Colors';
import Toast, {DURATION} from 'react-native-easy-toast';

export default class SplashScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    // Chooses a saying at random from tipOptions to display on the splash screen
    this.tipOptions = ["Serving those who Serve","Find your Niche", "Show off your achievements to your friends", "Be sure to check out your serving stats on the profile page!", "Get off your bum and serve", "Your community needs YOU", "How are you serving today?"];
    this.randomTip = Math.floor(Math.random() * this.tipOptions.length)
  }
  
  login() {
      Actions.login()
  }
  register() {
    Actions.register()
  }
  render() {
    //const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/icon1.png')}
        />     
        <Text style={styles.header}>{this.tipOptions[this.randomTip]}</Text>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        
        <Button
        title="Login"
        onPress={this.login}
        color={colors.maroon}
        />
        <Text style={styles.btnSpace}>{"\n"}</Text>
        <Button 
        title="Sign Up"
        color={colors.orange}
        onPress={this.register}/>
        <Toast ref="toast"/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tan,
    paddingTop: 125,
    alignItems: 'center'
  },
  header: {
    paddingTop: 10,
    color: '#000',
    fontSize: 20,
    fontStyle: "italic",
    width: 300,
    textAlign: 'center'
  },
  btnSpace: {
      height: 8,
  }
});
