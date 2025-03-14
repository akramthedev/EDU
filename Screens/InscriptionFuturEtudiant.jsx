import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,TextInput,
    TouchableOpacity,
    Alert,Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';



const InscriptionFuturEtudiant = ()=>{

    const nav = useNavigation();

    return(
        <View style={styles.container}>
            <View style={styles.header}>

            </View>
            <TouchableOpacity
                onPress={()=>{
                    nav.navigate('Login')
                }}
            >
                <Text>
                    Vous allez etre redirigé vers une page web ou vous ferai votre inscription en ligne ...
                </Text>
            </TouchableOpacity>
        </View>
    )

}



export default InscriptionFuturEtudiant;

const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 0,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,      paddingBottom : 0

    },

    
})
