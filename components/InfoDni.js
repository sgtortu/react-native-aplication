 
import * as React from 'react';
import { SafeAreaView, Dimensions,  StyleSheet, Text, View, Image, Button } from 'react-native';  
import { globalStyles } from './styles/global';  

export default function InfoDni ({route, navigation}) {
  
  const [imgPdf417, setimgPdf417] = React.useState('');
  const {  
      documentoPersona, 
  } = route.params; 
 
  
  React.useEffect(() => { 
      fetch(`http://192.168.0.7:3000/pdf417/${documentoPersona}`)
      .then( response => {
        if(response.status == 200) {
        return response.text();
      } else {
        throw "Respuesta incorrecta del servidor" 
      }
    })
    .then( responseText => { 
      let responseObj = JSON.parse(responseText);
      setimgPdf417(responseObj.response[0])
    })
    .catch( err => {
      console.log(err);
    }); 
  },[])

     
  return (
    <View style= {globalStyles.container}>   

      <Text style={ globalStyles.h1 } > Datos personales</Text> 
      <Text style={ globalStyles.h4 } > El código tus datos:
      </Text> 

      <View style={ styles.code }>
        <Image style={{width: 250, height: 100}} source={{uri: imgPdf417}}/>
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
  code: {   
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },  
});

 