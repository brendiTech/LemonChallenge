import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'

export const OnboardingScreen = ({navigation}) => {
    return (
        <View style={styles.homeContainer}>
            <View style={styles.backgroundContainer}>
                <Image
                    style={styles.background}
                    source={require('../assets/earth.jpg')}
                />
            </View>

            <View style={styles.textTitleContainer}>
                <Text style={styles.textTitle}>Find the most recent COVID's information</Text>
            </View>

            <View style={styles.buttonContainer}>
               <TouchableOpacity
                    style={{...styles.button, backgroundColor: '#FFF'}}
                    activeOpacity={0.8}
                    onPress={ () => navigation.navigate('LoginScreen')}
                >
                    <Text style={{...styles.textButton, color: '#0050a0'}} >Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{...styles.button, borderWidth: 1, borderColor: '#FFF'}}
                    activeOpacity={0.8}
                    onPress={ () => console.log('Redirect to SignUp Screen')}
                >
                    <Text style={{...styles.textButton, color: '#FFF'}} >Sign Up</Text>
                </TouchableOpacity> 
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '60%',
    },
    backgroundContainer: {
        position: 'absolute',
        backgroundColor: '#0050a0'
    },
    background: {
        opacity: 0.2
    },
    textTitleContainer: {
        width: '90%',
        paddingBottom: 100
    },
    textTitle: {
        fontSize: 45,
        fontWeight: 'bold',
        color:'#FFF'
    },
    buttonContainer: {
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '90%',
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15
    },
    textButton:{
        fontSize: 18,
    },
});