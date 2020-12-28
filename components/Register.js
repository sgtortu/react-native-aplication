 
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableHighlight } from 'react-native';  
export default class Register extends Component {
  
    constructor({ route, navigation }){
      super()
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

    clickSend(){
      // Validaciones
      console.log (`${this.state.email}-${this.state.cellphone}-${this.state.username}-${this.state.password}-${this.state.passwordRepeat}`)
 
      
      // POST usuario
      let dataUser = {
        "nom_usu": this.state.username, 
        "con_usu": this.state.password, 
        "id_tusu": 6
      }
      fetch(`http://192.168.0.9:3000/usuario`, {
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
      fetch(`http://192.168.0.9:3000/persona/${this.state.dniScan}`, {
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
      fetch(`http://192.168.0.9:3000/persona/${this.state.dniScan}`).then((response) => {
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
        fetch(`http://192.168.0.9:3000/lastusuario/${this.state.username}`).then((response) => {
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
          fetch(`http://192.168.0.9:3000/afiliado/${this.state.idpersona}`, {
            method: 'PUT', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataAfiliado),
          })
          .then(response => JSON.stringify(response))
          .then(d => {
            console.log('Success:', d); 
          })        
        });
        
        





      });


        
 

  
  }




    render () {

      return (
        <View style={styles.container}>  
          <ScrollView>

          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            value={this.state.email}
            name="email"
            onChangeText={(email) => this.changeEmail(email)}
            /> 
          <TextInput
            style={styles.inputStyle}
            placeholder="Celular"
            value={this.state.cellphone}
            name="cellphone"
            onChangeText={(cellphone) => this.changeCellphone(cellphone)}
            /> 
          <TextInput
            style={styles.inputStyle}
            placeholder="Nombre de usuario"
            value={this.state.username}
            name="username"
            onChangeText={(username) => this.changeUsername(username)}
            />      
          <TextInput
            style={styles.inputStyle}
            placeholder="Contraseña"
            value={this.state.password}
            maxLength={15}
            secureTextEntry={true}
            name="password"
            onChangeText={(password) => this.changePassword(password)}
            />
          <TextInput
            style={styles.inputStyle}
            placeholder="Confirmar contraseña"
            value={this.state.passwordRepeat}
            maxLength={15}
            secureTextEntry={true}
            name="passwordRepeat"
            onChangeText={(passwordRepeat) => this.changePasswordRepeat(passwordRepeat)}
            />   
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