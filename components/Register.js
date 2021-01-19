 
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableHighlight } from 'react-native';  
import config from "../config";

export default function Register ({ route, navigation }) { 
        // Desde Scanner.js vienen las siguientes variables: 
        const { sexoScan, fnacScan, nombreScan, apellidoScan, dniScan, cuilScan } = route.params;
  
        const [dataUser, setDataUser] = useState({  
            email: '',
            cellphone: '',
            username: '',
            password: '', 
            passwordRepeat: '',
        }); 
        const [ids, setIds] = useState({   
            idusuario: '',
            idpersona: '',
        });
        const [validateEmail, setValidateEmail] = useState({  state: false, msg: "" }); 
        const [validateCellphone, setValidateCellphone] = useState({  state: false, msg: "" });
        const [validateUsername, setValidateUsername] = useState({  state: false, msg: "" });
        const [validatePassword, setValidatePassword] = useState({  state: false, msg: "" }); 
        const [validatePasswordRepeat, setValidatePasswordRepeat] = useState({  state: false, msg: "" });  
        const [validateAll, setValidateAll] =  useState({  state: false, msg: "" });  
        
 

    let clickSend = () => {
        // Requiere completar todos los campos
        if (  
          email.trim() === "" ||
          cellphone.trim() === "" ||
          username.trim() === "" || 
          password.trim() === "" ||
          passwordRepeat.trim() === ""
        ) {
          setValidateAll({ state:false, msg:"Debe completar todos los campos"});
          return null;
        }
      
       // EMAIL
       let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ; 
       if(reg.test( email) === false) { 
         // Ivalido 
         setValidateEmail({ msg: "Email invalido", state: false })
         return null;

 
       } else { 
         // Valido  
         setValidateEmail({ msg: false, state: true })
       } 
 
       // CELLPHONE
       let regCellphone = /^-{0,1}\d*\.{0,1}\d+$/ ;
       if(regCellphone.test(cellphone) === false) { 
         // Ivalido
         setValidateCellphone({ msg: "Celular invalido", state: false }) 
         return null;

       } else { 
         // Valido  
         if (cellphone.length > 7) { 
           setValidateCellphone({ msg: false, state: true }) 
         }else{
           // Invalido
           setValidateCellphone({ msg: "Celular invalido", state: false }) 
          return null;

         }
 
       } 
 
       // USERNAME
       let regUsername = /^[\w\.@]{6,100}$/;
       if(regUsername.test(username) === false) { 
         // Ivalido
           setValidateUsername({
             msg: "Usuario invalido.",
             state: false
           })
          return null;

       } else { 
         // Valido     
           // Username existente         
           fetch(`${config.API_URL}lastusuario/${username}`).then((response) => {
             if (response.ok) {
               return response.json();
             } else { 
               alert('Algo anduvo mal.');   
               return null;
             }
           })
           .then((responseJson) => { 
             
             console.log('existe : ', responseJson.nom_usu) 
             setValidateUsername({ msg: "Nombre de usuario en uso", state: false })  
             return null;
             
           })
           .catch((error) => {
             console.log('okey! no existe: ', error)   
             setValidateUsername({ msg: false , state: true })   
           }); 
   
           
         } 
       // PASSWORD
       let regPassword = /\s/;   // espacios en blanco 
       // si regPassword es TRUE quiere decir la clave esta mal
       if (regPassword.test(password)) { 
         setValidatePassword({ msg: "Contrasena invalida", state: false })
         return null;
       }
       else if (password.length < 5) { 
         setValidatePassword({ msg: "Contrasena demasiado corta", state: false })
          return null;
       }
       else if (password !== passwordRepeat) {
         // Invalida: passwordRepeat
         setValidatePasswordRepeat({ msg: "Las contrasenas no coinciden", state: false }) 
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
       if ( validateEmail.state && validateCellphone.state && validateUsername.state && validatePassword.state && validatePasswordRepeat.state){
//          setValidateAll({ msg: false, state: true }) 

          // POST usuario
          let dataUser = {
            "nom_usu":  username, 
            "con_usu":  password, 
            "id_tusu": 6
          }
          fetch(`${config.API_URL}usuario`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataUser),
          })
          .then(response => JSON.stringify(response))
          .then(data => {
            console.log('Success:', data);      
              })
              
          .catch((error) => {
            console.error('Error:', error);
          }); 

          // Put persona
          let dataPersona = {
            "nombre":   nombreScan,
            "apellido":   apellidoScan,
            "cuil":   cuilScan,
            "celular":   cellphone 
          } 
          fetch(`${config.API_URL}persona/${ dniScan}`, {
            method: 'PUT', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataPersona),
          })
          .then(response => JSON.stringify(response))
          .then(d => {
            console.log('Success:', d); 
          })     

          // Get persona
          fetch(`${config.API_URL}persona/${ dniScan}`).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              alert('Algo anduvo mal.');
              return null;
            }
          })
          .then((responseJson) => { 
            console.log('id_per---> ',responseJson.idPersona)                 
              //changeIdpersona(responseJson.idPersona)      
              setIds({
                  ...ids,
                  'idpersona': responseJson.idPersona,
                })  
            
            // GET usuario (creado recien)
            fetch(`${config.API_URL}lastusuario/${ username}`).then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                alert('Algo anduvo mal.');
              return null;
              
              }
            })
            .then((resp) => { 
              console.log('id_usu---> ',resp.id_usu)  
              let dataAfiliado = {
                "idusu":  resp.id_usu
              } 
              // PUT afiliado
              console.log('idusuario-> ', idusuario)
              console.log('idpersona-> ', idpersona)
              fetch(`${config.API_URL}afiliado/${ idpersona}`, {
                method: 'PUT', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataAfiliado),
              })
              .then(response => JSON.stringify(response))
              .then(d => {
                console.log('Success:', d); 
                alert('Registrado correctamente.')
                // redirec to ...
                navigation.navigate('Ingresar')
                return null;
              })        
            });
          });





          
       }else{
 
          return null;
       }

 

      
  
  }



  const { 
    username,
    password, 
    email,
    cellphone, 
    passwordRepeat,
  } = dataUser;
  const { 
    idpersona, 
    idusuario, 
  } = ids;

      return (
        <View style={styles.container}>  
          <ScrollView>

          <TextInput
            style={styles.inputStyle}
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
          {  validateEmail.state ? null : <Text style={styles.msgError}> {validateEmail.msg} </Text>}
          
          <TextInput
            style={styles.inputStyle}
            placeholder="Celular (Ej: 358464646)"
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
          {  validateCellphone.state ? null : <Text style={styles.msgError}> {validateCellphone.msg} </Text>}

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
            //onChangeText={(username) =>   changeUsername(username)}
          />      
          {  validateUsername.state ? null : <Text style={styles.msgError}> {validateUsername.msg} </Text>} 
          
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
            //onChangeText={(password) =>   changePassword(password)}
          />
          {  validatePassword.state ? null : <Text style={styles.msgError}> {validatePassword.msg} </Text>}

          <TextInput
            style={styles.inputStyle}
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
          {  validatePasswordRepeat.state ? null : <Text style={styles.msgError}>{validatePasswordRepeat.msg}</Text>}
          {  validateAll.state ? null : <Text style={styles.msgError}>{validateAll.msg}</Text>}

          <TouchableHighlight 
            color="#3740FE"
            onPress={() => { clickSend() }} >
            <Text>Registrarse</Text>        
            
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