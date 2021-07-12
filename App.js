import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext';
// import { ProductsProvider } from './src/context/ProductsContext';

const AppState = ({ children }) => {
  return(
    <AuthProvider>
      {/* <ProductsProvider>
        
      </ProductsProvider> */}
      { children }
    </AuthProvider>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator/>
      </AppState>
    </NavigationContainer>
  )
}

export default App;
