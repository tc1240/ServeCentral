import React from 'react';
import { 
  Text, 
  View,
  Image,
  ScrollView, 
  StyleSheet 

} from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Image source={require('../assets/images/icon1.png')} style={styles.profPic} /> 
          <Text style={styles.username}>Rob Williams</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  profPic: {
    marginTop: 25,
    marginLeft: 25,
    width: 125,
    height: 125,
  },
  username: {
    marginLeft: 50,
  }
});
