import React, { useContext, useEffect, useState } from 'react'
import { Image, Platform, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, Alert } from 'react-native'
import { loginStyles } from '../theme/loginTheme';
import { AuthContext } from '../context/AuthContext';

export const LoginScreen = ({ navigation }) => {

    const { signIn, userInfo } = useContext(AuthContext);

    const [state, setState] = useState({email: '', password: ''});

    const onChange = ( value, field ) => {
        setState({
            ...state,
            [field]: value
        });
    }

    const onLogin = () => {
        Keyboard.dismiss();
        //signin with a registered user
    }

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ Platform.OS === 'ios' ? 'padding': 'height'}
            >
                
                <View style={loginStyles.formContainer}>
                    <Text style={ loginStyles.title }>Welcome Back</Text>
                    <Text style={ loginStyles.subtitle }>Sign in to continue</Text>

                    <Text style={ loginStyles.label }>Email:</Text>
                    <TextInput
                        placeholder="example@example.com"
                        placeholderTextColor="#a2a2a2"
                        keyboardType="email-address"
                        style={[
                            loginStyles.inputField,
                            Platform.OS === 'ios' && loginStyles.inputFieldIOS
                        ]}
                        selectionColor='white'

                        onChangeText={ (value) => onChange(value, 'email')}
                        value={state.email}
                        onSubmitEditing={ onLogin }

                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    <Text style={ loginStyles.label }>Password:</Text>
                    <TextInput
                        placeholder="******"
                        secureTextEntry
                        placeholderTextColor="#a2a2a2"
                        style={[
                            loginStyles.inputField,
                            Platform.OS === 'ios' && loginStyles.inputFieldIOS
                        ]}
                        selectionColor='white'

                        onChangeText={ (value) => onChange(value, 'password')}
                        value={state.password}
                        onSubmitEditing={ onLogin }

                    />
                    <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {console.log('Forgot password')}}
                            style={{marginTop: 5}}
                        >
                            <Text style={{fontSize: 16, color: '#757575'}}>Forget Password?</Text>
                    </TouchableOpacity>

                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={ loginStyles.button }
                            onPress={onLogin}
                        >
                            <Text style={loginStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={loginStyles.separatorContainer}>
                        <View style={loginStyles.separator}/>
                        <Text style={loginStyles.textSeparator} >or</Text>
                    </View>

                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{...loginStyles.button, ...loginStyles.buttonGoogle}}
                            onPress={signIn}
                            disabled={userInfo.isSigninInProgress}
                        >
                            <Image
                                style={{ width: 20, height: 20, marginRight: 15}}
                                source={require('../assets/google.png')}

                            />
                            <Text style={loginStyles.buttonGoogleText}>Login with Gmail</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </KeyboardAvoidingView>
        </>
    );
}
