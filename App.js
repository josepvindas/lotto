import React, { Component } from 'react';
import { Root } from 'native-base';

import AppContainer from './components/navigation/Main';

export default class App extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true; // Disables warnings
  }

  render() {
    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }
}
