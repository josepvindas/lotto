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
    const isFirstTime = true;
    //const userToken = await AsyncStorage.getItem('userToken');
    const userToken = true;

    if (isFirstTime) {
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
