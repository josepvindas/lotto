import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'native-base';

import Dashboard from '../screens/Dashboard';
import User from '../screens/User';
import History from '../screens/History';

export default createMaterialBottomTabNavigator(
  {
    History: {
      screen: History,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-bookmarks' style={{ color: tintColor }} />
        )
      }
    },
    Home: {
      screen: Dashboard,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-home' style={{ color: tintColor }} />
        )
      }
    },
    Settings: {
      screen: User,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-person' style={{ color: tintColor }} />
        )
      }
    }
  },
  {
    initialRouteName: 'Home',
    activeColor: '#fff2f2',
    labeled: false,
    inactiveColor: '#700000',
    barStyle: { backgroundColor: '#FE0000', height: 45 }
  }
);
