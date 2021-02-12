import React, {useState} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native'; 

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PreRegister from './components/register/PreRegister';
import Scanner from './components/register/Scanner';
import Register from './components/register/Register';
import Family from './components/register/Family';
import Login from './components/Login';
import Home from './components/Home';
import Credencial from './components/Credencial';
import CredencialFlia from './components/CredencialFlia';
import ChangePassword from './components/ChangePassword';
 
 
const Stack = createStackNavigator();

export default function App() { 

 
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio">

          <Stack.Screen options={{title:''}} name="Escanear" component={PreRegister} />

          <Stack.Screen options={{title:'Escaneé su DNI'}} name="Scanner" component={Scanner} />

          <Stack.Screen options={{title:'Registrarte'}} name="Register" component={Register} />

          <Stack.Screen options={{title:''}} name="Family" component={Family} />

          <Stack.Screen name="Ingresar" component={Login} />

          <Stack.Screen options={{title:'Inicio'}} name="Inicio" component={Home} />

          <Stack.Screen options={{headerShown: false}} name="Credencial" component={Credencial} />      

          <Stack.Screen options={{headerShown: false}} name="CredencialFlia" component={CredencialFlia} />     

          <Stack.Screen options={{title:''}} name="ChangePassword" component={ChangePassword} />

        </Stack.Navigator>
      </NavigationContainer>
    )
   
} 
