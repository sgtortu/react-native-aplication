 
import React, { useState } from 'react'; 
import { Dimensions,  StyleSheet, Text, View, Image, Button } from 'react-native';  
import { API_URL } from "../config";


export default function Credencial ({route, navigation}) {
  
 
  const { 
    numAfiliado, 
    nombrePersona, 
    fingresoAfiliado, 
    documentoPersona, 
    rs_emp,
  } = route.params; 
  
  const [imgPdf417, setimgPdf417] = useState(false); 
   
  React.useEffect(() => { 
    fetch(`${API_URL}pdf417/${documentoPersona}`).then(response => {
      const contentType = response.headers.get('content-type'); 
      return response.json();
    })
    .then(data => { 
        console.log('ok------> ',data.response[0]); 
        setimgPdf417(data.response[0]);
    })
    .catch(error => console.error(error),  
    );
  },[])


  function getParsedDate(date){
    date = String(date).split(' ');
    var days = String(date[0]).split('-');
    var hours = String(date[1]).split(':');
    return [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
  }
  let fecha = getParsedDate(fingresoAfiliado) 
  let fechaIngreso = `${fecha[2]}/${fecha[1]}/${fecha[0]}`;   

   
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  let widthPercent = (windowWidth / 100) * 20;
  let heightPercent = (windowHeight / 100) * 80;
  
  let paddingPercent = (windowWidth / 100) * 11;
  let paddingTextPercent = (windowWidth / 100) * 2;

  // console.log('----: ' );

  console.log(`W = ${windowWidth} - ${widthPercent}%`) 
  console.log(`H = ${windowHeight} - ${heightPercent}%`)  
  console.log(`paddingPercent = ${paddingPercent}%`)  
  console.log(`paddingTextPercent = ${paddingTextPercent}%`)  

  
  /*
  
  TENER EN CUENTA QUE:

  La pantalla va horizontal, por lo tanto en Widht lleva el valor de Height y viceversa.
  
  */
 
  return (

    <View style={ styles.container }>  
    <View style={ {marginTop:0} }>
 
        <View style={   { height:windowWidth, width:windowHeight },styles.card    }>  

            <Image
              style={{height:widthPercent , width:heightPercent-heightPercent/10}}
              source={require('../assets/images/afi-titular-header.png')}
              />  

            <View style={   {marginTop:paddingTextPercent, marginBottom:paddingTextPercent, marginLeft:paddingTextPercent*3 }    }> 
              <Text style={styles.text} > AFILIADO: {nombrePersona} </Text>
              <Text style={styles.text} > EMPRESA: {rs_emp} </Text>
              <Text style={styles.text} > N॰ DE AFILIADO:  {numAfiliado} </Text>   
              <Text style={styles.text} > F. INGRESO: {fechaIngreso} </Text>
              <Text style={styles.text} > D.N.I: {documentoPersona} </Text>
              
            </View>


            <View style={styles.footer, {marginTop:windowWidth/8}}>
              <Image
                style={{height:widthPercent, width:heightPercent-heightPercent/10}}
                source={require('../assets/images/afi-titular-footer.png')}
                />  
            </View>

          </View>
        </View>
        <View style={styles.ubicacionPdf417}> 
          
              <View style={ {marginRight:windowHeight/5,marginBottom:-windowWidth/6} }>
                <Text style={styles.textPdf417} > Identificarse: </Text>
                <Image style={ {width: windowWidth/2.5, height:windowHeight/8} } source={{uri: imgPdf417}}/>
              </View>
             
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
  containerCard: {
    marginBottom:20,  
  }, 
  card: { 
    transform: [{ rotate: '90deg'}],  
    backgroundColor: '#f9f9f9' 
  }, 
  ubicacionPdf417: {  
    transform: [{ rotate: '90deg'}],       
  }, 
  text: { 
    fontSize: 16,
    color:'#000',  
    marginTop: 2,  
    marginBottom: 2,  
  },  
  textPdf417: { 
    fontSize: 12,
    color:'#000',  
    marginTop: 2,  
    marginBottom: 2,  
  },  
  footer: {     
    alignItems: 'center',
    justifyContent: 'center', 
  },  
});

 