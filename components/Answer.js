import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Answer(props) {
  const { answer, handleCorrect, handleInCorrect } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.answer}>{ answer }</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleCorrect}
      >
        <Text style={styles.btnText}>Correct</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonWrong}
        onPress={handleInCorrect}
      >
        <Text style={styles.btnTextWrong}>Incorrect</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonWrong: {
    alignItems: 'center',
    borderWidth:1,
    padding: 10,
    marginTop: 15,
    borderColor:'#8a0101',
    width: '80%',
    alignSelf: 'center'
    
  },
  btnTextWrong: {
    color: '#8a0101',
    fontSize: 16
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
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    borderColor: '#114e60',
    backgroundColor:'#f4eee8',
    paddingLeft:30,
    paddingRight:30,
  },
  answer: {
    color: '#114e60',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 40,
    lineHeight:25
  }
});
