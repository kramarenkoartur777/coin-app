import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView, BackHandler } from 'react-native';

import { connect } from 'react-redux';
import { backTools } from '../../actions/ToolsActions';

class Profit extends Component {
  constructor(){
    super();
    this.state = {
      radio: true,
      result: '3,057,587.18'
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
  render(){
    let res = this.state.result.replace(/,/g, '');
    let resNum = Number(res);
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
              <Text style={styles.logoNameText}>Profit Calculator</Text>
            </View>
          </View>
          <View style={styles.calculatorBlock}>
            <Text style={styles.titles}>Account Currency</Text>
            <TouchableOpacity
              style={styles.usdBtn}
            >
              <Text style={styles.usdBtnText}>USD</Text>
              <Image style={styles.pickerUsd} source={require('../../img/pickerIcon.png')} />
            </TouchableOpacity>

            <Text style={styles.titles}>Currency Pair</Text>
            <TouchableOpacity
              style={styles.pairBtn}
            >
              <Text style={styles.pairBtnText}>BTC / GBR</Text>
              <Image style={styles.pickerPair} source={require('../../img/pickerIcon.png')} />
            </TouchableOpacity>

            <Text style={styles.titles}>Action</Text>
            <View style={styles.actionBlock}>
              <View style={styles.buyBlock}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({radio: true})
                  }}
                  style={styles.radio}
                >
                  {this.state.radio ? <View style={styles.radioInside} /> : null}
                </TouchableOpacity>
                <Text style={styles.buyText}> Buy / Long</Text>
              </View>
              <View style={styles.sellBlock}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({radio: false})
                  }}
                  style={styles.radio}
                >
                  {this.state.radio ? null : <View style={styles.radioInside} />}
                </TouchableOpacity>
                <Text style={styles.sellText}> Sell / Short</Text>
              </View>
            </View>

            <Text style={styles.titles}>Trade Size</Text>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid='#3f73b0'
            />

            <Text style={styles.titles}>Closing Trade Price</Text>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid='#3f73b0'
            />

            <Text style={styles.titles}>Opening Trade Price</Text>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid='#3f73b0'
            />

            <TouchableOpacity
              style={styles.calculateBtn}
            >
              <Text style={styles.calculateText}>Calculate</Text>
            </TouchableOpacity>

            <Text style={styles.resultBlock}>Result</Text>

            <Text style={resNum > 0 ? styles.resultTextPlus : styles.resultTextMinus}>{this.state.result}<Text style={styles.resultUsd}> USD</Text></Text>
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
    fontFamily: "Avenir-Medium",
    fontSize: 18,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff"
  },
  calculatorBlock: {
    width: 183,
    marginTop: 43,
    alignSelf: 'center'
  },
  titles: {
    color: '#4a90e2',
    fontSize: 10,
    fontFamily: 'Avenir-Medium'
  },
  usdBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 29,
    borderBottomColor: '#3f73b0',
    borderBottomWidth: 1
  },
  pairBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    borderBottomColor: '#3f73b0',
    borderBottomWidth: 1
  },
  usdBtnText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Avenir-Medium'
  },
  pairBtnText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Avenir-Medium'
  },
  pickerUsd: {
    width: 10,
    height: 5
  },
  pickerPair: {
    width: 10,
    height: 5,
  },
  radio: {
    width: 9,
    height: 9,
    borderColor: '#4a90e2',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInside: {
    width: 5,
    height: 5,
    backgroundColor: '#4a90e2',
    borderRadius: 10,
  },
  buyBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3
  },
  sellBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18
  },
  buyText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: "Avenir-Medium",
    marginLeft: 3
  },
  sellText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: "Avenir-Medium",
    marginLeft: 3
  },
  textInput: {
    margin: 0,
    padding: 0,
    paddingBottom: 5,
    marginBottom: 18
  },
  calculateBtn: {
    borderRadius: 4,
    height: 44,
    backgroundColor: "#035a79",
    alignItems: 'center',
    justifyContent: "center"
  },
  calculateText: {
    fontFamily: 'Avenir-Medium',
    color: '#fff',
    fontSize: 18
  },
  resultBlock: {
    alignSelf: 'center',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 18,
    fontFamily: "Avenir-Medium",
    marginTop: 10,
  },
  resultUsd: {
    color: '#fff',
    fontFamily: 'Avenir-Medium',
    fontSize: 18
  },
  resultTextPlus: {
    fontFamily: 'Avenir-Medium',
    fontSize: 20,
    color: '#66b609',
    marginBottom: 49
  },
  resultTextMinus: {
    fontFamily: 'Avenir-Medium',
    fontSize: 20,
    color: '#e53935',
    marginBottom: 49
  }
});

const mapStateToProps = (state) => {
  return {
    menuNav: state.menuNav,
    tools: state.tools
  }
}

export default connect(mapStateToProps, { backTools })(Profit);
