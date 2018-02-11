import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, BackHandler, Share } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class AirdropBlock extends Component {
  constructor(props){
    super(props);
    this.state = {
      infoShow: false
    }
  }
  renderInfo(){
    if(this.state.infoShow){
      return(
        <View style={{flex: 1}}>

          <Text style={styles.infoText}>{this.props.infoText}</Text>

          <View style={styles.shareBlock}>
            <TouchableOpacity
              style={[styles.shareBtn, styles.shareBtnFB]}
            >
              <Text style={styles.shareIcon}>F</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.shareBtn, styles.shareBtnTW]}
            >
              <Text style={styles.shareIcon}>Tw</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.shareBtnTG]}
            >
              <LinearGradient colors={['#64d6f2', '#34ace1']} style={styles.linearGradient}
                start={{y: 0.0, x: 1.0}}
                end={{y: 0.5, x: 0.0}}
              >
                <Text style={[styles.shareIconTG, styles.shareIcon]}>Tg</Text>

              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.shareBtn, styles.shareBtnGM]}
            >
              <Text style={styles.shareIcon}>G</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.shareBtn, styles.shareBtnEM]}
            >
              <Text style={styles.shareIcon}>E</Text>
            </TouchableOpacity>
          </View>

        </View>
      );
    } else {
      return null;
    }
  }
  render(){
    return(
      <View style={styles.airdropBlockContainer}>
        <Text style={styles.airdropBlockTitle}>{this.props.title}</Text>
        <View style={styles.airdropBlockFooter}>
          <Text style={styles.activeDate}>{this.props.activeDate}</Text>
          <TouchableOpacity
            style={styles.showInfoBtn}
            onPress={() => this.setState((prevState) => {
              return{
                infoShow: !prevState.infoShow
              }
            })}
          >
            {this.state.infoShow ? <Text>^</Text> : <Text>v</Text>}
          </TouchableOpacity>
        </View>

        {this.renderInfo()}

      </View>
    );
  }
}

class AirdropActive extends Component {
  render(){
    return(
      <View style={styles.container}>

        <AirdropBlock
          title='BlitzPerdict  Exclusive Airdrop'
          activeDate='Active for 37 days'
          infoText='The dock.io protocol is an open network revolutionizing how apps access user data and communicate with one another. User data powers nearly every consumer facing app on the web. '
        />

        <AirdropBlock
          title='Experty Exclusive Airdrop'
          activeDate='Active for 93 days'
          infoText='The dock.io protocol is an open network revolutionizing how apps access user data and communicate with one another. User data powers nearly every consumer facing app on the web. '
        />

        <AirdropBlock
          title='Dock'
          activeDate='Active for 14 days'
          infoText='The dock.io protocol is an open network revolutionizing how apps access user data and communicate with one another. User data powers nearly every consumer facing app on the web. '
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  airdropBlockContainer: {
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 17,
    paddingTop: 6,
    paddingBottom: 16
  },
  airdropBlockTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Avenir-Medium',
    fontWeight: '400',
  },
  airdropBlockFooter: {
    paddingTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activeDate: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontFamily: 'Avenir-Medium',
    fontWeight: '400',
  },
  infoText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontFamily: 'Avenir-Medium',
    marginTop: 10
  },
  showInfoBtn: {
    paddingHorizontal: 5
  },
  shareBlock: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'space-between'
  },
  shareBtn: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shareBtnFB: {
    backgroundColor: "#4a90e2"
  },
  shareBtnTW: {
    backgroundColor: '#fff'
  },
  shareBtnTG: {
    width: 30,
    height: 30,
  },
  shareBtnGM: {
    backgroundColor: '#dc4a38'
  },
  shareBtnEM: {
    backgroundColor: '#035a79'
  },
  linearGradient: {
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shareIconTG: {
  },
});

export default AirdropActive;
