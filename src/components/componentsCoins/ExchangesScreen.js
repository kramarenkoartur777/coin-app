import React, { Component } from 'react';
import axios from 'axios';
import { ActivityIndicator, StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, ListView, Alert } from 'react-native';
import { DataTable, Cell, Row, CheckableCell, EditableCell, Expansion, Header, HeaderCell, TableButton } from 'react-native-data-table';
import { connect } from 'react-redux';

import { goExchangesDetails } from '../../actions/CoinsNavActions';

class ExchangesScreen extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      isFetching: true,
      sort: false,
    }
  }
  componentDidMount(){
    this.fetchTop100()
  }
  fetchTop100(){
    axios.get('https://tools.newsbtc.com/app/app-cryptocurrency-exchanges.php')
      .then((res) => {
        this.setState({ data: res.data.records, isFetching: false})
      })
  }
  renderHeader(){
    return(
      <Header style={{borderBottomWidth: 1, borderColor: 'rgba(249, 247, 247, 0.12)', backgroundColor: 'rgba(40, 68, 78, 0.39)'}}>
        <HeaderCell
          onPress={() => {this.nameSort(); this.setState((prevState) => {return {sort: !prevState.sort }})}}
          text='Name'
          textStyle={[styles.textFont, styles.textName]}
          style={[styles.header, styles.headerName]}
          />
        <HeaderCell
          onPress={() => {this.pairsSort(); this.setState((prevState) => {return {sort: !prevState.sort }})}}
          text='Trading Pairs'
          textStyle={[styles.textFont, styles.textPairs]}
          style={styles.headerTra}
          />
        <HeaderCell
          onPress={() => {this.chg24Sort(); this.setState((prevState) => {return {sort: !prevState.sort }})}}
          text='Vol. USD(24H)'
          textStyle={[styles.textFont, styles.textVol]}
          style={styles.headerVol}
          />
      </Header>
    );
  }
  renderRow(rowData) {
    return(
      <Row style={styles.marketRow}>
        <TouchableOpacity
          style={styles.btnCoinName}
          onPress={() => this.props.goExchangesDetails(rowData.exchangename, rowData.tradingpairs, rowData.volumeinUSD24H, rowData.exchangeid)}
        >
          <Text style={styles.textCoinName}>{rowData.exchangename}</Text>
          <Cell textStyle={[styles.textMarketRow]}>{rowData.tradingpairs}</Cell>
          <Cell textStyle={[styles.textMarketRow]}>{rowData.volumeinUSD24H}</Cell>
        </TouchableOpacity>
      </Row>
    );
  }
  nameSort(){
    const { data, sort } = this.state;
    data.sort((a, b) => {
      let aL = a.exchangename.toUpperCase();
      let bL = b.exchangename.toUpperCase();
      if (aL > bL){ return 1 } else if( aL < bL){ return -1 } else { return 0 }});
    if(sort){ data.reverse(); this.setState({ data: data })} else { this.setState({ data: data })}
  }
  pairsSort(){
    const { data, sort } = this.state;
    data.sort((a, b) => {
      let aNum = Number(a.tradingpairs);
      let bNum = Number(b.tradingpairs);
      return aNum - bNum
    });
    if(sort){ data.reverse(); this.setState({ data: data })} else { this.setState({ data: data })}
  }
  chg24Sort(){
    const { data, sort } = this.state;
    data.sort((a, b) => {
      let aNum = a.volumeinUSD24H.replace(/,/g, '');
      let bNum = b.volumeinUSD24H.replace(/,/g, '');
      let aN = Number(aNum);
      let bN = Number(bNum);
      return aN - bN
    });
    if(sort){ data.reverse(); this.setState({ data: data })} else { this.setState({ data: data })}
  }
  render(){
    if(this.state.isFetching){
      return(
        <View style={styles.indicator}>
          <ActivityIndicator size="small" />
        </View>
      );
    } else {
      const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2});
      const { data } = this.state;
      const cloneData = ds.cloneWithRows(data);
      return(
        <View style={styles.container}>
          <DataTable
            dataSource={cloneData}
            renderHeader={this.renderHeader.bind(this)}
            renderRow={this.renderRow.bind(this)}
            enableEmptySections={true} />
        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d252c',
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    height: 25,
    backgroundColor: 'rgba(40, 68, 78, 0.39)',
  },
  headerName: {
    width: 128,
    paddingRight: 12
  },
  textFont: {
    fontFamily: 'Avenir-Medium',
    fontSize: 14,
    color: '#fff',
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
    alignSelf: 'center'
  },
  btnCoinName: {
    width: '100%',
    flexDirection: 'row',
  },
  textCoinName: {
    height: 39,
    width: 128,
    color: '#fff',
    fontWeight: '400',
    fontSize: 14,
    textAlignVertical: 'center',
    fontFamily: 'Avenir-Medium',
    alignSelf: 'center',
    paddingLeft: 30,
    backgroundColor: 'rgba(40, 68, 78, 0.39)',
  },
  textName: {
    paddingLeft: 30
  },
  headerTra: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerVol: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textPairs: {
    opacity: 0.6
  },
  textVol:{
    opacity: 0.6
  }

});

const mapStateToProps = (state) => {
  return{
    coinsNav: state.coinsNav
  }
};


export default connect(mapStateToProps, { goExchangesDetails })(ExchangesScreen);
