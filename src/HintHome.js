import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import HintSearch from './HintSearch';

const HintHome = (props) => {
  return (
    <View style={styles.hintHomeContainer}>
      <Header
        statusBarProps={{hidden: true}}
        leftComponent={<Icon name="settings" color="#fff" />}
        centerComponent={{text: props.theme, style: styles.centerComponent}}
        rightComponent={{icon: 'home', color: '#fff'}}
        containerStyle={{backgroundColor: '#151515'}}
      />
      <HintSearch style={styles.hintSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  centerComponent: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold'
  },
  hintHomeContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  hintSearch: {
    flex: 1,
  },
});

export default HintHome;
