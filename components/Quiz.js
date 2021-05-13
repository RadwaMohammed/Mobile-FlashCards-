import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import Answer from './Answer';
import Result from './Result';
import Question from './Question';


class Quiz extends Component {
  state = {
    questionIndex: 0,
    score: 0,
    showAnswer: false,
    showResult: false
  }
  
  /***** Answer component functions *****/
  /**
   * Handle corrct answers
   */
  handleCorrect = () => {
    const {questionIndex} = this.state;
    const {deck} = this.props;
    // Increase the score for the correct answer
    this.setState(prevState => ({
      score: prevState.score + 1,
      questionIndex: prevState.questionIndex + 1,
      showAnswer: !prevState.showAnswer
    }));
    // If the user answer all question show result part
    if (questionIndex + 1 === deck.questions.length) {
      return this.setState(prevState => ({
        showResult: !prevState.showResult
      }));
    }
    
  }
  /**
   * Handle Incorrct answers
   */
  handleInCorrect = () => {
    const {questionIndex} = this.state;
    const {deck} = this.props;
    this.setState(prevState => ({
      questionIndex: prevState.questionIndex + 1,
      showAnswer: !prevState.showAnswer
    }));
    // If the user answer all question show result component
    if (questionIndex + 1 === deck.questions.length) {
      return this.setState(prevState => ({
        showResult: !prevState.showResult
      }));
    }
    
  }

  /***** Result component functions *****/
  /**
   * Handel GoHome button in the result component
   */
  backHome = () => {
    const { navigation } = this.props
    this.setState({
      questionIndex: 0,
      score: 0,
      showAnswer: false,
      showResult: false
    });
    navigation.navigate('DecksList');
  }
  
  /**
   * Handle start Again button in result component
   */
  startAgain = () => {
    const { navigation } = this.props
    this.setState({
      questionIndex: 0,
      score: 0,
      showAnswer: false,
      showResult: false
    });
    navigation.navigate('Quiz');
  }


  /***** Functins handle which compnente to view *****/
  /**
   * Handle showing answer part
   */
  showAnswer = () =>{
    this.setState(prevState => ({showAnswer: !prevState.showAnswer}));
  }

  /**
   * Handle which element wil rendered
   */
  renderElement = () => {
    const { deck } = this.props;
    const { questionIndex, showAnswer, showResult, score } = this.state;
    if (showResult) {
      return <Result result={score}
       questionsCount={deck.questions.length} 
       backHome={this.backHome} 
       startAgain={this.startAgain} 
      />
    } else if (!showAnswer) {
      return <Question 
        question={deck.questions[questionIndex].question} 
        showAnswer={this.showAnswer} 
      />
    } else {
      return <Answer 
        answer={deck.questions[questionIndex].answer} 
        handleCorrect={this.handleCorrect}
        handleInCorrect={this.handleInCorrect}
      />
    }
  }

  render() {
    const { deck } = this.props;
    const { questionIndex} = this.state;
    // if there is no cards in the deck
    if (!deck.questions.length) {
      return (
        <View style={styles.containerNoCard}>
          <Text style={styles.textNoCard}>
            Sorry, you can't take a quiz!
          </Text>
          <Text style={styles.textNoCard}>
            There're no cards in the deck.
          </Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{deck.title} Quiz</Text>
        <View>
          { questionIndex + 1 > deck.questions.length 
            ? <Text style={styles.cards}>
                Results
            </Text>
            : <Text style={styles.cards}>
                {questionIndex + 1} / {deck.questions.length}
              </Text>
          }
        </View>
        { this.renderElement() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    borderColor: '#114e60',
    backgroundColor:'#f5cebe',
    paddingLeft:30,
    paddingRight:30,
    
  },
  containerNoCard: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor:'#f5cebe',
    padding:60,
    paddingTop:0,

  },
  textNoCard: {
    fontSize: 20,
    textAlign: 'center',
    color: '#114e60',
    marginBottom: 10
  },
  header: {
    marginTop: 50,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 22,
    color: '#114e60',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: '#114e60',
  }, 
  cards: {
    color: '#f5cebe',
    fontSize: 16,
    marginTop: 15,
    padding: 10,
    backgroundColor:'#114e60',
    paddingLeft: 20
  }
});
/**
 * The mapStateToProps function - get the state parts that Quiz component needs
 * @param {Object} state - The state of the store 
 * @returns {object} An object containing deck {object}
 *                   
 */
const mapStateToProps = (state, {route}) => {
  const { title } = route.params;
  
  return {
    deck: state[title],
  }
  
};

export default connect(mapStateToProps)(Quiz);