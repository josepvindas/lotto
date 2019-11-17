import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  View
} from 'react-native';
import { Header } from 'react-native-elements';

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
      loading: true,
      refreshing: false
    };
  }

  // Retrieve current user from Async storage
  getUser = async () => {
    const temp = await AsyncStorage.getItem('user');
    console.log(temp);
    const user = JSON.parse(temp);
    console.log(user);
    this.setState({ user });
  };

  // refresh game list
  _onRefresh() {
    this.setState({ refreshing: true });
    this.getUser().then(() => {
      this.setState({ refreshing: false });
    });
  }

  componentDidMount() {
    this.getUser().then(() => {
      this.setState({ loading: false });
    });
  }
  render() {
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
          <ScrollView
            contentContainerStyle={Styles.scroll}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
          >
            <Text style={Styles.title}>{this.state.user.name}</Text>
            <Text style={Styles.modal_text}>{this.state.user.username}</Text>
          </ScrollView>
        )}
      </>
    );
  }
}
