import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import { Icon } from 'native-base';
import ActionButton from 'react-native-action-button';

import Colors from '../config/Colors';
import Styles from '../config/Styles';
import Strings from '../config/Strings';

export default class Intro extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={Styles.container_intro}>
        <Text style={Styles.title_intro}> {Strings.welcome_title} </Text>
        <Text style={Styles.instruction_message}>
          {' '}
          {Strings.welcome_message}{' '}
        </Text>
        <Image
          style={Styles.logo}
          source={require('../../assets/logo_light.png')}
        />
        <ActionButton
          buttonColor={Colors.primary_light}
          buttonTextStyle={Styles.title}
          position='center'
          icon={
            <Icon name='md-arrow-forward' style={Styles.actionButtonIcon} />
          }
          onPress={() => {
            this.props.navigation.navigate('Instruction1');
          }}
        ></ActionButton>
      </View>
    );
  }
}
