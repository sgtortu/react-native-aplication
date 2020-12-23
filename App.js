import React, {useState} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native'; 

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/Home';
import Scanner from './components/Scanner';
import Register from './components/Register';
 
 
const Stack = createStackNavigator();

export default function App() { 
 
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio">
          <Stack.Screen name="Inicio" component={HomeScreen} />
          <Stack.Screen name="Scanner" component={Scanner} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    )
   
}
