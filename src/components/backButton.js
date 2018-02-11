import React, { Component } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Btn extends Component {
  render(){
    return(
      <TouchableOpacity
        onPress={this.prop.onPress}
      >
        <Text>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}
