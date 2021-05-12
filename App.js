import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { setLocalNotification } from './utils/api';
import reducer from './reducers';
import middleware from './middleware';
import MainNav from './components/MainNavigation';
import { name as appName } from './app.json';

// Create store passing it the reducer as first argument 
// and the middleware function as second argument
const store = createStore(reducer, middleware);

export default class App extends Component {
  async componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      /*
      Wraps the app inside the Provider component 
      passing to it the store 
      */
      <Provider store={store}>
        <View style={styles.container}>
          {/* Status bar */}
          <StatusBar 
            barStyle="dark-content"
            translucent={false}
            backgroundColor='#093340' 
          />
          {/* Navigation */}
          <NavigationContainer>
            <MainNav />
          </NavigationContainer>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4eee8',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent(appName, () => App);