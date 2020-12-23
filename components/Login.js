import React, { Component, Fragment } from 'react';
import { SafeAreaView, ScrollView, Button, StyleSheet, Text, View } from 'react-native';

export default function Login() { 
    
    fetch('http://192.168.0.9:3000/usuarios')
    .then(response => response.json())
    .then(data => console.log(data));
  
     
    return (
      <Fragment>
 
      </Fragment>
  );
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
    }
  });