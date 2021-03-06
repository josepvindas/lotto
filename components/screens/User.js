import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  RefreshControl,
  ScrollView,
  Text,
  View
} from 'react-native';
import { Icon } from 'native-base';
import { Header } from 'react-native-elements';

import LogoutModal from '../modals/LogoutModal';
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

  logout = () => {
    this.LogoutModal.show();
  };

  // Retrieve current user from Async storage
  getUser = async () => {
    const temp = await AsyncStorage.getItem('user');
    console.log(temp);
    const user = JSON.parse(temp);
    this.getToken().then(() => {
      this.fetchUser(user.id);
    });
  };

  fetchUser = id => {
    const uri = 'https://lotto-back.herokuapp.com' + '/users/' + id;
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
          console.log(uri);
          console.log(responseJson);
        } else {
          this.setState({ user: responseJson });
          this._storeData(JSON.stringify(responseJson));
          this.fetchData();
        }
      })
      .catch(err => {
        console.log('error');
        console.log(err);
      });
  };

  // refresh transaction list
  _onRefresh() {
    this.setState({ refreshing: true });
    this.getUser();
  }

  // retrieve user token
  getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({ token: token });
  };

  // Save data to local storage
  _storeData = async user => {
    try {
      await AsyncStorage.setItem('user', user);
    } catch (error) {
      console.log('Error' + error);
    }
  };

  // fetch Data for the transaction list
  fetchData = () => {
    console.log('Fetching data');

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
  };

  componentDidMount() {
    this.getUser();
  }
  render() {
    const items = this.state.transactions.reverse().map(transaction => (
      <View style={Styles.transaction} key={transaction.id}>
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
          {transaction.type == 2
            ? transaction.location.name
            : transaction.type == 1
            ? transaction.number
            : ''}
        </Text>
        <Text
          style={
            transaction.type == 1
              ? Styles.transaction_expense
              : transaction.type == 2
              ? Styles.transaction_earning
              : Styles.transaction_prize
          }
        >
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
          rightComponent={
            <Icon
              name='md-exit'
              style={Styles.header_icon}
              onPress={() => {
                this.logout();
              }}
            />
          }
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

            <LogoutModal
              ref={modal => (this.LogoutModal = modal)}
              parentComponent={this}
            />
          </View>
        )}
      </>
    );
  }
}
