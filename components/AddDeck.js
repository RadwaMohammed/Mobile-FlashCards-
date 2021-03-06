import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api.js'

class AddDeck extends Component {  
  state = {
    deckTitle: ''
  };

  handleChange = deckTitle => {
    this.setState({ deckTitle });
  };

  handleSubmit = () => {
    const { addDeck, navigation, decksTitles } = this.props;
    const { deckTitle } = this.state;
    // Make sure the deck's name not duplicated
    if (decksTitles.includes(deckTitle.toLocaleLowerCase())) {
      Alert.alert(
        "This deck is already Exist",
        "Please add a different deck.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      this.setState(() => ({ deckTitle: '' }));
      return;
    }
    
    //Update Redux
    // Add the new deck to the store
    addDeck(deckTitle);
    //Update DB
    // Save in AsyncStorage the new deck
    saveDeckTitle(deckTitle)
    // Go to DeckDetails screen of the new deck
    navigation.navigate('DeckDetails', {
      title: deckTitle,
      cards: 0
    })
    // Reset the title
    this.setState(() => ({ deckTitle: '' }));
  };
  render() {
    const { deckTitle } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Title for the new deck"
          onChangeText={this.handleChange}
          value={deckTitle}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleSubmit}
          disabled={ // Make sure that the user enter text not only white space
            deckTitle.trim() === ''
          } 
        >
          <Text style={styles.btnText}>Add Deck</Text>
        </TouchableOpacity>
        <Text style={styles.note}>Type a title to activate the button</Text>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f4eee8',
    paddingLeft:30,
    paddingRight:30
  },
  input: {
    height: 40, 
    borderColor: '#114e60', 
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    color:'#114e60',
    fontSize: 16
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#114e60',
    padding: 10,
  },
  btnText: {
    color: '#f5cebe',
    fontSize: 16
  }, 
  note:{
    color: '#ccc',
    fontSize: 14,
    marginTop: 5
  }
});

/**
 * The mapStateToProps function - get the state parts that AddDeck component needs
 * @param {Object} state - The state of the store 
 * @returns {object} An object containing decksTitles {array} all the titles
 *                   
 */
const mapStateToProps = (state) => ({
  decksTitles: Object.keys(state).map(title => title.toLocaleLowerCase())
  
});

/**
 * The mapDispatchToProps function - used for dispatching actions to the store
 * @param {function} dispatch - Call store.dispatch to dispatch an action 
 * @returns {object} An object containing property its value is a function that
 *                   dispatch action returned by action creator <addDeck>
 */
const mapDispatchToProps = dispatch => ({
  addDeck: title => dispatch(addDeck(title))
});
/* Using the connect() function to make container component
   to read state from the store and dispatch actions
*/
export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);