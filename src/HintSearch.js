import React from 'react';
import {Icon} from 'react-native-elements';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';

const HintSearch = () => {
  const searchHint = (e) => {
      alert("test");
  };
  return (
    <View style={styles.hintSearchContainerWrapper}>
      <View style={styles.hintSearchContainer}>
        <TextInput
          style={styles.hintTextInput}
          // onChangeText={text => setInput(convertToUpperCase(text))}
          // value={input}
          autoCapitalize="characters"
          // onSubmitEditing={searchHint}
        />
        <TouchableHighlight
          style={styles.hintInputButtonTouchableOpacity}
          onPress={searchHint}>
          <Icon
            style={styles.hintInputButtonIcon}
            name="search"
            size={30}
            color="white"
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
  },
  hintSearchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '50%',
  },
  hintTextInput: {
    backgroundColor: 'black',
    color: 'white',
    height: '120%',
    borderColor: '#dbc202',
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '70%',
  },
  hintInputButtonIcon: {
    height: '60%',
    width: '100%'
  },
  hintInputButtonTouchableOpacity: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '120%',
    width: '13%',
    borderRadius: 50
  },
});

export default HintSearch;
