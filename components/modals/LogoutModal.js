import { Icon } from 'native-base';
import { AsyncStorage, Text, TextInput, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modalbox';
import React, { Component } from 'react';

import Colors from '../config/Colors';
import Strings from '../config/Strings';
import Styles from '../config/Styles';

export default class LogoutModal extends Component {
  // Constructor fot the modal
  constructor(props) {
    super(props);
  }

  // Show the modal on screen
  show = () => {
    this.myModal.open();
  };

  // Clear all items from local Storage, with the exception of the first time key, as
  // a logout doesn't void the this.
  _removeItems = async () => {
    try {
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.log(error);
    }
  };

  // Clear all local storage for development purposes
  clear = async () => {
    try {
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('firstTime');
    } catch (error) {
      console.log(error);
    }
  };
  logout = () => {
    this._removeItems().then(() => {
      this.props.parentComponent.props.navigation.navigate('Auth');
      this.myModal.close();
    });
  };

  clearAll = () => {
    this.clear().then(() => {
      this.props.parentComponent.props.navigation.navigate('Intro');
      this.myModal.close();
    });
  };
  // Render modal contents
  render() {
    return (
      <Modal
        ref={modal => (this.myModal = modal)}
        style={Styles.modal_logout}
        position='center'
        backdrop={true}
      >
        <View style={Styles.modal_body}>
          <Text style={Styles.modal_title}> {Strings.logout_title}</Text>
          <Text style={Styles.modal_text}>{Strings.logout_message}</Text>
        </View>

        <ActionButton
          buttonColor={Colors.danger}
          buttonTextStyle={Styles.title}
          position='left'
          icon={<Icon name='md-close' style={Styles.modal_button} />}
          onPress={() => {
            this.myModal.close();
          }}
        ></ActionButton>
        <ActionButton
          buttonColor={Colors.congratulations}
          buttonTextStyle={Styles.title}
          position='center'
          icon={<Icon name='md-settings' style={Styles.modal_button} />}
          onPress={() => {
            this.clearAll();
          }}
        ></ActionButton>
        <ActionButton
          buttonColor={Colors.success}
          buttonTextStyle={Styles.title}
          position='right'
          icon={<Icon name='md-checkmark' style={Styles.modal_button} />}
          onPress={() => {
            this.logout();
          }}
        ></ActionButton>
      </Modal>
    );
  }
}
