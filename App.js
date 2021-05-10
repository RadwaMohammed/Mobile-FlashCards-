import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import { StyleSheet, Text, View } from 'react-native';

// Create store passing it the reducer as first argument 
// and the middleware function as second argument
const store = createStore(reducer, middleware);

export default class App extends Component {
  state = {
    allDecks: {},
  }

  render() {
    return (
      /*
   Wraps the app inside the Provider component 
   passing to it the store 
  */
      <Provider store={store}>
        <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
