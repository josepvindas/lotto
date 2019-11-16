import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  ToastAndroid,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import { Header } from 'react-native-elements';

import Styles from '../config/Styles';
import Strings from '../config/Strings';

import GameModal from '../modals/GameModal';

export default class Dashboard extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      current_game: {},
      game_list: [],
      loading: true,
      refreshing: false,
      token: ''
    };
  }

  wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  fetchData = () => {
    console.log('Fetching data');
    this.getToken().then(() => {
      const uri = 'https://lotto-back.herokuapp.com' + '/games';
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
            ToastAndroid.showWithGravityAndOffset(
              Strings.credential_error,
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              25,
              50
            );
          } else {
            console.log(responseJson);
            this.setState({ game_list: responseJson });
            this.setState({ current_game: responseJson[0] });
          }
        })
        .catch(err => {
          console.log('error');
          console.log(err);
        });
    });
  };

  getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({ token: token });
  };

  _onRefresh() {
    this.setState({ refreshing: true });
    this.fetchData();
    this.setState({ refreshing: false });
  }

  componentDidMount() {
    this.fetchData();
    this.setState({ loading: false });
  }

  render() {
    const items = this.state.game_list.map(game => (
      <View style={Styles.card}>
        <TouchableOpacity
          onPress={() => {
            this.setState({ current_game: game });
            this.GameModal.show();
          }}
        >
          <Text style={Styles.card_title}> {game.category.name} </Text>
          <Text style={Styles.card_body}> {game.location.name} </Text>
          <Text style={Styles.card_body}>
            {' '}
            {game.date.split('T')[0].split('-')[2] +
              '/' +
              game.date.split('T')[0].split('-')[1] +
              '/' +
              game.date.split('T')[0].split('-')[0]}{' '}
          </Text>
          <Text style={Styles.card_body}>
            {' '}
            {game.date.split('T')[1].split(':')[0] +
              ':' +
              game.date.split('T')[1].split(':')[1]}{' '}
          </Text>

          <Text style={Styles.card_play}>
            {' '}
            {'Apuesta Maxima: ' + game.max_play}{' '}
          </Text>
        </TouchableOpacity>
      </View>
    ));

    return (
      <>
        <Header
          centerComponent={{
            text: Strings.signup_title,
            style: Styles.title_intro
          }}
          containerStyle={Styles.header}
        />

        {this.state.loading ? (
          <ActivityIndicator size='large' color='#FE0000' />
        ) : (
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
            <GameModal
              ref={modal => (this.GameModal = modal)}
              parentComponent={this}
            />
          </ScrollView>
        )}
      </>
    );
  }
}
