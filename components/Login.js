 
import React, { useState } from 'react';
import { Button, Text, View, TextInput, ScrollView, TouchableHighlight } from 'react-native';  
import { styles } from "./styles/styles"; 


export default function Login({ route, navigation }) { 

  
  const [dataUser, setDataUser] = useState({  
    username: '',
    password: '', 
  });
  const [idUser, setIdUser] = useState('');
  const [validateUsername, setValidateUsername] = useState(true);
  const [validatePassword, setValidatePassword] = useState(true); 
  const [loadDataRegister, setLoadDataRegister] = useState(true); 
  const [validateAll, setValidateAll] =  useState({  state: false, msg: "" });   
  

  
  let clickSend = () => {
    // Validaciones
    if (   username.trim() === "" ||  password.trim() === ""  ) {
        setValidateUsername(false)
        setValidatePassword(false)
        //return null;
    }
    // USERNAME         
    fetch(`http://192.168.0.7:3000/lastusuario/${username}`).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        //throw new Error('Algo anduvo mal.');
        //alert('Algo anduvo mal.'); 

        setValidatePassword(false)
        setValidateUsername(false)
                
      }
    })
    .then((responseJson) => {  
      console.log('responseJson: ', responseJson)  
      setIdUser(responseJson.id_usu);

      if (responseJson.nom_usu === username) {
        setValidateUsername(true)
      } else {
        setValidateUsername(false)
      }
      if (responseJson.con_usu !== password) {
        setValidatePassword(false)
      } else {
        setValidatePassword(true)
      }
    })
    .catch((error) => {
      console.log('error: ', error)  
    });
     
    
    console.log(`pass: ${validatePassword} - name: ${validateUsername}`);

    if (validatePassword && validateUsername){
      console.log('Datos correctos')
      
      setValidateAll({ state:true, msg:false})

      fetch(`http://192.168.0.7:3000/usuarioactivo/${idUser}`).then(response => { 
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          alert("Oops, hubo un problema!");
          //throw new TypeError("Oops, we haven't got JSON!");
        }
        return response.json();
      })
      .then(responseJson => {
        console.log('rJ: ', responseJson) 
        navigation.navigate('Credencial', {numAfiliado: responseJson.numAfiliado, nombrePersona: responseJson.nombrePersona, fingresoAfiliado: responseJson.fingresoAfiliado, documentoPersona: responseJson.documentoPersona, id_emp: responseJson.id_emp})
        setValidatePassword(false);
        setValidateUsername(false);
      })
      .catch(error => {
        console.log('error rJ: ', error)  
        setValidateAll({ state:false, msg:"Algo anduvo mal. Vuelva a intentarlo."})
 
      });

     





    }else{ 
      setValidateAll({ state:false, msg:"Hay campos incorrectos."})

    }
    
    
  }

  const { 
    username,
    password,  
  } = dataUser;
 
    
    return (
      <View style={styles.container}>  
      <ScrollView>
 

      <TextInput
        style={styles.inputStyle}
        placeholder="Nombre de usuario"
        maxLength={20}
        value={ username}
        name="username"
        onChangeText={       (username) =>
          setDataUser({
            ...dataUser,
            'username': username,
          })
        }
        //onChangeText={(username) => this.changeUsername(username)}
      />      
      {  validateUsername ? null : <Text style={styles.msgError}>Usuario no registrado</Text>}
      
      <TextInput
        style={styles.inputStyle}
        placeholder="Contraseña"
        value={ password}
        maxLength={15}
        secureTextEntry={true}
        name="password"
        onChangeText={       (password) =>
          setDataUser({
            ...dataUser,
            'password': password,
          })
        }
        
        //onChangeText={(password) => this.changePassword(password)}
      />
      {  validatePassword ? null : <Text style={styles.msgError}>Contraseña inválida</Text>}
      {  validateAll.state ? null : <Text style={styles.msgError}>{validateAll.msg}</Text>}
 
      <TouchableHighlight 
        style={styles.button}
        color="#3740FE"
        onPress={() => { clickSend() }} >
        <Text>Ingresar</Text>        
        
      </TouchableHighlight>

      <Text>¿Aún no se ha registrado?</Text>
      <Button
          style={styles.button}
          color="#3740FE"  
          testID="logoutButton"
          // Escanear = PreRegister.js
          onPress={() => navigation.navigate('Family')}
          title="Registrarse"
      />
          
 
    </ScrollView>
    
  </View>
  ) 
}

 