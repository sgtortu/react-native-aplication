 
import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, TextInput, ScrollView, TouchableHighlight } from 'react-native';  
import { globalStyles } from './styles/global';

export default function Login({ route, navigation }) { 
   

  
  const [dataUser, setDataUser] = useState({  
    username: 'vemos',
    password: '42400448', 
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
    }
    

    if (validatePassword && validateUsername){
      
      setValidateAll({ state:true, msg:false})    

      fetch(`http://192.168.0.7:3000/login/${username}/${password}`).then(response => {
        const contentType = response.headers.get('content-type'); 
        return response.json();
      })
      .then(data => {
        //console.log(data.response[1][0].nombrePersona)
        if(data.response.length === 1) {
          setValidateAll({ state:false, msg:data.response[0]})      
        } else {
          if (data.response[0].afiliadoTitular) {
            // navigate credencial titular
            const { 
              numAfiliado,
              nombrePersona,  
              fingresoAfiliado,
              documentoPersona,  
              rs_emp, 
            } = data.response[1][0];
            navigation.navigate('Credencial',{numAfiliado: numAfiliado, nombrePersona: nombrePersona, fingresoAfiliado: fingresoAfiliado, documentoPersona: documentoPersona, rs_emp: rs_emp })
          } else {
            // navigate credencial adherente 
            const { 
              numAfiliado,
              nombrePersona,  
              fingresoAfiliado,
              documentoPersona,  
              rs_emp, 
              parentescoAfiliadoflia,
              nombrePersonaTitular
            } = data.response[1][0];
            navigation.navigate('CredencialFlia',{numAfiliado: numAfiliado, nombrePersona: nombrePersona, fingresoAfiliado: fingresoAfiliado, documentoPersona: documentoPersona, rs_emp: rs_emp, parentescoAfiliadoflia: parentescoAfiliadoflia , nombrePersonaTitular: nombrePersonaTitular })
          }
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
        style={ globalStyles.inputStyle}
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

      <Text style={globalStyles.inline}>  </Text>
  
      <Button 
        style={ styles.buttonSmall }
        onPress={() => navigation.navigate('Family')}
        title='Crear nueva cuenta'
        color='#0474D4'
        > </Button>
       
    </ScrollView>
    
  </View>
  ) 
}

const styles = StyleSheet.create({  
  // margin: {
  //     marginTop: 15
  // }
});