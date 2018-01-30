import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

import { goCoins, goNews, goTools, goPortfolio } from '../actions/MenuNavActions';

import Coins from './Coins';
import News from './News';
import MyFavorites from './MyFavorites';

class Home extends Component {
  renderMenuNav(){
    if(this.props.menuNav.isCoins){
      return <Coins />;
    } else if(this.props.menuNav.isNews){
      return <News />;
    } else if(this.props.menuNav.isTools){
      return <MyFavorites />
    } else if(this.props.menuNav.isPortfolio){
      return <View style={{flex:1, backgroundColor: '#024'}}></View>;
    }
  }
  render(){
    console.disableYellowBox = true;
    const { menuNav } = this.props;
    return(
      <View style={styles.container}>

          {this.renderMenuNav()}

          <View style={styles.bottomBar}>
            <TouchableOpacity
              style={[styles.btnMenu, styles.btnMenuCoins]}
              onPress={this.props.goCoins}
            >
              <Image source={menuNav.isCoins ? require('../img/coins-bottom-menu-icon-active.png') : require('../img/coins-bottom-menu-icon.png')} />
              <Text style={[(menuNav.isCoins ? styles.btnMenuTextActive : styles.btnMenuTextInactive), styles.textFont]}>Coins</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnMenu, styles.btnMenuNews]}
              onPress={this.props.goNews}
            >
              <Image source={menuNav.isNews ? require('../img/news-filled-icon-active.png'): require('../img/news-filled-icon.png')} />
              <Text style={[(menuNav.isNews ? styles.btnMenuTextActive : styles.btnMenuTextInactive), styles.textFont]}>News</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnMenu, styles.btnMenuTools]}
              onPress={this.props.goTools}
            >
              <Image source={menuNav.isTools ? require('../img/tools-filled-icon-active.png') : require('../img/tools-filled-icon.png')} />
              <Text style={[(menuNav.isTools ? styles.btnMenuTextActive : styles.btnMenuTextInactive), styles.textFont]}>Tools</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnMenu, styles.btnMenuPortfolio]}
              onPress={this.props.goPortfolio}
            >
              <Image source={menuNav.isPortfolio ? require('../img/portfolio-filled-icon-active.png'): require('../img/portfolio-filled-icon.png')} />
              <Text style={[(menuNav.isPortfolio ? styles.btnMenuTextActive : styles.btnMenuTextInactive), styles.textFont]}>Portfolio</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomBar: {
    position: 'relative',
    bottom: 0,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2b3138'
  },
  btnMenu: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 5,

  },
  btnMenuCoins: {
    paddingLeft: 5
  },
  btnMenuNews: {
    paddingRight: 5
  },
  btnMenuTools: {
    paddingRight: 5
  },
  btnMenuPortfolio: {
    paddingRight: 8
  },
  btnMenuTextActive: {
    color: '#fff'
  },
  btnMenuTextInactive: {
    color: 'rgba(255, 255, 255, 0.47)'
  },
  textFont: {
    fontSize: 10,
    fontFamily: 'Avenir-Medium',
    fontWeight: '500'
  },
});

const mapStateToProps = (state) => {
  return{
    coins: state.coins,
    menuNav: state.menuNav
  }
}

export default connect(mapStateToProps, { goCoins, goNews, goTools, goPortfolio })(Home);
