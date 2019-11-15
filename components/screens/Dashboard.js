import React, { Component } from 'react';
import { Image, View, Text, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';

import Styles from '../config/Styles';
import Strings from '../config/Strings';

export default class Dashboard extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <>
        <Header
          leftComponent={{
            text: Strings.login_title,
            style: Styles.title_intro
          }}
          rightComponent={{
            text: 'Credit: 3000',
            style: Styles.title_intro
          }}
          containerStyle={Styles.header}
        />

        <ScrollView contentContainerStyle={Styles.scroll}>
          <View style={Styles.card_list}>
            <View style={Styles.card}>
              <Text style={Styles.title}> HOME </Text>
            </View>

            <View style={Styles.card}>
              <Text style={Styles.title}> HOME </Text>
            </View>

            <View style={Styles.card}>
              <Text style={Styles.title}> HOME </Text>
            </View>

            <View style={Styles.card}>
              <Text style={Styles.title}> HOME </Text>
            </View>

            <View style={Styles.card}>
              <Text style={Styles.title}> HOME </Text>
            </View>

            <View style={Styles.card}>
              <Text style={Styles.title}> HOME </Text>
            </View>

            <View style={Styles.card}>
              <Text style={Styles.title}> HOME </Text>
            </View>

            <View style={Styles.card}>
              <Text style={Styles.title}> HOME </Text>
            </View>

            <View style={Styles.card}>
              <Text style={Styles.title}> HOME </Text>
            </View>

            <View style={Styles.card}>
              <Text style={Styles.title}> HOME </Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}
