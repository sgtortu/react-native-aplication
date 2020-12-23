import React, { Component, Fragment } from 'react';
import { StyleSheet, Button, Text, View, Image  } from 'react-native';

export default function Home({ navigation }) { 

    // const calcularCuil = (sexo, dni) => {

    //     let xy = 0;
    //     if (sexo == 'M') {
    //         xy = '20';
    //     }else{
    //         xy = '27';
    //     }
        
    //     dni = String(dni);

    //     let variablesCalculables = '';
    //     if (dni.length == 7) {
    //         variablesCalculables = [xy[0],xy[1],0,dni[0],dni[1],dni[2],dni[3],dni[4],dni[5],dni[6]]
    //     } else{
    //         variablesCalculables = [xy[0],xy[1],dni[0],dni[1],dni[2],dni[3],dni[4],dni[5],dni[6],dni[7]]
    //     }

    //     let fijosCalculables = [5,4,3,2,7,6,5,4,3,2]
         
    //     let fijosYvariablesMult = [];
    //     for (let i = 0; i < fijosCalculables.length; i++) {
    //         fijosYvariablesMult.push(fijosCalculables[i] * variablesCalculables[i]);
    //     }

    //     let fijosYvariablesSuma = 0;
    //     for (let x = 0; x < fijosYvariablesMult.length; x++) {
    //         fijosYvariablesSuma += fijosYvariablesMult[x];
            
    //     }

    //     let a = fijosYvariablesSuma / 11; 
    //     a = Math.round(a);
        
    //     let b = fijosYvariablesSuma - (a*11);
        
    //     let c = 11 - b
    //     c = String(c);

    //     if  (c.length > 1 ) {
    //         c = c[1] - c[0]; 
    //     }
 
    //     let cuilfinal = `${xy}-${dni}-${c}`;  

    //     return cuilfinal;

    // }

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

    console.log(getCUIT('a', 20516222));

    return (
        <View>
            <Text style={styles.h1} > Bienvenido </Text>
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
                onPress={() => navigation.navigate('Scanner', {id:'santiago'})}
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
    
  });