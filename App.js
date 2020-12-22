import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Login from './components/Login'; 

export default function App() {
  
  // Banderas
  const [seeFormRegister, setSeeFormRegister] = useState(false);
  const [scanDni, setScanDni] = useState(false);
  
  // Escaneo de DNI 
  const [afiliadoActivo, setAfiliadoActivo] = useState([]);

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
        alert('Habilitado.')
        // Redireccionar a Form Registracion
        setSeeFormRegister(true);
      })
      .catch((error) => {
        console.log(error)
        alert('Inhabilitado.')
        setScanDni(false)
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
  // (Fin) Escaneo de DNI
  const clickScanDni = () => {  
    setScanDni(true)
  }



  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>


      {scanDni ? 
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        :
        <View>
          <Text> Bienvenido </Text>
          <Button 
            testID="logoutButton"
            onPress={async () => { clickScanDni() }}
            title="Escanee su DNI para continuar"
            />
          
          <Text> (foto del dni para indicar) </Text>
        </View>
        }
  
        {scanned && <Button title={'Toca para volver a escanear'} onPress={() => setScanned(false)} />}

    </View>
  );
}
