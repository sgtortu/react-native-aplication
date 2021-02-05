import React, { Component, Fragment } from 'react';
import { StyleSheet, Button, Text, View, Image  } from 'react-native';

export default function Home({ navigation }) { 
 
    

    return (
        <View>
            <Text style={styles.h1} > Bienvenido </Text>
            
            <Button
                style={styles.button}
                color="#3740FE"  
                testID="logoutButton"

                // Escanear = PreRegister.js
                //onPress={() => navigation.navigate('Family')}
                
                //SOLO PARA EVITAR ESCANEAR (MODO DESARROLLO)
                onPress={() => navigation.navigate('Register',{sexoScan: 'M', fnacScan: '03-05-200', nombreScan: 'SANTIAGO', apellidoScan: 'TORTU', dniScan: 42400448, cuilScan:20424004481 })}
 
                
                title="Registrarse"
            />

            <Button
                color="#3740FE"  
                testID="logoutButton"
                // Ingresar = Login.js
                onPress={() => navigation.navigate('Ingresar')}
                title="Iniciar sesion"
            />
            
        </View>
    );
}
 
const styles = StyleSheet.create({
    h1: {      
        fontSize: 35,
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15,
      },
    subtitle: {  
        fontSize: 20,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    image: {
        marginTop: 15,   
        marginBottom: 15,   
        width: 360,
        height: 247,
        display: 'flex',  
    },
    button: {  
        marginBottom: 15,    
    },
  });