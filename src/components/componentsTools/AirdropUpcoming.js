import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';

class AirdropUpcoming extends Component {
  render(){
    return(
      <View style={styles.container}>
        <Text>Airdrop Upcoming</Text>
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

export default AirdropUpcoming;
