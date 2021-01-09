import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const HintView = () => {
    return (
        <View style={styles.hintViewContainer}>

        </View>
    )
}

const styles = StyleSheet.create({
  whiteColor: {
    color: 'white',
  },
  hintViewContainer: {
    flex: 7,
    flexDirection: 'row',
  },
});

export default HintView
