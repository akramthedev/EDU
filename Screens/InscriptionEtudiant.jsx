import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,TextInput,
    TouchableOpacity,
    Alert,Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';



const InscriptionEtudiant = ()=>{

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
                    Inscription Etudiant
                </Text>
            </TouchableOpacity>
        </View>
    )

}



export default InscriptionEtudiant;

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
