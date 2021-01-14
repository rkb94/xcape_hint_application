import React, {useState, useEffect} from 'react';
import {Icon} from 'react-native-elements';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Vibration,
  Alert,
  Keyboard,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const HintSearch = (props) => {
  const [hintList, setHintList] = useState([]);
  const [hintSeq, setHintSeq] = useState('');
  const [input, setInput] = useState('');
  const [selectMerchant, setSelectMerchant] = useState('');
  const [selectThmem, setSelectTheme] = useState('');

  useEffect(() => {
    if (props.merchant == undefined || props.theme == undefined) {
      setSelectMerchant('');
      setSelectTheme('');
    } else {
      if (selectMerchant != props.merchant || selectThmem != props.theme) {
        getHintList(props.merchant, props.theme);
        console.log(props.merchant + ', ' + props.theme);
      }
      setSelectMerchant(props.merchant);
      setSelectTheme(props.theme);
    }
    const refresh = props.navigation.addListener('focus', () => {
      console.log('refresh');
      setHintSeq('');
      setInput('');
    });
    return refresh;
  }, [props.merchant, props.theme, props.navigation]);

  useEffect(() => {
    props.navigation;
  });

  function getHintList(merchant, theme) {
    firestore()
      .collection('xcape')
      .doc(merchant)
      .collection('테마')
      .doc(theme)
      .collection('힌트')
      .onSnapshot((hint) => {
        setHintList(hint.docs.map((doc) => doc.data()));
      });
  }

  const searchHint = (e) => {
    e.preventDefault();
    Vibration.vibrate(8);
    console.log(input);
    let hintMessage = hintList.find((hint) => hint.key == input);
    console.log(hintMessage);
    try {
      props.setHintAndAnswer(hintMessage.message1, hintMessage.message2);
      if (hintMessage.seq != hintSeq) {
        setHintSeq(hintMessage.seq);
        // props.plusHintUseCount();
        Keyboard.dismiss();
      }
    } catch (e) {
      console.log('>>>>>> ERROR: ' + e);
      createFailInputAlert('잘못된 입력입니다.', '다시 입력해주세요.');
    }
  };

  function createFailInputAlert(title, message) {
    Alert.alert(title, message, [{text: 'OK', onPress: () => {}}], {
      cancelable: false,
    });
  }

  function convertToUpperCase(input) {
    if (input.length > 5) {
      return input.substr(0, 5).toUpperCase();
    } else {
      return input.toUpperCase();
    }
  }

  return (
    <View style={styles.hintSearchContainerWrapper}>
      <View style={styles.hintSearchContainer}>
        <TextInput
          style={styles.hintTextInput}
          onChangeText={(text) => setInput(convertToUpperCase(text))}
          value={input}
          autoCapitalize="characters"
          // onSubmitEditing={searchHint}
        />
        <TouchableHighlight
          style={styles.hintInputButtonTouchableOpacity}
          onPress={searchHint}
          activeOpacity={0.6}
          underlayColor="#B7A202">
          <Icon
            style={styles.hintInputButtonIcon}
            name="search"
            size={33}
            color="black"
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  whiteColor: {
    color: 'white',
  },
  hintSearchContainerWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintSearchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    height: '75%',
    marginTop: '5%',
    borderColor: '#dbc202',
    borderWidth: 2,
    borderRadius: 100,
    backgroundColor: 'black',
  },
  hintTextInput: {
    backgroundColor: 'black',
    color: 'white',
    height: '100%',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 4,
    borderRadius: 100,
  },
  hintInputButtonIcon: {},
  hintInputButtonTouchableOpacity: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#dbc202',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderColor: '#dbc202',
  },
});

export default HintSearch;
