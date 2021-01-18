 
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableHighlight } from 'react-native';  
import config from "../config";

export default class Register extends Component {
  
    constructor({ route, navigation }){
      super()

      // Desde Scanner.js vienen las siguientes variables: 
      const { sexoScan, fnacScan, nombreScan, apellidoScan, dniScan, cuilScan } = route.params;

      this.state = {

        email: '',
        cellphone: '',
        username: '',
        password: '', 
        passwordRepeat: '',

        sexoScan: sexoScan,
        fnacScan: fnacScan,
        nombreScan: nombreScan,
        apellidoScan: apellidoScan,
        dniScan: dniScan,
        cuilScan: cuilScan, 

        idusuario: '',
        idpersona: '',

        validateEmail: true,
        validateCellphone: true,
        validateUsername: true,
        validatePassword: true,
        validatePasswordRepeat: true,
        validateAll: true,

      }
    }

    changeEmail(email){
      this.setState({email})
    }
    changeCellphone(cellphone){
      this.setState({cellphone})
    }
    changeUsername(username){
      this.setState({username})
    }
    changePassword(password){
      this.setState({password})
    }
    changePasswordRepeat(passwordRepeat){
      this.setState({passwordRepeat})
    }
    changeIdusuario(idusuario){
      this.setState({idusuario})
    }
    changeIdpersona(idpersona){
      this.setState({idpersona})
    }

    validate(email,cellphone,username,password,passwordRepeat){
      // EMAIL
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ; 
      if(reg.test(email) === false) { 
        // Ivalido
        this.setState({validateEmail: false})
      } else { 
        // Valido  
        this.setState({validateEmail: true})
      } 

      // CELLPHONE
      let regCellphone = /^-{0,1}\d*\.{0,1}\d+$/ ;
      if(regCellphone.test(cellphone) === false) { 
        // Ivalido
        this.setState({validateCellphone: false})
      } else { 
        // Valido  
        if (cellphone.length > 7) {
          this.setState({validateCellphone: true})
        }else{
          // Invalido
          this.setState({validateCellphone: false})
        }

      } 

      // USERNAME
      let regUsername = /^[\w\.@]{6,100}$/;
      if(regUsername.test(username) === false) { 
        // Ivalido
        this.setState({validateUsername: false})
      } else { 
        // Valido   
        this.setState({validateUsername: true})
      } 

      // PASSWORD
      let regPassword = /\s/;   // espacios en blanco
      console.log('reg-->', regPassword.test(password))
      console.log('length-->', password.length)
      // si regPassword es TRUE quiere decir la clave esta mal
      if (regPassword.test(password)) {
        this.setState({validatePassword: false})
      }
      if (password.length < 5) {
        this.setState({validatePassword: false})
      }
      if (password !== passwordRepeat) {
        // Invalida: passwordRepeat
        this.setState({validatePasswordRepeat: false})
      }else{
        // Valida: passwordRepeat
        this.setState({validatePasswordRepeat: true})
      }

      // TODO
      if (this.state.email,this.state.cellphone,this.state.username,this.state.password,this.state.passwordRepeat){
        this.setState({validateAll: true})
      }else{
        this.setState({validateAll: false})
      }

    }

    clickSend(){
      // Validaciones
      this.validate(this.state.email,this.state.cellphone,this.state.username,this.state.password,this.state.passwordRepeat)
      console.log (`${this.state.email}-${this.state.cellphone}-${this.state.username}-${this.state.password}-${this.state.passwordRepeat}`)
 
      
      if (this.state.validateAll) {

        // POST usuario
        let dataUser = {
          "nom_usu": this.state.username, 
          "con_usu": this.state.password, 
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
          "nombre":  this.state.nombreScan,
          "apellido":  this.state.apellidoScan,
          "cuil":  this.state.cuilScan,
          "celular":  this.state.cellphone 
        } 
        fetch(`${config.API_URL}persona/${this.state.dniScan}`, {
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
        fetch(`${config.API_URL}persona/${this.state.dniScan}`).then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Algo anduvo mal.');
          }
        })
        .then((responseJson) => { 
          console.log('id_per---> ',responseJson.idPersona)                 
          this.changeIdpersona(responseJson.idPersona)      
          
          
          // GET usuario (creado recien)
          fetch(`${config.API_URL}lastusuario/${this.state.username}`).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Algo anduvo mal.');
            }
          })
          .then((resp) => { 
            console.log('id_usu---> ',resp.id_usu)  
            let dataAfiliado = {
              "idusu":  resp.id_usu
            } 
            // PUT afiliado
            console.log('idusuario-> ',this.state.idusuario)
            console.log('idpersona-> ',this.state.idpersona)
            fetch(`${config.API_URL}afiliado/${this.state.idpersona}`, {
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
            })        
          });
        });
        
      }else{
        alert('Hay campos incorrectos.')
      }







        
 

  
  }




    render () {

      return (
        <View style={styles.container}>  
          <ScrollView>

          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            value={this.state.email}
            maxLength={50}
            name="email"
            onChangeText={(email) => this.changeEmail(email)}
          /> 
          { this.state.validateEmail ? null : <Text style={styles.msgError}>Email inválido</Text>}
          
          <TextInput
            style={styles.inputStyle}
            placeholder="Celular (Ej: 358464646)"
            maxLength={15} 
            value={this.state.cellphone}
            name="cellphone"
            onChangeText={(cellphone) => this.changeCellphone(cellphone)}
          /> 
          { this.state.validateCellphone ? null : <Text style={styles.msgError}>Celular inválido</Text>}

          <TextInput
            style={styles.inputStyle}
            placeholder="Nombre de usuario"
            maxLength={20}
            value={this.state.username}
            name="username"
            onChangeText={(username) => this.changeUsername(username)}
          />      
          { this.state.validateUsername ? null : <Text style={styles.msgError}>Usuario inválido</Text>}
          
          <TextInput
            style={styles.inputStyle}
            placeholder="Contraseña"
            value={this.state.password}
            maxLength={15}
            secureTextEntry={true}
            name="password"
            onChangeText={(password) => this.changePassword(password)}
          />
          { this.state.validatePassword ? null : <Text style={styles.msgError}>Contraseña inválida</Text>}

          <TextInput
            style={styles.inputStyle}
            placeholder="Confirmar contraseña"
            value={this.state.passwordRepeat}
            maxLength={15}
            secureTextEntry={true}
            name="passwordRepeat"
            onChangeText={(passwordRepeat) => this.changePasswordRepeat(passwordRepeat)}
          />   
          { this.state.validatePasswordRepeat ? null : <Text style={styles.msgError}>Las contraseñas no coinciden</Text>}

          <TouchableHighlight 
            color="#3740FE"
            onPress={() => { this.clickSend() }} >
            <Text>Registrarse</Text>        
            
          </TouchableHighlight>
              
        </ScrollView>
      </View>
    );
    }
    
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