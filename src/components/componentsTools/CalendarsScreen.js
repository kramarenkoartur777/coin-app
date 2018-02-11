import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import { goEconomic, goEvents } from '../../actions/ToolsActions';

class CalendarsScreen extends Component {
  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.props.goEconomic}
          style={styles.economicBtn}>
          <LinearGradient colors={['#0793b1', '#035a79']} style={styles.linearGradient}
            start={{y: 0.5, x: 0.0}}
            end={{y: 0.0, x: 1.0}}
          >
            <Text style={styles.economicText}>Economic</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.economicBtn}>
          <LinearGradient colors={['#0793b1', '#035a79']} style={styles.linearGradient}
            start={{y: 0.0, x: 1.0}}
            end={{y: 0.5, x: 0.0}}
          >
            <Text style={styles.economicText}>Divident</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.props.goEvents}
          style={styles.economicBtn}>
          <LinearGradient colors={['#0793b1', '#035a79']} style={styles.linearGradient}
            start={{y: 0.5, x: 0.0}}
            end={{y: 0.0, x: 1.0}}
          >
            <Text style={styles.economicText}>Events</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient : {
    flex :  1 ,
    borderRadius :  4
  },
  economicBtn: {
    width: 313,
    height: 44,
    alignSelf: 'center',
    marginTop: 21
  },
  economicText: {
    height: '100%',
    color: '#fff',
    fontSize: 12,
    fontWeight: '900',
    fontFamily: 'Avenir-Medium',
    alignSelf: 'center',
    textAlignVertical: 'center'
  }
});

const mapStateToProps = (state) => {
  return {
    menuNav: state.menuNav,
    tools: state.tools
  }
}

export default connect(mapStateToProps, { goEconomic, goEvents })(CalendarsScreen);
