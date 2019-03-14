import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import AcctManagementScreen from '../screens/AcctManagementScreen';
import EventInfoScreen from '../screens/EventInfoScreen';
import EventsScreen from '../screens/EventsScreen';
import LoginScreen from '../screens/LoginScreen';
import MapScreen from '../screens/MapScreen';
import ProfileAchievementScreen from '../screens/ProfileAchievementScreen';
import ProfileHistoryScreen from '../screens/ProfileHistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';

it('renders the Account Management screen correctly', async () => {
    const tree = renderer.create(<AcctManagementScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders the Event Info screen correctly', async () => {
    const tree = renderer.create(<EventInfoScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders the Events Screen correctly', async () => {
    const tree = renderer.create(<EventsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders the Login screen correctly', async () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders the Map screen correctly', async () => {
    const tree = renderer.create(<MapScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders the Profile Achievement screen correctly', async () => {
    const tree = renderer.create(<ProfileAchievementScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders the Profile History screen correctly', async () => {
    const tree = renderer.create(<ProfileHistoryScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders the Profile landing screen correctly', async () => {
    const tree = renderer.create(<ProfileScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders the Register screen correctly', async () => {
    const tree = renderer.create(<RegisterScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});