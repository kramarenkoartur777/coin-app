import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TextInput, ScrollView, TouchableOpacity, ListView } from 'react-native';

class UptrendScreen extends Component {
  constructor(){
    super();
    this.state = {
      colors: ['#23b996', 'rgba(34, 149, 122, 0.8)', 'rgba(39, 194, 249, 0.85)', '#27c2f9', '#27c2f9', '#27c2f9', 'rgba(240, 53, 17, 0.8)', '#f03511' ],
      colors2: ['#23b996', 'rgba(34, 149, 122, 0.8)', 'rgba(39, 194, 249, 0.85)', '#27c2f9', '#27c2f9', '#27c2f9', '#27c2f9', 'rgba(240, 53, 17, 0.8)', '#f03511' ],

      retracements: [
        {'percent': '0', 'price': '11,738.30'},
        {'percent': '23.6', 'price': '11,722.50'},
        {'percent': '38.2', 'price': '11,712.70'},
        {'percent': '50', 'price': '11,704.80'},
        {'percent': '61.8', 'price': '11,696.90'},
        {'percent': '76.4', 'price': '11,687.11'},
        {'percent': '100', 'price': '11,671.30'},
        {'percent': '138.2', 'price': '11,645.70'},
      ],
      extentions: [
        {'percent': '23.6', 'price': '11,738.30'},
        {'percent': '38.2', 'price': '11,722.50'},
        {'percent': '50', 'price': '11,712.70'},
        {'percent': '61.8', 'price': '11,704.80'},
        {'percent': '100', 'price': '11,696.90'},
        {'percent': '138.2', 'price': '11,687.11'},
        {'percent': '161.8', 'price': '11,671.30'},
        {'percent': '200', 'price': '11,645.70'},
        {'percent': '268.8', 'price': '11,645.70'},
      ]
    }
  }
  retracementsFunc(){
    const { colors, retracements } = this.state;
    const ren = retracements.map((a, i) => {
      let perColor = colors[i];
      return(
        <View key={i}>
          <View style={styles.retracementsBlocks}>
            <Text style={[styles.percent, {color: perColor}]}>{a.percent}%</Text>
            <Text style={styles.price}>{a.price}</Text>
          </View>
          <View style={styles.separator}></View>
        </View>
      );
    });
    return ren;
  }
  extentionsFunc(){
    const { colors2, extentions } = this.state;
    const ren = extentions.map((a, i) => {
      let perColor = colors2[i];
      return(
        <View key={i}>
          <View style={styles.retracementsBlocks}>
            <Text style={[styles.percent, {color: perColor}]}>{a.percent}%</Text>
            <Text style={styles.price}>{a.price}</Text>
          </View>
          <View style={styles.separator}></View>
        </View>
      );
    });
    return ren;
  }
  render(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    const dataClone = ds.cloneWithRows(this.state.retracements);
    return(
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.calculatorBlock}>
            <View style={styles.upIconBlock}>
              <Image
                style={styles.upIcon}
                source={require('../../img/uptrendIcon.png')}
              />
            </View>

            <Text style={[styles.titleText, styles.high]}>High</Text>
            <TextInput
              style={styles.textInput}
              defaultValue='11,738.3'
              autoCorrect={false}
              keyboardType='numeric'
              maxLength={15}
              underlineColorAndroid='#3f73b0'
            />

            <Text style={[styles.titleText, styles.low]}>Low</Text>
            <TextInput
              style={styles.textInput}
              defaultValue='11,671.0'
              autoCorrect={false}
              keyboardType='numeric'
              maxLength={15}
              underlineColorAndroid='#3f73b0'
            />

            <Text style={[styles.titleText, styles.custom]}>Custom</Text>
            <TextInput
              style={styles.textInput}
              defaultValue='11,736.0'
              autoCorrect={false}
              keyboardType='numeric'
              maxLength={15}
              underlineColorAndroid='#3f73b0'
            />

            <TouchableOpacity
              style={styles.calculateBtn}
            >
              <Text style={styles.calculateText}>Calculate</Text>
            </TouchableOpacity>

            <View style={styles.retracements}>
              <Text style={styles.retracementsTitle}>Retracements</Text>

            {this.retracementsFunc()}

            </View>

            <View style={styles.extentions}>
              <Text style={styles.extentionsTitle}>Extentions</Text>

            {this.extentionsFunc()}

            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calculatorBlock: {
    width: 183,
    marginTop: 68,
    alignSelf: 'center',
    marginBottom: 30
  },
  upIconBlock: {
    width: 76,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  upIcon: {
    width: '100%',
    height: '100%'
  },
  titleText: {
    fontSize: 10,
    fontFamily: 'Avenir-Medium',
    marginHorizontal: 5,
  },
  high: {
    color: '#23b996',
    marginTop: 20
  },
  textInput: {
    margin: 0,
    padding: 0,
    paddingBottom: 5,
    marginBottom: 18,
    color: '#fff',
    fontFamily: 'Avenir-Medium',
    fontSize: 14,
    paddingLeft: 5
  },
  low: {
    color: '#d22e1d',
  },
  custom: {
    color: '#de8b37',
  },
  calculateBtn: {
    borderRadius: 4,
    height: 44,
    backgroundColor: "#035a79",
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 18
  },
  calculateText: {
    fontFamily: 'Avenir-Medium',
    color: '#fff',
    fontSize: 18
  },
  retracements: {
    paddingHorizontal: 5,
  },
  retracementsTitle: {
    color: '#2cc8ff',
    fontSize: 14,
    fontFamily: "Avenir-Medium",
    alignSelf: 'center'
  },
  retracementsBlocks: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  percent: {
    fontSize: 14,
    fontFamily: 'Avenir-Medium',
    height: '100%',
    textAlignVertical: 'center',
  },
  price: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Avenir-Medium',
    textAlignVertical: 'center',
  },
  separator: {
    width: 130,
    height: 2,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)'
  },
  extentions: {
    paddingHorizontal: 5,
    marginTop: 40
  },
  extentionsTitle: {
    color: '#2cc8ff',
    fontSize: 14,
    fontFamily: "Avenir-Medium",
    alignSelf: 'center'
  }
});

export default UptrendScreen;
