import React, { useEffect, useState } from 'react';
import {  Image, Text, Animated } from 'react-native';
import { useFonts } from 'expo-font';

const SplashScreen = () => {
  const [fontsLoaded] = useFonts({
    'Inter': require('../fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  const [fadeAnim] = useState(new Animated.Value(0)); 

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, 
      duration: 0, 
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,  
        duration: 666,  
        useNativeDriver: true,
      }).start();
    }, 2500); 

    return () => clearTimeout(timeout); 
  }, [fadeAnim]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Animated.View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15b99b',
        opacity: fadeAnim,  
      }}
    >
      <Image
        style={{
          height: 120,
          width: 167,
          resizeMode: 'cover',
        }}
        source={require('../assets/logo.png')}
      />
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'Inter',
          fontSize: 15,
        }}
      >
        EDU
      </Text>
    </Animated.View>
  );
};

export default SplashScreen;
