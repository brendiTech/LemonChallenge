import React, { createContext, useEffect, useReducer, useState } from 'react';
import { AuthReducer } from './authReducer';

import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '843452628894-8o1f9c05a2p7hfvdpdb27kl922mr5vgf.apps.googleusercontent.com',
    offlineAccess: true
});

const authInitialState = {
    status: 'checking',
    token: null,
    user: null,
}

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer( AuthReducer, authInitialState);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        isSignedIn();
    }, []);

    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        
        if( !isSignedIn )
        {
            return dispatch({ type:'notAuthenticated' });
        }
        else
        {
            dispatch({
                type: 'signIn',
                payload: {
                    token: userInfo.idToken,
                    user: userInfo.user
                }
            });
        }
    };

    const signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          setUserInfo({ userInfo });
          
          dispatch({
            type: 'signIn',
            payload: {
                token: userInfo.idToken,
                user: userInfo.user
            }
            });
        } catch (error) {
            if(error) console.log(error)
            dispatch({ type: 'logout' });
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            dispatch({ type: 'logout' });
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <AuthContext.Provider value={{
            ...state,
            signIn,
            userInfo,
            signOut
        }}>
            { children }
        </AuthContext.Provider>
    )
}
