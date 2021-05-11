import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons'; 
import DecksList from '../DecksList';
import AddDeck from '../AddDeck';

const Tab = createBottomTabNavigator();
export default function HomeNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === 'Decks') {
            return <Entypo name="list" size={30} color={color} />;
          } else if (route.name === 'Add Deck') {
            return <Entypo name="add-to-list" size={30} color={color} />;
          }
        }
        
      })}
      tabBarOptions={{
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
      }}
      
      
    >
      <Tab.Screen name="Decks" component={DecksList} />
      <Tab.Screen name="Add Deck" component={AddDeck} />
    </Tab.Navigator>

  )
}
