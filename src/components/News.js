import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import BitcoinNews from './componentsNews/BitcoinNews';

class News extends Component {
  renderContent(){
    if(this.props.menuNews.isBitcoin){
      return <BitcoinNews id='1' />;
    } else if(this.props.menuNews.isAltcoin){
      return <BitcoinNews id='2'/>;
    } else if(this.props.menuNews.isIco){
      return <BitcoinNews id='3'/>;
    } else if(this.props.menuNews.isAnalysys){
      return <BitcoinNews id='4'/>;
    } else if(this.props.menuNews.isSponsored){
      return <BitcoinNews id='5'/>;
    } else if(this.props.menuNews.isDerivatives){
      return <BitcoinNews id='6'/>;
    }
  }
  render(){
    return(
      <View style={styles.container}>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c'
  }
});

const mapStateToProps = (state) => {
  return {
    menuNews: state.menuNews
  }
};

export default connect(mapStateToProps)(News);
