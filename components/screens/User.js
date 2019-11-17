import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  RefreshControl,
  FlatList,
  ScrollView,
  Text,
  View
} from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from 'native-base';

import Strings from '../config/Strings';
import Styles from '../config/Styles';

export default class Settings extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      transactions: [],
      loading: true,
      refreshing: false,
      token: ''
    };
  }

  logout = () => {};

  // Retrieve current user from Async storage
  getUser = async () => {
    const temp = await AsyncStorage.getItem('user');
    console.log(temp);
    const user = JSON.parse(temp);
    console.log(user);
    this.setState({ user });
  };

  // refresh transaction list
  _onRefresh() {
    this.setState({ refreshing: true });
    this.getUser().then(() => {
      this.fetchData();
    });
  }

  // retrieve user token
  getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({ token: token });
  };

  // fetch Data for the transaction list
  fetchData = () => {
    console.log('Fetching data');
    this.getToken().then(() => {
      const uri =
        'https://lotto-back.herokuapp.com' +
        '/transactions?user.username=' +
        this.state.user.username;
      console.log('The token is: ' + this.state.token);
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
          } else {
            console.log(responseJson);
            this.setState({ transactions: responseJson });
            this.setState({ loading: false });
            this.setState({ refreshing: false });
          }
        })
        .catch(err => {
          console.log('error');
          console.log(err);
        });
    });
  };

  componentDidMount() {
    this.getUser().then(() => {
      this.fetchData();
    });
  }
  render() {
    const items = this.state.transactions.reverse().map(transaction => (
      <View
        style={
          transaction.type == 1
            ? Styles.transaction_deduction
            : transaction.type == 2
            ? Styles.transaction_earning
            : Styles.transaction_prize
        }
        key={transaction.id}
      >
        <Text style={Styles.transaction_date}>
          {' '}
          {transaction.date.split('T')[0].split('-')[2] +
            '/' +
            transaction.date.split('T')[0].split('-')[1] +
            '/' +
            transaction.date.split('T')[0].split('-')[0]}{' '}
        </Text>
        <Text style={Styles.transaction_type}>
          {transaction.type == 1
            ? 'Juego'
            : transaction.type == 2
            ? 'Recarga'
            : 'Premio'}
        </Text>
        <Text style={Styles.transaction_identifier}>
          {transaction.type == 2 ? transaction.location.name : ''}
        </Text>
        <Text style={Styles.transaction_amount}>
          {transaction.type == 1
            ? '-' + transaction.value
            : '+' + transaction.value}
        </Text>
      </View>
    ));
    return (
      <>
        <Header
          centerComponent={{
            text: Strings.user_title,
            style: Styles.title_intro
          }}
          containerStyle={Styles.header}
        />
        {this.state.loading ? (
          <ActivityIndicator size='large' color='#FE0000' />
        ) : (
          <View style={Styles.container}>
            <View style={Styles.body}>
              <Text style={Styles.body_title}>{this.state.user.name}</Text>
              <Text style={Styles.body_username}>
                {this.state.user.username}
              </Text>
              <Text style={Styles.body_text}>
                {'Crédito: ' + this.state.user.credit}
              </Text>
            </View>
            <Text style={Styles.body_title}>{Strings.history_title}</Text>
            <ScrollView
              contentContainerStyle={Styles.scroll}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }
            >
              {items}
            </ScrollView>
            <Button style={Styles.button} onPress={() => this.login()}>
              <Text style={Styles.button_text}> {Strings.login_title} </Text>
            </Button>
          </View>
        )}
      </>
    );
  }
}
