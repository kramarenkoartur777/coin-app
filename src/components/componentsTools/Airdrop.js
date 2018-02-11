import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, BackHandler, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { backTools } from '../../actions/ToolsActions';

import AirdropActive from './AirdropActive';
import AirdropUpcoming from './AirdropUpcoming';
import AirdropPast from './AirdropPast';

class Airdrop extends Component {
  constructor(){
    super();
    this.state ={
      active: false,
      upcoming: true,
      past: false
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
    this.props.backTools()
    return true;
  }
  renderAirdropBlocks(){
    if(this.state.active){
      return <AirdropActive />;
    } else if(this.state.upcoming){
      return <AirdropUpcoming />;
    } else if(this.state.past){
      return <AirdropPast />;
    }
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
              <Text style={styles.logoNameText}>Air Drop Alerts</Text>
            </View>
          </View>
          <View style={styles.airdropNav}>
            <TouchableOpacity
              onPress={() => this.setState({active: true, upcoming: false, past: false})}
              style={styles.airdropNavBtn}
            >
              <Text style={[(this.state.active ? styles.active : styles.inactive), styles.airdropNavTitle]}>Active</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({active: false, upcoming: true, past: false})}
              style={styles.airdropNavBtn}
            >
              <Text style={[(this.state.upcoming ? styles.active : styles.inactive), styles.airdropNavTitle]}>Upcoming</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({active: false, upcoming: false, past: true})}
              style={styles.airdropNavBtn}
            >
              <Text style={[(this.state.past ? styles.active : styles.inactive), styles.airdropNavTitle]}>Past</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={{flex: 1}}>
              {this.renderAirdropBlocks()}
            </View>
          </ScrollView>
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
    fontFamily: "HelveticaNeue",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff"
  },
  airdropNav: {
    height: 40,
    backgroundColor: 'rgba(3, 90, 121, 0.58)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
  },
  airdropNavBtn: {
    marginRight: 20
  },
  airdropNavTitle: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Avenir-Medium'
  },
  active: {
    color: '#fff'
  },
  inactive: {
    color: 'rgba(255, 255, 255, 0.4)'
  }
});

const mapStateToProps = (state) => {
  return {
    menuNav: state.menuNav,
    tools: state.tools
  }
}

export default connect(mapStateToProps, { backTools })(Airdrop);
