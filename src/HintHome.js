import React from 'react';
import {View, ImageBackground, StyleSheet, Text} from 'react-native';
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
        leftComponent={<Icon name="settings-outline" size={25} color="#fff" />}
        centerComponent={{text: props.theme, style: styles.centerComponent}}
        rightComponent={{icon: 'home', color: '#fff'}}
        containerStyle={{backgroundColor: '#151515'}}
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
  },
  imageBackgroundContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  hintHomeContainer: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default HintHome;
