import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, FlatList, Image, ScrollView, TouchableOpacity, Share, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { goDetailNews, backNews } from '../../actions/DetailNewsActions';
var entities = require('entities');
import HTMLView from 'react-native-htmlview';

import FirstBlock from './FirstBlock';
import AllBlocks from './AllBlocks';

class BitcoinDetailPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      isLiked: false,
      monthName: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };
    this.source_urlFunc = this.source_urlFunc.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    if(this.props.detailNews.isDetail){
      this.props.backNews();
      return true
    }
    return false;
  }
  componentDidMount(){
    this.fetchData();
  }
  fetchData(){
    const { data2 } = this.props.detailNews;
    this.setState({
      data: data2
    })
  }
  source_urlFunc(data){
    const source_url = data._embedded["wp:featuredmedia"][0].source_url;
    return source_url;
  }
  getDateFunc(date){
    const dateObj = new Date(date);
    let day = dateObj.getDate();
    let month = dateObj.getMonth();
    let hours = dateObj.getHours();
    let hoursD = hours < 10 ? '0' + hours : hours;
    let min = dateObj.getMinutes();
    let minD = min < 10 ? '0' + min : min;
    let dataDate = day + ' ' + this.state.monthName[month] + ' | ' + hoursD + ':' + minD;
    return dataDate;
  }
  pushArr(i){
    const { data } = this.state;
    let newArr = [];
    let arr1 = data.slice(0, i);
    let arr2 = data.slice(i + 1);
    newArr.push(data[i]);
    arr1.map((a) => {
      newArr.push(a)
    });
    arr2.map((a) => {
      newArr.push(a)
    })
    this.setState({
      data: newArr
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
  renderFirst(){
    const { liked } = this.props;
    const { data } = this.state;
    const { detailNews } = this.props
    let arr = [];
    let ind;
    let nom = data.map((item, index) => {
      if(item.id == detailNews.data.id){
        arr.push(item.id)
      }
    });
    let num = arr[0];
    const ren = data.map((coin, index) => {
      if(num == coin.id){
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
            author={coin._embedded.author[0].name}
            content={
              <HTMLView
                value={coin.content.rendered}
                stylesheet={styles}
              />
            }
          />
        );
      }
    })
    return ren;
  }
  renderList(){
    const { liked } = this.props;
    const { data } = this.state;
    const { detailNews } = this.props
    let arr = [];
    let ind;
    let nom = data.map((item, index) => {
      if(item.id == detailNews.data.id){
        arr.push(item.id)
      }
    });
    let num = arr[0];
    const ren = data.map((coin, index) => {
      if(num == coin.id){
        return null
      } else {
        return (
          <AllBlocks key={index}
            onPress={() => {
              this.props.goDetailNews(coin);
              this.pushArr(index);
              this.listRef.scrollTo({x: 0, y: 0, animated: false})
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

  _shareTextMessage(coin) {
    Share.share({
      message: coin[0].guid.rendered,
      title: coin[0].title.rendered
    }, {
      dialogTitle: coin[0].title.rendered
    })
    .then(this._showResult)
    .catch(err => console.log(err))
  }
  _showResult (result) {
    console.log(result)
  }
  render(){
    const { detailNews } = this.props;
    return(
      <View style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 1}}>
      <View style={styles.detailContainer}>
        <ScrollView directionalLockEnabled={true}
          bounces={true}
          overScrollMode='always'
          ref={(ref) => { this.listRef = ref }}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.hamburgerBtn}
              onPress={() => {
                this.props.backNews();
                this.setState({
                  data: []
                })
              }}
            >
              <Image style={styles.backBtnIcon} source={require('../../img/back-icon.png')}/>
            </TouchableOpacity>
            <View style={styles.logoTextBlock}>
              <Text style={styles.logoText}>NEWSBTC</Text>
            </View>
            <TouchableOpacity
              onPress={() => this._shareTextMessage(this.state.data)}
              style={styles.shareBtn}
            >
              <Image style={{width: 13, height: 15}} source={require('../../img/share-icon-3x.png')}/>
            </TouchableOpacity>
          </View>
          {this.renderFirst()}
          {this.renderList()}
        </ScrollView>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailContainer: {
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
  },
  h2: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Avenir-Medium',
  },
  backBtnIcon: {
    width: 16,
    height: 13
  }
});

const mapStateToProps = (state) => {
  return {
    detailNews: state.detailNews,
    menuNews: state.menuNews,
    liked: state.liked
  }
}

export default connect(mapStateToProps, { goDetailNews, backNews })(BitcoinDetailPage);
