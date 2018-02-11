import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ListView, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

import { connect } from 'react-redux';
import { goHeatmap, goMargin, goProfit, goPivot, goFibonnaci, goAirdrop } from '../../actions/ToolsActions';

class CalculatorsScreen extends Component {
  constructor(){
    super();
    this.state = {
      dataMarket: [],
      isFetching: true,
      sourceSort: false,
      pairSort: false,
      last_priceSort: false,
      picker: false,
      coinName: 'Bitcoin',
      coinUrl: 'https://tools.newsbtc.com/icons/bitcoin.png',
      price: '',
      percent_change_24h: '',
      symbol: 'BTC',
      text: '',
      rateval: '',
      sum: '',
      text: '',
      enableScrollViewScroll: false
    };
    this.data = [];
  }
  componentDidMount(){
    this.fetchMarket();
    const btc = 'BTC';
    this.fetchCalculator(btc);
  }
  fetchMarket(){
    axios.get('https://tools.newsbtc.com/app/app-all-coins.php?currenysymbol=USD&offset=0&limit=2000')
      .then((res) => {
        const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2});
        this.setState({
          dataSource: ds.cloneWithRows(res.data.records),
          coinName: res.data.records[0].name,
          coinUrl: res.data.records[0].imgurl,
          price: res.data.records[0].price,
          percent_change_24h: res.data.records[0].percent_change_24h,
          symbol: res.data.records[0].symbol,
          isFetching: false
        }, function(){
          this.data = res.data.records
        })
      })
  }
  fetchCalculator(sym){
    let symbol = sym;
    const url = 'https://tools.newsbtc.com/api/fx.php?fromid=';
    axios.get(`${url}${symbol}&toid=USD`)
      .then((res) => {
        if(res.data.rateval === null){
          this.setState({ rateval: '0', sum: '0'})
        } else {
          this.setState({rateval: res.data.rateval, sum: res.data.rateval})
        }
      })
  }
  sumFunc(num){
    let rat = Number(this.state.rateval);
    let n = Number(num);
    let sum = n * rat;
    this.setState({sum: sum})
  }
  numberWithCommas(n) {
    var parts=n.toString().split(".");
    const p = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    return p;
  }
  renderPickerBlock(){
    const {  text, isFetching, dataSource, picker} = this.state;
    if(isFetching){
      return null;
    } else if(picker){
      return(
        <View style={styles.pickerBlock}
          onStartShouldSetResponderCapture={() => {
             this.setState({ enableScrollViewScroll: false });
          }}
        >
          <TextInput
            autoCorrect={false}
            style={styles.textInputPicker}
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.SearchFilterFunction(text)}
            value={text}
          />
            <ListView
              styles={{flex: 1}}
              dataSource={dataSource}
              renderRow={(rowData) => {
                return(
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({picker: false, coinName: rowData.name, coinUrl: rowData.imgurl});
                      this.fetchCalculator(rowData.symbol)
                    }}
                    style={styles.coinPickerBtn}>
                    <Text style={styles.coinPickerTitle}>{rowData.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
        </View>
      );
    } else {
      return null;
    }
  }
  SearchFilterFunction(text){
    const newData = this.data.filter(function(item){
    const itemData = item.name.toUpperCase()
    const textData = text.toUpperCase()
    return itemData.indexOf(textData) > -1
    })
    this.setState({
    dataSource: this.state.dataSource.cloneWithRows(newData),
    text: text
    })
  }
  render(){
    return(
      <View style={styles.container}
        onStartShouldSetResponderCapture={() => {
            this.setState({ enableScrollViewScroll: true });
        }}
      >
      <ScrollView
        scrollEnabled={this.state.enableScrollViewScroll}
      >
          <View style={styles.curConverter}>
            <Text style={styles.curConverterTitle}>Currency Converter</Text>
            <View style={styles.converterForm}>
              <Text style={styles.from}>From</Text>
              <View style={styles.fromBlock}>
                <TextInput
                  autoCorrect={false}
                  defaultValue='1'
                  keyboardType='numeric'
                  maxLength={10}
                  onChangeText={(num) => {
                    this.sumFunc(num)
                  }}
                  /*onEndEditing={() => } функция при завершении ввода*/
                  underlineColorAndroid='transparent'
                  style={styles.textInput}
                />
                <TouchableOpacity
                  onPress={() => this.setState((prevState => {
                    return{
                      picker: !prevState.picker
                    }
                  }))}
                  style={styles.coinName}>
                  <Image
                    style={styles.coinIcon}
                    source={{uri: this.state.coinUrl}}
                  />
                  <Text style={styles.coinNameText}>{this.state.coinName}</Text>
                  <Image
                    style={styles.pickerIcon}
                    source={require('../../img/pickerIcon.png')}
                    />
                </TouchableOpacity>
              {this.renderPickerBlock()}
              </View>
              <Text style={styles.to}>To</Text>
              <View style={styles.toBlock}>
                <Text style={styles.textInput}>{this.numberWithCommas(this.state.sum)}</Text>
                <TouchableOpacity
                  style={styles.usdBtn}>
                  <Text style={styles.usdText}>USD</Text>
                  <Image
                    style={styles.pickerIcon}
                    source={require('../../img/pickerIcon.png')}
                    />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.tools}>
            <Text style={styles.toolsTitle}>Tools</Text>
            <TouchableOpacity
              onPress={this.props.goHeatmap}
              style={styles.heatmapBtn}>
              <LinearGradient colors={['#0793b1', '#035a79']} style={styles.linearGradient}
                start={{y: 0.5, x: 0.0}}
                end={{y: 0.0, x: 1.0}}
              >
                <Text style={styles.heatmapText}>Heatmap</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.calculatorBlock}>
              <TouchableOpacity
                onPress={this.props.goMargin}
                style={styles.marginBtn}>
                <LinearGradient colors={['#0793b1', '#035a79']} style={styles.linearGradient}
                  start={{y: 0.0, x: 1.0}}
                  end={{y: 0.5, x: 0.0}}
                >
                  <Text style={styles.calculatorsText}>Margin Calculator</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.props.goProfit}
                style={styles.marginBtn}>
                <LinearGradient colors={['#0793b1', '#035a79']} style={styles.linearGradient}
                  start={{y: 0.5, x: 0.0}}
                  end={{y: 0.0, x: 1.0}}
                >
                  <Text style={styles.calculatorsText}>Profit Calculator</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.props.goPivot}
                style={styles.pivotBtn}>
                <LinearGradient colors={['#0793b1', '#035a79']} style={styles.linearGradient}
                  start={{y: 0.0, x: 1.0}}
                  end={{y: 0.5, x: 0.0}}
                >
                  <Text style={styles.calculatorsText}>Pivot Calculator</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.props.goFibonnaci}
                style={styles.pivotBtn}>
                <LinearGradient colors={['#0793b1', '#035a79']} style={styles.linearGradient}
                  start={{y: 0.5, x: 0.0}}
                  end={{y: 0.0, x: 1.0}}
                >
                  <Text style={styles.calculatorsText}>Fibonnaci Calculator</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={this.props.goAirdrop}
              style={styles.airdropBtn}>
              <LinearGradient colors={['#f9d423', '#e14fad']} style={styles.linearGradient}
                start={{y: 0.0, x: 1.0}}
                end={{y: 0.5, x: 0.0}}
              >
                <Text style={styles.airdropText}>Airdrop Alerts</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  curConverter: {
    flex: 1,
    height: 232,
    alignItems: 'center',
    paddingTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(249, 247, 247, 0.12)'
  },
  curConverterTitle: {
    fontFamily: 'Avenir-Medium',
    fontSize: 18,
    fontStyle: "normal",
    letterSpacing: 0,
    color: "rgba(255, 255, 255, 0.75)"
  },
  converterForm: {
    paddingTop: 17,
  },
  from: {
    fontFamily: "Avenir-Medium",
    fontSize: 10,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#4a90e2"
  },
  fromBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  coinName: {
    width: 76,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3f73b0',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textInput: {
    width: 76,
    height: 22,
    padding: 0,
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Avenir-Medium',
    margin: 0,
    borderBottomColor: '#3f73b0',
    borderBottomWidth: 1
  },
  coinIcon: {
    width: 10,
    height: 10,
    alignSelf: 'center'
  },
  coinNameText: {
    color: '#fff',
    fontFamily: 'Avenir-Medium',
    fontSize: 12,
    paddingLeft: 5
  },
  pickerIcon: {
    width: 10,
    height: 5,
    alignSelf: 'center',
    marginLeft: 5
  },
  to: {
    fontFamily: "Avenir-Medium",
    fontSize: 10,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#4a90e2",
    paddingTop: 30
  },
  toBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  usdBtn: {
    width: 76,
    borderBottomWidth: 1,
    borderBottomColor: '#3f73b0',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  usdText: {
    width: '80%',
    color: '#fff',
    fontFamily: 'Avenir-Medium',
    fontSize: 12,
    textAlign: 'center'
  },
  tools: {
    flex: 1
  },
  toolsTitle: {
    fontFamily: "Avenir-Medium",
    fontSize: 18,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "rgba(255, 255, 255, 0.75)",
    alignSelf: 'center',
    paddingTop: 15
  },
  linearGradient : {
    flex :  1 ,
    borderRadius :  4
  },
  heatmapBtn: {
    width: 313,
    height: 44,
    alignSelf: 'center',
    marginTop: 24
  },
  heatmapText: {
    flex: 1,
    alignSelf: 'center',
    textAlignVertical: 'center',
    fontFamily: "Avenir-Medium",
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff"
  },
  calculatorBlock: {
    width: 313,
    marginTop: 13,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  marginBtn: {
    width: 150,
    height: 75
  },
  calculatorsText: {
    width: 80,
    height: '100%',
    fontFamily: "Avenir-Medium",
    fontSize: 12,
    fontWeight: "900",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff",
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  pivotBtn: {
    marginTop: 12,
    width: 150,
    height: 85
  },
  airdropBtn: {
    width: 313,
    height: 44,
    alignSelf: 'center',
    marginTop: 23,
    marginBottom: 32
  },
  airdropText: {
    height: '100%',
    fontFamily: "Avenir-Medium",
    fontSize: 12,
    fontWeight: "900",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff",
    alignSelf: 'center',
    textAlignVertical: 'center'
  },
  pickerBlock: {
    width: 76,
    height: 105,
    backgroundColor: '#0e4358',
    borderRadius: 3,
    position: 'absolute',
    top: 22,
    right: 0,
    zIndex: 1
  },
  textInputPicker: {
    padding: 0,
    margin: 0,
    height: 20,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'rgba(255, 255, 255, 0.50)',
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Avenir-Medium'
  },
  coinPickerTitle: {
    color: '#fff',
    width: '100%',
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(249, 247, 247, 0.12)',
    fontSize: 12,
    alignSelf: 'center'
  }
});

const mapStateToProps = (state) => {
  return {
    menuNav: state.menuNav,
    tools: state.tools
  }
}

export default connect(mapStateToProps, { goHeatmap, goMargin, goProfit, goPivot, goFibonnaci, goAirdrop })(CalculatorsScreen);
