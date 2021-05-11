import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Deck extends Component {

  render() {
    const {title, cards} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.count}>{cards} cards</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    borderWidth: 1,
    marginBottom:20,
    borderColor: '#114e60',
    backgroundColor:'#f5cebe'
  },
  titleContainer:{
    flex:1,
    borderBottomWidth:1,
    backgroundColor:'#114e60',
    padding:5
    
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#f5cebe'
    
  },
  count: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15,
    color: '#114e60',
    alignSelf: 'center'
  }
});