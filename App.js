import React, { Component } from 'react';

import AppContainer from './components/navigation/Main';

export default class App extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true; // Disables warnings
  }

  render() {
    return <AppContainer />;
  }
}
