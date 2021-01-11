import React from 'react';
import {View, ImageBackground, StyleSheet, TouchableHighlight, Vibration, Text} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
import HintSearch from './HintSearch';
import HintView from './HintView';

const image = '../assets/main_bg.jpg';

const HintHome = (props) => {
  return (
    <View style={styles.hintHomeContainer}>
      <Header
        statusBarProps={{hidden: true}}
        leftComponent={
          <TouchableHighlight
            style={styles.hintSettingButton}
            onPress={() => {
              Vibration.vibrate(8)
              props.navigation.navigate('HintSetting')
            }}
            activeOpacity={0.6}
            underlayColor="dimgrey"
          >
            <Icon name="settings-outline" size={25} color="#fff" />
          </TouchableHighlight>
        }
        centerComponent={
          <Text style={styles.centerComponent}>
            501동 사람들
          </Text>
        }
        // rightComponent={{icon: 'home', color: '#fff'}}
        containerStyle={styles.headerStyle}
      />
      <ImageBackground
        source={require(image)}
        style={styles.imageBackgroundContainer}
        resizeMode="stretch">
        <HintSearch style={styles.hintSearch} />
        <HintView style={styles.hintView} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  centerComponent: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    textShadowColor: 'red',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 8
  },
  headerStyle: {
    backgroundColor: '#151515',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageBackgroundContainer: {
    flex: 16,
    flexDirection: 'column'
  },
  hintHomeContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#151515'
  },
  hintSettingButton: {
    borderRadius: 50,
    padding: 15,
  }
});

export default HintHome;
