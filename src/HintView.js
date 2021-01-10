import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import HintContent from './HintContent'

const HintView = () => {
    return (
        <View style={styles.hintViewContainer}>
            <HintContent />
            <HintContent />
        </View>
    )
}

const styles = StyleSheet.create({
  whiteColor: {
    color: 'white',
  },
  hintViewContainer: {
    flex: 7,
    flexDirection: 'column',
    marginBottom: '5%'
  },
});

export default HintView
