 
import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, TextInput, ScrollView, TouchableHighlight } from 'react-native';  
import { globalStyles } from '../styles/global';

export default function Register ({ route, navigation }) { 

    // Desde Scanner.js vienen las siguientes variables: 
    const { parentesco, sexoScan, fnacScan, nombreScan, apellidoScan, dniScan, cuilScan } = route.params;
 
    // Estado datos del formulario
    const [dataUser, setDataUser] = useState({  
        email: 'blabla@gmail.com',
        cellphone: '123456',
        username: '',
        password: '123456', 
        passwordRepeat: '123456', 
      }); 
      
      // Estado de los ids 
      const [idpersona, setIdpersona] = useState('');
      const [idusuario, setIdusuario] = useState('');
      
      // Mejor manejo de las variables
      const { 
        username,
        password, 
        email,
        cellphone, 
        passwordRepeat, 
      } = dataUser; 

    // Estados validaciones
    const [validateEmail, setValidateEmail] = useState({  state: false, msg: "" }); 
    const [validateCellphone, setValidateCellphone] = useState({  state: false, msg: "" });
    const [validateUsername, setValidateUsername] = useState({  state: false, msg: "" });
    const [validatePassword, setValidatePassword] = useState({  state: false, msg: "" }); 
    const [validatePasswordRepeat, setValidatePasswordRepeat] = useState({  state: false, msg: "" });  
    const [validateAll, setValidateAll] =  useState({  state: false, msg: "" });   
    
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

    //console.log('usernamesRegistered: ', usernamesRegistered)
 










    let clickSend = () => {
      



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






        let dataRegisterUser = {
          'nom_usu': username,
          'con_usu': password,
          'id_tusu': 6,
        }
        let dataUpdatePersona = {
          'nombre': nombreScan, 
          'apellido': apellidoScan, 
          'cuil': cuilScan, 
          'celular': cellphone, 
          'idPersona': idpersona,  
        }
        
        if ( validateEmail.state && validateCellphone.state && validateUsername.state && validatePassword.state && validatePasswordRepeat.state){
           
          setValidateAll({ state:true, msg:false})


          // Post a usuario - (para crear el nuevo usuario)
          fetch(`http://192.168.0.7:3000/usuario`, {
              method: 'POST', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataRegisterUser),
            })
            .then(response => JSON.stringify(dataRegisterUser))
            .then(response => {
              console.log('Success:', response);      
            })
            
            .catch((error) => {
              console.error('Error:', error);
              setValidateAll({ state:false, msg:" "})
            }); 
            
          }





          // Get usuario - (para obtener el id_usu)
          fetch(`http://192.168.0.7:3000/usuario/${username}`).then(response => { 
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
              alert("Oops, hubo un problema!");
              //throw new TypeError("Oops, we haven't got JSON!");
            }
            return response.json();
          })
          .then(data => {
            console.log('data.id_usu: ',data.id_usu)  ;
            setIdusuario(data.id_usu);
            
            
            // Put afiliado
            
            fetch(`http://192.168.0.7:3000/afiliado`, {
              method: 'PUT', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                'idusu': data.id_usu, 
                'idPersona': idpersona, 
              }),
            })
            .then(response => JSON.stringify({ 
              'idusu': data.id_usu, 
            }))
            .then(data => {
              console.log('Success-afiliado:', data);       
              navigation.navigate('Ingresar',{usernameRegister:username, passwordRegister:password})        
              
            })            
            .catch((error) => {
              console.error('Error:', error),
              setValidateAll({ state:false, msg:" "})
            });       

            // end put afiliado




          })
          .catch(error => 
            console.log(error)  ,
            setValidateAll({ state:false, msg:" "})
          );
      


      


          // Get persona - (para obtener el idPersona)
          fetch(`http://192.168.0.7:3000/persona/${dniScan}`).then(response => { 
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
              alert("Oops, hubo un problema!");
              //throw new TypeError("Oops, we haven't got JSON!");
            }
            return response.json();
          })
          .then(data => {
            console.log('data.idPersona: ',data.idPersona)  ;
            setIdpersona(data.idPersona)
          })
          .catch(error => 
            console.log(error)  ,
            setValidateAll({ state:false, msg:" "})
          );


          console.log('idpersona', idpersona )
          console.log('idusuario: ', idusuario )


          if (idpersona) {
            
            // Put a persona y afiliado
            fetch(`http://192.168.0.7:3000/persona`, {
              method: 'PUT', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataUpdatePersona),
            })
            .then(response => JSON.stringify(dataUpdatePersona))
            .then(data => {
              console.log('Success-persona:', data);             
              
            })
            
            .catch((error) => {
              console.error('Error:', error),
              setValidateAll({ state:false, msg:" "})
            });             
            
          }

          
          // Put a persona
          if (idpersona) {            
            fetch(`http://192.168.0.7:3000/persona`, {
              method: 'PUT', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataUpdatePersona),
            })
            .then(response => JSON.stringify(dataUpdatePersona))
            .then(data => {
              console.log('Success-persona:', data);                    
            })            
            .catch((error) => {
              console.error('Error:', error),
              setValidateAll({ state:false, msg:" "})
            });                         
          }



          
          console.log('validateAll.state: ', validateAll.state)
          // Redireccionar al Login con los datos de logueo
          if (validateAll.state) {
          }
          
          
      } // End clickSend() 









      // Vista
      return (
        <View style={ globalStyles.container}>  
          <Text style={ globalStyles.h1 } > Registrarte </Text>
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
      marginTop: -20,
      marginBottom: 5,
  },
  button: {  
    marginTop: 10
  }, 
});