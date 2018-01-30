import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

import { goAllCoins }  from '../actions/CoinsNavActions';
import { goTopCoins }  from '../actions/CoinsNavActions';

import Top100Screen from './componentsCoins/Top100Screen';
import AllCoinsScreen from './componentsCoins/AllCoinsScreen';
import ChartScreen from './componentsCoins/ChartScreen';

class Coins extends Component {

  navigation(){
    if(this.props.coinsNav.isTopCoins){
      return <Top100Screen />;
    } else if(this.props.coinsNav.isAllCoins){
      return <AllCoinsScreen />;
    }
  }

  render(){
    if(this.props.coinsNav.isChart){
      return (
        <ChartScreen
          name={this.props.coinsNav.coinName}
          source={{uri: `${this.props.coinsNav.coinUrl}`}}
          />
      );
    } else {
      return(
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.hamburgerBtn}
            >
              <Image source={require('../img/menubar-icon.png')}/>
            </TouchableOpacity>
            <View style={styles.logoTextBlock}>
              <Text style={styles.logoText}>NEWSBTC</Text>
            </View>
            <View style={styles.headerNavBlock}>
              <TouchableOpacity
                style={styles.editBtn}
              >
                <Image source={require('../img/filter-icon.png')}/>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.searchBtn}
              >
                  <Image source={require('../img/search-icon.png')}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.navCoinsMenu}>
            <TouchableOpacity
              style={styles.btnNavCoinsMenu}
              onPress={this.props.goTopCoins}
            >
              <Text style={[(this.props.coinsNav.isTopCoins ? styles.activeText : styles.inactiveText), styles.navFontText, styles.navFontTextTop]}>Top 100</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnNavCoinsMenu}
              onPress={this.props.goAllCoins}
            >
              <Text style={[(this.props.coinsNav.isAllCoins ? styles.activeText : styles.inactiveText), styles.navFontText, styles.navFontTextAll]}>All Coins</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnNavCoinsMenu}
            >
              <Text style={[(this.props.coinsNav.isExchanges ? styles.activeText : styles.inactiveText), styles.navFontText, styles.navFontTextExchanges]}>Exchanges</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnNavCoinsMenu}
            >
              <Text style={[(this.props.coinsNav.isPairs ? styles.activeText : styles.inactiveText), styles.navFontText, styles.navFontTextPairs]}>Pairs</Text>
            </TouchableOpacity>
          </View>
            {this.navigation()}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c'
  },
  header: {
    width: '100%',
    height: 46,
    flexDirection: 'row',
    backgroundColor: '#035a79'
  },
  hamburgerBtn: {
    flex: 1,
    margin: 0,
    paddingTop: 16,
    paddingLeft: 16
  },
  logoTextBlock: {
    flex: 1,
    paddingLeft: 1
  },
  logoText: {
    color: '#fff',
    fontFamily: 'HelveticaNeue-Bold',
    fontWeight: '400',
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 10
  },
  editBtn: {
    paddingTop: 6,
    paddingRight: 17
  },
  searchBtn: {
    paddingTop: 6
  },
  headerNavBlock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginRight: 15
  },
  navCoinsMenu: {
    flexDirection: 'row',
    height: 38,
    backgroundColor: 'rgba(3, 90, 121, 0.58)',
  },
  btnNavCoinsMenu: {
    flex: 1,
    paddingTop: 4
  },
  navFontText: {
    fontFamily: 'Avenir-Medium',
    fontSize: 16,
    fontWeight: '400',
  },
  navFontTextTop: {
    paddingLeft: 19
  },
  navFontTextAll: {
    paddingLeft: 14
  },
  navFontTextExchanges: {
    paddingLeft: 11
  },
  navFontTextPairs: {
    paddingLeft: 27
  },
  activeText: {
    color: '#fff'
  },
  inactiveText: {
    color: 'rgba(255, 255, 255, 0.4)'
  }
});

const mapStateToProps = (state) => {
  return{
    coins: state.coins,
    coinsNav: state.coinsNav
  }
};


export default connect(mapStateToProps, { goAllCoins, goTopCoins })(Coins);
