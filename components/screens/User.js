import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';

import Styles from '../config/Styles';
import Strings from '../config/Strings';

export default class Settings extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.title}> CONFIGURACIONES </Text>
      </View>
    );
  }
}
