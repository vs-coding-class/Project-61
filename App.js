import * as React from 'react';
import { Text, View } from 'react-native';

import HomeScreen from './screens/homescreen';
import SummaryScreen from './screens/summaryscreen';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

var AppNavigator = createSwitchNavigator({
  HomeScreen: HomeScreen,
  SummaryScreen: SummaryScreen,
});

const AppContainer = createAppContainer(AppNavigator);