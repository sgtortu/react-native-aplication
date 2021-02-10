 
import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, TextInput, ScrollView, TouchableHighlight } from 'react-native';  
import { globalStyles } from '../styles/global';

export default function Register ({ route, navigation }) { 

    // Desde Scanner.js vienen las siguientes variables: 
    const { idpersona, parentesco, sexoScan, fnacScan, nombreScan, apellidoScan, dniScan, cuilScan } = route.params;
 
    // Estado datos del formulario
    const [dataUser, setDataUser] = useState({  
        email: 'blabla@gmail.com',
        cellphone: '123456',
        username: '',
        password: '123456', 
        passwordRepeat: '123456', 
      }); 
      
      // Estado de los ids  
      const [disabled, setDisabled] = useState(false);
      
      // Mejor manejo de las variables
      const { 
        username,
        password, 
        email,
        cellphone, 
        passwordRepeat, 
      } = dataUser; 

    // Estados validaciones
    const [validateEmail, setValidateEmail] = useState({  state: true, msg: "" }); 
    const [validateCellphone, setValidateCellphone] = useState({  state: true, msg: "" });
    const [validateUsername, setValidateUsername] = useState({  state: true, msg: "" });
    const [validatePassword, setValidatePassword] = useState({  state: true, msg: "" }); 
    const [validatePasswordRepeat, setValidatePasswordRepeat] = useState({  state: true, msg: "" });  
    const [validateAll, setValidateAll] =  useState({  state: true, msg: "" });   
    
    // Estados para usernames existentes (1)
    const [usersRegistered, setUsersRegistered] =  useState([]);  
    const [loadUseReg, setLoadUseReg] =  useState(false);  
    let usernamesRegistered = [];  
    
    // Estados para user(afiliado) activo (2)
    const [userActive, setUserActive] =  useState('');  
    const [loadUseAct, setLoadUseAct] =  useState(false);   










 
    // (1) Username existente (get all a la vista usuario)
    if(!loadUseReg){
      setLoadUseReg(true)
      fetch(`http://192.168.0.7:3000/usuario`).then(response => {
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          alert("Oops, hubo un problema!");
          //throw new TypeError("Oops, we haven't got JSON!");
        }
        return response.json();
      })
      .then(data => {
        setUsersRegistered(data)
      })
      .catch(error => console.error(error),
        setValidateAll({ state:false, msg:" "})
      
      );
    }

    for (let i = 0; i < usersRegistered.length; i++) {
      usernamesRegistered.push(usersRegistered[i].nom_usu);
    }
 


    let clickSend = () => {
      setDisabled(true)
       
      // TODOS LOS CAMPOS COMPLETOS
      if (  
        email.trim() === "" ||
        cellphone.trim() === "" ||
        username.trim() === "" || 
        password.trim() === "" ||
        passwordRepeat.trim() === ""
      ) {
        setValidateAll({ state:false, msg:"Debe completar todos los campos."});
        return null;      
      }






      // EMAIL
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ; 
      if(reg.test(email) === false) { 
        // Ivalido 
        setValidateEmail({ msg: "Email inválido", state: false })  
        return null;


      } else { 
        // Valido  
        setValidateEmail({ msg: false, state: true })
      }  


 
 
 
 
 
 
      // CELLPHONE
      let regCellphone = /^-{0,1}\d*\.{0,1}\d+$/ ;
      if(regCellphone.test(cellphone) === false) { 
        // Ivalido
        setValidateCellphone({ msg: "Celular inválido", state: false }) 
        return null;

      } else { 
        // Valido  
        if (cellphone.length > 5) { 
          setValidateCellphone({ msg: false, state: true }) 
        }else{
          // inválido
          setValidateCellphone({ msg: "Celular inválido", state: false }) 
          return null;

        }
      } 
      
      
      
      
      
      
      // USERNAME
      let regUsername = /^[\w\.@]{6,100}$/;
      if(regUsername.test(username) === false) { 
        // Ivalido
          setValidateUsername({
            msg: "Usuario inválido.",
            state: false
          })
        return null;

      } else { 
        // Valido     

          // Username existente   
          if (usernamesRegistered.length > 0) {
            
            let includesUsername = usernamesRegistered.includes(username);  
            if (includesUsername) {
              setValidateUsername({
                msg: "Usuario existente.",
                state: false
              })
            }else{
              setValidateUsername({
                msg: false,
                state: true
              })
            } 
          }      
        }    
        
        
        
        
        
        
        // PASSWORD
        let regPassword = /\s/;   // espacios en blanco 
        // si regPassword es TRUE quiere decir la clave esta mal
        if (regPassword.test(password)) { 
          setValidatePassword({ msg: "Contraseña invalida.", state: false })
          return null;
        }
        else if (password.length < 5) { 
          setValidatePassword({ msg: "Contraseña demasiado corta.", state: false })
          return null;
        }
        else if (password !== passwordRepeat) {
          // Invalida: passwordRepeat
          setValidatePasswordRepeat({ msg: "Las contraseñas no coinciden.", state: false }) 
          return null;
        } 
        else {
          setValidatePasswordRepeat({ msg: false , state: true }) 
          setValidatePassword({ msg: false , state: true }) 
          
        } 
        
        
        
        
  
        
        // TODO 
        console.log('validateEmail: ', validateEmail.state)
        console.log('validateCellphone: ', validateCellphone.state)
        console.log('validateUsername: ', validateUsername.state)
        console.log('validatePassword: ', validatePassword.state)
        console.log('validatePasswordRepeat: ', validatePasswordRepeat.state)






        let dataRegister  = {
          'nom_usu': username,
          'con_usu': password,
          'id_tusu': 6, 
          'nombre': nombreScan, 
          'apellido': apellidoScan, 
          'cuil': cuilScan, 
          'celular': cellphone, 
          'mail': email,
          'idPersona': idpersona,  
        }
        
        if ( validateEmail.state && validateCellphone.state && validateUsername.state && validatePassword.state && validatePasswordRepeat.state){  
          //setValidateAll({ state:true, msg:false})
          
          setTimeout(() => {
            
            // Post a usuario y Put a persona
            fetch(`http://192.168.0.7:3000/registrar`, {
              method: 'POST', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataRegister),
            })
            .then(response => JSON.stringify(dataRegister))
            .then(response => {
              console.log('Bien:', response);  
              alert("Registrado correctamente.")     
              navigation.navigate('Ingresar')
              
              // Redireccionar al Login con los datos de logueo
            })          
            .catch((error) => {
              console.error('Error:', error);
              setValidateAll({ state:false, msg:" "})
            });  
            
          }, 1200);

        }else{
          setDisabled(false)
        }
        
          
      } // End clickSend() 









      // Vista
      return (
        <View style={ globalStyles.container}>  
           
          <ScrollView style={ styles.background }> 



          {/* Email */}
          <Text style={ globalStyles.h6}>Email</Text>
          <TextInput
            style={ globalStyles.inputStyle}
            placeholder="Email"
            value={ email}
            maxLength={50}
            name="email"
            onChangeText={       (email) =>
                setDataUser({
                  ...dataUser,
                  'email': email,
                })
              }
            //onChangeText={(email) =>   changeEmail(email)}
          /> 
          {  validateEmail.state ? null : <Text style={ globalStyles.msgError}> {validateEmail.msg} </Text>}





          {/* Cellphone */}
          <Text style={ globalStyles.h6}>Celular</Text>
          <TextInput
            style={ globalStyles.inputStyle}
            placeholder="Ejemplo: 358464646"
            maxLength={15} 
            value={ cellphone}
            name="cellphone"
            onChangeText={       (cellphone) =>
                setDataUser({
                  ...dataUser,
                  'cellphone': cellphone,
                })
              }
            //onChangeText={(cellphone) =>   changeCellphone(cellphone)}
          /> 
          {  validateCellphone.state ? null : <Text style={ globalStyles.msgError}> {validateCellphone.msg} </Text>}









          {/* Username */}
          <Text style={ globalStyles.h6}>Nombre de usuario</Text>
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
            //onChangeText={(username) =>   changeUsername(username)}
          />      
          {  validateUsername.state ? null : <Text style={ globalStyles.msgError}> {validateUsername.msg} </Text>} 
          







          {/* Password */}
          <Text style={ globalStyles.h6}>Contraseña</Text>
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
            //onChangeText={(password) =>   changePassword(password)}
          />
          {  validatePassword.state ? null : <Text style={ globalStyles.msgError}> {validatePassword.msg} </Text>}







          {/* Password repeat */}
          <Text style={ globalStyles.h6}>Confirmar contraseña</Text>
          <TextInput
            style={ globalStyles.inputStyle}
            placeholder="Confirmar contraseña"
            value={ passwordRepeat}
            maxLength={15}
            secureTextEntry={true}
            name="passwordRepeat"
            onChangeText={       (passwordRepeat) =>
                setDataUser({
                  ...dataUser,
                  'passwordRepeat': passwordRepeat,
                }) 
              }
            //onChangeText={(passwordRepeat) =>   changePasswordRepeat(passwordRepeat)}
          />   
          {  validatePasswordRepeat.state ? null : <Text style={ globalStyles.msgError}>{validatePasswordRepeat.msg}</Text>}
          {  validateAll.state ? null : <Text style={ globalStyles.msgError}>{validateAll.msg}</Text>}












              
        </ScrollView>
          {/*/ Button register */} 
          <View style={ styles.button }>

            <Button 
              disabled={disabled}
              color="#043464" 
              onPress={() => { clickSend() }}  
              title="Registrarse"    
              ></Button>
          </View>
      </View>
    ); 
    
  }

const styles = StyleSheet.create({  
  background: {
      backgroundColor: '#f5f5f5',
      padding: 10,
      marginTop: -15,
      marginBottom: 5,
  },
  button: {  
    marginTop: 0
  }, 
});