 
import React, { useState } from 'react';
import { Dimensions,  StyleSheet, Text, View, Image, ScrollView } from 'react-native';  
import { globalStyles } from './styles/global'; 

export default function Credencial ({ route, navigation }) {

  const { numAfiliado, nombrePersona, fingresoAfiliado, documentoPersona, id_emp } = route.params;
  const [nameEmp, setNameEmp] = useState('');
  const [loadEmp, setLoadEmp] = useState(false);
   
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  let widthPercent = (windowWidth / 100) * 20;
  let heightPercent = (windowHeight / 100) * 80;
  
  let paddingPercent = (windowWidth / 100) * 11;
  let paddingTextPercent = (windowWidth / 100) * 2;

  console.log('----: ' );

  console.log(`W = ${windowWidth} - ${widthPercent}%`) 
  console.log(`H = ${windowHeight} - ${heightPercent}%`)  
  console.log(`paddingPercent = ${paddingPercent}%`)  
  console.log(`paddingTextPercent = ${paddingTextPercent}%`)  

  if ( !loadEmp ) {
    setLoadEmp(true)
    fetch(`http://192.168.0.7:3000/empresa/${id_emp}`).then(response => {
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        alert("Tu credencial!");
        //throw new TypeError("Oops, we haven't got JSON!");
      }
      return response.json();
    })
    .then(data => {
      console.log('emp: ',data)
      setNameEmp(data.rs_emp)
    })
    .catch(error => console.error(error), 
    alert("Tu credencial!")
    
    //setValidateAll({ state:false, msg:"Algo anduvo mal. Vuelva a intentarlo."})
    
    );
  }
 
  /*
  
  TENER EN CUENTA QUE:

  La pantalla va horizontal, por lo tanto en Widht lleva el valor de Height y viceversa.
  
  */
 
  return (

    <View style={ styles.container }>  
 
        <View style={   { height:windowWidth, width:windowHeight },styles.card    }> 

            <Image
              style={{height:widthPercent , width:heightPercent}}
              source={require('../assets/images/afi-adherente-header.png')}
              />  

            <View style={   {marginTop:paddingTextPercent, marginBottom:paddingTextPercent, marginLeft:paddingTextPercent*3 }    }> 
              <Text style={styles.text} > N॰ DE AFILIADO:  {numAfiliado} </Text>   
              <Text style={styles.text} > AFILIADO: {nombrePersona} </Text>
              <Text style={styles.text} > F. INGRESO: {fingresoAfiliado} </Text>
              <Text style={styles.text} > D.N.I: {documentoPersona} </Text>
              <Text style={styles.text} > EMPRESA: {nameEmp} </Text>
              <Text style={styles.text} > PARENTESCO: {documentoPersona} </Text>
              <Text style={styles.text} > AFILIADO TITULAR: {nameEmp} </Text>
            </View>

            <Image
              style={{height:widthPercent, width:heightPercent}}
              source={require('../assets/images/afi-titular-footer.png')}
              />  

        </View>
         
    </View>
  ); 
    
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  card: { 
    transform: [{ rotate: '90deg'}],   
  }, 
  text: { 
    fontSize: 16,
    color:'#000',  
    marginTop: 2,  
    marginBottom: 2, 
  },  
});

 