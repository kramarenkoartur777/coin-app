import React, { Component } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View, Text, ScrollView, RefreshControl, ListView, TouchableOpacity } from 'react-native';
import { DataTable, Cell, Row, CheckableCell, EditableCell, Expansion, Header, HeaderCell, TableButton } from 'react-native-data-table';
import { connect } from 'react-redux';

import FetchMarkets from '../../actions/FetchMarkets';

class MarketsInfo extends Component {
  componentDidMount(){
    this.props.FetchMarkets();
  }

  renderHeader(){
    return(
      <Header style={{borderBottomWidth: 1, borderColor: 'rgba(249, 247, 247, 0.12)'}}>
        <HeaderCell
          onPress={() =>  Alert.alert('btn')}
          text='Source'
          textStyle={styles.textFont}
          style={styles.header}
          width={1}
          />
        <HeaderCell
          onPress={() => Alert.alert('btn')}
          text='Pair'
          textStyle={styles.textFont}
          style={styles.header}
          width={1}
          />
        <HeaderCell
          onPress={() => this.state.up ? this.sortFunckLastPriceDown() : this.sortFunckLastPriceUp()}
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
  render(){
    const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2});
    const { chartInfo } = this.props;
    const data = chartInfo.data;
    const cloneData = ds.cloneWithRows(data);
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
    height: 25,
    backgroundColor: 'rgba(40, 68, 78, 0.39)',
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  cellStyle: {
    width: '33.3%',
    alignSelf: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => {
  return {
    chartInfo: state.chartInfo
  }
}

export default connect(mapStateToProps, { FetchMarkets })(MarketsInfo);
