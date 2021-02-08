import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
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
      paddingBottom: 5,
      alignSelf: "center",
      borderColor: "#ccc",
      borderBottomWidth: 1
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
    },
    button: {
      width: 300,
      height: 40,
      marginTop: 10,   
    },  
    buttonText: {     
      color: '#043464', 
      marginTop: 15,
      //marginBottom: 15,
      textAlign: "center"
    }, 
    h1: {      
      fontSize: 28,
      color:'#043464',
      textAlign: 'center',
      marginTop: 15,  
      marginBottom: 45
    },
    h4: {      
      fontSize: 16,
      color:'#043464', 
      marginTop: 5,  
      marginBottom: 5
    },
    inline: { 
      alignSelf: "center",
      borderColor: "#ccc",
      borderBottomWidth: 1,
      width: '80%', 
      marginBottom: 15,
      marginTop:15
    }
  });
 