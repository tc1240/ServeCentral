import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EventsScreen from '../screens/EventsScreen';

export default TabNavigator(
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
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
