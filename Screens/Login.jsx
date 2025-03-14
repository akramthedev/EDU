import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
  Animated,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import ENDPOINT_URL from '../ENDPOINT_URL';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import { Keyboard } from 'react-native';




export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [modalVisibleError, setModalVisibleError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    'JomoFont': require('../fonts/Jomolhari-Regular.ttf'),
    'Inter': require('../fonts/Inter-VariableFont_opsz,wght.ttf')
  });

  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      setMessageError("Entrez votre email et mot de passe !");
      setModalVisibleError(true);
      setLoading(false);
      return;
    }

    try {
      const req = await axios.post(`${ENDPOINT_URL}login`, {
        email: email,
        password: password,
      });

      if (req.status === 200) {
        setLoading(false);
        await AsyncStorage.setItem('Token', req.data.data.token);
        await AsyncStorage.setItem('created_at', req.data.data.user.created_at);
        await AsyncStorage.setItem('user_type', 
          req.data.data.user.user_type || "NotAdmin"
        );

        setModalVisibleError(false);
        setModalVisible(false);
      }
      if (req.status === 204) {
        setLoading(false);
        setMessageError("Nous traitons actuellement votre demande d'accès.");
        setModalVisible(true);
      }

    } catch (error) {
      setLoading(false);
      setMessageError("Erreur lors de la connexion");
      setModalVisibleError(true);
    }
  }




  
  useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
              setIsKeyboardVisible(true);
          }
      );
      const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
              setIsKeyboardVisible(false);
          }
      );

      return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
      };
  }, []);














  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleError}
        onRequestClose={() => setModalVisibleError(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{messageError}</Text>
            <Pressable
              style={[styles.btnModel, styles.buttonClose]}
              onPress={() => setModalVisibleError(false)}
            >
              <Text style={styles.textStyle}>Réessayez</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{messageError}</Text>
            <Pressable
              style={[styles.btnModel, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>D'accord</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ImageBackground
          source={require('../assets/background.png')}
          style={styles.background}
        >
          <View style={styles.overlay}>
            <View style={styles.backgroundLoogogooo}>
              {
                !isKeyboardVisible && 
                <Image
                  style={styles.imageLogoHaut}
                  source={require('../assets/universiapolis_logo.png')}
                />
              }
            </View>

            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Retrouvez votre espace en un clic</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Nom d’utilisateur <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Entrez votre nom d’utilisateur..."
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputPassword}>
                Mot de passe <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input2}
                  placeholder="Veuillez saisir votre mot de passe..."
                  placeholderTextColor="gray"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon} 
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons 
                    name={showPassword ? "eye-off" : "eye"} 
                    size={22} 
                    color="rgb(18, 179, 149)" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            
              <View style={styles.passwordForgotContainer}>
                <TouchableOpacity style={styles.buttonForgotPassword}>
                  <Text style={styles.passwordForgotInput}>
                  {
                    !isKeyboardVisible ? 
                    "Mot de passe oublié ?" : 
                     ""
                  }
                  </Text>
                </TouchableOpacity>
              </View>

            <View style={styles.lastContainer}>
              <TouchableOpacity 
                style={loading ? styles.buttonloading : styles.button}
                onPress={handleLogin}
              >
                {loading ? (
                  <Text style={styles.buttonText}>
                    Authentification en cours...
                  </Text>
                ) : (
                  <>
                    <Text style={styles.buttonText}>Connectez-vous</Text>
                    <Ionicons name="chevron-forward" size={19} color="#fff" />
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.signupTextButton}
                onPress={() => navigation.navigate('ChooseProfile')}
              >
                <Text style={styles.signupText}>
                  Pas de compte ? <Text style={styles.signupLink}>Inscrivez-vous</Text>
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
    marginBottom: 75,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Inter',
    fontSize: 15,
    color: "#444444",
    fontWeight: "bold",
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
    borderColor: "#E8E8E8",
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
    fontWeight: "bold",
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
    backgroundColor: "tomato",
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
    color: "#444444",
    fontWeight: "bold",
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
    borderColor: "#E8E8E8",
    width: "100%",
  }
});