

import React,  { useState, useEffect }  from 'react';
import { Button, Text, View ,StyleSheet} from 'react-native'; 
import { BarCodeScanner } from 'expo-barcode-scanner'; 

export default function Scanner({ navigation }) {  

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

    console.log('data-> ', data)
    // Para separar al string que recibo
    let elements = data.split("@");

    // Discriminar a los que no sean pdf417. Un QR por ejemplo
    if (type == 2048) { 

      // Comparar que el DNI del escaneo sea un AFILIADO ACTIVO 
      fetch(`http://192.168.0.9:3000/usuarios/${elements[4]}`).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Algo anduvo mal.');
        }
      })
      .then((responseJson) => { 
        alert('Ya puedes registrarte.')
        navigation.navigate('Register')
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