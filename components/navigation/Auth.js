import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

export default createStackNavigator(
  {
    Login: Login,
    SignUp: SignUp
  },
  { initialRouteName: 'Login' }
);
