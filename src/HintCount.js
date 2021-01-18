import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const HintCount = (props) => {
    return (
        <View style={styles.hintCountContainer}>
            <Text style={styles.hintCount}>{props.hintCount}</Text>
            <Text style={styles.hintCountText}>HINT COUNT</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    hintCountContainer: {
        flex: 1,
        flexDirection: 'column',
        marginRight: '10%'
    },
    hintCount: {
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
        flex: 3,
        fontWeight: 'bold'
    },
    hintCountText: {
        color: 'white',
        fontSize: 8,
        textAlign: 'center',
        flex: 1,
        fontWeight: 'bold'
    }
})

export default HintCount
