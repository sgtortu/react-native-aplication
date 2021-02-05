import React, { Component, Fragment } from 'react';
import { StyleSheet, Button, Text, View, Image  } from 'react-native';

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
        <View>
          
            <Text style={styles.subtitle} > Debe escanear su DNI para continuar</Text>

            <Image
                style={styles.image}
                source={{
                uri: 'https://emigrante.com.ve/wp-content/uploads/2018/04/DNI-Argentina.jpg',
                }}
            />
            
            <Button
                color="#3740FE"  
                testID="logoutButton"
                onPress={() => navigation.navigate('Scanner', {parentesco:parentesco})}
                title="Presione aqui para continuar"
            />
            
        </View>
    );
}
 
const styles = StyleSheet.create({
    h1: {      
        fontSize: 35,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
      },
    subtitle: {  
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 5,
    },
    image: {
        marginTop: 15,   
        marginBottom: 15,   
        width: 360,
        height: 247,
        display: 'flex',  
    },
    
  });