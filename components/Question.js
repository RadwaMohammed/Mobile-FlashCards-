import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Question (props) {
  const { question, showAnswer } = props;
  return ( 
    <View style={styles.container}>
      <Text style={styles.question}>{ question }</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={showAnswer}
      >
        <Text style={styles.btnText}>Show Answer</Text>
      </TouchableOpacity>
    </View>
 
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginTop: 15,
    backgroundColor:'#114e60',
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center'
    
  },
  btnText: {
    color: '#f5cebe',
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
  question: {
    color: '#114e60',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 40
  }
});
