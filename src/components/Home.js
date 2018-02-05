import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

import { goCoins, goNews, goTools, goPortfolio, closeHamburger, goMyFavorites, goMyFavoritesNews } from '../actions/MenuNavActions';

import Coins from './Coins';
import News from './News';
import MyFavorites from './MyFavorites';

class Home extends Component {
  constructor(){
    super();
    this.state = {
      splash: true,
    };
    setTimeout(() => {
      this.setState({splash: false})
    }, 3000);
  }
  renderMenuNav(){
    if(this.props.menuNav.isCoins){
      return <Coins />;
    } else if(this.props.menuNav.isNews){
      return <News />;
    } else if(this.props.menuNav.isFavorites){
      return <MyFavorites />;
    }
  }
  hamburgerMneu(){
    return(
      <View style={styles.hamburgerContainer}>
        <View style={styles.hamburgerMenuBlock}>
            <View style={styles.logoBlock}>
              <Image style={styles.logoIcon} source={require('../img/Artboard-1x.png')}/>
            </View>
            <TouchableOpacity style={styles.myFavoritesBtn}
              onPress={this.props.menuNav.isCoins ? this.props.goMyFavorites : this.props.goMyFavoritesNews}>
              <Image style={styles.myFavoritesIcon} source={require('../img/heart-icon-3x.png')}/>
              <Text style={styles.myFavoritesText}>Favorite News</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={this.props.closeHamburger}
          style={{backgroundColor: 'rgba(0, 0, 0, 0.1)', flex: 1}}
        ></TouchableOpacity>
      </View>
    );
  }
  splashFunc(){
    return(
      <View style={styles.splashContainer}>
        <Image
          style={styles.splashIcon}
          source={require('../img/DefaultIcon.png')}
        />
      </View>
    );
  }
  render(){
    console.disableYellowBox = true;
    const { menuNav } = this.props;
    if(this.state.splash){
      return this.splashFunc();
    } else {
      return(
        <View style={styles.container}>
        {menuNav.hamburger ? this.hamburgerMneu() : null}

            <View style={{ flex: 1}}>

            {this.renderMenuNav()}

            <View style={styles.bottomBar}>
              <TouchableOpacity
                style={[styles.btnMenu, styles.btnMenuCoins]}
                onPress={this.props.goCoins}
              >
                <Image source={require('../img/Coins-icon-3x.png')} style={[(menuNav.isCoins ? styles.btnMenuTextActive : styles.btnMenuTextInactive), styles.iconMarket]}/>
                <Text style={[(menuNav.isCoins ? styles.btnMenuTextActive : styles.btnMenuTextInactive), styles.textFont]}>Markets</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnMenu, styles.btnMenuNews]}
                onPress={this.props.goNews}
              >
                <Image source={require('../img/news-icon-3x.png')} style={[(menuNav.isNews || menuNav.isFavorites ? styles.btnMenuTextActive : styles.btnMenuTextInactive ), styles.iconNews]}/>
                <Text style={[(menuNav.isNews ? styles.btnMenuTextActive : styles.btnMenuTextInactive), styles.textFont]}>News</Text>
              </TouchableOpacity>

            </View>
            </View>
          </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1
  },
  splashIcon: {
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    zIndex: 1
  },
  hamburgerContainer: {
    width: '100%',
    height: 1090,
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
  },
  hamburgerMenuBlock: {
    width: 249,
    backgroundColor: '#1d252c'
  },
  myFavoritesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 49,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)'
  },
  myFavoritesIcon: {
    width: 15,
    height: 14,
    marginLeft: 13,
    marginRight: 9
  },
  myFavoritesText: {
    color: 'rgba(255, 255, 255, 0.99)',
    fontSize: 14,
    fontFamily: 'Avenir-Medium',
    fontWeight: '500'
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
    opacity: 1
  },
  btnMenuTextInactive: {
    opacity: 0.47
  },
  textFont: {
    fontSize: 10,
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    color: '#fff'
  },
  iconMarket: {
    width: 16,
    height: 16,
  },
  iconNews: {
    width: 20,
    height: 16
  },
  logoBlock: {
    width: '100%',
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)'
  },
  logoIcon: {
    width: 115,
    height: 24,
  }
});

const mapStateToProps = (state) => {
  return{
    menuNav: state.menuNav
  }
}

export default connect(mapStateToProps, { goCoins, goNews, goTools, goPortfolio, closeHamburger, goMyFavorites, goMyFavoritesNews })(Home);
