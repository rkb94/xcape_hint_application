import React from 'react';
import {ImageBackground, View, StyleSheet, Text} from 'react-native';

const image = '../assets/main_bg.jpg';

const HintSearch = () => {
  return (
    <View style={styles.hintSearchContainer}>
        <ImageBackground
            source={require(image)}
            style={styles.backgroundImage}
            resizeMode="stretch"
        >

        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  whiteColor: {
    color: 'white',
  },
  hintSearchContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
});

export default HintSearch;
