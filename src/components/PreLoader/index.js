import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Spinner} from 'native-base';

function PreLoader() {

    return (
        <View style={styles.preloaderContainer}>
            <View style={styles.preloaderBox}>
                <Spinner size={50}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    preloaderContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',
        zIndex: 500000,
        justifyContent: 'center',
        alignItems: 'center',
    },
    preloaderBox: {
        backgroundColor: '#fff',
        width: 100,
        height: 100,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
});

export default PreLoader;
