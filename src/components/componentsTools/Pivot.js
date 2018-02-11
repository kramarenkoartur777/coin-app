import React, { Component } from 'react';
import { Alert, WebView , StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ListView, TextInput, BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

import { connect } from 'react-redux';
import { backTools } from '../../actions/ToolsActions';


function toFixed(num,decim) { num *= Math.pow(10,decim); num = Math.round(num); num /= Math.pow(10,decim); return num; }


class Pivot extends Component {
  constructor(){
    super();
    this.state = {
      classic: true,
      woodiess: false,
      camarilla: false,
      text: '',
      HRate: '',
      LRate: '',
      CRate: '',
      ORate: '',

      classic_resistance3: '',
      classic_resistance2: '',
      classic_resistance1: '',
      classic_pivotpoint: '',
      classic_support1: '',
      classic_support2: '',
      classic_support3: '',

      woodies_resistance2: '',
      woodies_resistance1: '',
      woodies_pivotpoint: '',
      woodies_support1: '',
      woodies_support2: '',

      camarilla_resistance4: '',
      camarilla_resistance3: '',
      camarilla_resistance2: '',
      camarilla_resistance1: '',
      camarilla_support1: '',
      camarilla_support2: '',
      camarilla_support3: '',
      camarilla_support4: '',

      error: ''
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
  btc_piv_submit(){
    const { HRate, LRate, CRate, ORate } = this.state;
  	var high = parseFloat(HRate);
  	var low = parseFloat(LRate);
  	var close = parseFloat(CRate);
  	var open = parseFloat(ORate);

    let error = '';

  	if(high >= low && high >= close && high >= open && low <= close && low <=open)
  	{
  		var bpivot = (high + low + close) / 3;
  		var bsup1,res1;
  		bsup1 = 2 * bpivot - high;
  		bres1 = 2 * bpivot - low;

  		 /* For Classic       */
  		classic_resistance1 = toFixed(bres1,2);  //
  		classic_resistance2 = toFixed(bpivot+(bres1-bsup1),2);
  		classic_resistance3 = toFixed(high + 2*(bpivot - low),2);
  		classic_pivotpoint  = toFixed(bpivot,2);
  		classic_support1    = toFixed(bsup1,2);
  		classic_support2    = toFixed(bpivot - (bres1 - bsup1),2);
  		classic_support3    = toFixed(low - 2*(high - bpivot),2);


  		 /* For woodies       */
  		var wpivot = (high + low + (2 * close))/4;

  		woodies_resistance1 = toFixed((2*wpivot)-low,2);
  		woodies_resistance2 = toFixed(wpivot + high - low,2);
  		woodies_pivotpoint  = toFixed(wpivot,2);
  		woodies_support1    = toFixed((2 * wpivot) - high,2);
  		woodies_support2    = toFixed((wpivot - high) + low,2);


  		 /* For Camarilla       */
  		camarilla_resistance1 = toFixed(close + ((high - low) * (1.1/12)),2);
  		camarilla_resistance2 = toFixed(close + ((high - low) * (1.1/6)),2);
  		camarilla_resistance3 = toFixed(close + ((high - low) * (1.1/4)),2);
  		camarilla_resistance4 = toFixed(close + ((high - low) * (1.1/2)),2);

  		camarilla_support1 = toFixed(close - ((high - low) * (1.1/12)),2);
  		camarilla_support2 = toFixed(close - ((high - low) * (1.1/6)),2);
  		camarilla_support3 = toFixed(close - ((high - low) * (1.1/4)),2);
  		camarilla_support4 = toFixed(close - ((high - low) * (1.1/2)),2);
  	}
  	else {
  		if(high < low){error ="High cannot be less then Low";}
  		if(high < close){error = "High cannot be less then Close";}
  		if(high < open){error = "High cannot be less then Open";}
  		if(low > close){error = "Low cannot be greater then Close";}
  		if(low > open){error = "Low cannot be greater then Open";}
    }

    if(error == ''){
      this.setState({
        classic_resistance3: classic_resistance3,
        classic_resistance2: classic_resistance2,
        classic_resistance1: classic_resistance1,
        classic_pivotpoint: classic_pivotpoint,
        classic_support1: classic_support1,
        classic_support2: classic_support2,
        classic_support3: classic_support3,

        woodies_resistance2: woodies_resistance2,
        woodies_resistance1: woodies_resistance1,
        woodies_pivotpoint: woodies_pivotpoint,
        woodies_support1: woodies_support1,
        woodies_support2: woodies_support2,

        camarilla_resistance4: camarilla_resistance4,
        camarilla_resistance3: camarilla_resistance3,
        camarilla_resistance2: camarilla_resistance2,
        camarilla_resistance1: camarilla_resistance1,
        camarilla_support1: camarilla_support1,
        camarilla_support2: camarilla_support2,
        camarilla_support3: camarilla_support3,
        camarilla_support4: camarilla_support4,

        error: ''
      })
    } else {
      this.setState({error: error})
    }


  }
  numberWithCommas(n) {
    var parts=n.toString().split(".");
    const p = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    return p;
  }
  renderResult(){
    const { error, classic, woodiess, camarilla, camarilla_resistance4, camarilla_resistance3, camarilla_resistance2, camarilla_resistance1, camarilla_support1, camarilla_support2, camarilla_support3, camarilla_support4,
    classic_resistance3, classic_resistance2, classic_resistance1, classic_pivotpoint, classic_support1, classic_support2, classic_support3, woodies_resistance2, woodies_resistance1, woodies_pivotpoint, woodies_support1, woodies_support2 } = this.state;
    if(classic){
      return(
        <View style={{marginTop: 14, marginBottom: 100}}>

          <View style={styles.classicBlocks}>
            <Text style={[styles.resText3, styles.textAll]}>Resistence 3</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(classic_resistance3)}</Text>
          </View>
          <View style={styles.classicBlocks}>
            <Text style={[styles.resText2, styles.textAll]}>Resistence 2</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(classic_resistance2)}</Text>
          </View>
          <View style={styles.classicBlocks}>
            <Text style={[styles.resText1, styles.textAll]}>Resistence 1</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(classic_resistance1)}</Text>
          </View>
          <View style={styles.classicBlocks}>
            <Text style={[styles.pivotPoint, styles.textAll]}>Pivot Point</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(classic_pivotpoint)}</Text>
          </View>
          <View style={styles.classicBlocks}>
            <Text style={[styles.support1, styles.textAll]}>Support 1</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(classic_support1)}</Text>
          </View>
          <View style={styles.classicBlocks}>
            <Text style={[styles.support2, styles.textAll]}>Support 2</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(classic_support2)}</Text>
          </View>
          <View style={styles.classicBlocks}>
            <Text style={[styles.support3, styles.textAll]}>Support 3</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(classic_support3)}</Text>
          </View>
        </View>
      );
    } else if(woodiess){
      return(
        <View style={{marginTop: 14, marginBottom: 100}}>
          <View style={styles.classicBlocks}>
            <Text style={[styles.resText2, styles.textAll]}>Resistence 2</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(woodies_resistance2)}</Text>
          </View>
          <View style={styles.classicBlocks}>
            <Text style={[styles.resText1, styles.textAll]}>Resistence 1</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(woodies_resistance1)}</Text>
          </View>
          <View style={styles.classicBlocks}>
            <Text style={[styles.pivotPoint, styles.textAll]}>Pivot Point</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(woodies_pivotpoint)}</Text>
          </View>
          <View style={styles.classicBlocks}>
            <Text style={[styles.support1, styles.textAll]}>Support 1</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(woodies_support1)}</Text>
          </View>
          <View style={styles.classicBlocks}>
            <Text style={[styles.support2, styles.textAll]}>Support 2</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(woodies_support2)}</Text>
          </View>
        </View>
      );
    } else if(camarilla){
      return(
        <View style={{marginTop: 14, marginBottom: 100}}>
          <View style={styles.classicBlocks}>
            <Text style={[styles.resText4, styles.textAll]}>Resistence 4</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(camarilla_resistance4)}</Text>
          </View>
          <View style={styles.classicBlocks}>
            <Text style={[styles.resText3, styles.textAll]}>Resistence 3</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(camarilla_resistance3)}</Text>
          </View>
          <View style={styles.classicBlocks}>
            <Text style={[styles.resText2, styles.textAll]}>Resistence 2</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(camarilla_resistance2)}</Text>
          </View>
          <View style={styles.classicBlocks}>
            <Text style={[styles.resText1, styles.textAll]}>Resistence 1</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(camarilla_resistance1)}</Text>
          </View>
          <View style={styles.classicBlocks}>
            <Text style={[styles.support1, styles.textAll]}>Support 1</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(camarilla_support1)}</Text>
          </View>
          <View style={styles.classicBlocks}>
            <Text style={[styles.support2, styles.textAll]}>Support 2</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(camarilla_support2)}</Text>
          </View>
          <View style={styles.classicBlocks}>
            <Text style={[styles.support3, styles.textAll]}>Support 3</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(camarilla_support3)}</Text>
          </View>
          <View style={styles.classicBlocks}>
            <Text style={[styles.support4, styles.textAll]}>Support 4</Text>
            <Text style={styles.priceText}>{this.numberWithCommas(camarilla_support4)}</Text>
          </View>
        </View>
      );
    }
  }
  render(){
    console.log(this.state.error)
    return(
      <View style={styles.container}>

        <ScrollView>
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
              <Text style={styles.logoNameText}>Pivot Point Calculator</Text>
            </View>
          </View>
          <View style={styles.calculatorBlock}>
            <Text style={styles.titles}>High</Text>
            <TextInput
              onChangeText={(text) => this.setState({HRate: text})}
              autoCorrect={false}
              keyboardType='numeric'
              underlineColorAndroid='#3f73b0'
              style={styles.textInputStl}
            />
            <Text style={styles.titles}>Low</Text>
            <TextInput
              onChangeText={(text) => this.setState({LRate: text})}
              autoCorrect={false}
              keyboardType='numeric'
              underlineColorAndroid='#3f73b0'
              style={styles.textInputStl}
            />
            <Text style={styles.titles}>Close</Text>
            <TextInput
              onChangeText={(text) => this.setState({CRate: text})}
              autoCorrect={false}
              keyboardType='numeric'
              underlineColorAndroid='#3f73b0'
              style={styles.textInputStl}
            />
            <Text style={styles.titles}>Open</Text>
            <TextInput
              onChangeText={(text) => this.setState({ORate: text})}
              autoCorrect={false}
              keyboardType='numeric'
              underlineColorAndroid='#3f73b0'
              style={styles.textInputStl}
            />
            <TouchableOpacity
              onPress={() => {
                if(this.state.HRate == '' || this.state.LRate == '' || this.state.CRate == '' || this.state.ORate == ''){
                  return null
                } else {
                  this.btc_piv_submit()
                }
              }}
              style={styles.calculateBtn}>
              <LinearGradient colors={['#035a79', '#035a79']} style={styles.linearGradient}
                start={{y: 0.5, x: 0.0}}
                end={{y: 0.0, x: 1.0}}
              >
                <Text style={styles.calculateBtnText}>Calculate</Text>
              </LinearGradient>
            </TouchableOpacity>

            {this.state.error == '' ? null : <Text style={styles.errorText}>{this.state.error}</Text>}

            <View style={styles.pivotNav}>
              <TouchableOpacity
                onPress={() => this.setState({classic: true, woodiess: false, camarilla: false})}
                style={[styles.pivotNavBtn]}>
                <Text style={[(this.state.classic ? styles.active : styles.inactive), styles.pivotNavTitle]}>Classic</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({classic: false, woodiess: true, camarilla: false})}
                style={[styles.pivotNavBtn]}>
                <Text style={[(this.state.woodiess ? styles.active : styles.inactive), styles.pivotNavTitle]}>{"Woodies's"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({classic: false, woodiess: false, camarilla: true})}
                style={[styles.pivotNavBtn]}>
                <Text style={[(this.state.camarilla ? styles.active : styles.inactive), styles.pivotNavTitle]}>Camarilla</Text>
              </TouchableOpacity>
            </View>
            {this.renderResult()}
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
    flex: 0.7
  },
  backBtnIcon: {
    width: 16,
    height: 12
  },
  logoNameBlock: {
    flex: 2
  },
  logoNameText: {
    fontFamily: "Avenir-Medium",
    fontSize: 18,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff"
  },
  linearGradient : {
    flex :  1 ,
    borderRadius :  4
  },
  calculatorBlock: {
    width: 183,
    marginTop: 22,
    alignSelf: 'center'
  },
  titles: {
    fontFamily: "Avenir-Medium",
    fontSize: 10,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#4a90e2",
    paddingLeft: 5,
    marginTop: 17
  },
  textInputStl: {
    margin: 0,
    padding: 0,
    paddingBottom: 5,
    paddingLeft: 5,
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Avenir-Medium'
  },
  calculateBtn: {
    height: 44,
    marginTop: 19
  },
  calculateBtnText: {
    fontSize: 18,
    fontFamily: 'Avenir-Medium',
    color: '#fff',
    height: '100%',
    textAlignVertical: 'center',
    alignSelf: 'center'
  },
  pivotNav: {
    flexDirection: 'row',
    marginTop: 26,
    alignItems: 'center',
  },
  pivotNavBtn: {
    flex: 1,
    height: 22,
  },
  pivotNavTitle: {
    height: 22,
    fontSize: 10,
    fontFamily: "Avenir-Medium",
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center'
  },
  active: {
    backgroundColor: 'rgba(3, 90, 121, 0.8)',
    color: '#f8fafa',
  },
  inactive: {
    backgroundColor: 'rgba(3, 90, 121, 0.4)',
    color: 'rgba(247, 250, 250, 0.5)'
  },
  classicBlocks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 27
  },
  priceText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Avenir-Medium',
  },
  textAll: {
    fontSize: 14,
    fontFamily: 'Avenir-Medium',
    textAlignVertical: 'center'
  },
  resText4: {
    color: '#f7350e'
  },
  resText3: {
    color: 'rgba(247, 53, 14, 0.9)'
  },
  resText2: {
    color: 'rgba(247, 53, 14, 0.85)'
  },
  resText1: {
    color: 'rgba(247, 53, 14, 0.7)'
  },
  pivotPoint: {
    color: '#f4c32f'
  },
  support1: {
    color: 'rgba(14, 247, 89, 0.7)'
  },
  support2: {
    color: 'rgba(14, 247, 89, 0.85)'
  },
  support3: {
    color: 'rgba(14, 247, 89, 0.9)'
  },
  support4: {
    color: '#0ef759'
  },
  errorText: {
    color: '#f7350e',
    fontSize: 14,
    fontFamily: 'Avenir-Medium',
    alignSelf: 'center',
    marginTop: 10,
    textAlign: 'center'
  }
});

const mapStateToProps = (state) => {
  return {
    menuNav: state.menuNav,
    tools: state.tools
  }
}

export default connect(mapStateToProps, { backTools })(Pivot);
