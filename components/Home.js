import React, { Component, Fragment } from 'react';
import { Button, Text, View } from 'react-native';

export default function Home({ navigation }) { 

    return (
        <View>
            <Text> Bienvenido </Text>
            <Button 
            testID="logoutButton"
            onPress={() => navigation.navigate('Scanner', {id:'santiago'})}
            title="Escanee su DNI para continuar"
            />
            
            <Text> (foto del dni para indicar) </Text>
        </View>
    );
}
 