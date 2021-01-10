import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

const HintContent = () => {
    return (
        <View style={styles.hintContent}>
            <Text style={styles.hintContentHeader}>test</Text>
            <TextInput style={styles.hintContentInput}></TextInput>
        </View>
    )
}
const styles = StyleSheet.create({
    hintContent: {
        flex: 1,
        flexDirection: 'column',
        marginTop: '5%',
        marginStart: '5%',
        marginEnd: '5%',
    },
    hintContentHeader: {
        color: 'black',
        backgroundColor: '#dbc202',
        flex: 1,
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    hintContentInput: {
        color: 'white',
        backgroundColor: 'black',
        flex: 7,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    }
});
export default HintContent
