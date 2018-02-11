import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform, BackHandler, Alert, Image, ImageBackground, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { Router, Scene, Actions } from 'react-native-router-flux';

import { goCoins, goNews, goTools, goPortfolio, closeHamburger, goMyFavorites } from '../actions/MenuNavActions';
import { goHeatmap, goMargin, goProfit, goPivot, goFibonnaci, goAirdrop } from '../actions/ToolsActions';
import { backNews } from '../actions/DetailNewsActions';
import { closeAllNews } from '../actions/MenuNavNewsActions';

import Coins from './Coins';
import News from './News';
import MyFavorites from './MyFavorites';
import Tools from './Tools';

import Heatmap from './componentsTools/Heatmap';
import Margin from './componentsTools/Margin';
import Profit from './componentsTools/Profit';
import Pivot from './componentsTools/Pivot';
import Fibonnaci from './componentsTools/Fibonnaci';
import Airdrop from './componentsTools/Airdrop';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      doubleBackToExitPressedOnce: false
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
      return true
    } else if(this.state.doubleBackToExitPressedOnce) {
      BackHandler.exitApp();
    }
    ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
    this.setState({ doubleBackToExitPressedOnce: true });
    setTimeout(() => {
      this.setState({ doubleBackToExitPressedOnce: false });
    }, 2000);
    return true;
  }
  fetchcal(){
    axios.get('https://tools.newsbtc.com/app/app-pivot-calculator/?high=10&low=2&close=4&open=5')
    .then((res) => {
      console.log(res)
    })
  }
  renderMenuNav(){
    if(this.props.menuNav.isCoins){
      return <Coins />;
    } else if(this.props.menuNav.isNews){
      return <News />;
    } else if(this.props.menuNav.isTools){
      return <Tools />;
    }
  }
  hamburgerMneu(){
    const { isCoins, isNews, isTools } = this.props.menuNav;
    return(
      <View style={styles.hamburgerContainer}>
        <View style={styles.hamburgerMenuBlock}>
          <View style={styles.logoBlock}>
            <Image style={styles.logoIcon} source={require('../img/Artboard-1x.png')}/>
          </View>
          <Text style={styles.titleLinks}>Personal</Text>
          <TouchableOpacity style={styles.myFavoritesBtn}
            onPress={this.props.goMyFavorites}>
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

  hamburgerScene(){
    const { menuNav } = this.props;
    if(menuNav.isFavorites){
      return <MyFavorites />;
    } else if(this.props.tools.heatmap){
      return <Heatmap />;
    } else if(this.props.tools.margin){
      return <Margin />;
    } else if(this.props.tools.profit){
      return <Profit />;
    } else if(this.props.tools.pivot){
      return <Pivot />;
    } else if(this.props.tools.fibonnaci){
      return <Fibonnaci />;
    } else if(this.props.tools.airdrop){
      return <Airdrop />;
    } else {
      return(
        <View style={{ flex: 1}}>
          {this.renderMenuNav()}
        </View>
      );
    }
  }
  render(){
    console.disableYellowBox = true;
    const { menuNav } = this.props;
    return(

      <View style={styles.container}>
        {menuNav.hamburger ? this.hamburgerMneu() : null}
        <View style={{flex: 1}}>
          {this.hamburgerScene()}
          <View style={styles.bottomBar}>
            <TouchableOpacity
              style={[styles.btnMenu, styles.btnMenuCoins]}
              onPress={() => {
                this.props.goCoins();

              }}
            >
              <Image source={require('../img/Coins-icon-3x.png')} style={[(menuNav.isCoins || menuNav.isFavorites ? styles.btnMenuTextActive : styles.btnMenuTextInactive), styles.iconMarket]}/>
              <Text style={[(menuNav.isCoins ? styles.btnMenuTextActive : styles.btnMenuTextInactive), styles.textFont]}>Markets</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnMenu, styles.btnMenuNews]}
              onPress={() => {
                this.props.goNews();
                this.props.backNews();
                this.props.closeAllNews()
              }}
            >
              <Image source={require('../img/news-icon-3x.png')} style={[(menuNav.isNews || menuNav.isFavorites ? styles.btnMenuTextActive : styles.btnMenuTextInactive ), styles.iconNews]}/>
              <Text style={[(menuNav.isNews ? styles.btnMenuTextActive : styles.btnMenuTextInactive), styles.textFont]}>News</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                style={[styles.btnMenu, styles.btnMenuNews]}
                onPress={this.props.goTools}
              >
                <Image source={require('../img/tools-icon-3x.png')} style={[(menuNav.isTools || menuNav.isFavorites ? styles.btnMenuTextActive : styles.btnMenuTextInactive ), styles.iconTools]}/>
                <Text style={[(menuNav.isTools ? styles.btnMenuTextActive : styles.btnMenuTextInactive), styles.textFont]}>Tools</Text>
              </TouchableOpacity> */}
          </View>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  iconTools: {
    width: 20,
    height: 16
  },
  titleLinks: {
    opacity: 0.5,
    fontFamily: "Avenir-Medium",
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "rgba(255, 255, 255, 0.99)",
    marginTop: 11,
    paddingLeft: 14
  }
});

const mapStateToProps = (state) => {
  return{
    coinsNav: state.coinsNav,
    menuNews: state.menuNews,
    menuNav: state.menuNav,
    tools: state.tools,
    detailNews: state.detailNews,
    nav: state.nav
  }
}

export default connect(mapStateToProps, { goCoins, goNews, goTools, goPortfolio, closeHamburger, goMyFavorites, goHeatmap, goMargin, goProfit, goPivot, goFibonnaci, goAirdrop, backNews, closeAllNews })(Home);
