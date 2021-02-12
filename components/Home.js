import React, { Component, Fragment } from 'react';
import { StyleSheet, Button, Text, View, Image  } from 'react-native';
import { globalStyles } from './styles/global';

export default function Home({ navigation }) { 
 
    

    return (
        <View style={globalStyles.container}> 
            
            <View style={styles.localContainer}>
                <Text style={ globalStyles.h1 } > Bienvenido </Text>
                <Image
                    style={styles.image }
                    source={require('../assets/images/logo.png')}
                />       
            </View>

            <Button
                style={ globalStyles.button }
                color="#043464"  
                testID="logoutButton"
                
                // Escanear = PreRegister.js
                //onPress={() => navigation.navigate('Family')}
                
                //SOLO PARA EVITAR ESCANEAR (MODO DESARROLLO)
                onPress={() => navigation.navigate('Register',{sexoScan: 'M', fnacScan: '03-05-200', nombreScan: 'SANTIAGO', apellidoScan: 'TORTU', dniScan: 42400448, cuilScan:20424004481 })}
                
                title="Registrarse"
                />

            <Button
                color="#0474D6"  
                testID="logoutButton"
                // Ingresar = Login.js
                onPress={() => navigation.navigate('Ingresar')}
                title="Iniciar sesiÓn"
            /> 
            
        </View>
    );
}
 
const styles = StyleSheet.create({ 
    image: {  
        width: 180,
        height: 123,        
    }, 
    localContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column", 
        backgroundColor: '#fff', 
        alignItems: 'center',
    }, 
  });