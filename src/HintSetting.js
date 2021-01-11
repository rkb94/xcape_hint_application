import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Button,
  Vibration,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Header} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';

const image = '../assets/main_bg.jpg';
const defaultMerchant = '';
const defaultTheme = '';

const HintSetting = (props) => {
  const [merchantList, setMerchantList] = useState([]);
//   const [selectedMerchant, setSelectedMerchant] = useState(defaultMerchant);
//   const [selectedTheme, setSelectedTheme] = useState(defaultTheme);
  const [state, setState] = useState({
    selectedMerchant: '',
    selectedTheme: ''
  });

  useEffect(() => {
    getHintList();
  },[merchantList]);

  function getHintList() {
    firestore()
      .collection('xcape')
      .onSnapshot(merchantList => {
        setMerchantList(
          merchantList.docs.map(merchant => merchant.id)
        );
      });
  }

  function showMerchantList() {
      console.log(merchantList);
      console.log(state)
  }

  return (
    <ImageBackground
      source={require(image)}
      style={styles.hintSettingContainer}
      resizeMode="stretch">
      <Header
        statusBarProps={{hidden: true}}
        leftComponent={
          <TouchableHighlight
            style={styles.headerButton}
            onPress={() => {
              Vibration.vibrate(8);
              props.navigation.navigate('HintHome');
            }}
            activeOpacity={0.6}
            underlayColor="dimgrey">
            <Icon name="home-outline" size={25} color="#fff" />
          </TouchableHighlight>
        }
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
              selectedValue={state.selectedMerchant}
              style={styles.hintSettingSectionPicker}
              onValueChange={(itemValue, itemIndex) =>
                setState({selectedMerchant: itemValue})
              }>
                  {merchantList.map(merchant => {
                      return (<Picker.Item label={merchant} value={merchant} key={merchant}/>)
                    })
                  }
            </Picker>
          </View>
          <View style={styles.hintSettingPickerWrapper}>
            <Text style={styles.hintSettingPickerTitle}>테마</Text>
            <Picker
              selectedValue={state.language}
              style={styles.hintSettingSectionPicker}
              itemStyle={styles.hintSettingPickerItem}
            //   onValueChange={(itemValue, itemIndex) =>
            //     setState({language: itemValue})
            //   }
            >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
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
        <View style={styles.hintSettingContentWrapper}></View>
      </View>
      <View style={styles.hintSettingButtonWrapper}>
        <Button
          style={styles.hintSettingButton}
          color="#dbc202"
          onPress={getHintList}
          title="설정 완료"
        />
        <Button
          style={styles.hintSettingButton}
          color="#dbc202"
          onPress={showMerchantList}
          title="View"
        />
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
});

export default HintSetting;
