import React, { Component } from 'react';
import { Text, TextInput, AsyncStorage, View } from 'react-native';
import Modal from 'react-native-modalbox';
import ActionButton from 'react-native-action-button';
import { Icon } from 'native-base';

import Styles from '../config/Styles';
import Colors from '../config/Colors';

export default class GameModal extends Component {
  // Constructor fot the modal
  constructor(props) {
    super(props);

    this.state = {
      amount: '',
      user: null,
      username: '',
      token: '',
      game: null,
      show: false
    };
  }

  // Show the modal on screen
  show = () => {
    this.setState({ show: true });
    this.myModal.open();
  };

  // Get current user
  getUser = () => {
    this.getToken().then(() => {
      const uri =
        'https://lotto-back.herokuapp.com' +
        '/users?username=' +
        this.state.username;
      return fetch(uri, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.state.token
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error) {
            console.log('Error');
            ToastAndroid.showWithGravityAndOffset(
              Strings.credential_error,
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              25,
              50
            );
          } else {
            console.log(responseJson);
            this.setState({ user: responseJson });
          }
        })
        .catch(err => {
          console.log('error');
          console.log(err);
        });
    });
  };

  // Save transaction
  transaction = () => {};

  // Deduct user Credit
  saveCredit = amount => {};

  //Get security token for requests
  getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({ token: token });
  };

  //Get username for requests
  getUsername = async () => {
    const username = await AsyncStorage.getItem('username');
    this.setState({ username: username });
  };

  // Render modal contents
  render() {
    return (
      <Modal
        ref={modal => (this.myModal = modal)}
        style={Styles.modal}
        position='center'
        backdrop={true}
      >
        {this.state.show ? (
          <View style={Styles.modal_body}>
            <Text style={Styles.modal_title}>
              {' '}
              {this.props.parentComponent.state.current_game.category.name}{' '}
            </Text>
            <Text style={Styles.modal_text}>
              {' '}
              {'Ubicacion: ' +
                this.props.parentComponent.state.current_game.location
                  .name}{' '}
            </Text>
            <Text style={Styles.modal_text}>
              {' '}
              {'Fecha: ' +
                this.props.parentComponent.state.current_game.date
                  .split('T')[0]
                  .split('-')[2] +
                '/' +
                this.props.parentComponent.state.current_game.date
                  .split('T')[0]
                  .split('-')[1] +
                '/' +
                this.props.parentComponent.state.current_game.date
                  .split('T')[0]
                  .split('-')[0]}{' '}
            </Text>
            <Text style={Styles.modal_text}>
              {' '}
              {'Hora: ' +
                this.props.parentComponent.state.current_game.date
                  .split('T')[1]
                  .split(':')[0] +
                ':' +
                this.props.parentComponent.state.current_game.date
                  .split('T')[1]
                  .split(':')[1]}{' '}
            </Text>

            <Text style={Styles.modal_text}>
              {' '}
              {'Apuesta Maxima: ' +
                this.props.parentComponent.state.current_game.max_play}{' '}
            </Text>
          </View>
        ) : (
          ''
        )}
        <TextInput
          style={Styles.modal_input}
          onChangeText={text => this.setState({ amount: text })}
          placeholder='Model Number'
          value={this.state.amount}
        />
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
          buttonColor={Colors.success}
          buttonTextStyle={Styles.title}
          position='right'
          icon={<Icon name='md-checkmark' style={Styles.modal_button} />}
          onPress={() => {
            this.myModal.close();
          }}
        ></ActionButton>
      </Modal>
    );
  }
}
