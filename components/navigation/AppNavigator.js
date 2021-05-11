import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddDeck from '../AddDeck';
import HomeNavigator from './HomeNavigator';
import DecksList from '../DecksList';
import DeckDetails from '../DeckDetails'

const Stack = createStackNavigator();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeNavigator} />
        <Stack.Screen name="Decks" component={DecksList} />
        <Stack.Screen name="Add Deck" component={AddDeck} />
        <Stack.Screen name="Deck Details" component={DeckDetails} />
        
      </Stack.Navigator>
      
    </NavigationContainer>
   
    
  )
}
