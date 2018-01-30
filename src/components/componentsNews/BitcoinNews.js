import React, { Component } from 'react';
import { Alert, StyleSheet, View, Text, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
var entities = require('entities');

import { connect } from 'react-redux';

import { goDetailNews, backNews } from '../../actions/DetailNewsActions';
import { likedPost, disLikesPost } from '../../actions/LikedPostActions';
import BitcoinDetailPage from './BitcoinDetailPage';
import MenuNews from '../MenuNews';

class BitcoinNews extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      source_url: '',
      id: [],
      url: ''
    };
    this.source_urlFunc = this.source_urlFunc.bind(this);
  }
  fetchData = async() => {
    const { menuNews } = this.props;
    const url = menuNews.fetchUrl;
    const responce = await fetch(`${url}`);
    const posts = await responce.json();
    this.setState({data: posts});
  }
  source_urlFunc(item){
    const source_url = item._embedded["wp:featuredmedia"][0].source_url;
    return source_url;
  }
  rem(){
    const dataId = this.state.data;
    let arr = [];
    let nom = dataId.map((item) => {
      arr.push(item.id);
    });
    let num = arr[0];
    return num;
  }
  renderBlock(item, num){
    if(num == item.id){
      return(
        <TouchableOpacity
          onPress={() => this.props.goDetailNews(item, num)}
        >
          <View style={styles.firstBlock}>
            <Text style={styles.firstBlockTitle}>{entities.decodeHTML(item.title.rendered)}</Text>
            <Image style={styles.firstBlockImage} source={{uri: this.source_urlFunc(item)}} />
            <View style={styles.firstBlockFooter}>
              <Text style={styles.firstBlockTime}>{item.date}</Text>
              <TouchableOpacity
                style={styles.firstBlockFavBtn}
                onPress={() => this.props.likedPost(item)}
              >
                <Image
                  style={styles.firstBlockFavImage}
                  source={this.props.liked.isLiked ? require('../../img/fav-news-filled-icon.png') : require('../../img/fav-news-icon.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return(
        <TouchableOpacity
          onPress={() => this.props.goDetailNews(item, num)}
        >
          <View style={styles.allBlocks}>
            <Image style={styles.allBlockImage} source={{uri: this.source_urlFunc(item)}} />
            <View style={styles.allBlockAbout}>
              <Text style={styles.allBlockAboutText}>{entities.decodeHTML(item.title.rendered)}</Text>
              <View style={styles.aboutFooter}>
                <Text style={styles.aboutFooterTime}>{item.date}</Text>
                <TouchableOpacity
                  style={styles.aboutFooterFavBtn}
                >
                  <Image
                    style={styles.aboutFooterImage}
                    source={require('../../img/fav-news-icon.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
  render(){
    this.fetchData();
    if(this.props.detailNews.isDetail){
      return <BitcoinDetailPage />;
    } else {
      return(
        <View style={styles.container} id={this.props.id}>
          <MenuNews />
          <FlatList
            data={this.state.data}
            keyExtractor={(x, i) => x.id}
            renderItem={({item}) => this.renderBlock(item, this.rem())}
          />
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
  firstBlock: {
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 15
  },
  firstBlockTitle: {
    fontSize: 16,
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    color: '#fff',
    marginTop: 13,
    marginBottom: 9
  },
  firstBlockImage: {
    width: '100%',
    height: 150,
    borderRadius: 5
  },
  firstBlockFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15
  },
  firstBlockTime: {
    color: '#bcbcbc',
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 12
  },
  firstBlockFavBtn: {
  },
  firstBlockFavImage: {
    width: 15,
    height: 15
  },
  allBlocks: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  allBlockImage: {
    width: 92,
    height: 92,
    borderRadius: 5
  },
  allBlockAbout: {
    paddingLeft: 10,
    justifyContent: 'space-between'
  },
  allBlockAboutText: {
    fontFamily: 'Avenir-Medium',
    fontSize: 14,
    fontWeight: '500',
    width: 232,
    color: '#fff'
  },
  aboutFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  aboutFooterTime: {
    color: '#bcbcbc',
    fontFamily: 'Avenir-Medium',
    fontSize: 12,
    fontWeight: '500'
  },
  aboutFooterImage: {
  }
});

const mapStateToProps = (state) => {
  return {
    detailNews: state.detailNews,
    menuNews: state.menuNews,
    liked: state.liked
  }
};

export default connect(mapStateToProps, { goDetailNews, backNews, likedPost, disLikesPost })(BitcoinNews);
