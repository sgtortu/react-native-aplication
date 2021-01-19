 
import React, { Component, useState } from 'react';
import { Button,StyleSheet, Text, View, TextInput, ScrollView, TouchableHighlight } from 'react-native';  
import config from "../config"; 



export default function Login({ navigation }) { 

    const [dataUser, setDataUser] = useState({  
        username: '',
        password: '',
    });
    const [validateUsername, setValidateUsername] = useState(true);
    const [validatePassword, setValidatePassword] = useState(true);
    const [validateAll, setValidateAll] = useState(false);
 
  
  let validate = (usernameV, passwordV) => {
     
    // USERNAME         
    fetch(`${config.API_URL}lastusuario/${usernameV}`).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        //throw new Error('Algo anduvo mal.');
        //alert('Algo anduvo mal.'); 

        setValidatePassword(false)
        setValidateUsername(false)
        
      }
    })
    .then((responseJson) => { 
      
      console.log('ok : ', responseJson.con_usu) 
      if (responseJson.nom_usu !== usernameV) {
        setValidateUsername(false)
      } else {
        setValidateUsername(true)
      }
      if (responseJson.con_usu !== passwordV) {
        setValidatePassword(false)
      } else {
        setValidatePassword(true)
      }
    })
    .catch((error) => {
      console.log('error: ', error)  
    });
    
    // PASSWORD
    
    // TODO
    if ( usernameV, passwordV){
      setValidateAll(true)
    }else{
      setValidateAll(false)
    }
    
  }
  
  let clickSend = () => {
    // Validaciones
    validate(username, password)
    
    if ( validateAll) {
      alert('okey! (Se inicia sesion).')
      // Se inicia sesion
      navigation.navigate('Credencial')
    }else{
      //alert('Hay campos incorrectos.')
    }
    
    
  }

  const { 
    username,
    password, 
  } = dataUser;
 
    
    return (
      <View style={styles.container}>  
      <ScrollView>
 

      <TextInput
        style={styles.inputStyle}
        placeholder="Nombre de usuario"
        maxLength={20}
        value={ username}
        name="username"
        onChangeText={       (username) =>
          setDataUser({
            ...dataUser,
            'username': username,
          })
        }
        //onChangeText={(username) => this.changeUsername(username)}
      />      
      {  validateUsername ? null : <Text style={styles.msgError}>Usuario no registrado</Text>}
      
      <TextInput
        style={styles.inputStyle}
        placeholder="Contraseña"
        value={ password}
        maxLength={15}
        secureTextEntry={true}
        name="password"
        onChangeText={       (password) =>
          setDataUser({
            ...dataUser,
            'password': password,
          })
        }
        
        //onChangeText={(password) => this.changePassword(password)}
      />
      {  validatePassword ? null : <Text style={styles.msgError}>Contraseña inválida</Text>}
 
      <TouchableHighlight 
        style={styles.button}
        color="#3740FE"
        onPress={() => { clickSend() }} >
        <Text>Ingresar</Text>        
        
      </TouchableHighlight>

      <Text>¿Aún no se ha registrado?</Text>
      <Button
          style={styles.button}
          color="#3740FE"  
          testID="logoutButton"
          // Escanear = PreRegister.js
          onPress={() => navigation.navigate('Escanear')}
          title="Registrarse"
      />
          
 
    </ScrollView>
    
  </View>
  ) 
}

const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    button: {
      width: 300,
      height: 40,
      marginTop: 10,
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 35
    },
    inputStyle: {
      width: '100%',
      marginBottom: 15,
      paddingBottom: 15,
      alignSelf: "center",
      borderColor: "#ccc",
      borderBottomWidth: 1
    },
    msgError: {
      color: 'red',
      marginBottom: 3, 
    },
  });