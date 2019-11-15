import React from 'react';
import { ActivityIndicator, AsyncStorage, View } from 'react-native';

export default class Switcher extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    //const isFirstTime = await AsyncStorage.getItem('firstTime');
    //const userToken = await AsyncStorage.getItem('userToken');
    const userToken = false;
    const isFirstTime = true;

    if (!isFirstTime) {
      this.props.navigation.navigate('Intro');
    } else {
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}
