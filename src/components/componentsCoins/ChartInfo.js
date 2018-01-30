import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

import axios from 'axios';
import { connect } from 'react-redux';

import ChartView from 'react-native-highcharts';

import { goAllChart, goDaily } from '../../actions/CoinsNavActions';

class ChartInfo extends Component {
  constructor(){
    super();
    this.state = {
      apiDaily: 'https://tools.newsbtc.com/api/daily.php?sy=',
      apiAll: 'https://tools.newsbtc.com/api/hschart.php?sy=',
      arrDaily: [],
      arrAll: []
    };
    this.fetchApiGraphDaily = this.fetchApiGraphDaily.bind(this);
    this.fetchApiGraphAll = this.fetchApiGraphAll.bind(this);
  }
  componentDidMount(){
    this.fetchApiGraphDaily();
    this.fetchApiGraphAll();
  }
  fetchApiGraphDaily(){
    const { symbol, isAllChart, isDaily } = this.props.coinsNav;
    const { apiDaily, apiAll } = this.state;
    return axios.get(`${apiDaily}${symbol}`).then((res) => {
      this.setState({arrDaily: res.data})
    })
  }
  fetchApiGraphAll(){
    const { symbol, isAllChart, isDaily } = this.props.coinsNav;
    const { apiDaily, apiAll } = this.state;
    return axios.get(`${apiAll}${symbol}`).then((res) => {
      this.setState({arrAll: res.data})
    })
  }
  render(){
    const { price, percent_change_24h, market_cap, volume_usd_24, circulating_supply, total_supply, symbol, isAllChart, isLast1h, apiDaily, isDaily } = this.props.coinsNav;
    var arr = apiDaily ? this.state.arrDaily : this.state.arrAll;
    var Highcharts='Highcharts';
    var conf={
      colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
       '#FF9655', '#FFF263', '#6AF9C4'],
            chart: {
                style: {
                    fontFamily: 'serif',
                },
                type: 'spline',
                animation: Highcharts.svg,
                marginRight: 10,
                backgroundColor: {
                linearGradient: [0, 0, 500, 500],
                stops: [
                    [0, '#1d252c'],
                    [1, '#1d252c']
                    ]
                  },
                events: {
                    load: function () {
                        var series = this.series[0];
                        var x = (new Date()).getTime(),
                            y = price;
                        series.addPoint([x, y], true, true);
                    }
                }
            },
            legend: {
              enabled: false,
            },
            title: {
                text: ''
            },

            xAxis: {
                type: 'datetime',
                tickPixelInterval: 50,
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: '',
                data: arr
            }]
        };

    const options = {
        global: {
            useUTC: true
        },
        lang: {
            decimalPoint: ',',
            thousandsSep: '.'
        }
    };
    return(
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.priceBlock}>
          <Text style={styles.priceText}>${price == '' ? 0 : price}<Text style={[(percent_change_24h < 0 ? styles.percentMinus : styles.percentPlus), styles.pricePercentText]}>   ({percent_change_24h == '' ? 0 : percent_change_24h}%)</Text></Text>
        </View>
        <View style={[styles.marketCapBlock, styles.chartBlocks]}>
          <Text style={[styles.marketCapTitle, styles.chartTitle]}>Market Cap</Text>
          <Text style={[styles.marketCapText, styles.chartText]}>$ {market_cap == '' ? 0 : market_cap} <Text style={styles.usdText}>USD</Text></Text>
        </View>
        <View style={[styles.volumeBlock, styles.chartBlocks]}>
          <Text style={[styles.volumeTitle, styles.chartTitle]}>Volume (24h)</Text>
          <Text style={[styles.volumeText, styles.chartText]}>$ {volume_usd_24 == '' ? 0 : volume_usd_24 } <Text style={styles.usdText}>USD</Text></Text>
        </View>
        <View style={[styles.coinsSupplyBlock, styles.chartBlocks]}>
          <Text style={[styles.coinsSupplyTitle, styles.chartTitle]}>Coins Supply</Text>
          <Text style={[styles.coinsSupplyText, styles.chartText]}>$ {circulating_supply == '' ? 0 : circulating_supply}  / {total_supply == '' ? 0 : total_supply} <Text style={styles.symbolText}>{symbol}</Text></Text>
        </View>
          <View style={{flex: 1}}>
            <View style={styles.chartNav}>
              <TouchableOpacity
                style={[styles.chartNavBtn, (isLast1h ? styles.active : styles.inactive )]}
              >
                <Text style={styles.chartNavText}>Last 1H</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.goDaily()}
                style={[styles.chartNavBtn, (isDaily ? styles.active : styles.inactive )]}
              >
                <Text style={styles.chartNavText}>Daily</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.goAllChart()}
                style={[styles.chartNavBtn, (isAllChart ? styles.active : styles.inactive )]}
              >
                <Text style={styles.chartNavText}>All</Text>
              </TouchableOpacity>
            </View>
          <View style={styles.chartBlock}>
            <ChartView style={{width: '100%', height:200}} config={conf} options={options}></ChartView>
          </View>
        </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d252c'
  },
  priceBlock: {
    height: 67,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(249, 247, 247, 0.12)',
    backgroundColor: 'rgba(40, 68, 78, 0.39)'
  },
  chartBlock: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  priceText: {
    fontFamily: 'Avenir-Medium',
    fontSize: 24,
    fontWeight: '400',
    color: '#fff',
    paddingLeft: 20,
  },
  pricePercentText: {
    fontSize: 16,
    fontWeight: '300',
  },
  chartBlocks: {
    justifyContent: 'center',
    height: 59,
    borderBottomWidth: 1,
    borderColor: 'rgba(249, 247, 247, 0.12)',
    backgroundColor: 'rgba(40, 68, 78, 0.39)'
  },
  chartTitle: {
    paddingLeft: 21,
    fontSize: 12,
    fontFamily: 'Avenir-Medium',
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.7)'
  },
  chartText: {
    paddingLeft: 22,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Avenir-Medium',
    fontWeight: '300'
  },
  chartNav: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20
  },
  chartNavBtn: {
    width: 64,
    height: 22,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(3, 90, 121, 0.8)',
  },
  chartNavText: {
    color: '#fff',
    fontFamily: 'Avenir-Medium',
    fontWeight: '300',
    fontSize: 10
  },
  usdText: {
    fontSize: 11
  },
  symbolText: {
    fontSize: 11
  },
  percentPlus: {
    color: '#49af4e'
  },
  percentMinus: {
    color: '#ff2525'
  },
  active: {
    width: 64,
    height: 22,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(3, 90, 121, 1)',
  },
  inactive: {
    width: 64,
    height: 22,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(3, 90, 121, 0.5)',
  }
});

const mapStateToProps = (state) => {
  return {
    coinsNav: state.coinsNav,
  }
}

export default connect(mapStateToProps, { goAllChart, goDaily })(ChartInfo);
