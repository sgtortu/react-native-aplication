 
import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, TextInput, ScrollView, TouchableHighlight } from 'react-native';  
import { globalStyles } from './styles/global'; 
import { AuthContext } from "./utils";
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { API_URL } from "../config"; 

export default function Login({ route, navigation }) {  
  //console.log('---> ',API_URL)
  const { signIn } = React.useContext(AuthContext);
   
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('veces', value.toString())
      //console.log('Bien AsyncStorage:')

    } catch (e) {
      // saving error
      //console.log('Error AsyncStorage:')
    }
  }
  
  const [dataUser, setDataUser] = useState({    
    username: '',
    password: '',      
  }); 
  const [validateUsername, setValidateUsername] = useState(true);
  const [validatePassword, setValidatePassword] = useState(true); 
  const [loadDataRegister, setLoadDataRegister] = useState(true); 
  const [validateAll, setValidateAll] =  useState({  state: false, msg: "" });   
 
 
  let clickSend = () => { 

    // Validaciones
    if (   username.trim() === "" ||  password.trim() === ""  ) {
        setValidateUsername(false)
        setValidatePassword(false) 
    }
    


    if (validatePassword && validateUsername){
      
      setValidateAll({ state:true, msg:false})    

      fetch(`http://64.225.47.18:8080/login/${username}/${password}`).then(response => {
        const contentType = response.headers.get('content-type'); 
        return response.json();
      })
      .then(data => { 
        //console.log('data-   ',data)
        if(data.response.length === 1) {

          setValidateAll({ state:false, msg:data.response[0]})      
        } else { 
          signIn(data.response[1][0])
          storeData(0)        
        }
      })
      .catch(error => console.error(error),
        setValidateAll({ state:false, msg:" "})      
      );

    }else{ 
      setValidateAll({ state:false, msg:"Hay campos incorrectos."})

    }
    
    
  }

  const { 
    username,
    password,  
  } = dataUser;
 
    
    return (
      <View style={ globalStyles.container}>  
      

      <ScrollView>
  
      <Text style={ globalStyles.h1 } > Iniciar sesión </Text>


      <TextInput  
        autoCapitalize='none'
        style={ globalStyles.inputUsername}
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
 
      {  validateUsername ? null : <Text style={ globalStyles.msgError}>Usuario no registrado</Text>}
      
      <TextInput
        autoCapitalize='none'
        style={ globalStyles.inputStyle}
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
      {  validatePassword ? null : <Text style={ globalStyles.msgError}>Contraseña inválida</Text>}
      {  validateAll.state ? null : <Text style={ globalStyles.msgError}>{validateAll.msg}</Text>}
 

      <Button 
        style={ globalStyles.button }
        color="#043464" 
        onPress={() => { clickSend() }}  
          title="Ingresar"    
      ></Button>

      <TouchableHighlight
        onPress={() => navigation.navigate('ChangePassword')}
        >
        <Text style={ globalStyles.buttonText} >¿Has olvidado la contraseña?</Text>
      </TouchableHighlight>

      <View style={globalStyles.separator} />

      <Text style={globalStyles.inline}>  </Text>
      <View style={styles.separator} />
  
       
      <View style={globalStyles.buttonPosition}> 
        <Button 
          style={ styles.buttonSmall }
          onPress={() => navigation.navigate('Family')}
          title='Crear nueva cuenta'
          color='#0474D4'
          > </Button>
        </View>
    
    </ScrollView>
  </View>
  ) 




   
}

const styles = StyleSheet.create({  
  separator: {
      marginTop: 15
  },
  
});