import React, { Component } from 'react';
import { View, Text, RefreshControl } from 'react-native';
import { Header } from 'react-native-elements';

import Styles from '../config/Styles';
import Strings from '../config/Strings';

export default class History extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <>
        <Header
          centerComponent={{
            text: Strings.signup_title,
            style: Styles.title_intro
          }}
          containerStyle={Styles.header}
        />
        <View style={Styles.container}>
          <Text style={Styles.title}> HISTORIAL </Text>
        </View>
      </>
    );
  }
}
