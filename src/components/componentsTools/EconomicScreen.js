import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { backCalendars } from '../../actions/ToolsActions';
import { goHamburger, closeHamburger } from '../../actions/MenuNavActions';

class EconomicScreen extends Component {
  constructor(){
    super();
    this.state = {
      today: true,
      tomorrow: false,
      yesterday: false,
      all: false
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    if(this.props.menuNav.hamburger){
      this.props.closeHamburger();
      return true;
    } else {
      this.props.backCalendars();
      return true;
    }
    return true;
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={this.props.goHamburger}
            style={styles.hamburgerBtn}
          >
            <Image
              style={styles.hamburgerIcon}
              source={require('../../img/menu-icon-3x.png')}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Economic Calendar</Text>
        </View>
        <View style={styles.economicNav}>

          <TouchableOpacity
            onPress={() => this.setState({today: true, tomorrow: false, yesterday: false, all: false})}
            style={styles.economicNavBtn}
          >
            <Text style={[(this.state.today ? styles.active : styles.inactive), styles.economicNavText]}>Today</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.setState({today: false, tomorrow: true, yesterday: false, all: false})}
            style={styles.economicNavBtn}
          >
            <Text style={[(this.state.tomorrow ? styles.active : styles.inactive), styles.economicNavText]}>Tomorrow</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.setState({today: false, tomorrow: false, yesterday: true, all: false})}
            style={styles.economicNavBtn}
          >
            <Text style={[(this.state.yesterday ? styles.active : styles.inactive), styles.economicNavText]}>Yesterday</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.setState({today: false, tomorrow: false, yesterday: false, all: true})}
            style={styles.economicNavBtn}
          >
            <Text style={[(this.state.all ? styles.active : styles.inactive), styles.economicNavText]}>All</Text>
          </TouchableOpacity>

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
    height: 46,
    backgroundColor: '#035a79',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hamburgerBtn: {
    paddingLeft: 17,
    flex: 0.3
  },
  hamburgerIcon: {
    width: 15,
    height: 10
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Avenir-Medium',
    flex: 1,
  },
  economicNav: {
    height: 40,
    backgroundColor: 'rgba(3, 90, 121, 0.58)',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  economicNavBtn: {
    height: '100%',
    justifyContent: 'center'
  },
  economicNavText: {
    fontSize: 16,
    fontFamily: 'Avenir-Medium',
  },
  active: {
    color: '#fff'
  },
  inactive: {
    color: 'rgba(255, 255, 255, 0.4)'
  },

});

const mapStateToProps = (state) => {
  return{
    tools: state.tools,
    menuNav: state.menuNav
  }
}

export default connect(mapStateToProps, { backCalendars, goHamburger, closeHamburger })(EconomicScreen);
