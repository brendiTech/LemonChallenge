import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { AuthContext } from '../context/AuthContext';
import { CasesNavigator } from './CasesNavigator';
import { LoadingScreen } from '../screens/LoadingScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';

const Stack = createStackNavigator();
  
export const Navigator = () => {

    const { status } = useContext(AuthContext);
    
    if(status==='checking') return <LoadingScreen/>

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#FFF'
                }
            }}
        >
            {
                status!=='authenticated'
                    ? (
                        <>
                            <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
                            <Stack.Screen name="LoginScreen" component={LoginScreen} />
                        </>
                    )
                    : (
                        <>
                            <Stack.Screen name="CountriesScreen" component={CasesNavigator} />
                        </>
                    )
            }
        </Stack.Navigator>
    );
}