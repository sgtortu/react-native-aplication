 
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableHighlight } from 'react-native';  
import config from "../config";

export default function Credencial ({ route, navigation }) {

  const { numAfiliado, nombrePersona, fingresoAfiliado, documentoPersona, id_emp } = route.params;
  const [nameEmp, setNameEmp] = useState('');
  const [loadEmp, setLoadEmp] = useState(false);
  //const {nameEmp} = nameEmp;

  if ( !loadEmp ) {
    setLoadEmp(true)
    fetch(`http://192.168.0.7:3000/empresa/${id_emp}`).then(response => {
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        alert("Tu credencial!");
        //throw new TypeError("Oops, we haven't got JSON!");
      }
      return response.json();
    })
    .then(data => {
      console.log('emp: ',data)
      setNameEmp(data.rs_emp)
    })
    .catch(error => console.error(error), 
    alert("Tu credencial!")
    
    //setValidateAll({ state:false, msg:"Algo anduvo mal. Vuelva a intentarlo."})
    
    );
  }
 
  return (
    <View style={ globalStyles.container}>  
      <ScrollView>
        <Text> AFILIADO TITULAR </Text>
        <Text> - </Text>
        <Text> N॰ DE AFILIADO: {numAfiliado} </Text>
        <Text> AFILIADO: {nombrePersona} </Text>
        <Text> F. INGRESO: {fingresoAfiliado} </Text>
        <Text> D.N.I: {documentoPersona} </Text>
        <Text> EMPRESA: {nameEmp} </Text>
      </ScrollView>
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
  msgError: {
    color: 'red',
    marginBottom: 3, 
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