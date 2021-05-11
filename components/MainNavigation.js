import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons'; 
import DecksList from './DecksList';
import AddDeck from './AddDeck';
import DeckDetails from './DeckDetails';

// Config for TabNav
const RouteConfigs = { 
  DecksList:{
    name: "Decks List",
    component: DecksList,
    options: {tabBarIcon: ({color}) => <Entypo name="list" size={30} color={color} />, title: 'DecksList'}
  },
  AddDeck:{
    name: "AddDeck",
    component: AddDeck,
    options: {tabBarIcon: ({color}) => <Entypo name="add-to-list" size={30} color={color} />, title: 'AddDeck'}
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions:{
    activeTintColor: '#114e60',
    inactiveTintColor: '#ccc',
    style:{
      backgroundColor: '#fff',
      borederTopWidth: 1,
      borderTopColor: '#114e60',
      paddingBottom: 10,
      paddingTop: 10,
      height: 60,
    }
  }
  };
const Tab = createBottomTabNavigator(); 
const TabNav = () =>(
  <Tab.Navigator {...TabNavigatorConfig}>
    <Tab.Screen {...RouteConfigs['DecksList']} />
    <Tab.Screen {...RouteConfigs['AddDeck']} />  
  </Tab.Navigator>
);

// Config for StackNav
const StackNavigatorConfig = {
  headerMode: "screen"
};
const StackConfig = {
  TabNav: {
    name: "Home",
    component: TabNav,
    options: {headerShown: false}
  }, 
  DeckDetails: {
    name: "DeckDetails",
    component: DeckDetails,
    options: {
      headerTintColor: '#f4eee8',
      headerStyle:{
        backgroundColor: '#114e60'
      },
      title: "Deck Detail"
    }
  }
};
const Stack = createStackNavigator();
const MainNav = () =>(
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['TabNav']} />
    <Stack.Screen {...StackConfig['DeckDetails']} />
  </Stack.Navigator>
)

export default MainNav;

