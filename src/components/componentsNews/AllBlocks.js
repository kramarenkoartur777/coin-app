import React, { Component } from 'react';
import { Alert, StyleSheet, View, Text, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { likedPost, disLikesPost } from '../../actions/LikedPostActions';

class AllBlocks extends Component {
  constructor(props){
    super(props);
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
  render(){
    return(
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.all}
        onPress={this.props.onPress}
      >
        <View style={styles.allBlocks}>
          <Image style={styles.allBlockImage} source={this.props.source_url} />
          <View style={styles.allBlockAbout}>
            <Text style={styles.allBlockAboutText}>{this.props.textTitle}</Text>
            <View style={styles.aboutFooter}>
              <Text style={styles.aboutFooterTime}>{this.getDateFunc(this.props.date)}</Text>
              <TouchableOpacity
                style={styles.firstBlockFavBtn}
                onPress={() => {
                  if(this.props.menuNav.isFavorites){
                    this.props.disLikesPost(this.props.dataId);
                  } else {
                    this.renderLike(this.props.data, this.props.dataId)
                  }
                }}
              >
                <Image
                  style={styles.aboutFooterImage}
                  source={this.state.like ? require('../../img/heart-filled-icon-3x.png') : require('../../img/heart-icon-3x.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {this.props.content}
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  all: {
  },
  allBlocks: {
    flexDirection: 'row',
  },
  allBlockImage: {
    width: 92,
    height: 92,
    borderRadius: 5
  },
  allBlockAbout: {
    paddingLeft: 10,
    justifyContent: 'space-between',
    flex: 1
  },
  allBlockAboutText: {
    fontFamily: 'Avenir-Medium',
    fontSize: 14,
    fontWeight: '500',
    width: '100%',
    color: '#fff',
  },
  aboutFooter: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  aboutFooterTime: {
    color: '#bcbcbc',
    fontFamily: 'Avenir-Medium',
    fontSize: 12,
    fontWeight: '500'
  },
  firstBlockFavBtn: {
    padding: 5,
  },
  aboutFooterImage: {
    width: 13,
    height: 13,
  }
});

const mapStateToProps = (state) => {
  return{
    liked: state.liked,
    menuNav: state.menuNav
  }
}

export default connect(mapStateToProps, {likedPost, disLikesPost})(AllBlocks);
