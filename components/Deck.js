import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Deck extends Component {

  render() {
    const {title, cards} = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , color: 'red'}}>
        <Text>{title}</Text>
        <Text>{cards}</Text>
      </View>
    )
  }
}
