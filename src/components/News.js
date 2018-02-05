import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import BitcoinNews from './componentsNews/BitcoinNews';
import AltcoinNews from './componentsNews/AltcoinNews';
import ICONews from './componentsNews/ICONews';
import AnalysisNews from './componentsNews/AnalysisNews';
import SponsoredNews from './componentsNews/SponsoredNews';
import DerivativesNews from './componentsNews/DerivativesNews';
import LatestNews from './componentsNews/LatestNews';

class News extends Component {
  renderContent(){
    if(this.props.menuNews.isBitcoin){
      return <BitcoinNews id='1' />;
    } else if(this.props.menuNews.isAltcoin){
      return <AltcoinNews id='2'/>;
    } else if(this.props.menuNews.isIco){
      return <ICONews id='3'/>;
    } else if(this.props.menuNews.isAnalysys){
      return <AnalysisNews id='4'/>;
    } else if(this.props.menuNews.isSponsored){
      return <SponsoredNews id='5'/>;
    } else if(this.props.menuNews.isDerivatives){
      return <DerivativesNews id='6'/>;
    } else {
      return <LatestNews id='7' />
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
    menuNews: state.menuNews,
    menuNav: state.menuNav
  }
};

export default connect(mapStateToProps)(News);
