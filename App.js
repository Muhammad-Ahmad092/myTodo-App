import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import OpeningPage from './Pages/OpeningPage';
import LoginScreen from './Pages/loginScreen';
import SignupScreen from './Pages/signupScreen';
import HomeScreen from './Pages/HomeScreen';
import addNote from './Pages/addNote';

const Stack = createStackNavigator();

const App = () => {
  // Load Solitreo font
  const [fontsLoaded] = useFonts({
    'Solitreo-Regular': require('./assets/fonts/Solitreo-Regular.ttf'), // Path to your font file
  });

  // Show AppLoading while fonts are being loaded
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OpeningPage">
        <Stack.Screen 
          name="OpeningPage" 
          component={OpeningPage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SignupScreen" 
          component={SignupScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="addNote" 
          component={addNote} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
