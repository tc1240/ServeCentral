import React, {Component} from 'react';
import {Router,Stack,Scene} from 'react-native-router-flux';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AcctManagementScreen from '../screens/AcctManagementScreen';
import RootNavigation from '../navigation/RootNavigation';


export default class Routes extends React.Component {
    render(){
        return(
            <Router>
                <Stack key="root" hideNavBar={true}>
                    <Scene key="login" component={LoginScreen} initial={true}/>
                    <Scene key="register" component={RegisterScreen}/>
                    <Scene key="acctmanagement" component={AcctManagementScreen}/>
                    {/* Main Tab Navigation is the bottom bar navigation */}
                    <Scene key="main" component={RootNavigation}/>
                </Stack>
            </Router>
        )
    }
}