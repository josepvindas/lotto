import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Dashboard from '../screens/Dashboard';
import User from '../screens/User';

export default createStackNavigator(
  {
    Home: {
      screen: Dashboard
    },
    Profile: {
      screen: User
    }
  },
  {
    initialRouteName: 'Home'
  }
);
