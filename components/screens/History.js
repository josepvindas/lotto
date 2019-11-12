import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';

import Styles from '../config/Styles';
import Strings from '../config/Strings';

export default class History extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.title}> HISTORIAL </Text>
      </View>
    );
  }
}
