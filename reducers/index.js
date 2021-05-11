import {
  RECEIVE_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD_TO_DECK
} from '../actions';

/**
 * Reducer function <decks>  
 * @param {object} state - The current state
 * @param {object} action - The action that occured
 * @returns {object}  The new state
 */
export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };

    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: []
        }
      };

    case REMOVE_DECK:
      // remove the key <action.title> from the state
      return Object.keys(state).filter(key =>
        key !== action.title).reduce((obj, key) =>
          {
            obj[key] = state[key];
            return obj;
          }, {});
   
    case ADD_CARD_TO_DECK:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [...state[action.title].questions].concat(action.card)
        }
      };
    default:
      return state;
  }
}
