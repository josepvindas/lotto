import { createStackNavigator } from 'react-navigation-stack';

import Intro from '../screens/Intro';
import Instruction1 from '../screens/Instruction1';
import Instruction2 from '../screens/Instruction2';
import Instruction3 from '../screens/Instruction3';

export default createStackNavigator(
  {
    Intro: Intro,
    Instruction1: Instruction1,
    Instruction2: Instruction2,
    Instruction3: Instruction3
  },
  { initialRouteName: 'Intro' }
);
