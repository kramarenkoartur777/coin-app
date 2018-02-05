import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, ListView, Picker, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { DataTable, Cell, Row, CheckableCell, EditableCell, Expansion, Header, HeaderCell, TableButton } from 'react-native-data-table';
import axios from 'axios';

class PairsScreen extends Component {
  constructor(){
    super();
    this.state = {
      dataMarket: [],
      isFetching: true,
      sourceSort: false,
      pairSort: false,
      last_priceSort: false,
      picker: false,
      coinName: '',
      coinUrl: '',
      price: '',
      percent_change_24h: '',
      symbol: 'BTC',
      text: '',
      isFetchMarket: true,
    };
    this.data = [];
  }
  componentDidMount(){
    this.fetchMarket();
    const btc = 'BTC';
    this.fetchMarketFunc(btc);
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
  fetchMarketFunc(sym){
    let symbol = sym;
    const url = 'https://tools.newsbtc.com/app/app-currencies-detail.php?symbol=';
    axios.get(`${url}${symbol}&offset=0&limit=2000`)
      .then((res) => {
        this.setState({ dataMarket: res.data.records, isFetchMarket: false})
      })
  }
  renderHeader(){
    return(
      <Header style={{borderBottomWidth: 1, borderColor: 'rgba(249, 247, 247, 0.12)', backgroundColor: 'rgba(30, 31, 31, 0.39)'}}>
        <HeaderCell
          onPress={() => { this.sourceSort(); this.setState((prevState) => { return {sourceSort: !prevState.sourceSort}})}}
          text='Source'
          textStyle={styles.textFont}
          style={styles.headerCell}
          width={1}
          />
        <HeaderCell
          onPress={() => { this.pairSort(); this.setState((prevState) => { return {pairSort: !prevState.pairSort}})}}
          text='Pair'
          textStyle={styles.textFont}
          style={styles.headerCell}
          width={1}
          />
        <HeaderCell
          onPress={() => { this.last_priceSort(); this.setState((prevState) => { return {last_priceSort: !prevState.last_priceSort}})}}
          text='Last Price'
          textStyle={styles.textFont}
          style={styles.headerCell}
          width={1}
          />
      </Header>
    );
  }
  renderRow(rowData) {
    return(
      <Row style={styles.marketRow}>
        <Cell style={styles.cellStyle} textStyle={styles.textMarketRow}>{rowData.source}</Cell>
        <Cell style={styles.cellStyle} textStyle={styles.textMarketRow}>{rowData.pair}</Cell>
        <Cell style={styles.cellStyle} textStyle={styles.textMarketRow}>{rowData.last_price}</Cell>
      </Row>
    );
  }
  sourceSort(){
    const { dataMarket, sourceSort } = this.state;
    dataMarket.sort((a, b) => { if (a.source > b.source){ return 1 } else if( a.source < b.source){ return -1 } else { return 0 }});
    if(sourceSort){ dataMarket.reverse(); this.setState({ dataMarket: dataMarket })} else { this.setState({ dataMarket: dataMarket })}
  }
  pairSort(){
    const { dataMarket, pairSort } = this.state;
    dataMarket.sort((a, b) => { if (a.pair > b.pair){ return 1 } else if( a.pair < b.pair){ return -1 } else { return 0 }});
    if(pairSort){ dataMarket.reverse(); this.setState({ dataMarket: dataMarket })} else { this.setState({ dataMarket: dataMarket })}
  }
  last_priceSort(){
    const { dataMarket, last_priceSort } = this.state;
    dataMarket.sort((a, b) => {
      let a_l = a.last_price.replace(/,/, '');
      let b_l = b.last_price.replace(/,/, '');
      let aNum = Number(a_l);
      let bNum = Number(b_l);
      return aNum - bNum
    });
    if(last_priceSort){ dataMarket.reverse(); this.setState({ dataMarket: dataMarket })} else { this.setState({ dataMarket: dataMarket })}
  }
  pickerFunc(){
    const { dataSource, picker } = this.state;
    if(picker){
      return(
        <View z={1000} style={styles.pickerBlockAll}>
          <View style={styles.textInputBlock}>
            <TextInput
              autoCorrect={false}
              style={styles.textInput}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.SearchFilterFunction(text)}
              value={this.state.text}
            />
            <TouchableOpacity
              style={styles.pickerSearchBtn}
            >
              <Image style={styles.pickerSearchIcon} source={require('../../img/search-icon-3x.png')}/>
            </TouchableOpacity>
          </View>
          <ListView
            dataSource={dataSource}
            renderRow={(rowData) => {
              return(
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      coinName: rowData.name,
                      coinUrl: rowData.imgurl,
                      price: rowData.price,
                      percent_change_24h: rowData.percent_change_24h,
                      symbol: rowData.symbol,
                      picker: false,
                      isFetchMarket: true
                    });
                    this.fetchMarketFunc(rowData.symbol);
                  }}
                  style={styles.itemPickerBtn}
                >
                  <Text style={styles.itemPickerText}>{rowData.name}</Text>
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
  numberWithCommas(n) {
    var parts=n.toString().split(".");
    const p = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    return p;
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
  renderMarket(cloneData){
    if(this.state.isFetchMarket){
      return <ActivityIndicator style={{marginTop: 200}} size='small'/>;
    } else {
      return(
        <DataTable
          dataSource={cloneData}
          renderHeader={this.renderHeader.bind(this)}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections={true}
        />
      );
    }
  }
  render(){
    const { isFetching, coinName, coinUrl, price, percent_change_24h, symbol, isFetchMarket } = this.state;
    const { coinsNav } = this.props;
    const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2});
    const cloneData = ds.cloneWithRows(this.state.dataMarket);
    if(isFetching){
      return(
        <View style={styles.indicator}>
          <ActivityIndicator size="small" />
        </View>
      );
    } else {
      return(
        <View style={styles.container}>
          <View style={styles.blockContent}>
          {this.pickerFunc()}

            <View style={styles.pickerBlock}>
              <TouchableOpacity
                style={styles.pickerBtn}
                onPress={() => this.setState((prevState) => {
                  return {
                    picker: !prevState.picker
                  }
                })}
              >
                <View style={styles.coinBlock}>
                  <Image style={styles.coinIcon} source={{uri: `${coinUrl}`}}/>
                  <Text style={styles.coinName}>{this.state.coinName}</Text>
                </View>
                <Image style={styles.pickerIcon} source={require('../../img/pickerIcon.png')} />
              </TouchableOpacity>
              <Text style={styles.priceText}>$ {this.numberWithCommas(price)} <Text style={percent_change_24h < 0 ? styles.percentMinus : styles.percentPlus}>({percent_change_24h}%)</Text></Text>
            </View>
            <View style={styles.marketBlock}>
              {this.renderMarket(cloneData)}
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d252c'
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  blockContent: {
    flex: 1,
  },
  pickerBlock: {
    height: 68,
    backgroundColor: 'rgba(40, 68, 78, 0.39)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(249, 247, 247, 0.12)',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  marketBlock: {
    flex: 1,
  },
  headerCell: {
    width: '100%',
    height: 25,
    backgroundColor: 'rgba(30, 31, 31, 0.39)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0
  },
  textFont: {
    fontFamily: 'Avenir-Medium',
    fontSize: 14,
    color: '#fff',
    margin: 0,
  },
  marketRow: {
    backgroundColor: 'rgba(40, 68, 78, 0.39)',
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'rgba(249, 247, 247, 0.12)',
  },
  textMarketRow: {
    fontFamily: 'Avenir-Medium',
    fontSize: 14,
    color: '#fff',
  },
  cellStyle: {
    width: '33.3%',
    alignSelf: 'center',
    alignItems: 'center'
  },
  pickerBtn: {
    width: 142,
    height: 32,
    flexDirection: 'row',
    backgroundColor: '#0e4358',
    borderRadius: 3,
    marginLeft: 28,
    alignItems: 'center'
  },
  coinBlock: {
    flex: 1,
    flexDirection: 'row'
  },
  coinName: {
    fontSize: 14,
    fontFamily: 'Avenir-Medium',
    color: '#fff',
    width: '80%'
  },
  pickerIcon: {
    width: 10,
    height: 5,
    marginRight: 11
  },
  pickerBlockAll: {
    width: 142,
    height: 170,
    backgroundColor: '#0e4358',
    borderRadius: 3,
    position: 'absolute',
    top: 50,
    left: 28,
    zIndex: 1
  },
  textInputBlock: {
    marginHorizontal: 10,
    height: 25,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 6,
    flexDirection: 'row',
  },
  textInput: {
    padding: 0,
    margin: 0,
    color: '#fff',
    paddingLeft: 5,
    paddingVertical: 3,
    fontSize: 12,
    fontFamily: 'Avenir-Medium',
    flex: 1
  },
  pickerSearchBtn: {
    marginRight: 5,
    alignSelf: 'center'
  },
  pickerSearchIcon: {
    width: 12,
    height: 10
  },
  itemPickerBtn: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(249, 247, 247, 0.12)',
    height: 33,
    justifyContent: 'center'
  },
  itemPickerText: {
    color: '#fff',
    fontSize: 14,
    alignSelf: 'center'
  },
  priceText: {
    marginRight: 5,
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Avenir-Medium',
    fontWeight: '500'
  },
  coinIcon: {
    width: 17,
    height: 17,
    alignSelf: 'center',
    marginRight: 5,
    marginLeft: 10
  },
  percentMinus: {
    color: '#ff2c2c'
  },
  percentPlus: {
    color: '#49af4e'
  }
});

const mapStateToProps = (state) => {
  return{
    coinsNav: state.coinsNav,
  }
};


export default connect(mapStateToProps)(PairsScreen);
