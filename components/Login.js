 
import React, { Component, useState } from 'react';
import { Button,StyleSheet, Text, View, TextInput, ScrollView, TouchableHighlight } from 'react-native';  
import config from "../config";


export default class Login  extends Component{ 
  
  constructor(){
    super() 
    
    this.state = {
      
      username: '',
      password: '',  
      
      validateUsername: true,
      validatePassword: true, 
      validateAll: false,
      
    }
  }
  changeUsername(username){
    this.setState({username})
  }
  changePassword(password){
    this.setState({password})
  }
  
  
  validate(username, password){
     
    // USERNAME         
    fetch(`${config.API_URL}lastusuario/${username}`).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        //throw new Error('Algo anduvo mal.');
        //alert('Algo anduvo mal.');
        this.setState({validatePassword: false})
        this.setState({validateUsername: false})
        
      }
    })
    .then((responseJson) => { 
      
      console.log('ok : ', responseJson.con_usu) 
      if (responseJson.nom_usu !== username) {
        this.setState({validateUsername: false})
      } else {
        this.setState({validateUsername: true})
      }
      if (responseJson.con_usu !== password) {
        this.setState({validatePassword: false})
      } else {
        this.setState({validatePassword: true})
      }
    })
    .catch((error) => {
      console.log('error: ', error)  
    });
    
    // PASSWORD
    
    // TODO
    if (this.state.username,this.state.password){
      this.setState({validateAll: true})
    }else{
      this.setState({validateAll: false})
    }
    
  }
  
  clickSend(){
    // Validaciones
    this.validate(this.state.username,this.state.password)
    
    if (this.state.validateAll) {
      alert('okey! (Se inicia sesion).')
      // Se inicia sesion
    }else{
      //alert('Hay campos incorrectos.')
    }
    
    
  }
  
  render () {
    
    return (
      <View style={styles.container}>  
      <ScrollView>
 

      <TextInput
        style={styles.inputStyle}
        placeholder="Nombre de usuario"
        maxLength={20}
        value={this.state.username}
        name="username"
        onChangeText={(username) => this.changeUsername(username)}
      />      
      { this.state.validateUsername ? null : <Text style={styles.msgError}>Usuario no registrado</Text>}
      
      <TextInput
        style={styles.inputStyle}
        placeholder="Contraseña"
        value={this.state.password}
        maxLength={15}
        secureTextEntry={true}
        name="password"
        onChangeText={(password) => this.changePassword(password)}
      />
      { this.state.validatePassword ? null : <Text style={styles.msgError}>Contraseña inválida</Text>}
 
      <TouchableHighlight 
        style={styles.button}
        color="#3740FE"
        onPress={() => { this.clickSend() }} >
        <Text>Ingresar</Text>        
        
      </TouchableHighlight>
          
 
    </ScrollView>
    
  </View>
  )};
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