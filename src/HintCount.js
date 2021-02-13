import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'

const HintCount = (props) => {
    return (
        <View style={styles.hintCountContainer}>
            <TouchableHighlight 
                style={styles.hintCountWrapperButton}
                onLongPress={props.resetHintCount}
            >
                <Text style={styles.hintCount}>{props.hintCount}</Text>
            </TouchableHighlight>
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
    hintCountWrapperButton: {
        flex: 3,
        borderRadius: 50
    },
    hintCount: {
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
        flex: 1,
        fontWeight: 'bold'
    },
    hintCountText: {
        color: 'white',
        fontSize: 8,
        textAlign: 'center',
        flex: 1,
        fontWeight: 'bold',
    }
})

export default HintCount
