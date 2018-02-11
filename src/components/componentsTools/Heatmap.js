import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';

import { connect } from 'react-redux';
import { backTools } from '../../actions/ToolsActions';

class Heatmap extends Component {
  constructor(){
    super();
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.props.backTools()
    return true;
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={this.props.backTools}>
            <Image
              style={styles.backBtnIcon}
              source={require('../../img/back-icon.png')}
            />
          </TouchableOpacity>
          <View style={styles.logoNameBlock}>
            <Text style={styles.logoNameText}>Heatmap</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d252c'
  },
  header: {
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
    backgroundColor: '#035a79'
  },
  backBtn: {
    paddingLeft: 17,
    flex: 1.1
  },
  backBtnIcon: {
    width: 16,
    height: 12
  },
  logoNameBlock: {
    flex: 2
  },
  logoNameText: {
    fontFamily: "HelveticaNeue",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff"
  },
});

const mapStateToProps = (state) => {
  return {
    menuNav: state.menuNav,
    tools: state.tools
  }
}

export default connect(mapStateToProps, { backTools })(Heatmap);
