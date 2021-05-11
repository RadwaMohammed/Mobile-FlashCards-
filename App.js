import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import { StyleSheet, Text, View } from 'react-native';


// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import DecksList from './components/DecksList';
// import AddDeck from './components/AddDeck';
// import DeckDetails from './components/DeckDetails';
// import BottomNavigator from './components/BottomNavigator';
import AppNavigator from './components/navigation/AppNavigator';




// Create store passing it the reducer as first argument 
// and the middleware function as second argument
const store = createStore(reducer, middleware);



export default class App extends Component {
  render() {
    return (
      /*
      Wraps the app inside the Provider component 
      passing to it the store 
      */
      <Provider store={store}>
        <View style={styles.container}>
        <AppNavigator />
        
        <StatusBar style="auto" />
        {/* <DecksList /> */}
        {/* <AddDeck /> */}
        
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
