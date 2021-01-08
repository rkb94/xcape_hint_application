import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Header, Icon} from 'react-native-elements';

const HintHome = (props) => {
  return (
    <View>
      <Header
        statusBarProps={{hidden: true}}
        leftComponent={<Icon name="settings" color="#fff" />}
        centerComponent={{text: props.theme, style: styles.whiteColor}}
        rightComponent={{icon: 'home', color:"#fff" }}
        containerStyle={{backgroundColor: '#151515'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    whiteColor: {
        color: 'white'
    }
});

export default HintHome;
