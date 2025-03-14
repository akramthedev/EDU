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
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import ENDPOINT_URL from '../ENDPOINT_URL';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [modalVisibleError, setModalVisibleError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [selectedCard, setSelectedCard] = useState(null);


  const [fontsLoaded] = useFonts({
    'JomoFont': require('../fonts/Jomolhari-Regular.ttf'),
    'Inter': require('../fonts/Inter-VariableFont_opsz,wght.ttf')
  });

  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, []);



  const handleContinue = ()=>{
    console.log("Clicked : "+selectedCard);
    if(selectedCard === 1){
      navigation.navigate("InscriptionIntervenant");
    }
    else if(selectedCard === 2){
      navigation.navigate("InscriptionTuteur");
    }
    else{
      navigation.navigate("InscriptionEtudiant");
    } 
  }

const getCardStyle = (id) => {
    return selectedCard === id 
      ? { ...styles.profileCard, borderWidth: 1.9, borderColor: '#15A389', borderStyle: 'dashed' } 
      : styles.profileCard;
  };


  const handleCardPress = (id) => {
    setSelectedCard(id);
  };
  

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
            

            <Text style={styles.title}>Choisissez votre profil</Text>


            <View style={styles.profileCardsContainer}>

                
            <TouchableOpacity 
                style={getCardStyle(1)} 
                onPress={() => handleCardPress(1)}
            >
                {
                    selectedCard === 1 && 
                    <View style={{
                        position : "absolute", 
                        right : 8, 
                        top : 8, 
                        backgroundColor : "#15A389", 
                        height : 26, 
                        width : 26, 
                        borderRadius : 15, 
                        color : "white", 
                        alignItems : "center"
                        , justifyContent : "center"
                    }} >
                        <FontAwesome name="check" size={16} color="white" />
                    </View>
                }
                <View  
                    style={{
                        height :95, 
                        width : 95, 
                    }}
                >
                    <Image
                        source={require('../assets/icon1.png')}
                        style={{
                            objectFit : "cover", 
                            height : "100%", 
                            width : "100%", 
                            borderRadius : 10
                        }}
                    />                    
                </View>
                <View
                    style={{ flexDirection : "column", flex : 1, paddingLeft : 20 }}
                >
                    <Text style={styles.profileCardTitle}>Intervenant</Text>
                    <Text style={styles.profileCardDescription}>
                    Gérez vos sessions, suivez les progrès et partagez des ressources pour la réussite des étudiants.
                    </Text>
                </View>
              </TouchableOpacity>



            <TouchableOpacity 
                style={getCardStyle(2)} 
                onPress={() => handleCardPress(2)}
            >
                {
                    selectedCard === 2 && 
                    <View style={{
                        position : "absolute", 
                        right : 8, 
                        top : 8, 
                        backgroundColor : "#15A389", 
                        height : 26, 
                        width : 26, 
                        borderRadius : 15, 
                        color : "white", 
                        alignItems : "center"
                        , justifyContent : "center"
                    }} >
                        <FontAwesome name="check" size={16} color="white" />
                    </View>
                }
                <View  
                    style={{
                        height :95, 
                        width : 95, 
                    }}
                >

                    <Image
                        source={require('../assets/icon2.png')}
                        style={{
                            objectFit : "cover", 
                            height : "100%", 
                            width : "100%", 
                            borderRadius : 10
                        }}
                    />
                </View>
                <View
                    style={{ flexDirection : "column", flex : 1, paddingLeft : 20 }}
                >
                    <Text style={styles.profileCardTitle}>Tuteur</Text>
                    <Text style={styles.profileCardDescription}>

                    Suivez votre enfant, consultez ses résultats et recevez des notifications sur ses activités.
                    </Text>
                </View>
              </TouchableOpacity>



            <TouchableOpacity 
                style={getCardStyle(3)} 
                onPress={() => handleCardPress(3)}
            >
                {
                    selectedCard === 3 && 
                    <View style={{
                        position : "absolute", 
                        right : 8, 
                        top : 8, 
                        backgroundColor : "#15A389", 
                        height : 26, 
                        width : 26, 
                        borderRadius : 15, 
                        color : "white", 
                        alignItems : "center"
                        , justifyContent : "center"
                    }} >
                        <FontAwesome name="check" size={16} color="white" />
                    </View>
                }
                <View  
                    style={{
                        height :95, 
                        width : 95, 
                    }}
                >
                    <Image
                        source={require('../assets/icon3.png')}
                        style={{
                            objectFit : "cover", 
                            height : "100%", 
                            width : "100%", 
                            borderRadius : 10
                        }}
                    />                    
                </View>
                <View
                    style={{ flexDirection : "column", flex : 1, paddingLeft : 20 }}
                >
                    <Text style={styles.profileCardTitle}>Étudiant</Text>
                    <Text style={styles.profileCardDescription}>
                    Suivez vos cours, consultez vos horaires, accédez à vos résultats et gérez vos devoirs facilement.
                    </Text>
                </View>
              </TouchableOpacity>

          




            <TouchableOpacity 
                style={getCardStyle(3)} 
                onPress={() => handleCardPress(3)}
            >
                {
                    selectedCard === 3 && 
                    <View style={{
                        position : "absolute", 
                        right : 8, 
                        top : 8, 
                        backgroundColor : "#15A389", 
                        height : 26, 
                        width : 26, 
                        borderRadius : 15, 
                        color : "white", 
                        alignItems : "center"
                        , justifyContent : "center"
                    }} >
                        <FontAwesome name="check" size={16} color="white" />
                    </View>
                }
                <View  
                    style={{
                        height :95, 
                        width : 95, 
                    }}
                >
                    <Image
                        source={require('../assets/icon3.png')}
                        style={{
                            objectFit : "cover", 
                            height : "100%", 
                            width : "100%", 
                            borderRadius : 10
                        }}
                    />                    
                </View>
                <View
                    style={{ flexDirection : "column", flex : 1, paddingLeft : 20 }}
                >
                    <Text style={styles.profileCardTitle}>Étudiant</Text>
                    <Text style={styles.profileCardDescription}>
                    Suivez vos cours, consultez vos horaires, accédez à vos résultats et gérez vos devoirs facilement.
                    </Text>
                </View>
              </TouchableOpacity>

            </View>







      
           

            <View style={styles.lastContainer}>
              <TouchableOpacity 
                style={loading ? styles.buttonloading : styles.button}
                onPress={handleContinue}
                disabled={!selectedCard}
              >
                {loading ? (
                  <Text style={styles.buttonText}>
                    Authentification en cours...
                  </Text>
                ) : (
                  <>
                    <Text style={styles.buttonText}>Continuer</Text>
                    <Ionicons name="chevron-forward" size={19} color="#fff" />
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.signupTextButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.signupText}>
                  Déjà un compte ? <Text style={styles.signupLink}>Connectez-vous</Text>
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
    paddingTop: 30,
  },
  backgroundLoogogooo: {
    position: "absolute",
    top: 5,
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
    marginBottom : 20
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 15,
    color: '#141414',
    paddingLeft: 3,
    marginBottom: 30,
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
  }, 
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingTop : 14, 
    paddingBottom : 20, 
    paddingLeft : 20, 
    paddingRight : 20, 
    marginBottom: 16,
    shadowColor: 'gray',
    flexDirection : "row",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
    alignItems : "center", 
    position : "relative"
  },
  profileCardTitle: {
    fontFamily: 'JomoFont',
    fontSize: 21,
    color: '#15A389',
    marginBottom: 0,
  },
  profileCardDescription: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: '#444444',
  },
});