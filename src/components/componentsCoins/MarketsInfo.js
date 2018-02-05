import React, { Component } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View, Text, ScrollView, RefreshControl, ListView, TouchableOpacity } from 'react-native';
import { DataTable, Cell, Row, CheckableCell, EditableCell, Expansion, Header, HeaderCell, TableButton } from 'react-native-data-table';
import { connect } from 'react-redux';
import axios from 'axios';

class MarketsInfo extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      sourceSort: false,
      pairSort: false,
      last_priceSort: false,
    }
  }
  componentDidMount(){
    this.fetchMarket();
  }
  fetchMarket(){
    const { symbol } = this.props.coinsNav;
    const url = 'https://tools.newsbtc.com/app/app-currencies-detail.php?symbol='
    axios.get(`${url}${symbol}&offset=0&limit=1000`)
      .then((res) => {
        this.setState({ data: res.data.records})
      })
  }
  renderHeader(){
    return(
      <Header style={{borderBottomWidth: 1, borderColor: 'rgba(249, 247, 247, 0.12)', backgroundColor: 'rgba(40, 68, 78, 0.39)'}}>
        <HeaderCell
          onPress={() => { this.sourceSort(); this.setState((prevState) => { return {sourceSort: !prevState.sourceSort}})}}
          text='Source'
          textStyle={styles.textFont}
          style={styles.header}
          width={1}
          />
        <HeaderCell
          onPress={() => { this.pairSort(); this.setState((prevState) => { return {pairSort: !prevState.pairSort}})}}
          text='Pair'
          textStyle={styles.textFont}
          style={styles.header}
          width={1}
          />
        <HeaderCell
          onPress={() => { this.last_priceSort(); this.setState((prevState) => { return {last_priceSort: !prevState.last_priceSort}})}}
          text='Last Price'
          textStyle={styles.textFont}
          style={styles.header}
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
    const { data, sourceSort } = this.state;
    data.sort((a, b) => { if (a.source > b.source){ return 1 } else if( a.source < b.source){ return -1 } else { return 0 }});
    if(sourceSort){ data.reverse(); this.setState({ data: data })} else { this.setState({ data: data })}
  }
  pairSort(){
    const { data, pairSort } = this.state;
    data.sort((a, b) => { if (a.pair > b.pair){ return 1 } else if( a.pair < b.pair){ return -1 } else { return 0 }});
    if(pairSort){ data.reverse(); this.setState({ data: data })} else { this.setState({ data: data })}
  }
  last_priceSort(){
    const { data, last_priceSort } = this.state;
    data.sort((a, b) => {
      let a_l = a.last_price.replace(/,/, '');
      let b_l = b.last_price.replace(/,/, '');
      let aNum = Number(a_l);
      let bNum = Number(b_l);
      return aNum - bNum
    });
    if(last_priceSort){ data.reverse(); this.setState({ data: data })} else { this.setState({ data: data })}
  }
  render(){
    const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2});
    const cloneData = ds.cloneWithRows(this.state.data);
    return(
      <View style={styles.container}>
        <DataTable
          dataSource={cloneData}
          renderHeader={this.renderHeader.bind(this)}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections={true}
        />
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
    width: '100%',
    height: 25,
    backgroundColor: 'rgba(40, 68, 78, 0.39)',
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
  }
});

const mapStateToProps = (state) => {
  return {
    chartInfo: state.chartInfo,
    coinsNav: state.coinsNav
  }
}

export default connect(mapStateToProps)(MarketsInfo);
