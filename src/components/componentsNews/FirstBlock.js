import React, { Component } from 'react';
import { Alert, StyleSheet, View, Text, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { likedPost, disLikesPost } from '../../actions/LikedPostActions';
import HTMLView from 'react-native-htmlview';

class FirstBlock extends Component {
  constructor(){
    super();
    this.state = {
      like: false,
      monthName: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    };
  }
  componentDidMount(){
    const { liked } = this.props;
    liked.forEach((a) => {
      if(a.key.id == this.props.data.id){
        this.setState({
          like: true
        })
      }
    })
  }
  renderLike(p, index){
    const { liked } = this.props;

    let l;
    liked.forEach((a, i) => {
      if(a.key.id == p.id){
        l = i
      }
    });
    if(this.state.like){
      this.props.disLikesPost(l);
      this.setState({like: false})
    } else {
      this.props.likedPost(p);
      this.setState({like: true})
    }
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
  contentHTML(content){
    const { detailNews } = this.props;
    if(detailNews.isDetail){
      return (
        <View style={styles.aboutNews}>
          <HTMLView
            value={content}
            stylesheet={styles}
          />
        </View>
      );
    } else {
      return null;
    }
  }
  renderDetailsFirst(){
    const { detailNews } = this.props;
    console.log(detailNews)
    return(
      <View>
        <Text style={styles.firstBlockTitle}>{this.props.textTitle}</Text>
        <Image style={styles.firstBlockImage} source={this.props.source_url} />
        <View style={styles.firstBlockFooter}>
          { detailNews.isDetail ?   <Text style={styles.authorText}>{this.props.author} | {this.getDateFunc(this.props.date)}</Text> : <Text style={styles.firstBlockTime}>{this.getDateFunc(this.props.date)}</Text>}
          <TouchableOpacity
            style={styles.firstBlockFavBtn}
            onPress={() => {
              if(this.props.menuNav.isFavorites){
                this.props.disLikesPost(this.props.dataId);
                this.setState({like: false})
              } else {
                this.renderLike(this.props.data, this.props.dataId)
              }
            }}
          >
            <Image
              style={styles.firstBlockFavImage}
              source={this.state.like ? require('../../img/heart-filled-icon-3x.png') : require('../../img/heart-icon-3x.png')}
            />
          </TouchableOpacity>
        </View>
        {this.props.content}
      </View>
    );
  }
  render(){
    const { detailNews } = this.props;
    return(
      <View style={styles.firstBlock}>
        { detailNews.isDetail ? this.renderDetailsFirst() : <TouchableOpacity onPress={this.props.onPress}>{this.renderDetailsFirst()}</TouchableOpacity> }

      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    padding: 5,
  },
  firstBlockFavImage: {
    width: 15,
    height: 15
  },
  aboutNews: {

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
  authorText: {
    color: '#bcbcbc',
    fontSize: 12,
    fontFamily: 'Avenir-Medium',
    fontWeight: '500'
  },
});

const mapStateToProps = (state) => {
  return{
    liked: state.liked,
    detailNews: state.detailNews,
    menuNav: state.menuNav
  }
}

export default connect(mapStateToProps, {likedPost, disLikesPost})(FirstBlock);
