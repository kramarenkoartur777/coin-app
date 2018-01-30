import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, ListView } from 'react-native';
import { DataTable, Cell, Row, CheckableCell, EditableCell, Expansion, Header, HeaderCell, TableButton } from 'react-native-data-table';
import { connect } from 'react-redux';
import FetchAll  from '../../actions/FetchAll';

import { goChart } from '../../actions/CoinsNavActions';

class AllCoinsScreen extends Component {
  componentDidMount(){
    this.props.FetchAll();
  }
  renderHeader(){
    return(
      <Header style={{borderBottomWidth: 1, borderColor: 'rgba(249, 247, 247, 0.12)'}}>
        <HeaderCell
          onPress={() => Alert.alert('btn')}
          text='Name'
          textStyle={[styles.textFont, styles.textName]}
          style={[styles.header, styles.headerName]}
          width={1}
          />
        <HeaderCell
          onPress={() => Alert.alert('btn')}
          text='Price USD'
          textStyle={[styles.textFont, styles.textPrice]}
          style={styles.header}
          width={1}
          />
        <HeaderCell
          onPress={() => Alert.alert('btn')}
          text='Chg 1h'
          textStyle={[styles.textFont, styles.textChg1]}
          style={styles.header}
          width={1}
          />
        <HeaderCell
          onPress={() => Alert.alert('btn')}
          text='Chg 24h'
          textStyle={[styles.textFont, styles.textChg24]}
          style={styles.header}
          width={1}
          />
        <HeaderCell
          onPress={() => Alert.alert('btn')}
          text='Chg 7d'
          textStyle={[styles.textFont, styles.textChg7]}
          style={styles.header}
          width={1}
          />
        <HeaderCell
          onPress={() => Alert.alert('btn')}
          text='Market Cap'
          textStyle={[styles.textFont, styles.textMarket]}
          style={styles.header}
          width={1}
          />
        <HeaderCell
          onPress={() => Alert.alert('btn')}
          text='Total Supply'
          textStyle={[styles.textFont, styles.textSupply]}
          style={styles.header}
          width={1}
          />
      </Header>
    );
  }
  renderRow(rowData) {
    return(
      <Row style={styles.marketRow}>
        <TouchableOpacity
          style={styles.btnCoinName}
          onPress={() => this.props.goChart(rowData.name, rowData.imgurl, rowData.price, rowData.percent_change_24h, rowData.market_cap, rowData.volume_usd_24, rowData.circulating_supply, rowData.total_supply, rowData.symbol )}
        >
          <Image source={{uri: `${rowData.imgurl}`}} style={{height: 10, width: 10, marginLeft: 20, marginTop: 2}}/>
          <Text style={styles.textCoinName}>{rowData.name}</Text>
        </TouchableOpacity>
        <Cell textStyle={[styles.textMarketRow, styles.priceCol]}>{rowData.price}</Cell>
        <Cell textStyle={[styles.textMarketRow, styles.chg1Col, (rowData.percent_change_1h > 0 ? styles.percentPlus : styles.percentMinus)]}>{rowData.percent_change_1h}</Cell>
        <Cell textStyle={[styles.textMarketRow, styles.chg24Col, (rowData.percent_change_24h > 0 ? styles.percentPlus : styles.percentMinus)]}>{rowData.percent_change_24h}</Cell>
        <Cell textStyle={[styles.textMarketRow, styles.chg7Col, (rowData.percent_change_7d > 0 ? styles.percentPlus : styles.percentMinus)]}>{rowData.percent_change_7d}</Cell>
        <Cell textStyle={[styles.textMarketRow, styles.marketCol]}>{rowData.market_cap}</Cell>
        <Cell textStyle={[styles.textMarketRow, styles.supplyCol]}>{rowData.total_supply}</Cell>
      </Row>
    );
  }

  render(){
    if(this.props.coins.isFetching){
      return(
        <View style={styles.indicator}>
          <ActivityIndicator size="small" />
        </View>
      );
    } else {
      const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2});
      const { coins } = this.props;
      const data = coins.data;
      const cloneData = ds.cloneWithRows(data);
      return(
        <View style={styles.container}>
          <ScrollView horizontal>
              <DataTable
                dataSource={cloneData}
                renderHeader={this.renderHeader.bind(this)}
                renderRow={this.renderRow.bind(this)}
                enableEmptySections={true}
              />
            </ScrollView>
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
  header: {
    height: 25,
    backgroundColor: 'rgba(40, 68, 78, 0.39)',
  },
  headerName: {
    width: 150,
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
    coins: state.coins,
    coinsNav: state.coinsNav
  }
};


export default connect(mapStateToProps, { FetchAll, goChart })(AllCoinsScreen);
