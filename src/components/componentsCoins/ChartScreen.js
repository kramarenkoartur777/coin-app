import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, BackHandler } from 'react-native';
import { connect } from 'react-redux';

import { backBtnTop, backBtnAll } from '../../actions/CoinsNavActions';
import { goChartInfo, backChart, goMarketsInfo } from '../../actions/ChartNavActions';

import ChartInfo from './ChartInfo';
import MarketsInfo from './MarketsInfo';

class ChartScreen extends Component {
  constructor(){
    super();
    this.navigationChartScreen = this.navigationChartScreen.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    if(this.props.coinsNav.initBackBtn){
      this.props.backBtnTop();
      this.props.backChart();
      return true
    } else if(!this.props.coinsNav.initBackBtn){
      this.props.backBtnAll();
      this.props.backChart()
      return true
    }
    return true;
  }
  navigationChartScreen(){
    if(this.props.chartInfo.isChartInfo){
      return <ChartInfo />;
    } else if(this.props.chartInfo.isMarketsInfo){
      return <MarketsInfo />;
    }
  }
  backFunc(){
    if(this.props.coinsNav.initBackBtn){
      this.props.backBtnTop();
      this.props.backChart();
    } else {
      this.props.backBtnAll();
      this.props.backChart()
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {this.backFunc()}}
          >
            <Image style={styles.backBtnIcon} source={require('../../img/back-icon.png')}/>
          </TouchableOpacity>
          <View style={styles.coinName}>
            <Image style={styles.iconCoin} source={this.props.source} />
            <Text style={styles.textCoinName}>{this.props.name}</Text>
          </View>
          <View style={styles.headerNav}>
            <TouchableOpacity
              style={styles.searchBtn}
            >
              {/*<Image source={require('../../img/search-icon.png')}/>*/}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.savedBtn}
            >
              {/*<Image source={require('../../img/saved-coins-icon.png')}/>*/}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.navigation}>
          <TouchableOpacity
            onPress={() => this.props.goChartInfo()}
            style={styles.chartBtn}
          >
            <Text style={[(this.props.chartInfo.isChartInfo ? styles.active : styles.inactive), styles.chartText]}>Chart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.goMarketsInfo()}
            style={styles.marketsBtn}
          >
            <Text style={[(this.props.chartInfo.isMarketsInfo ? styles.active : styles.inactive), styles.marketText]}>Markets</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentBlockInfo}>
          {this.navigationChartScreen()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c'
  },
  header: {
    height: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#035a79'
  },
  backBtn: {
    flex: 0.8,
    justifyContent: 'center',
    paddingLeft: 17
  },
  coinName: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  headerNav: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  iconBackBtn: {
    color: '#fff',
    fontFamily: 'Avenir-Medium',
  },
  iconCoin: {
    width: 20,
    height: 20
  },
  textCoinName: {
    fontFamily: 'Avenir-Medium',
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
    paddingLeft: 8,
  },
  searchBtn: {
    paddingRight: 16
  },
  savedBtn: {
    paddingRight: 20
  },
  navigation: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'rgba(3, 90, 121, 0.58)',
  },
  chartBtn: {
    flex: 0.8,
    justifyContent: 'center'
  },
  chartText: {
    fontSize: 16,
    fontFamily: 'Avenir-Medium',
    paddingLeft: 18
  },
  marketsBtn: {
    flex: 2,
    justifyContent: 'center'
  },
  marketText: {
    fontSize: 16,
    fontFamily: 'Avenir-Medium',
    paddingLeft: 5,
  },
  contentBlockInfo: {
    flex: 1,
  },
  active: {
    color: '#fff'
  },
  inactive: {
    color: "rgba(255, 255, 255, 0.4)"
  },
  backBtnIcon: {
    width: 15,
    height: 12
  }
});

const mapStateToProps = (state) => {
  return{
    coinsNav: state.coinsNav,
    chartInfo: state.chartInfo
  }
};


export default connect(mapStateToProps, { backBtnTop, goMarketsInfo, goChartInfo, backChart, backBtnAll })(ChartScreen);
