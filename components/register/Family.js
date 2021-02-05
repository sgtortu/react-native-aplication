 
import React, { useState } from 'react';
import { StyleSheet, Text, View,  ScrollView, TouchableHighlight } from 'react-native';  
import RNPickerSelect from 'react-native-picker-select';
//import config from "../../config";

export default function Family ({ route, navigation }) { 
  
    // Estados
    const [parentesco, setparentesco] =  useState(0);  
    const [msgErrorParentesco, setmsgErrorParentesco] = useState({  state: false, msg: "" }); 
    
    // Click continuar
    let clickContinue = () => {
         
        if (parentesco !== 0) {
            navigation.navigate('Escanear',{parentesco: parentesco})
            // MODO DESARROLLO - Debe redireccionar al Sacaneo
            //navigation.navigate('Register',{parentesco: parentesco, sexoScan: 'M', fnacScan: '03-05-200', nombreScan: 'SANTIAGO', apellidoScan: 'TORTU', dniScan: 42400448, cuilScan:20424004481 })
        } else {   
            setmsgErrorParentesco({state:true, msg:'Debe completar los campos.'})
            return null;
        }
          
    }

    // Vista
    return (
        <View style={styles.container}>  
            <ScrollView>

                <Text>Se registrara como: </Text>        
                <RNPickerSelect
                    style={styles.inputStyle}   
                    onValueChange={(value) => setparentesco(value)}
                    
                    items={[
                        { label: 'Afiliado', value: 'A' }, 
                        { label: 'Hijo del afiliado', value: 'H' },
                        { label: 'Esposa del afiliado', value: 'E' },
                        { label: 'Concubino del afiliado', value: 'C' },
                        { label: 'Nieto del afiliado', value: 'N' },
                        { label: 'Otro', value: 'N/D' },
                    ]}
                />
    
                {  msgErrorParentesco.state ? <Text style={styles.msgError}> {msgErrorParentesco.msg} </Text> : null}
            
                <TouchableHighlight 
                    color="#3740FE"
                    onPress={() => { clickContinue() }} >
                    <Text>Continuar</Text>        
                </TouchableHighlight> 
    
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