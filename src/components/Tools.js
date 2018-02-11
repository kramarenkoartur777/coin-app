import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import { connect } from 'react-redux';
import { goHamburger } from '../actions/MenuNavActions';

import CalculatorsScreen from './componentsTools/CalculatorsScreen';
import CalendarsScreen from './componentsTools/CalendarsScreen';

import EconomicScreen from './componentsTools/EconomicScreen';
import EventsScreen from './componentsTools/EventsScreen';

class Tools extends Component {
  constructor(){
    super();
    this.state = {
      toolsNav: false,
    }
  }
  render(){
    if(this.props.tools.initTools){
      return(
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.hamburgerBtn}
              onPress={this.props.goHamburger}>
              <Image
                style={styles.hamburgerIcon}
                source={require('../img/menu-icon-3x.png')}
              />
            </TouchableOpacity>
            <View style={styles.logoNameBlock}>
              <Text style={styles.logoNameText}>NEWSBTC</Text>
            </View>
          </View>
          <View style={styles.toolsNav}>
            <TouchableOpacity
              style={styles.toolsNavBtn}
              onPress={() => this.setState({toolsNav: true})}
            >
              <Text style={[(this.state.toolsNav ? styles.active : styles.inactive), styles.toolsNavText]}>Calculators</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.toolsNavBtn}
              onPress={() => this.setState({toolsNav: false})}
            >
              <Text style={[(!this.state.toolsNav ? styles.active : styles.inactive), styles.toolsNavText]}>Calendars</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.toolsNavContent}>
            {this.state.toolsNav ? <CalculatorsScreen /> : <CalendarsScreen />}
          </View>
        </View>
      );
    } else if(this.props.tools.economic){
      return <EconomicScreen />;
    } else if(this.props.tools.events){
      return <EventsScreen />;
    }
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
  hamburgerBtn: {
    paddingLeft: 17,
    flex: 1.1
  },
  hamburgerIcon: {
    width: 16,
    height: 12
  },
  logoNameBlock: {
    flex: 2
  },
  logoNameText: {
    fontFamily: "HelveticaNeue",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff"
  },
  toolsNav: {
    backgroundColor: 'rgba(3, 90, 121, 0.58)',
    flexDirection: 'row',
    paddingLeft: 17
  },
  toolsNavBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingRight: 26
  },
  toolsNavText: {
    fontFamily: "Avenir-Medium",
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff"
  },
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0.4
  },
  toolsNavContent: {
    flex: 1,
    backgroundColor: "rgba(40, 68, 78, 0.39)"
  }
});

const mapStateToProps = (state) => {
  return {
    menuNav: state.menuNav,
    tools: state.tools
  }
}

export default connect(mapStateToProps, { goHamburger })(Tools);
