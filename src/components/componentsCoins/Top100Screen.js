import React, { Component } from 'react';
import axios from 'axios';
import { ActivityIndicator, StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, ListView, Alert } from 'react-native';
import { DataTable, Cell, Row, CheckableCell, EditableCell, Expansion, Header, HeaderCell, TableButton } from 'react-native-data-table';
import { connect } from 'react-redux';

import { goChart } from '../../actions/CoinsNavActions';

class Top100Screen extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      isFetching: true,
      isAscending: false,
      sort: false,
      supply: true
    }
  }
  componentDidMount(){
    this.fetchTop100()
  }
  fetchTop100(){
    axios.get('https://tools.newsbtc.com/app/app-top-100-coins.php?currenysymbol=USD')
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
          width={1}
          />
        <HeaderCell
          onPress={() => {this.priceSort(); this.setState((prevState) => {return {sort: !prevState.sort }})}}
          text='Price USD'
          textStyle={[styles.textFont, styles.textPrice]}
          style={styles.header}
          width={1}
          />
        <HeaderCell
          onPress={() => {this.chg1Sort(); this.setState((prevState) => {return {sort: !prevState.sort }})}}
          text='Chg 1h'
          textStyle={[styles.textFont, styles.textChg1]}
          style={styles.header}
          width={1}
          />
        <HeaderCell
          onPress={() => {this.chg24Sort(); this.setState((prevState) => {return {sort: !prevState.sort }})}}
          text='Chg 24h'
          textStyle={[styles.textFont, styles.textChg24]}
          style={styles.header}
          width={1}
          />
        <HeaderCell
          onPress={() => {this.chg7Sort(); this.setState((prevState) => {return {sort: !prevState.sort }})}}
          text='Chg 7d'
          textStyle={[styles.textFont, styles.textChg7]}
          style={styles.header}
          width={1}
          />
        <HeaderCell
          onPress={() => {this.capSort(); this.setState((prevState) => {return {sort: !prevState.sort }})}}
          text='Market Cap'
          textStyle={[styles.textFont, styles.textMarket]}
          style={styles.header}
          width={1}
          />
        <HeaderCell
          onPress={() => {this.supplySort(); this.setState((prevState) => {return {supply: !prevState.supply }})}}
          text='Total Supply'
          textStyle={[styles.textFont, styles.textSupply]}
          style={styles.header}
          width={1}
          />
      </Header>
    );
  }
  renderRow(rowData) {
    const priceNum = Number(rowData.price);
    const capNum = Number (rowData.market_cap);
    const t_suppNum = Number(rowData.total_supply);

    const pr = this.numberWithCommas(priceNum);
    const cap = this.numberWithCommas(capNum);
    const t_supp = this.numberWithCommas(t_suppNum);
    const percent = '%';
    const percent1h = rowData.percent_change_1h + percent;
    const percent24h = rowData.percent_change_24h + percent;
    const percent7d = rowData.percent_change_7d + percent;
    return(
      <Row style={styles.marketRow}>
        <TouchableOpacity
          style={styles.btnCoinName}
          onPress={() => this.props.goChart(rowData.name, rowData.imgurl, rowData.price, rowData.percent_change_24h, rowData.market_cap, rowData.volume_usd_24, rowData.circulating_supply, rowData.total_supply, rowData.symbol )}
        >
          <Image source={{uri: `${rowData.imgurl}`}} style={{height: 15, width: 15, marginLeft: 20, marginTop: 2}}/>
          <Text style={styles.textCoinName}>{rowData.name}</Text>
        </TouchableOpacity>
        <Cell textStyle={[styles.textMarketRow, styles.priceCol]}>{pr}</Cell>
        <Cell textStyle={[styles.textMarketRow, styles.chg1Col, (rowData.percent_change_1h > 0 ? styles.percentPlus : styles.percentMinus)]}>{percent1h}</Cell>
        <Cell textStyle={[styles.textMarketRow, styles.chg24Col, (rowData.percent_change_24h > 0 ? styles.percentPlus : styles.percentMinus)]}>{percent24h}</Cell>
        <Cell textStyle={[styles.textMarketRow, styles.chg7Col, (rowData.percent_change_7d > 0 ? styles.percentPlus : styles.percentMinus)]}>{percent7d}</Cell>
        <Cell textStyle={[styles.textMarketRow, styles.marketCol]}>{cap == 0 ? 'N/A' : cap}</Cell>
        <Cell textStyle={[styles.textMarketRow, styles.supplyCol]}>{t_supp == 0 ? 'N/A' : t_supp}</Cell>
      </Row>
    );
  }
  numberWithCommas(n) {
    var parts=n.toString().split(".");
    const p = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    return p;
  }
  nameSort(){
    const { data, sort } = this.state;
    data.sort((a, b) => {
      let aL = a.name.toUpperCase();
      let bL = b.name.toUpperCase();
      if (aL > bL){ return 1 } else if( aL < bL){ return -1 } else { return 0 }});
    if(sort){ data.reverse(); this.setState({ data: data })} else { this.setState({ data: data })}
  }
  priceSort(){
    const { data, sort } = this.state;
    data.sort((a, b) => {
      let aNum = Number(a.price);
      let bNum = Number(b.price);
      return aNum - bNum
    });
    if(sort){ data.reverse(); this.setState({ data: data })} else { this.setState({ data: data })}
  }
  chg1Sort(){
    const { data, sort } = this.state;
    data.sort((a, b) => {
      let aNum = Number(a.percent_change_1h);
      let bNum = Number(b.percent_change_1h);
      return aNum - bNum
    });
    if(sort){ data.reverse(); this.setState({ data: data })} else { this.setState({ data: data })}
  }
  chg24Sort(){
    const { data, sort } = this.state;
    data.sort((a, b) => {
      let aNum = Number(a.percent_change_24h);
      let bNum = Number(b.percent_change_24h);
      return aNum - bNum
    });
    if(sort){ data.reverse(); this.setState({ data: data })} else { this.setState({ data: data })}
  }
  chg7Sort(){
    const { data, sort } = this.state;
    data.sort((a, b) => {
      let aNum = Number(a.percent_change_7d);
      let bNum = Number(b.percent_change_7d);
      return aNum - bNum
    });
    if(sort){ data.reverse(); this.setState({ data: data })} else { this.setState({ data: data })}
  }
  capSort(){
    const { data, sort } = this.state;
    data.sort((a, b) => {
      let aNum = Number(a.market_cap);
      let bNum = Number(b.market_cap);
      return aNum - bNum
    });
    if(sort){ data.reverse(); this.setState({ data: data })} else { this.setState({ data: data })}
  }
  supplySort(){
    const { data, supply } = this.state;
    data.sort((a, b) => {
      let aNum = Number(a.total_supply);
      let bNum = Number(b.total_supply);
      return aNum - bNum
    });
    if(supply){ data.reverse(); this.setState({ data: data })} else { this.setState({ data: data })}
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
          <View style={styles.tables}>
            <ScrollView horizontal>
              <DataTable
                dataSource={cloneData}
                renderHeader={this.renderHeader.bind(this)}
                renderRow={this.renderRow.bind(this)}
                enableEmptySections={true}
              ></DataTable>
            </ScrollView>
          </View>
        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d252c',
    position: 'relative'
  },
  header: {
    height: 25,
    backgroundColor: 'rgba(40, 68, 78, 0.39)',
  },
  headerName: {
    width: 150,
  },
  tables: {
    flexDirection: 'row',
    flex: 1,
  },
  textFont: {
    fontFamily: 'Avenir-Medium',
    fontSize: 14,
    color: '#fff',
    width: '100%'
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
    alignItems: 'center'
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnCoinName: {
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    height: 39,
    backgroundColor: 'rgba(40, 68, 78, 0.39)',
  },
  textCoinName: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'Avenir-Medium',
    marginLeft: 7,
    width: 100
  },
  textName: {
    paddingLeft: 36,
    backgroundColor: 'rgba(40, 68, 78, 0.39)',
    width: '100%'
  },
  textPrice: {
    width: 100,
    paddingLeft: 20
  },
  textChg1: {
    width: 100,
    paddingLeft: 45
  },
  textChg24: {
    width: 100,
    paddingLeft: 20
  },
  textChg7: {
    width: 100,
    paddingLeft: 20
  },
  textMarket: {
    width: 120,
    paddingLeft: 20
  },
  textSupply: {
    width: 120,
    paddingLeft: 20
  },
  priceCol: {
    width: 100,
    paddingLeft: 19
  },
  chg1Col: {
    width: 100,
    paddingLeft: 50
  },
  chg24Col: {
    width: 100,
    paddingLeft: 30
  },
  chg7Col: {
    width: 100,
    paddingLeft: 30
  },
  marketCol: {
    width: 120,
    paddingLeft: 10
  },
  supplyCol: {
    width: 120,
    paddingLeft: 20
  },
  percentMinus: {
    color: '#ef5230'
  },
  percentPlus: {
    color: '#49af4e'
  }
});

const mapStateToProps = (state) => {
  return{
    coinsNav: state.coinsNav
  }
};


export default connect(mapStateToProps, { goChart })(Top100Screen);
