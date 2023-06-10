import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PlaceDetailScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Detalle de la Dirección</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default PlaceDetailScreen;

