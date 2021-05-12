import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Result(props) {
  const { result, questionsCount, backHome, startAgain} = props;
  const percent = (result / questionsCount) * 100;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Complete</Text>
      <Text style={styles.score}>You got { result } / { questionsCount} correct - ({ percent }%)</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={startAgain}
      >
        <Text style={styles.btnText}>Start Quize Again</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={backHome}
      >
        <Text style={styles.btnText}>Go to Decks List</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    borderColor: '#114e60',
    backgroundColor:'#f4eee8',
    paddingLeft:30,
    paddingRight:30,
  },
  title: {
    marginTop: 50,
    fontSize: 20,
    color: '#114e60',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: '#114e60'
  },
  score:{
    color: '#114e60',
    marginTop: 20,
    fontSize: 15,
    paddingBottom: 30
  },
  button: {
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    backgroundColor:'#114e60',
    width: '80%',
    alignSelf: 'center'
    
  },
  btnText: {
    color: '#f5cebe',
    fontSize: 16
  }
})
