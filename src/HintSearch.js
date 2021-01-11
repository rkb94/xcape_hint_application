import React from 'react';
import {Icon} from 'react-native-elements';
import {View, StyleSheet, TextInput, TouchableHighlight, Vibration} from 'react-native';

const HintSearch = () => {
  const searchHint = (e) => {
    Vibration.vibrate(8);
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
          onPress={searchHint}
          activeOpacity={0.6}
          underlayColor="#B7A202"
        >
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
