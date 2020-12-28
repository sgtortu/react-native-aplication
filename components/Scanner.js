

import React,  { useState, useEffect }  from 'react';
import { Button, Text, View ,StyleSheet} from 'react-native'; 
import { BarCodeScanner } from 'expo-barcode-scanner'; 

export default function Scanner({ navigation }) {  

  // Cuil
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



    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
 
    // Para separar al string que recibo
    let elements = data.split("@");
    let dni,apellido,nombre,fnac,sexo = '';
    if (data[0] == '@') {
      // Dni mas antiguo
      dni = elements[1]
      apellido = elements[4]
      nombre = elements[5]
      fnac = elements[7]
      sexo = elements[8]
    }else{
      // Dni mas reciente
      dni = elements[4]
      apellido = elements[1]
      nombre = elements[2]
      fnac = elements[6]
      sexo = elements[3]
    }
    
    // Discriminar a los que no sean pdf417. Un QR por ejemplo
    if (type == 2048) { 
      let cuilScan = getCUIT(sexo,dni);
      // Comparar que el DNI del escaneo sea un AFILIADO ACTIVO 
      fetch(`http://192.168.0.9:3000/usuarios/${dni}`).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Algo anduvo mal.');
        }
      })
      .then((responseJson) => { 
        alert('Ya puedes registrarte.')
        navigation.navigate('Register',{sexoScan: sexo, fnacScan: fnac, nombreScan: nombre, apellidoScan: apellido, dniScan: dni, cuilScan: cuilScan })
        // Redireccionar a Form Registracion 
      })
      .catch((error) => {
        console.log(error)
        alert('Inhabilitado.') 
        // Redireccionar a Inicio
      });
          
      }else{
        alert('No se ha identificado un DNI.');
      }
  
  };

  if (hasPermission === null) {
    return <Text>Esperando permiso a la camara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No hay acceso a la camara.</Text>;
  } 
  return (
 
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Toca para escanear nuevamente.'} onPress={() => setScanned(false)} />}
    </View>

  )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});