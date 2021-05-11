import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView,  StyleSheet} from 'react-native';

import { handleInitialData } from '../actions';

import Deck from './Deck';



class DecksList extends Component {
  componentDidMount() {
    /* When component mounts load the initial data 
       by dispatching the handleInitialData() action creator
    */
    this.props.handleInitialData();
  }
  render() {
    const { decks } = this.props;
    console.log(decks);
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Mobie FlashCards</Text>
        
        {  
          decks.map(deck => { 
            return (
              <View key={deck.title}>
              <Deck title={deck.title} cards={deck.questions.length}/>
              </View>
            );
        })
       }

    </ScrollView>
    
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4eee8',
    paddingLeft:30,
    paddingRight:30
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color:'#114e60',
    marginBottom:25,
    marginTop:40
  }
});

/**
 * The mapStateToProps function - get the state parts that DecksList component needs
 * @param {Object} state - The state of the store 
 * @returns {object} An object containing decks {object} and
 *                   
 */
const mapStateToProps = (state) => ({
  decks: Object.values(state)
  
});

/**
 * The mapDispatchToProps function - used for dispatching actions to the store
 * @param {function} dispatch - Call store.dispatch to dispatch an action 
 * @returns {object} An object containing property its value is a function that
 *                   dispatch action returned by action creator <handleInitialData>
 */
const mapDispatchToProps = dispatch => ({
  handleInitialData: () => dispatch(handleInitialData())
});
/* Using the connect() function to make container component
   to read state from the store and dispatch actions
*/
export default connect(mapStateToProps, mapDispatchToProps)(DecksList);