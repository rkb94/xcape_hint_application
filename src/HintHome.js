import React, {useState, useEffect} from 'react';
import {View, ImageBackground, StyleSheet, TouchableHighlight, Vibration, Text} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
import HintSearch from './HintSearch';
import HintView from './HintView';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = '../assets/main_bg.jpg';

const HintHome = (props) => {
  const [merchant, setMerchant] = useState();
  const [theme, setTheme] = useState();

  useEffect(() => {
    const refresh = props.navigation.addListener('focus', () => {
      console.log("refresh");
      getStoreDate();
      getMerchant();
    })
    return refresh;
  }, [merchant, theme, props.navigation])
  
  const getStoreDate = async () => {
    try {
      setMerchant(await AsyncStorage.getItem('merchant'));
      setTheme(await AsyncStorage.getItem('theme'));
    } catch (error) {
      console.log('Not storage...');
    }
  }
  
  const getMerchant = () => {
    console.log("지점: " + merchant + ", 테마: " + theme);
  }

  return (
    <View style={styles.hintHomeContainer}>
      <Header
        statusBarProps={{hidden: true}}
        leftComponent={
          <TouchableHighlight
            style={styles.hintSettingButton}
            onPress={() => {
              Vibration.vibrate(6)
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
            {theme}
          </Text>
        }
        rightComponent={
          <TouchableHighlight
            style={styles.hintSettingButton}
            onPress={getMerchant}
            activeOpacity={0.6}
            underlayColor="dimgrey"
          >
            <Icon name="home-outline" size={25} color="#fff" />
          </TouchableHighlight>}
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
