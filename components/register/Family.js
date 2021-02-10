 
import React, { useState } from 'react';
import { StyleSheet, Text, View,  ScrollView, Button } from 'react-native';  
import RNPickerSelect from 'react-native-picker-select';
import { globalStyles } from '../styles/global';

//import config from "../../config";

export default function Family ({ route, navigation }) { 
  
    // Estados
    const [parentesco, setparentesco] =  useState('A');  
    const [msgErrorParentesco, setmsgErrorParentesco] = useState({  state: false, msg: "" }); 
    
    // Click continuar
    let clickContinue = () => {
         
        if (parentesco === 'A' || parentesco === 'B' ) {
            navigation.navigate('Escanear',{parentesco: parentesco})
            // MODO DESARROLLO - Debe redireccionar al Sacaneo
            //navigation.navigate('Register',{parentesco: parentesco, sexoScan: 'M', fnacScan: '03-05-200', nombreScan: 'SANTIAGO', apellidoScan: 'TORTU', dniScan: 42400448, cuilScan:20424004481 })
        } else {   
            setmsgErrorParentesco({state:true, msg:'Debe seleccionar una opción.'})
            return null;
        }
          
    }

    // Vista
    return (
        <View style= {globalStyles.container}>  
            <ScrollView>               

              <Text style={ globalStyles.h1 } > Registrarte </Text>

              <Text style={ globalStyles.h4 }>Se registrara como: </Text>        
              <RNPickerSelect
                  style= {globalStyles.inputStyle}   
                  onValueChange={(value) => setparentesco(value)}
                  placeholder={{label:'Seleccionar...'}}
                  value={'A'}
                  items={[
                    { label: 'Afiliado titular', value: 'A' }, 
                    // { label: 'Hijo del afiliado', value: 'H' },
                    // { label: 'Esposa del afiliado', value: 'E' },
                    // { label: 'Concubino del afiliado', value: 'C' },
                    // { label: 'Nieto del afiliado', value: 'N' },
                    // { label: 'Otro', value: 'N/D' },
                    { label: 'Familiar del afiliado', value: 'B' }, 
                  ]}
                  />
  
                {  msgErrorParentesco.state ? <Text style= {globalStyles.msgError}> {msgErrorParentesco.msg} </Text> : null}
                  
                <Text style= {styles.margin}></Text>
                <Button                                     
                  onPress={() => { clickContinue() }}                      
                  title='Continuar'
                  color='#043464'
                  > </Button>
                 
            </ScrollView>
        </View>
    ); 
    
}
  
const styles = StyleSheet.create({
   
  margin: {
    marginTop: 20, 
  }, 

});