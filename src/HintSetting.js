import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Button,
  Vibration,
  ActivityIndicator,
  Alert,
  Linking
} from 'react-native';
import {Header} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = '../assets/main_bg.jpg';

const HintSetting = (props) => {
  const [merchantList, setMerchantList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState();
  const [selectedTheme, setSelectedTheme] = useState();
  const [loading, setLoading] = useState(false);
  const [isUpdatable, setIsUpdateable] = useState(false);
  const [updateLink, setUpdateLink] = useState();
  const [version, setVersion] = useState("1.1");

  useEffect(() => {
    getMerchantList();
    getVersionInfo();
    setAsyncStorage();
  }, []);

  useEffect(() => {
    getThemeList();
  }, [selectedMerchant]);

  const setAsyncStorage = async () => {
    try {
      setSelectedMerchant(await AsyncStorage.getItem('merchant'));
      setSelectedTheme(await AsyncStorage.getItem('theme'));
    } catch (error) {
      console.log('Not storage...');
    }
  };

  const getMerchantList = () => {
    setLoading(true);
    return firestore()
      .collection('xcape')
      .get()
      .then((merchantList) => {
        setMerchantList(merchantList.docs.map((merchant) => merchant.id));
      });
  };

  const getThemeList = () => {
    return firestore()
      .collection('xcape')
      .doc(selectedMerchant)
      .collection('테마')
      .get()
      .then((themeList) => {
        setThemeList(themeList.docs.map((theme) => theme.id));
        setLoading(false);
      });
  };

  const goBackHintHome = async () => {
    Vibration.vibrate(6);
    await storeData(selectedMerchant, selectedTheme);
    props.navigation.navigate('HintHome', {
      isForSetting: true,
    });
  };

  const storeData = async (merchant, theme) => {
    try {
      await AsyncStorage.setItem('merchant', merchant);
      await AsyncStorage.setItem('theme', theme);
      await AsyncStorage.setItem('hintCount', JSON.stringify(0));
      console.log(
        'Store success merchant: ' +
          (await AsyncStorage.getItem('merchant')) +
          '/' +
          (await AsyncStorage.getItem('theme')),
      );
    } catch (e) {
      console.log('Store Error!!');
    }
  };

  const getVersionInfo = () => {
    return firestore()
    .collection('update')
    .doc('info')
    .get()
    .then((info) => {
        if (version != info.data().version) {
            setIsUpdateable(true);
            setUpdateLink(info.data().link);
            setVersion(info.data().version);
        }
    });
  }

  const openUpdateVersion = () => {
    Linking.openURL(updateLink);
  }

  return (
    <ImageBackground
      source={require(image)}
      style={styles.hintSettingContainer}
      resizeMode="stretch">
      <Header
        statusBarProps={{hidden: true}}
        centerComponent={<Text style={styles.centerComponent}>힌트 설정</Text>}
        containerStyle={styles.headerStyle}
      />
      <View style={styles.hintSettingSection}>
        <View style={styles.hintSettingSectionHeader}>
          <Text style={styles.hintSettingSectionHeaderText}>
            지점 & 테마 설정
          </Text>
        </View>
        <View style={styles.hintSettingContentWrapper}>
          <View style={styles.hintSettingPickerWrapper}>
            <Text style={styles.hintSettingPickerTitle}>지점</Text>
            <Picker
              selectedValue={selectedMerchant}
              style={styles.hintSettingSectionPicker}
              onValueChange={(itemValue, itemIndex) => {
                Vibration.vibrate(6);
                setSelectedMerchant(itemValue);
              }}>
              {merchantList.map((merchant) => {
                return (
                  <Picker.Item
                    label={merchant}
                    value={merchant}
                    key={merchant}
                  />
                );
              })}
            </Picker>
          </View>
          <View style={styles.hintSettingPickerWrapper}>
            <Text style={styles.hintSettingPickerTitle}>테마</Text>
            <Picker
              selectedValue={selectedTheme}
              style={styles.hintSettingSectionPicker}
              itemStyle={styles.hintSettingPickerItem}
              onValueChange={(itemValue) => {
                Vibration.vibrate(6);
                setSelectedTheme(itemValue);
              }}>
              <Picker.Item
                label="===== 테마를 설정해주세요. ======"
                value="테마를 설정해주세요."
                key="테마를 설정해주세요."
              />
              {themeList.map((theme) => {
                return <Picker.Item label={theme} value={theme} key={theme} />;
              })}
            </Picker>
          </View>
        </View>
      </View>
      <View style={styles.hintSettingSection}>
        <View style={styles.hintSettingSectionHeader}>
          <Text style={styles.hintSettingSectionHeaderText}>
            XCAPE 힌트 애플리케이션 업데이트
          </Text>
        </View>
        <View style={styles.hintSettingContentWrapper}>
            <View style={styles.hintSettingVersionWrapper}>
                <Button 
                    style={styles.hintSettingVersionButton}
                    title={isUpdatable ? version + "V 버전 업데이트가 필요합니다." : "현재 " + version + "V 최신 버전입니다."} 
                    onPress={openUpdateVersion}
                    disabled={!isUpdatable}
                />
            </View>
        </View>
      </View>
      <View style={styles.hintSettingButtonWrapper}>
        {loading ? (
          <ActivityIndicator size="large" color="#dbc202" />
        ) : (
          <Button
            style={styles.hintSettingButton}
            color="#dbc202"
            onPress={goBackHintHome}
            title="설정 완료"
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  hintSettingContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#151515',
  },
  hintSettingSection: {
    flex: 6,
    flexDirection: 'column',
    margin: '5%',
  },
  hintSettingSectionHeader: {
    flex: 1,
    justifyContent: 'center',
  },
  hintSettingSectionHeaderText: {
    color: 'lightgrey',
    fontSize: 15,
    marginLeft: '3%',
  },
  hintSettingContentWrapper: {
    flex: 6,
    borderRadius: 15,
    backgroundColor: '#202020',
  },
  hintSettingPickerTitle: {
    flex: 1,
    color: 'lightgrey',
    justifyContent: 'center',
    textAlign: 'center',
  },
  hintSettingSectionPicker: {
    flex: 5,
    color: 'lightgrey',
  },
  hintSettingButtonWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '5%',
  },
  hintSettingButton: {
    color: 'black',
  },
  headerButton: {
    borderRadius: 50,
    padding: 15,
  },
  headerStyle: {
    backgroundColor: '#151515',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  hintSettingPickerWrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintSettingPickerItem: {
    textAlign: 'right',
  },
  hintSettingLoading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  hintSettingVersionWrapper: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintSettingVersionText: {
      flex: 1,
      color: 'lightgrey',
      fontSize: 20,
      fontWeight: 'bold',
      justifyContent: 'center',
      alignItems: 'center',
  },
  hintSettingVersionButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  }
});

export default HintSetting;
