import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { removeDeck } from '../actions/index';
import { removeDeck as remove } from '../utils/api';
import Deck from './Deck';


class DeckDetails extends Component {
  handleRemoval=() =>{
    const { navigation, route, removeDeck } = this.props;
    const { title } = route.params;
    //Update Redux
    // Remove Deck
    removeDeck(title)
    // Update DB
    // Remove Deck from AsyncStorage
    remove(title);
    navigation.goBack();

  }
  render() {
    const { navigation, route } = this.props;
    const { title, cards } = route.params;
    return (
      <View style={styles.deckContainer}>
        <Deck title={title} cards={cards} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddCard')}
        >
          <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Quize')}
        >
          <Text style={styles.btnText}>Start Quize</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={this.handleRemoval}
        >
          <Text style={styles.removeText}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  deckContainer: {
    paddingTop: 80,
    paddingLeft:30,
    paddingRight:30,
    justifyContent: 'space-between'
    
  },
  button: {
    alignItems: 'center',
    borderWidth:1,
    padding: 10,
    marginTop: 15,
    borderColor:'#114e60',
    width: '80%',
    alignSelf: 'center'
    
  },
  btnText: {
    color: '#114e60',
    fontSize: 16
  }, 
  removeBtn: {
    alignItems: 'center',
    borderWidth:1,
    padding: 10,
    marginTop: 15,
    borderColor:'#8a0101',
    width: '80%',
    alignSelf: 'center'
      
  },
  removeText:{
    color:'#8a0101',
    fontSize: 16
  }

});

/**
 * The mapDispatchToProps function - used for dispatching actions to the store
 * @param {function} dispatch - Call store.dispatch to dispatch an action 
 * @returns {object} An object containing property its value is a function that
 *                   dispatch action returned by action creator <removeDeck>
 */
const mapDispatchToProps = dispatch => ({
  removeDeck: title => dispatch(removeDeck(title))
});
/* Using the connect() function to make container component
   to read state from the store and dispatch actions
*/
export default connect(null, mapDispatchToProps)(DeckDetails);