import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { goDetailNews, backNews } from '../../actions/DetailNewsActions';
var entities = require('entities');
import HTMLView from 'react-native-htmlview';

class BitcoinDetailPage extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      source_url: '',
      id: []
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
  componentDidMount(){
    this.fetchData();
  }
  source_urlFunc(data){
    const source_url = data._embedded["wp:featuredmedia"][0].source_url;
    return source_url;
  }
  renderBlock(item){
    if(item.id == this.props.detailNews.data.id){
      return null;
    } else {
      return(
        <TouchableOpacity
          onPress={() => {
            this.props.goDetailNews(item);
            this.fetchData()
          }}
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
    const { detailNews } = this.props;
    return(
      <View style={styles.container}>
        <ScrollView directionalLockEnabled={true}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.hamburgerBtn}
              onPress={this.props.backNews}
            >
              <Image source={require('../../img/back-icon.png')}/>
            </TouchableOpacity>
            <View style={styles.logoTextBlock}>
              <Text style={styles.logoText}>NEWSBTC</Text>
            </View>
            <TouchableOpacity
              style={styles.shareBtn}
            >
              <Image source={require('../../img/share-icon.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.aboutNews}>
            <Text style={styles.aboutNewsTitle}>{entities.decodeHTML(detailNews.data.title.rendered)}</Text>
            <Image style={styles.aboutNewsImage} source={{uri: this.source_urlFunc(detailNews.data)}} />
            <View style={styles.aboutNewsFooter}>
              <Text style={styles.authorText}>{detailNews.data._embedded.author[0].name} | {detailNews.data.date}</Text>
              <TouchableOpacity
                style={styles.aboutFooterFavBtn}
              >
                <Image
                  style={styles.aboutFooterImage}
                  source={this.props.liked.isLiked ? require('../../img/fav-news-filled-icon.png') : require('../../img/fav-news-icon.png')}
                />
              </TouchableOpacity>
            </View>
            <HTMLView
              value={detailNews.data.content.rendered}
              stylesheet={styles}
            />
          </View>
          <FlatList
            data={this.state.data}
            keyExtractor={(x, i) => x.id}
            renderItem={({item}) => this.renderBlock(item)}
          />
        </ScrollView>
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
    fontFamily: 'HelveticaNeue-Bold',
    fontWeight: '400',
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 10
  },
  shareBtn: {
    alignSelf: 'center',
    marginRight: 15
  },
  aboutNews: {
    paddingHorizontal: 15,
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
  },
  aboutNewsTitle: {
    fontSize: 16,
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    color: '#fff',
    marginTop: 13,
    marginBottom: 9
  },
  aboutNewsImage: {
    width: '100%',
    height: 150,
    borderRadius: 5
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
  authorText: {
    color: '#bcbcbc',
    fontSize: 12,
    fontFamily: 'Avenir-Medium',
    fontWeight: '500'
  },

  p: {
    fontWeight: '300',
    color: '#fff',
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
  },
  h2: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Avenir-Medium',
  },
});

const mapStateToProps = (state) => {
  return {
    detailNews: state.detailNews,
    menuNews: state.menuNews,
    liked: state.liked
  }
}

export default connect(mapStateToProps, { goDetailNews, backNews })(BitcoinDetailPage);
