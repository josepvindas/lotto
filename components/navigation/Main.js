import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import App from './App';
import Auth from './Auth';
import Intro from './Intro';
import Switcher from '../screens/Switcher';

export default createAppContainer(
  createSwitchNavigator(
    {
      Switcher: Switcher,
      App: App,
      Auth: Auth,
      Intro: Intro
    },
    {
      initialRouteName: 'Switcher'
    }
  )
);
