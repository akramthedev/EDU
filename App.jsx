import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/RestrictedAccess/Home';
import SplashScreen from './Screens/Others/SplashScreen';
import Login from './Screens/AuthScreens/Login';
import ChooseProfile from './Screens/AuthScreens/ChooseProfile';
import InscriptionIntervenant from './Screens/AuthScreens/InscriptionIntervenant';
import InscriptionEtudiant from './Screens/AuthScreens/InscriptionEtudiant';
import InscriptionTuteur from './Screens/AuthScreens/InscriptionTuteur';
import InscriptionFuturEtudiant from './Screens/AuthScreens/InscriptionFuturEtudiant';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar translucent backgroundColor="rgba(0, 60, 39, 0.5)" barStyle="light-content" />
    
      <MainNavigator />
    </>
  );
}

const MainNavigator = () => {
  const [isLoading, setisLoading] = useState(true);
  const [isAuthenticated, setisAuthenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);  
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
          />
        ) : (
          <>
            {!isAuthenticated ? (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="ChooseProfile" component={ChooseProfile} />
                <Stack.Screen name="InscriptionEtudiant" component={InscriptionEtudiant} />
                <Stack.Screen name="InscriptionTuteur" component={InscriptionTuteur} />
                <Stack.Screen name="InscriptionIntervenant" component={InscriptionIntervenant} />
                <Stack.Screen name="InscriptionFuturEtudiant" component={InscriptionFuturEtudiant} />
              </>
            ) : (
              <>
                <Stack.Screen name="Home" component={Home} />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  ); 
};
