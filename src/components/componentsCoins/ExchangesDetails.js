import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, ListView } from 'react-native';
import { connect } from 'react-redux';
import { DataTable, Cell, Row, CheckableCell, EditableCell, Expansion, Header, HeaderCell, TableButton } from 'react-native-data-table';
import axios from 'axios';

import { backBtnExchanges } from '../../actions/CoinsNavActions';

class ExchangesDetails extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      pairSort: false,
      last_priceSort: false,
      volume: false,
    }
  }
  componentDidMount(){
    this.fetchMarket();
  }
  fetchMarket(){
    const { coinsNav } = this.props;
    const url = 'https://tools.newsbtc.com/app/app-cryptocurrency-for-single-exchanges.php?exchangeid=';
    axios.get(`${url}${coinsNav.exchangeid}&offset=0&limit=1000`)
      .then((res) => {
        this.setState({ data: res.data.records})
      })
  }
  renderHeader(){
    return(
      <Header style={{borderBottomWidth: 1, borderColor: 'rgba(249, 247, 247, 0.12)', backgroundColor: 'rgba(30, 31, 31, 0.39)'}}>
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
          <HeaderCell
          onPress={() => { this.volumeSort(); this.setState((prevState) => { return {volume: !prevState.volume}})}}
          text='Volume'
          textStyle={styles.textFont}
          style={styles.headerCell}
          width={1}
          />
      </Header>
    );
  }
  renderRow(rowData) {
    const { coinsNav } = this.props;
    console.log(rowData)
    return(
      <Row style={styles.marketRow}>
        <Cell style={styles.cellStyle} textStyle={styles.textMarketRow}>{rowData.pair}</Cell>
        <Cell style={styles.cellStyle} textStyle={styles.textMarketRow}>{rowData.lastprice}</Cell>
        <Cell style={styles.cellStyle} textStyle={styles.textMarketRow}>{rowData.volume24hourusd}</Cell>
      </Row>
    );
  }
  pairSort(){
    const { data, pairSort } = this.state;
    data.sort((a, b) => { if (a.pair > b.pair){ return 1 } else if( a.pair < b.pair){ return -1 } else { return 0 }});
    if(pairSort){ data.reverse(); this.setState({ data: data })} else { this.setState({ data: data })}
  }
  last_priceSort(){
    const { data, last_priceSort } = this.state;
    data.sort((a, b) => {
      let a_l = a.lastprice.replace(/,/g, '');
      let b_l = b.lastprice.replace(/,/g, '');
      let aNum = Number(a_l);
      let bNum = Number(b_l);
      return aNum - bNum
    });
    if(last_priceSort){ data.reverse(); this.setState({ data: data })} else { this.setState({ data: data })}
  }
  volumeSort(){
    const { data, volume } = this.state;
    data.sort((a, b) => {
      let a_l = a.volume24hourusd.replace(/,/g, '');
      let b_l = b.volume24hourusd.replace(/,/g, '');
      let aNum = Number(a_l);
      let bNum = Number(b_l);
      return aNum - bNum
    });
    if(volume){ data.reverse(); this.setState({ data: data })} else { this.setState({ data: data })}
  }
  render(){
    const { coinsNav } = this.props;
    const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2});
    const cloneData = ds.cloneWithRows(this.state.data);
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {this.props.backBtnExchanges()}}
          >
            <Image style={styles.backBtnIcon} source={require('../../img/back-icon.png')}/>
          </TouchableOpacity>
          <View style={styles.coinName}>
            <Text style={styles.textCoinName}>{coinsNav.exchangename}</Text>
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
        <View style={styles.blockContent}>
          <View style={styles.tradingBlock}>
            <Text style={styles.tradingTitle}>No. of Pairs</Text>
            <Text style={styles.tradingText}>{coinsNav.tradingpairs}</Text>
          </View>
          <View style={styles.volumeBlock}>
            <Text style={styles.volumeTitle}>Volume (24h)</Text>
            <Text style={styles.volumeText}>${coinsNav.volumeinUSD24H}</Text>
          </View>
          <View style={styles.marketBlock}>
            <DataTable
              dataSource={cloneData}
              renderHeader={this.renderHeader.bind(this)}
              renderRow={this.renderRow.bind(this)}
              enableEmptySections={true}
            />
          </View>
        </View>
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
  blockContent: {
    flex: 1
  },
  tradingBlock: {
    height: 59,
    backgroundColor: 'rgba(40, 68, 78, 0.39)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(249, 247, 247, 0.12)',
    justifyContent: 'center'
  },
  volumeBlock: {
    height: 59,
    backgroundColor: 'rgba(40, 68, 78, 0.39)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(249, 247, 247, 0.12)',
    justifyContent: 'center'
  },
  tradingTitle: {
    fontSize: 12,
    fontFamily: 'Avenir-Medium',
    fontWeight: '400',
    color: '#fff',
    opacity: 0.7,
    paddingLeft: 22
  },
  tradingText: {
    fontSize: 16,
    fontFamily: 'Avenir-Medium',
    fontWeight: '400',
    color: '#fff',
    paddingLeft: 22
  },
  volumeTitle: {
    fontSize: 12,
    fontFamily: 'Avenir-Medium',
    fontWeight: '400',
    color: '#fff',
    opacity: 0.7,
    paddingLeft: 22,
  },
  volumeText: {
    fontSize: 16,
    fontFamily: 'Avenir-Medium',
    fontWeight: '400',
    color: '#fff',
    paddingLeft: 22,
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
  backBtnIcon: {
    width: 16,
    height: 12
  }
});

const mapStateToProps = (state) => {
  return{
    coinsNav: state.coinsNav,
  }
};


export default connect(mapStateToProps, { backBtnExchanges})(ExchangesDetails);
