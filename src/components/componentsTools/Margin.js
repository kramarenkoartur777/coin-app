import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView, BackHandler } from 'react-native';

import { connect } from 'react-redux';
import { backTools } from '../../actions/ToolsActions';

class Margin extends Component {
  constructor(){
    super();
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
              <Text style={styles.logoNameText}>Margin Calculator</Text>
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

            <Text style={styles.titles}>Conversion Price</Text>
            <TextInput
              style={styles.textInput}
              defaultValue='8198.98'
              autoCorrect={false}
              keyboardType='numeric'
              maxLength={15}
              underlineColorAndroid='#3f73b0'
            />

            <Text style={styles.titles}>Margin Ratio</Text>
            <TouchableOpacity
              style={styles.pairBtn}
            >
              <Text style={styles.pairBtnText}>1:1</Text>
              <Image style={styles.pickerPair} source={require('../../img/pickerIcon.png')} />
            </TouchableOpacity>

            <Text style={styles.titles}>Trade Size</Text>
            <TextInput
              style={styles.textInput}
              defaultValue='1000'
              autoCorrect={false}
              keyboardType='numeric'
              maxLength={15}
              underlineColorAndroid='#3f73b0'
            />

            <TouchableOpacity
              style={styles.calculateBtn}
            >
              <Text style={styles.calculateText}>Calculate</Text>
            </TouchableOpacity>

            <Text style={styles.marginUsedTitle}>Margin Used</Text>
            <Text style={styles.marginUsedPrice}>USD 11,400,329.30</Text>

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
    fontFamily: 'Avenir-Medium',
    marginHorizontal: 5
  },
  usdBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 29,
    borderBottomColor: '#3f73b0',
    borderBottomWidth: 1,
    marginHorizontal: 5
  },
  pairBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    borderBottomColor: '#3f73b0',
    borderBottomWidth: 1,
    marginHorizontal: 5
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
  textInput: {
    margin: 0,
    padding: 0,
    paddingBottom: 5,
    marginBottom: 18,
    color: '#fff',
    fontFamily: 'Avenir-Medium',
    fontSize: 14,
    paddingLeft: 5
  },
  calculateBtn: {
    borderRadius: 4,
    height: 44,
    backgroundColor: "#035a79",
    alignItems: 'center',
    justifyContent: "center",
    marginHorizontal: 5,
    marginBottom: 18
  },
  calculateText: {
    fontFamily: 'Avenir-Medium',
    color: '#fff',
    fontSize: 18
  },
  marginUsedTitle: {
    height: 30,
    alignSelf: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    fontFamily: 'Avenir-Medium',
    color: 'rgba(255, 255, 255, 0.75)',
  },
  marginUsedPrice: {
    fontSize: 20,
    fontFamily: 'Avenir-Medium',
    alignSelf: 'center',
    color: '#fff'
  }
});

const mapStateToProps = (state) => {
  return {
    menuNav: state.menuNav,
    tools: state.tools
  }
}

export default connect(mapStateToProps, { backTools })(Margin);
