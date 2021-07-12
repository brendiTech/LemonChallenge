import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CountriesScreen } from '../screens/CountriesScreen';
import { CasesScreen } from '../screens/CasesScreen';

const Stack = createStackNavigator();

export const CasesNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle:{
                    backgroundColor: '#FFF'
                },
                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent'
                }
            }}
        >
            <Stack.Screen
                name='CountriesScreen'
                component={CountriesScreen}
                options={{ title: 'Countries' }}
                
            />
            <Stack.Screen
                name='CasesScreen'
                component={CasesScreen}
            />
        </Stack.Navigator>
    )
}
