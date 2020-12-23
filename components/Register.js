 
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native'; 

export default function Register()  {
 
    const [dataForm, setDataForm] = useState({
      email: "",
      cellphone: "",
      username: "",
      password: "",
      passwordRepeat: "",
    });
    
    const {
      email,
      cellphone,
      username,
      password, 
      passwordRepeat 
    } = dataForm;

    const registerUser = (e) => {
      e.preventDefault();
 
      console.log('value: ', value);
    }

    const updateState = (e) => {
      setDataForm({
        ...dataForm,
        [e.target.name]: e.target.value,
      });
    };
  
 
    return (
      <View style={styles.container}>  
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={email}
          name="email"
          onChangeText={updateState}
        /> 
        <TextInput
          style={styles.inputStyle}
          placeholder="Celular"
          value={cellphone}
          name="cellphone"
          onChangeText={updateState}
          /> 
        <TextInput
          style={styles.inputStyle}
          placeholder="Nombre de usuario"
          value={username}
          name="username"
          onChangeText={updateState}
          />      
        <TextInput
          style={styles.inputStyle}
          placeholder="Contraseña"
          value={password}
          secureTextEntry={true}
          name="password"
          onChangeText={updateState}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Confirmar contraseña"
          value={passwordRepeat}
          maxLength={15}
          secureTextEntry={true}
          name="passwordRepeat"
          onChangeText={updateState}
          />   
        <Button
          color="#3740FE"
          title="Registrarse"
          onPress={(e) =>{
            e.preventDefault(); 
            registerUser();
          }}
        />

        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Iniciar sesión
        </Text>                          
      </View>
    );
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});