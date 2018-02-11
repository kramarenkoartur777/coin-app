import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';

import { connect } from 'react-redux';
import { backTools } from '../../actions/ToolsActions';

import UptrendScreen from './UptrendScreen';
import DowntrendScreen from './DowntrendScreen';

class Fibonnaci extends Component {
  constructor(){
    super();
    this.state = {
      initNav: true
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.props.backTools()
    return true;
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={this.props.backTools}>
            <Image
              style={styles.backBtnIcon}
              source={require('../../img/back-icon.png')}
            />
          </TouchableOpacity>
          <View style={styles.logoNameBlock}>
            <Text style={styles.logoNameText}>Fibonnaci Calculator</Text>
          </View>
        </View>
        <View style={styles.fiboNav}>
          <TouchableOpacity
            onPress={() => this.setState({initNav: true})}
            style={styles.fiboNavBtn}>
            <Text style={[(this.state.initNav ? styles.active : styles.inactive), styles.fiboNavTitle]}>Uptrend</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({initNav: false})}
            style={styles.fiboNavBtn}>
            <Text style={[(!this.state.initNav ? styles.active : styles.inactive), styles.fiboNavTitle]}>Downtrend</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerFiboScreens}>
          {this.state.initNav ? <UptrendScreen /> : <DowntrendScreen />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d252c'
  },
  header: {
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
    backgroundColor: '#035a79'
  },
  backBtn: {
    paddingLeft: 17,
    flex: 0.8
  },
  backBtnIcon: {
    width: 16,
    height: 12
  },
  logoNameBlock: {
    flex: 2
  },
  logoNameText: {
    fontFamily: "Avenir-Medium",
    fontSize: 18,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff"
  },
  fiboNav: {
    height: 40,
    backgroundColor: 'rgba(3, 90, 121, 0.58)',
    flexDirection: 'row',
    paddingLeft: 18
  },
  fiboNavBtn: {
    justifyContent: 'center',
    marginRight: 25
  },
  fiboNavTitle: {
    fontSize: 16,
    fontFamily: 'Avenir-Medium',
    fontWeight: '400'
  },
  active: {
    color: '#fff'
  },
  inactive: {
    color: 'rgba(255, 255, 255, 0.4)'
  },
  containerFiboScreens: {
    flex: 1,
  }
});

const mapStateToProps = (state) => {
  return {
    menuNav: state.menuNav,
    tools: state.tools
  }
}

export default connect(mapStateToProps, { backTools })(Fibonnaci);
