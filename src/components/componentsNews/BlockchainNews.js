import axios from 'axios';
import React, { Component } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View, Text, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
var entities = require('entities');

import { connect } from 'react-redux';

import { goDetailNews, backNews, likedDetailNews, fetchData2 } from '../../actions/DetailNewsActions';
import { likedPost, disLikesPost } from '../../actions/LikedPostActions';
import FirstBlock from './FirstBlock';
import AllBlocks from './AllBlocks';
import BitcoinDetailPage from './BitcoinDetailPage';

class BlockchainNews extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      isFetching: true,
      isLiked: false
    };
    this.source_urlFunc = this.source_urlFunc.bind(this);
  }
  componentDidMount(){
    this.fetchData();
  }
  fetchData(){
    axios.get(`http://www.newsbtc.com/wp-json/wp/v2/posts/?categories=12132&per_page=30&page=1&_embed`)
      .then((res) => {
        this.setState({ data: res.data, isFetching: false})
        this.props.fetchData2(res.data)
      })
  }
  source_urlFunc(item){
    const source_url = item._embedded["wp:featuredmedia"];
    if(source_url == undefined){
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfClLNBejGSkyxTT1EIn779i-szkhPMB9qIUrx5zYdlgQ5ziXG'
    } else {
      return item._embedded["wp:featuredmedia"][0].source_url
    }
  }
  renderList(){
    const { data } = this.state;
    let arr = [];
    let nom = data.map((item) => {
      arr.push(item.id);
    });
    let num = arr[0];
    const ren = data.map((coin, index) => {
      if(num === coin.id){
        return (
          <FirstBlock key={index}
            onPress={() => {
              this.props.goDetailNews(coin, index);
            }}
            data={coin}
            dataId={index}
            source_url={{uri: this.source_urlFunc(coin)}}
            textTitle={entities.decodeHTML(coin.title.rendered)}
            date={coin.date}
          />
        );
      } else {
        return (
          <AllBlocks key={index}
            onPress={() => {
              this.props.goDetailNews(coin);
            }}
            data={coin}
            dataId={index}
            source_url={{uri: this.source_urlFunc(coin)}}
            textTitle={entities.decodeHTML(coin.title.rendered)}
            date={coin.date}
          />
        );
      }
    })
    return ren;
  }
  render(){
    if(this.props.detailNews.isDetail){
      return <BitcoinDetailPage />;
    } else {
      return(
        <View style={styles.container} id={this.props.id}>
          <ScrollView>
          {this.state.isFetching ? <ActivityIndicator style={{paddingTop: 200}} size='small' /> : this.renderList()}
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
  }
});

const mapStateToProps = (state) => {
  return {
    detailNews: state.detailNews,
    menuNews: state.menuNews,
    liked: state.liked
  }
};

export default connect(mapStateToProps, { goDetailNews, backNews, likedPost, disLikesPost, likedDetailNews, fetchData2 })(BlockchainNews);
