import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

import { goAllCoins, goExchanges, goPairs }  from '../actions/CoinsNavActions';
import { goTopCoins }  from '../actions/CoinsNavActions';
import { goHamburger, closeHamburger }  from '../actions/MenuNavActions';

import Top100Screen from './componentsCoins/Top100Screen';
import AllCoinsScreen from './componentsCoins/AllCoinsScreen';
import ChartScreen from './componentsCoins/ChartScreen';
import ExchangesScreen from './componentsCoins/ExchangesScreen';
import ExchangesDetails from './componentsCoins/ExchangesDetails';
import PairsScreen from './componentsCoins/PairsScreen';

class Coins extends Component {

  navigation(){
    if(this.props.coinsNav.isTopCoins){
      return <Top100Screen />;
    } else if(this.props.coinsNav.isAllCoins){
      return <AllCoinsScreen />;
    } else if(this.props.coinsNav.isExchanges){
      return <ExchangesScreen />;
    } else if(this.props.coinsNav.isPairs){
      return <PairsScreen />
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
    } else if(this.props.coinsNav.isExchangesDetails) {
      return <ExchangesDetails />
    } else {
      return(
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.hamburgerBtn}
              onPress={this.props.goHamburger}
            >
              <Image style={{width: 17, height: 10}} source={require('../img/menu-icon-3x.png')}/>
            </TouchableOpacity>
            <View style={styles.logoTextBlock}>
              <Text style={styles.logoText}>NEWSBTC</Text>
            </View>
            <View style={styles.headerNavBlock}>
              <TouchableOpacity
                style={styles.editBtn}
              >
                {/*<Image style={{width: 15, height: 10}} source={require('../img/filter-icon-3x.png')}/>*/}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.searchBtn}
              >
                  {/*<Image style={{width: 12, height: 14}} source={require('../img/search-icon-3x.png')}/>*/}
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
              onPress={this.props.goExchanges}
            >
              <Text style={[(this.props.coinsNav.isExchanges ? styles.activeText : styles.inactiveText), styles.navFontText, styles.navFontTextExchanges]}>Exchanges</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnNavCoinsMenu}
              onPress={this.props.goPairs}
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
    paddingTop: 7,
    paddingRight: 17
  },
  searchBtn: {
    paddingTop: 7
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
    coinsNav: state.coinsNav,
    menuNav: state.menuNav
  }
};


export default connect(mapStateToProps, { goAllCoins, goTopCoins, goExchanges, goPairs, goHamburger, closeHamburger })(Coins);
