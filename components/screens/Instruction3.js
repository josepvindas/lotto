import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import { Icon } from 'native-base';
import ActionButton from 'react-native-action-button';

import Colors from '../config/Colors';
import Styles from '../config/Styles';
import Strings from '../config/Strings';

export default class Instruction3 extends Component {
  static navigationOptions = {
    header: null
  };

  // Save data to local storage
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('firstTime', 'no');
    } catch (error) {
      console.log('Error' + error);
    }
  };

  endTutorial = () => {
    this._storeData().then(() => {
      this.props.navigation.navigate('Auth');
    });
  };

  render() {
    return (
      <View style={Styles.container_intro}>
        <Text style={Styles.title_intro}> {Strings.instruction_3_title} </Text>
        <Text style={Styles.instruction_message}>
          {Strings.instruction_3_message}
        </Text>
        <Image
          style={Styles.logo}
          source={require('../../assets/instruction_3.png')}
        />
        <ActionButton
          buttonColor={Colors.primary_light}
          buttonTextStyle={Styles.title}
          position='center'
          icon={<Icon name='md-checkmark' style={Styles.actionButtonIcon} />}
          onPress={() => {
            this.endTutorial();
          }}
        ></ActionButton>
      </View>
    );
  }
}
