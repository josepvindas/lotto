import React, { Component } from 'react';
import {
  AsyncStorage,
  Image,
  View,
  Text,
  TextInput,
  ToastAndroid,
  KeyboardAvoidingView
} from 'react-native';
import { Header } from 'react-native-elements';
import { Icon, Button } from 'native-base';

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
      password: ''
    };
  }

  // Save data to local storage
  _storeData = async token => {
    try {
      await AsyncStorage.setItem('username', this.state.username);
      console.log('Saved username to local storage: ' + this.state.username);
      await AsyncStorage.setItem('token', token);
      console.log('Saved jwt token to local storage: ' + token);
    } catch (error) {
      console.log('Error' + error);
    }
  };

  // Signup the user
  login = () => {
    const uri = 'https://lotto-back.herokuapp.com' + '/auth/local';
    return fetch(uri, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier: this.state.username,
        password: this.state.password
      })
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
          const token = responseJson.jwt;
          this._storeData(token);
          this.props.navigation.navigate('App');
        }
      })
      .catch(err => {
        console.log('error');
        console.log(err);
      });
  };
  render() {
    return (
      <>
        <Header
          centerComponent={{
            text: Strings.login_title,
            style: Styles.title_intro
          }}
          rightComponent={
            <Icon
              name='md-add-circle'
              style={Styles.header_icon}
              onPress={() => {
                this.props.navigation.navigate('SignUp');
              }}
            />
          }
          containerStyle={Styles.header}
        />
        <KeyboardAvoidingView style={Styles.container} behavior='height'>
          <Image
            style={Styles.logo_sm}
            source={require('../../assets/logo.png')}
          />

          <View style={Styles.form_container}>
            <TextInput
              placeholder={Strings.username_placeholder}
              placeholderTextColor='rgba(0,0,0,0.7)'
              style={Styles.input}
              onSubmitEditing={() => this.emailInput.focus()}
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
              ref={input => (this.passwordInput = input)}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <Button style={Styles.button} onPress={() => this.login()}>
              <Text style={Styles.button_text}> {Strings.login_title} </Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </>
    );
  }
}
