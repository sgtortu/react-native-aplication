import React, { Component, Fragment, useState } from 'react';
import { StyleSheet, Button, Text, View, Image, Dimensions } from 'react-native';

export default class Home extends React.Component() {
    
    static navigationOptions = { header: null }
    
    state = {
        orientation: ''
    };

    componentDidMount() {   
        Dimensions.addEventListener('change', ({ window: {width, height}}) => {
            if (width < height) {
                this.setState({ orientation: 'Portrait' });
            }else{
                this.setState({ orientation: 'landscape' });
            }
        }) 
   }

   render(){
       return (
           <View>
               <Text style={styles.h1} > Bienvenido </Text>
               <Text style={styles.subtitle} > Debe escanear su DNI para continuar</Text>
               <Text style={styles.subtitle} > { this.state.orientation } </Text>
   
               <Image
                   style={styles.image}
                   source={{
                   uri: 'https://emigrante.com.ve/wp-content/uploads/2018/04/DNI-Argentina.jpg',
                   }}
               />
                
               <Button
                   color="#3740FE"  
                   testID="logoutButton"
                   onPress={() => navigation.navigate('Scanner', {id:'santiago'})}
                   title="Presione aqui para continuar"
               />
               
           </View>
       );
   }
}
 
const styles = StyleSheet.create({
    h1: {      
        fontSize: 35,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
      },
    subtitle: {  
        fontSize: 20,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    image: {
        marginTop: 15,   
        marginBottom: 15,   
        width: 360,
        height: 247,
        display: 'flex',  
    },
    
  });