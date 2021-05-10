import { getDecks } from '../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';

/**
 * Action creator - receiveQuestions
 * @param {object} decks - The decks object
 * @returns {object} The action object
 */
export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks, // Type of event occured
  };
}

/**
 * Action creator - addDeck
 * @param {string} title - The deck's title
 * @returns {object} - The action object 
 */
export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  };
}

/**
 * Action creator - removeDeck
 * @param {string} title - The deck's title
 * @returns {object} - The action object 
 */
export function removeDeck(title) {
  return {
    type: REMOVE_DECK,
    title
  };
}

/**
 * Action creator - addCardToDeck
 * @param {string} title - The deck's title
 * @param {object} card - The card object contain 
 *                        question and answer properties
 * @returns {object} - The action object
 */
export function addCardToDeck(title, card) {
  return {
    type: ADD_CARD_TO_DECK,
    title,
    card
  };
}

/**
 * Getting the initial data that the app needs
 * using redux-thunk pattern because we want to make asynchronous request
 */
export function handleInitialData() {
  return async dispatch => {
    const decks = await getDecks();
    // Add decks to the state of the store
    dispatch(receiveDecks(decks));
  };
}