import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
var entities = require('entities');

class MyFavorites extends Component {
  source_urlFunc(data){
    const source_url = data._embedded["wp:featuredmedia"][0].source_url;
    return source_url;
  }
  renderLikeFavorites(){
    const { liked } = this.props;
    return(
      <TouchableOpacity
      >
        <View style={styles.allBlocks}>
          <Image style={styles.allBlockImage} source={{uri: this.source_urlFunc(liked.data)}} />
          <View style={styles.allBlockAbout}>
            <Text style={styles.allBlockAboutText}>{entities.decodeHTML(liked.data.title.rendered)}</Text>
            <View style={styles.aboutFooter}>
              <Text style={styles.aboutFooterTime}>{liked.data.date}</Text>
              <TouchableOpacity
                style={styles.aboutFooterFavBtn}
              >
                <Image
                  style={styles.aboutFooterImage}
                  source={liked.isLiked ? require('../img/fav-news-filled-icon.png') : require('../img/fav-news-icon.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  render(){
    console.log(this.props.liked.data);
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.hamburgerBtn}
          >
            <Image source={require('../img/back-icon.png')}/>
          </TouchableOpacity>
          <View style={styles.logoTextBlock}>
            <Text style={styles.logoText}>My Favorites</Text>
          </View>
        </View>
        {this.props.liked.isLiked ? this.renderLikeFavorites() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c'
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
});

const mapStateToProps = (state) => {
  return {
    menuNews: state.menuNews,
    liked: state.liked
  }
};

export default connect(mapStateToProps)(MyFavorites);
