import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';

import Styles from '../config/Styles';
import Strings from '../config/Strings';

export default class Settings extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <>
        <Header
          centerComponent={{
            text: Strings.user_title,
            style: Styles.title_intro
          }}
          containerStyle={Styles.header}
        />
        <View style={Styles.container}>
          <Text style={Styles.title}> CONFIGURACIONES </Text>
        </View>
      </>
    );
  }
}
