import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notifications, Permissions } from 'expo';


// Key for notification
const NOTIFICATION_KEY = 'FlashCards:notifications';

// Key where persist data inside the async storage
const FLAHSCARDS_STORAGE_KEY = 'FlashCards:decks';
// All decks data
const decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};


/**
 * Get All of the decks 
 * along with their titles, questions, and answers.
 */
export async function getDecks() {
  try {
    // Fetch the data 'allDecks' for 'FLAHSCARDS_STORAGE_KEY' key
    const allDecks = await AsyncStorage.getItem(FLAHSCARDS_STORAGE_KEY);
    // if allDecks is null set the 'decks' as value 
    // for 'FLAHSCARDS_STORAGE_KEY' key
    if (!allDecks) {
      await AsyncStorage.setItem(FLAHSCARDS_STORAGE_KEY, JSON.stringify(decks));
    }
    // return all the decks
    return allDecks ? JSON.parse(allDecks) : decks;
    
  } catch (err) {
    console.log('Error: ', err);
  }
}

/**
 * Get the deck associated with the id.
 * @param {string} id - the deck's id <title propery>
 */
export async function getDeck(id) {
  try {
    // Fetch all the decks
    const allDecks = await AsyncStorage.getItem(FLAHSCARDS_STORAGE_KEY);
    // get the deck by it's id
    return JSON.parse(allDecks)[id];
  } catch (err) {
    console.log('Error: ', err);
  }
}

/**
 * Take in a single title argument and add it to the decks.
 * @param {string} title 
 */
export async function saveDeckTitle(title) {
  try {
    await AsyncStorage.mergeItem(
      FLAHSCARDS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: []
        }
      })
    );
  } catch (err) {
    console.log('Error: ', err);
  }
}

/**
 * take in two arguments, title and card, 
 * and will add the card to the list of questions 
 * for the deck with the associated title.
 * @param {string} title - The deck's title
 * @param {object} card - the card's object
 */
export async function addCardToDeck(title, card) {
  try {
    // Get the deck by it's title
    const deck = await getDeck(title);

    await AsyncStorage.mergeItem(
      FLAHSCARDS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: [...deck.questions, card]
        }
      })
    );
  } catch (err) {
    console.log('Error: ', err);
  }
}

/**
 * Remove the item with it's title from AsyncStorage
 * @param {string} title
 */
export async function removeDeck(title) {
  try {
    // Get all the decks
    const allDecks = await AsyncStorage.getItem(FLAHSCARDS_STORAGE_KEY);
    // Parsing the data
    const data= JSON.parse(allDecks);
    // Set that deck associated to that title to undefined
    data[title] = undefined;
    // then delete it
    delete data[title];
    // finally set the data after removing the specific deck
    AsyncStorage.setItem(FLAHSCARDS_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.log('Error: ', err);
  }
}

/**
 * Reset the app's data
 */
export async function resetDecks() {
  try {
    await AsyncStorage.removeItem(FLAHSCARDS_STORAGE_KEY);
  } catch (err) {
    console.log('Error: ', err);
  }
}

// Setting Notification

function createNotification () {
  return {
    title: 'Hello from Mobile FlashCard!',
    body: "👋 Don't forget to study for today!!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}