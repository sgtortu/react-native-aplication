 
import React, { Component, useState } from 'react';
import { Button,StyleSheet, Text, View, TextInput, ScrollView, TouchableHighlight } from 'react-native';  
import config from "../config"; 



export default function Login({ navigation }) { 

    const [dataUser, setDataUser] = useState({  
        username: '',
        password: '', 
    });
    const [idUser, setIdUser] = useState('');
    const [validateUsername, setValidateUsername] = useState(true);
    const [validatePassword, setValidatePassword] = useState(true); 
  
  
  let clickSend = () => {
    // Validaciones
    if (   username.trim() === "" ||  password.trim() === ""  ) {
        setValidateUsername(false)
        setValidatePassword(false)
        //return null;
    }
    // USERNAME         
    fetch(`http://192.168.0.7:3000/lastusuario/${username}`).then((response) => {
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
      console.log('responseJson: ', responseJson)  
      setIdUser(responseJson.id_usu);

      if (responseJson.nom_usu === username) {
        setValidateUsername(true)
      } else {
        setValidateUsername(false)
      }
      if (responseJson.con_usu !== password) {
        setValidatePassword(false)
      } else {
        setValidatePassword(true)
      }
    })
    .catch((error) => {
      console.log('error: ', error)  
    });
     
    
    console.log(`pass: ${validatePassword} - name: ${validateUsername}`);

    if (validatePassword && validateUsername){
      console.log('Datos correctos')
      

 
      fetch(`http://192.168.0.7:3000/usuarioactivo/${idUser}`).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          //alert('Algo anduvo mal.');                   
        }
      })
      .then((responseJson) => {  
        console.log('rJ: ', responseJson) 
        navigation.navigate('Credencial', {numAfiliado: responseJson.numAfiliado, nombrePersona: responseJson.nombrePersona, fingresoAfiliado: responseJson.fingresoAfiliado, documentoPersona: responseJson.documentoPersona, id_emp: responseJson.id_emp})
        setValidatePassword(false);
        setValidateUsername(false);
      })
      .catch((error) => {
        console.log('error rJ: ', error)  
        alert('Ha ocurrido un problema.')
      });
       





    }else{
      alert('Hay campos incorrectos.')
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