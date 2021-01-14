import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import HintContent from './HintContent';

const HintView = (props) => {
  return (
    <View style={styles.hintViewContainer}>
      <HintContent role="힌트" hintContent={props.hint} viewAble={true} />
      <HintContent role="정답" hintContent={props.answer} viewAble={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  whiteColor: {
    color: 'white',
  },
  hintViewContainer: {
    flex: 7,
    flexDirection: 'column',
    marginBottom: '5%',
  },
});

export default HintView;
