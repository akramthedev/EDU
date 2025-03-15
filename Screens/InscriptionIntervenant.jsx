import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image, 
  Linking 
} from 'react-native';
import { useFonts } from 'expo-font';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');




export default function InscriptionIntervenant() {
  
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  let phone = "05282-30230";
  let email = "contact@universiapolis.ma"

  const [fontsLoaded] = useFonts({
    'JomoFont': require('../fonts/Jomolhari-Regular.ttf'),
    'Inter': require('../fonts/Inter-VariableFont_opsz,wght.ttf'), 
    'InterBold' : require('../fonts/Inter_28pt-SemiBold.ttf')
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

 
  const handleCall = () => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${email}`);
  };
  
    
  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ImageBackground
          source={require('../assets/background.png')}
          style={styles.background}
        >
          <View style={styles.overlay}>
            <View style={styles.backgroundLoogogooo}>
              
                <Image
                  style={styles.imageLogoHaut}
                  source={require('../assets/universiapolis_logo.png')}
                />
             
            </View>

            <Text style={styles.title}>Inscription intervenant</Text>
            <Text style={styles.subtitle}>&nbsp;&nbsp;&nbsp;</Text>


            <Text style={styles.subtitle2}>
              L'inscription des intervenants se fait uniquement via l'administration. Pour créer un compte, veuillez les contacter directement.
            </Text>

            <View
              style={{
                flexDirection : "row", 
                justifyContent : "space-between"
              }}
            >
              <TouchableOpacity onPress={handleCall}>
                <Text style={styles.subtitle3}>
                  {phone}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleEmail}>
                <Text style={styles.subtitle3}>
                  {email}
                </Text>
              </TouchableOpacity>
            </View>



          </View>
        </ImageBackground>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: screenWidth,
    height: screenHeight + 40,
    backgroundColor: "#fff",
  },
  overlay: {
    flex: 1,
    padding: 30,
    paddingBottom: 0,
    paddingTop: 0,
    justifyContent: 'center',
  },
  backgroundLoogogooo: {
    position: "absolute",
    top: 20,
    width: "100%",
    alignItems: "center",
    left: 30,
  },
  imageLogoHaut: {
    width: 144,
    resizeMode: 'contain',
    aspectRatio: 1,
  },
  title: {
    fontFamily: 'JomoFont',
    fontSize: 30,
    color: '#15A389',
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 15,
    color: '#141414',
    paddingLeft: 3,
    marginBottom: 50,
    letterSpacing : -0.2
  },
  subtitle2 : {
    fontFamily: 'Inter',
    fontSize: 15,
    color: '#141414',
    letterSpacing : -0.2,
    marginBottom : 77  },
  subtitle3 : {
    fontFamily: 'Inter',
    fontSize: 15,
    color: '#141414',
    textDecorationLine : "underline",
    letterSpacing : -0.2,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'InterBold',
    fontSize: 15,
    color: "#545454",
    marginBottom: 12,
  },
  required: {
    color: '#078871',
    fontWeight: "bold"
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 100,
    height: 55,
    paddingHorizontal: 25,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    fontFamily: 'Inter',
  },
  lastContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    left: 30
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#15B99B",
    borderRadius: 90,
    height: 55,
    marginTop: 20,
    zIndex : 1
  },
  buttonText: {
    color: "white",
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 7,
  },
  signupText: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: '#141414',
    textAlign: 'center',
    marginTop: 15,
  },
  signupLink: {
    color: '#078871',
    textDecorationLine : "underline"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 14,
    textAlign: "center",
    color: "#000",
  },
  btnModel: {
    borderRadius: 11,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: "#15B99B",
  },
  textStyle: {
    color: "white"
  },
  buttonloading: {
    backgroundColor: "#BE2929",
    borderRadius: 11,
    height: 53,
    marginTop: 20,
  },
  passwordContainer: {
    position: "relative"
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
    top: 16
  },
  passwordForgotInput  : {
    fontSize: 13,
    paddingRight : 5, 
    fontFamily: 'Inter',
    color : "#078871",
    textDecorationLine : "underline"
  },

  passwordForgotContainer : {
    alignItems: "flex-end",
    height: "auto",
    width : "100%", 
  }, 

  buttonForgotPassword : {
    height : 40,
    width : 240,
    alignItems : "flex-end"  
  },
  inputPassword: {
    fontSize: 15,
    fontFamily : "InterBold",
    color: "#545454",
    marginBottom: 12,
  },
  input2: {
    backgroundColor: '#fff',
    borderRadius: 100,
    height: 55,
    paddingRight: 40,
    paddingLeft: 25,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    width: "100%",
  }
});