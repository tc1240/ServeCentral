import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator, TabBarBottom } from 'react-navigation-tabs';
import * as firebase from 'firebase';
import Colors from '../constants/Colors';

import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EventsScreen from '../screens/EventsScreen';

export default createBottomTabNavigator(
  {
    Profile: {
      screen: ProfileScreen,
    },
    Map: {
      screen: MapScreen,
    },
    Events: {
      screen: EventsScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Profile':
            iconName =
              Platform.OS === 'ios'
                ? `ios-person${focused ? '' : '-outline'}`
                : 'md-person';
            break;
          case 'Map': 
            iconName = Platform.OS === 'ios' ? `ios-globe${focused ? '' : '-outline'}` : 'md-globe';
            break;
          case 'Events':
            iconName =
              Platform.OS === 'ios' ? `ios-hammer${focused ? '' : '-outline'}` : 'md-hammer';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3, width: 25 }}
            color={focused ? Colors.orange : Colors.tan}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarOptions: {activeBackgroundColor: Colors.maroon, inactiveBackgroundColor: Colors.maroon, labelStyle: {color: Colors.tan}},
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
