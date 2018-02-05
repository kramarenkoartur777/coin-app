import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { goHamburger, closeHamburger } from '../actions/MenuNavActions';
import { goBitcoin, goAltcoin, goIco, goAnalysys, goSponsored, goDerivatives, goLatest } from '../actions/MenuNavNewsActions';

class MenuNews extends Component {
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={this.props.goHamburger}
            style={styles.hamburgerBtn}
          >
            <Image source={require('../img/menubar-icon.png')}/>
          </TouchableOpacity>
          <View style={styles.logoTextBlock}>
            <Text style={styles.logoText}>NEWSBTC</Text>
          </View>
        </View>
        <View style={styles.navCoinsMenu}>
        <ScrollView horizontal
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.btnNavCoinsMenu}
            onPress={this.props.goLatest}
          >
            <Text style={[(this.props.menuNews.isLatest ? styles.activeText : styles.inactiveText), styles.navFontText]}>Latest</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnNavCoinsMenu}
            onPress={this.props.goBitcoin}
          >
            <Text style={[(this.props.menuNews.isBitcoin ? styles.activeText : styles.inactiveText), styles.navFontText]}>Bitcoin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnNavCoinsMenu}
            onPress={this.props.goAltcoin}
          >
            <Text style={[(this.props.menuNews.isAltcoin ? styles.activeText : styles.inactiveText), styles.navFontText]}>Altcoin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnNavCoinsMenu}
            onPress={this.props.goIco}
          >
            <Text style={[(this.props.menuNews.isIco ? styles.activeText : styles.inactiveText), styles.navFontText]}>ICO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnNavCoinsMenu}
            onPress={this.props.goAnalysys}
          >
            <Text style={[(this.props.menuNews.isAnalysys ? styles.activeText : styles.inactiveText), styles.navFontText]}>Analysis</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnNavCoinsMenu}
            onPress={this.props.goSponsored}
          >
            <Text style={[(this.props.menuNews.isSponsored ? styles.activeText : styles.inactiveText), styles.navFontText]}>Sponsored</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnNavCoinsMenu}
            onPress={this.props.goDerivatives}
          >
            <Text style={[(this.props.menuNews.isDerivatives ? styles.activeText : styles.inactiveText), styles.navFontText]}>Derivatives</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1c'
  },
  header: {
    width: '100%',
    height: 46,
    flexDirection: 'row',
    backgroundColor: '#035a79'
  },
  hamburgerBtn: {
    flex: 0.9,
    margin: 0,
    paddingTop: 16,
    paddingLeft: 16
  },
  logoTextBlock: {
    flex: 2,
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
  navCoinsMenu: {
    flexDirection: 'row',
    height: 39,
    backgroundColor: 'rgba(3, 90, 121, 0.58)',
  },
  btnNavCoinsMenu: {
    flex: 1,
    paddingHorizontal: 25,
    alignSelf: 'center'
  },
  navFontText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
  },
  activeText: {
    color: '#fff'
  },
  inactiveText: {
    color: 'rgba(156, 156, 156, 0.6)'
  }
});

const mapStateToProps = (state) => {
  return {
    menuNews: state.menuNews,
    menuNav: state.menuNav
  }
};

export default connect(mapStateToProps, { goLatest, goBitcoin, goAltcoin, goIco, goAnalysys, goSponsored, goDerivatives, goHamburger, closeHamburger })(MenuNews);
