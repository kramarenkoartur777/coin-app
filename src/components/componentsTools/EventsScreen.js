import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, BackHandler, Image } from 'react-native';
import { connect } from 'react-redux';
import { backCalendars } from '../../actions/ToolsActions';

class EventBlock extends Component {
  constructor(props){
    super(props);
    this.state = {
      eventShow: false
    }
  }
  render(){
    return(
      <View style={styles.eventBlockContainer}>
        <TouchableOpacity
          onPress={() => this.setState((prevState) => {
            return{
              eventShow: !prevState.eventShow
            }
          })}
        >
          <Text style={styles.eventTitle}>{this.props.title}</Text>
          <View style={styles.eventFooter}>
            <Text style={styles.eventDate}>{this.props.date}</Text>
            <TouchableOpacity
              onPress={() => this.setState((prevState) => {
                return {
                  eventShow: !prevState.eventShow
                }
              })}
              style={styles.eventDropBtn}>
              {this.state.eventShow ? <Text>^</Text> : <Text>v</Text>}
            </TouchableOpacity>
          </View>
          {this.state.eventShow ? <Text style={styles.infoText}>{this.props.infoText}</Text> : null}
        </TouchableOpacity>
      </View>
    );
  }
}

class EventsScreen extends Component {
  constructor(props){
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.props.backCalendars()
    return true;
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={this.props.backCalendars}
            style={styles.backBtn}
          >
            <Image
              source={require('../../img/back-icon.png')}
              style={styles.backBtnIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Events</Text>
        </View>

        <EventBlock
          title='TOKON 2049'
          date='20 Mar 2018'
          infoText='Cryptobitup is considered to be the best virtual platform for earning cryptos. Start trading with us. '
        />

        <EventBlock
          title='CryptoCurrency World Expo'
          date='21 Mar 2018'
          infoText='Cryptobitup is considered to be the best virtual platform for earning cryptos. Start trading with us. '
        />

        <EventBlock
          title='ASEAN Technology Forum 2018'
          date='02 Apr 2018'
          infoText='Cryptobitup is considered to be the best virtual platform for earning cryptos. Start trading with us. '
        />

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
    height: 46,
    backgroundColor: '#035a79',
    flexDirection: 'row'
  },
  backBtn: {
    paddingLeft: 18,
    justifyContent: 'center',
    flex: 0.6
  },
  backBtnIcon: {
    width: 16,
    height: 12
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Avenir-Medium',
    flex: 1,
    textAlignVertical: 'center'
  },
  eventBlockContainer: {
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 17,
    paddingTop: 6,
    paddingBottom: 16
  },
  eventTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
  },
  eventFooter: {
    paddingTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventDate: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
  },
  infoText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontFamily: 'Avenir-Medium',
    marginTop: 10
  },
  eventDropBtn: {
    paddingHorizontal: 5
  }
});

const mapStateToProps = (state) => {
  return{
    tools: state.tools
  }
}

export default connect(mapStateToProps, { backCalendars })(EventsScreen);
