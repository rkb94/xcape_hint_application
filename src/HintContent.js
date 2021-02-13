import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, Vibration, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const HintContent = (props) => {
    const [viewAble, setViewAble] = useState(props.viewAble);

    useEffect(() => {
        if(props.role == "정답") {
            setViewAble(false);
        }
    }, [props.hintContent])

    function show() {
        Vibration.vibrate(8);
        Alert.alert(
          '지금 바로 정답을 확인하시겠습니까?',
          '',
          [
            {
              text: '좀 더 고민해 본다',
              onPress: () => {
                  Vibration.vibrate(8);
                  console.log('Cancel Pressed');
                },
              style: 'cancel'
            },
            { 
                text: '정답을 바로 본다', 
                onPress: () => {
                    Vibration.vibrate(8);
                    console.log('OK Pressed')
                    setViewAble(!viewAble);
                },
                style: 'destructive'
            }
          ],
          { cancelable: false }
        );
    }

    return (
        <View style={styles.hintContent}>
            <View style={styles.hintContentHeaderWrapper}>
                <Text style={styles.hintContentHeader}>
                    {props.role}
                </Text>
            </View>
            <View style={styles.hintContentWrapper}>
                {viewAble ?
                    <ScrollView style={styles.hintContentScrollView}>
                        <Text style={styles.hintContentValue}>
                            {props.hintContent}
                        </Text>
                    </ScrollView>
                    :
                    <TouchableHighlight 
                        style={styles.hintContentLockWrapper}
                        onPress={show}
                        activeOpacity={0.6}
                        underlayColor="dimgrey"
                    >
                        <View style={styles.hintContentLockWrapper}>
                            <Icon name="lock-closed-outline" size={35} color="#fff" />
                            <Text style={styles.hintContentLock}>
                                터치하면 정답이 나타납니다.
                            </Text>
                        </View>
                    </TouchableHighlight>
                }
            </View>
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
    hintContentHeaderWrapper: {
        color: 'black',
        backgroundColor: '#dbc202',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    hintContentHeader: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    hintContentWrapper: {
        backgroundColor: 'black',
        flex: 7,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    hintContentScrollView: {
        margin: '3%'
    },
    hintContentValue: {
        flex: 1,
        fontSize: 17,
        color: 'white'
    },
    hintContentLock: {
        color: 'white',
        marginTop: '2%'
    },
    hintContentLockWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    }
});
export default HintContent
