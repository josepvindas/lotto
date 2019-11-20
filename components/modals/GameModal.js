import { Icon } from 'native-base';
import { AsyncStorage, Text, TextInput, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modalbox';
import React, { Component } from 'react';

import Colors from '../config/Colors';
import Strings from '../config/Strings';
import Styles from '../config/Styles';

export default class GameModal extends Component {
  // Constructor fot the modal
  constructor(props) {
    super(props);

    this.state = {
      amount: '',
      number: '',
      show: false,
      user: {}
    };
  }

  // Show the modal on screen
  show = () => {
    this.setState({ amount: '' });
    this.setState({ number: '' });
    this.myModal.open();
  };

  // Retrieve current user from Async storage
  getUser = async () => {
    const temp = await AsyncStorage.getItem('user');
    console.log(temp);
    const user = JSON.parse(temp);
    console.log(user);
    this.setState({ user });
  };

  // Save Transaction to database
  transaction = () => {
    this.getUser().then(() => {
      // Get current DateTime and format to match backend
      var today = new Date();
      var date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      var time =
        today.getHours() +
        ':' +
        today.getMinutes() +
        ':' +
        today.getSeconds() +
        '.' +
        today.getMilliseconds();
      var curr = date + 'T' + time + 'Z';

      // Verify amount is not higher than the max play value.
      if (
        parseInt(this.state.amount, 10) >
        this.props.parentComponent.state.current_game.max_play
      ) {
        alert(Strings.max_play_alert);
        return;
      }

      // Verify amount is not higher than user credit
      if (parseInt(this.state.amount, 10) > this.state.user.credit) {
        alert(Strings.user_credit_alert);
        return;
      }

      // Verify number is valid
      if (
        parseInt(this.state.number, 10) < 1 ||
        parseInt(this.state.number, 10) > 100
      ) {
        alert(Strings.invalid_number_alert);
        return;
      }

      // Save transaction to database
      const uri = 'https://lotto-back.herokuapp.com' + '/transactions';
      return fetch(uri, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.props.parentComponent.state.token
        },
        body: JSON.stringify({
          value: parseInt(this.state.amount, 10),
          number: parseInt(this.state.number, 10),
          type: 1,
          date: curr,
          user: this.state.user.id,
          game: this.props.parentComponent.state.current_game.id
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error) {
            console.log('Error');
          } else {
            const deduction =
              this.state.user.credit - parseInt(this.state.amount, 10);
            this.saveCredit(deduction);
          }
        })
        .catch(err => {
          console.log('error');
          console.log(err);
        });
    });
  };

  // Save data to local storage
  _storeData = async user => {
    try {
      await AsyncStorage.setItem('user', user);
    } catch (error) {
      console.log('Error' + error);
    }
  };

  // Deduct user Credit
  saveCredit = amount => {
    this.getUser().then(() => {
      const uri =
        'https://lotto-back.herokuapp.com' + '/users/' + this.state.user.id;
      return fetch(uri, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.props.parentComponent.state.token
        },
        body: JSON.stringify({
          credit: amount
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error) {
            console.log('Error');
            console.log(uri);
            console.log(responseJson);
          } else {
            this._storeData(JSON.stringify(responseJson)).then(() => {
              this.myModal.close();
            });
          }
        })
        .catch(err => {
          console.log('error');
          console.log(err);
        });
    });
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
        <View style={Styles.modal_body}>
          <Text style={Styles.modal_title}>
            {' '}
            {this.props.parentComponent.state.current_game.category.name}{' '}
          </Text>
          <Text style={Styles.modal_text}>
            {' '}
            {'Ubicacion: ' +
              this.props.parentComponent.state.current_game.location.name}{' '}
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

        <TextInput
          placeholder={Strings.number_placeholder}
          placeholderTextColor='rgba(0,0,0,0.7)'
          style={Styles.modal_input}
          onSubmitEditing={() => this.amountInput.focus()}
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='numeric'
          ref={el => {
            this.numberInput = el;
          }}
          onChangeText={number => this.setState({ number })}
          value={this.state.number}
        />
        <TextInput
          placeholder={Strings.amount_placeholder}
          placeholderTextColor='rgba(0,0,0,0.7)'
          style={Styles.modal_input}
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='numeric'
          ref={el => {
            this.amountInput = el;
          }}
          onChangeText={amount => this.setState({ amount })}
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
            if (this.state.amount != '' && this.state.number != '') {
              this.transaction();
            } else {
              alert('Los campos no pueden estar vacios');
            }
          }}
        ></ActionButton>
      </Modal>
    );
  }
}
