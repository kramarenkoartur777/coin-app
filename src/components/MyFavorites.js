import React, { Component } from 'react';
import { Alert, StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView, ListView, Share, BackHandler } from 'react-native';
import { connect } from 'react-redux';
var entities = require('entities');
import HTMLView from 'react-native-htmlview';

import { disLikesPost } from '../actions/LikedPostActions';
import { closeMyFavorites } from '../actions/MenuNavActions';
import { goDetailNews, backNews } from '../actions/DetailNewsActions';
import { goLatest } from '../actions/MenuNavNewsActions';
import AllBlocks from './componentsNews/AllBlocks';
import FirstBlock from './componentsNews/FirstBlock';

class MyFavorites extends Component {
  constructor(props){
    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
      info: false,
      dataInfo: []
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    if(this.state.info){
      this.setState({info: false});
      return true
    } else if(this.props.menuNav.isFavorites){
      this.props.closeMyFavorites();
      return true
    }
    return true;
  }
  source_urlFunc(item){
    const source_url = item.key._embedded["wp:featuredmedia"];
    if(source_url == undefined){
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfClLNBejGSkyxTT1EIn779i-szkhPMB9qIUrx5zYdlgQ5ziXG'
    } else {
      return item.key._embedded["wp:featuredmedia"][0].source_url
    }
  }
  renderFavorites(data){
    const ren = data.map((coin, index) => {
      return (
        <AllBlocks key={index}
          onPress={() => this.setState({dataInfo: coin, info: true})}
          data={coin.key}
          dataId={index}
          source_url={{uri: this.source_urlFunc(coin)}}
          textTitle={entities.decodeHTML(coin.key.title.rendered)}
          date={coin.key.date}
          content={this.state.info ? <HTMLView value={coin.key.content.rendered} stylesheet={styles} /> : null}
        />
      );
    });
    return ren;
  }
  _shareTextMessage(coin) {
    Share.share({
      message: coin.key.guid.rendered,
      title: coin.key.title.rendered
    }, {
      dialogTitle: coin.key.title.rendered
    })
    .then(this._showResult)
    .catch(err => console.log(err))

  }
  _showResult (result) {
    console.log(result)
  }
  render(){
    const { liked, menuNav } = this.props;
    if(this.state.info){
      return(
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => this.setState({info: false, dataInfo: []})}
              style={styles.hamburgerBtn}
            >
              <Image style={styles.backBtnIcon} source={require('../img/back-icon.png')}/>
            </TouchableOpacity>
            <View style={styles.logoTextBlock}>
              <Text style={styles.logoText}>NEWSBTC</Text>
            </View>
            <TouchableOpacity
              onPress={() => this._shareTextMessage(this.state.dataInfo)}
              style={styles.shareBtn}
            >
              <Image style={{width: 13, height: 15}} source={require('../img/share-icon-3x.png')}/>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <FirstBlock
              data={this.state.dataInfo.key}
              dataId={0}
              source_url={{uri: this.source_urlFunc(this.state.dataInfo)}}
              textTitle={entities.decodeHTML(this.state.dataInfo.key.title.rendered)}
              date={this.state.dataInfo.key.date}
              author={this.state.dataInfo.key._embedded.author[0].name}
              content={
                <HTMLView
                  value={this.state.dataInfo.key.content.rendered}
                  stylesheet={styles}
                  />}
                />
          </ScrollView>
        </View>
      );
    } else {
      return(
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                if(this.props.menuNav.isNews){
                  this.props.closeMyFavorites()
                  this.props.goLatest()
                } else {
                  this.props.closeMyFavorites()
                }
              }}
              style={styles.hamburgerBtn}
            >
              <Image style={styles.backBtnIcon} source={require('../img/back-icon.png')}/>
            </TouchableOpacity>
            <View style={styles.logoTextBlock}>
              <Text style={styles.logoText}>My Favorites</Text>
            </View>
          </View>
          <ScrollView>
            {this.renderFavorites(liked)}
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
    width: '100%',
    height: 46,
    flexDirection: 'row',
    backgroundColor: '#035a79'
  },
  hamburgerBtn: {
    flex: 0.9,
    margin: 0,
    paddingTop: 16,
    paddingLeft: 16
  },
  logoTextBlock: {
    flex: 2,
    paddingLeft: 1
  },
  logoText: {
    color: '#fff',
    fontFamily: 'Avenir-Medium',
    fontSize: 18,
    paddingTop: 5,
    paddingLeft: 5
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
  },
  aboutNewsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 7
  },
  p: {
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.69)',
    textAlign: 'justify',
    fontFamily: 'Avenir-Medium',
    fontSize: 14
  },
  li: {
    fontWeight: '300',
    color: '#fff',
    textAlign: 'justify',
    fontFamily: 'Avenir-Medium',
    fontSize: 14
  },
  h3: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Avenir-Medium',
    paddingTop: 10
  },
  h2: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Avenir-Medium',
    paddingTop: 10
  },
  backBtnIcon: {
    width: 16,
    height: 13
  },
  logoTextBlock: {
    flex: 2,
    paddingLeft: 1
  },
  logoText: {
    color: '#fff',
    fontFamily: 'HelveticaNeue-Bold',
    fontWeight: '400',
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 18
  },
  shareBtn: {
    alignSelf: 'center',
    marginRight: 15,
    padding: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    menuNews: state.menuNews,
    liked: state.liked,
    menuNav: state.menuNav
  }
};

export default connect(mapStateToProps, { disLikesPost, closeMyFavorites, goDetailNews, goLatest })(MyFavorites);
