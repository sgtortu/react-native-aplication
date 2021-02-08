import React, { Component, Fragment } from 'react';
import { StyleSheet, Button, Text, View, Image  } from 'react-native';
import { globalStyles } from '../styles/global';

export default function PreRegister({ route,navigation }) { 

    const { parentesco } = route.params;
 
    // Obtener el Cuit desde el dni escaneado
    const getCUIT = (gender, dni) => {
        
        dni = String(dni);

        if (!dni || dni.length !== 8) {
          throw new Error('The DNI number must contain 8 numbers');
        }
      
        let genderNumber = gender === 'M' ? 20 : 27;
      
        const generateDigitVerificator = () => {
          const multipliers = [2, 3, 4, 5, 6, 7];
          const genderNumberAndDNI = `${genderNumber}${dni}`;
      
          let total = 0;
          let multipliersIndex = 0;
          for (let i = String(genderNumberAndDNI).length - 1; i > -1; i--) {
            const sum = genderNumberAndDNI[i] * multipliers[multipliersIndex];
            total += sum;
            if (multipliersIndex === 5) multipliersIndex = 0;
            else multipliersIndex += 1;
          }
      
          const digitVerificator = 11 - (total % 11);
      
          if (digitVerificator === 10) {
            genderNumber = 23;
            return generateDigitVerificator();
          }
          if (digitVerificator === 11) return 0;
          return digitVerificator;
        };
      
        const digitVerificator = generateDigitVerificator();
      
        return `${genderNumber}-${dni}-${digitVerificator}`;
      };

    // Ejemplo
    console.log(getCUIT('a', 20516222));

    return (
        <View style={ globalStyles.container}>
          
            <Text style={ globalStyles.h1} > Registrarte</Text>
            <Text style={ styles.h4} > Debe escanear su DNI para continuar.</Text>
            

            {/* require('../assets/images/logo.png')
              <Image
                  style={ styles.image}
                  source={{
                    uri: 'https://emigrante.com.ve/wp-content/uploads/2018/04/DNI-Argentina.jpg',
                  }}
              />
            */}
              <Image
                  style={styles.image }
                  source={require('../../assets/images/codigo-dni.jpg')}
              />       
            <Button
                style={ globalStyles.button}
                color="#043464"  
                testID="logoutButton"
                onPress={() => navigation.navigate('Scanner', {parentesco:parentesco})}
                title="Escanear DNI"
            />
            
        </View>
    );
}
 
const styles = StyleSheet.create({ 
    image: {
        marginTop: 15,   
        marginBottom: 55,    
        
         width: 290,
         height: 70,
        //display: 'flex',  
    },
    h4: {      
      fontSize: 17,
      color:'#043464', 
      marginTop: 5,  
      marginBottom: 5
    },
  });