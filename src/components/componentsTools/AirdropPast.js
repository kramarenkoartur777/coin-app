import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';

class AirdropPast extends Component {
  render(){
    return(
      <View style={styles.container}>
        <Text>Airdrop Past</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default AirdropPast;
