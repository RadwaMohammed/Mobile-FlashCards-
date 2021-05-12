import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {addCardToDeck} from '../actions';
import {addCardToDeck as addCard} from '../utils/api';

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  };

  handleQChange = text=> {
    this.setState({ question: text });
  };
  handleAnswerChange = text=> {
    this.setState({ answer: text });
  };
  handleSubmit = () => {
    const { addCardToDeck, navigation, route } = this.props;
    const { title } = route.params;
    const { question, answer } = this.state;
    //Update Redux
    // Add the new deck to the store
    addCardToDeck(title, {question: question, answer: answer});
    //Update DB
    // Save in AsyncStorage the new card
    addCard(title, {question: question, answer: answer})
    // Go to the deck screen
    navigation.goBack({title: title });
    // Reset the title
    this.setState(() => ({ question: '', answer: '' }));
  };
  render() {
    const { question, answer } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Type a question"
          onChangeText={this.handleQChange}
          value={question}
        />
        <TextInput
          style={styles.input}
          placeholder="Type an answer"
          onChangeText={this.handleAnswerChange}
          value={answer}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleSubmit}
          disabled={ // Make sure that the user enter text not only white space
            !question.trim() || !answer.trim()
          } 
        >
          <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>
        <Text style={styles.note}>Fill the input to activate the button</Text>
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
 * The mapDispatchToProps function - used for dispatching actions to the store
 * @param {function} dispatch - Call store.dispatch to dispatch an action 
 * @returns {object} An object containing property its value is a function that
 *                   dispatch action returned by action creator <addCardToDeck>
 */
const mapDispatchToProps = dispatch => ({
  addCardToDeck: (title, card) => dispatch(addCardToDeck(title, card))
});
/* Using the connect() function to make container component
   to read state from the store and dispatch actions
*/
export default connect(null, mapDispatchToProps)(AddCard);