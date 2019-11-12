import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';

import Styles from '../config/Styles';
import Strings from '../config/Strings';

export default class Login extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={Styles.container}>
        <Image
          style={Styles.logo_sm}
          source={require('../../assets/logo.png')}
        />
        <Text style={Styles.title}> INICIAR SESION </Text>

        <Text style={Styles.primary_text}>
          {' '}
          blah blah blah blah blah blah aqui{' '}
        </Text>
      </View>
    );
  }
}
