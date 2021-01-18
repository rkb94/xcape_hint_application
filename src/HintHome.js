import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
  Vibration,
  Text,
  Alert,
} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import HintSearch from './HintSearch';
import HintView from './HintView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HintCount from './HintCount';
import prompt from 'react-native-prompt-android';
import SplashScreen from 'react-native-splash-screen';

const image = '../assets/main_bg.jpg';

const HintHome = ({navigation}) => {
  const [merchant, setMerchant] = useState();
  const [theme, setTheme] = useState();
  const [hint, setHint] = useState();
  const [answer, setAnswer] = useState();
  const [hintCount, setHintCount] = useState(0);

  useEffect(() => {
    SplashScreen.hide();
    const refresh = navigation.addListener('focus', () => {
      console.log('refresh');
      getStoreData();
      getHintCount();
      setHint('');
      setAnswer('');
    });
    return refresh;
  }, [merchant, theme, navigation]);

  const getStoreData = async () => {
    try {
      setMerchant(await AsyncStorage.getItem('merchant'));
      setTheme(await AsyncStorage.getItem('theme'));
    } catch (error) {
      console.log('Not storage...' + error);
      Alert.alert('테마를 설정 해주세요.');
    }
  };

  const getHintCount = async () => {
    try {
      let storageHintCount = await AsyncStorage.getItem('hintCount');
      setHintCount(Number(storageHintCount));
    } catch (error) {
      console.log('Not hintCount...' + error);
      setHintCount(0);
    }
  };

  const setHintAndAnswer = (inputHint, inputAnswer) => {
    console.log('hint: ' + inputHint + ' ' + inputAnswer);
    setHint(inputHint);
    setAnswer(inputAnswer);
  };

  const plusHintUseCount = async () => {
    let curHintCount = Number(hintCount);
    setHintCount(++curHintCount);
    console.log('hintCount: ' + curHintCount);
    await AsyncStorage.setItem('hintCount', JSON.stringify(curHintCount));
  };

  const settingPrompt = () => {
    Vibration.vibrate(6);
    prompt(
      '관리자 비밀번호를 입력해주세요.',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {
            Vibration.vibrate(6);
            console.log('Cancel Pressed')
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (password) => {
            Vibration.vibrate(6);
            console.log('OK Pressed, password: ' + password)
            if (password == "5772") {
              navigation.navigate('HintSetting');
            } else {
              Alert.alert("잘못된 입력입니다.");
            }
          },
        },
      ],
      {
        type: 'secure-text',
        cancelable: false,
        defaultValue: '',
        placeholder: '* * * *',
      },
    );
  };

  return (
    <View style={styles.hintHomeContainer}>
      <Header
        statusBarProps={{hidden: true}}
        leftComponent={
          <TouchableHighlight
            style={styles.hintSettingButton}
            onPress={settingPrompt}
            // navigation.navigate('HintSetting');
            activeOpacity={0.6}
            underlayColor="dimgrey">
            <Icon name="settings-outline" size={25} color="#fff" />
          </TouchableHighlight>
        }
        centerComponent={<Text style={styles.centerComponent}>{theme}</Text>}
        rightComponent={<HintCount hintCount={hintCount} />}
        containerStyle={styles.headerStyle}
      />
      <ImageBackground
        source={require(image)}
        style={styles.imageBackgroundContainer}
        resizeMode="stretch">
        <HintSearch
          style={styles.hintSearch}
          merchant={merchant}
          theme={theme}
          navigation={navigation}
          setHintAndAnswer={setHintAndAnswer}
          plusHintUseCount={plusHintUseCount}
        />
        <HintView style={styles.hintView} hint={hint} answer={answer} />
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
    textShadowRadius: 8,
  },
  headerStyle: {
    backgroundColor: '#151515',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackgroundContainer: {
    flex: 16,
    flexDirection: 'column',
  },
  hintHomeContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#151515',
  },
  hintSettingButton: {
    borderRadius: 50,
    padding: 15,
  },
});

export default HintHome;
