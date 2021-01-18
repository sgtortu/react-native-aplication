import React, {useState} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native'; 

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PreRegister from './components/PreRegister';
import Scanner from './components/Scanner';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
 
 
const Stack = createStackNavigator();

export default function App() { 
 
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio">
          <Stack.Screen name="Escanear" component={PreRegister} />
          <Stack.Screen name="Scanner" component={Scanner} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Ingresar" component={Login} />
          <Stack.Screen name="Inicio" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    )
   
}
