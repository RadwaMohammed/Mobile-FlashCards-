import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Deck extends Component {

  render() {
    const {title, cards} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        
        <Text style={styles.count}>{cards} cards</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom:20,
    borderColor: '#114e60',
    backgroundColor:'#f5cebe'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#f5cebe',
    backgroundColor:'#114e60',
    padding:40,

  },
  count: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15,
    color: '#114e60',
    alignSelf: 'center',
  }
});