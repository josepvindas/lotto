import React, { Component } from 'react';
import {
  AsyncStorage,
  Image,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from 'native-base';

import Styles from '../config/Styles';
import Strings from '../config/Strings';

export default class Login extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      confirm: '',
      name: ''
    };
  }

  // Save data to local storage
  _storeData = async (token, user) => {
    try {
      console.log(user);
      await AsyncStorage.setItem('username', this.state.username);
      console.log('Saved username to local storage: ' + this.state.username);
      await AsyncStorage.setItem('token', token);
      console.log('Saved jwt token to local storage: ' + token);
      await AsyncStorage.setItem('user', user);
    } catch (error) {
      console.log('Error' + error);
    }
  };

  // Signup the user
  signup = () => {
    if (this.state.password != this.state.confirm) {
      console.log('Error');
      console.log('Error');
      alert(Strings.mismatch_error);
    } else {
      const uri = 'https://lotto-back.herokuapp.com' + '/auth/local/register';
      return fetch(uri, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          email: this.state.username + '@mail.com',
          name: this.state.name,
          credit: 0
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error) {
            console.log('Error');
            /*    ToastAndroid.showWithGravityAndOffset(
              Strings.credential_error,
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              25,
              50
            );*/
            alert(Strings.credential_error);
          } else {
            const token = responseJson.jwt;

            this._storeData(token, JSON.stringify(responseJson.user)).then(
              () => {
                this.props.navigation.navigate('App');
              }
            );
          }
        })
        .catch(err => {
          console.log('error');
          console.log(err);
        });
    }
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
        <KeyboardAvoidingView style={Styles.container} behavior='height'>
          <Image
            style={Styles.logo_sm}
            source={require('../../assets/logo.png')}
          />

          <View style={Styles.form_container}>
            <TextInput
              placeholder={Strings.name_placeholder}
              placeholderTextColor='rgba(0,0,0,0.7)'
              style={Styles.input}
              onSubmitEditing={() => this.usernameInput.focus()}
              autoCapitalize='none'
              autoCorrect={false}
              ref={el => {
                this.nameInput = el;
              }}
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
            />

            <TextInput
              placeholder={Strings.username_placeholder}
              placeholderTextColor='rgba(0,0,0,0.7)'
              style={Styles.input}
              onSubmitEditing={() => this.passwordInput.focus()}
              autoCapitalize='none'
              autoCorrect={false}
              ref={el => {
                this.usernameInput = el;
              }}
              onChangeText={username => this.setState({ username })}
              value={this.state.username}
            />

            <TextInput
              placeholder={Strings.password_placeholder}
              placeholderTextColor='rgba(0,0,0,0.7)'
              secureTextEntry
              style={Styles.input}
              onSubmitEditing={() => this.confirmInput.focus()}
              autoCapitalize='none'
              autoCorrect={false}
              ref={el => {
                this.passwordInput = el;
              }}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />

            <TextInput
              placeholder={Strings.confirm_placeholder}
              placeholderTextColor='rgba(0,0,0,0.7)'
              secureTextEntry
              style={Styles.input}
              ref={input => (this.confirmInput = input)}
              onChangeText={confirm => this.setState({ confirm })}
              value={this.state.confirm}
            />
            <Button style={Styles.button} onPress={() => this.signup()}>
              <Text style={Styles.button_text}> {Strings.signup_title} </Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </>
    );
  }
}
