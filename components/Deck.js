import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';

class Deck extends Component {

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
/**
 * The mapStateToProps function - get the state parts that Deck component needs
 * @param {Object} state - The state of the store 
 * @returns {object} An object containing decks {object} and
 *                   
 */
const mapStateToProps = (state, {title}) => {
  const deck = state[title];
  const cards = deck ? deck.questions.length : null
  return {
    cards,
  }
  
};

export default connect(mapStateToProps)(Deck);