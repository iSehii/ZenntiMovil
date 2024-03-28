// Inicio.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, Image, ScrollView, Platform, useWindowDimensions } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface InicioProps {
    navigation: NavigationProp<any>; // Puedes ajustar el tipo según tus necesidades
}

const Inicio: React.FC<InicioProps> = ({ navigation }) => {
    const [logueado, setLogueado] = useState(false);

    useEffect(() => {
      const checkLogueado = async () => {
        try {
          var sesion = await AsyncStorage.getItem('logueado');
          console.log(sesion);
          setLogueado(sesion === 'true'); // Assuming 'logueado' is stored as a string
        } catch (error) {
          console.error(error);
        }
      };
  
      checkLogueado();
    }, []);
    const invited = async () => {
        await AsyncStorage.setItem('invitado', '1');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Invitado' }]
        });
    };
    return (
        <View style={{marginTop: Platform.OS == "ios" ? '10%' : 0, paddingBottom: Platform.OS == "android" ? 40: '10%', flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
            
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Text style={{textAlign: 'center', fontSize: 60, color: 'black', fontWeight: 'bold', marginTop: Platform.OS == "ios" ? '10%': 50}}>¡Hola!</Text>
            <View style={{alignContent: 'center', justifyContent: 'center', alignItems: 'center', width: '100%', padding: 0, marginTop: -20, marginBottom: -20}}>
                    <Image style={{width: '70%', height: '70%'}} source={(require('../../public/imagenes/Inicio.png'))}/>
            </View>
            <View>
                <View>
                    <Text style={{ width: '100%', textAlign: 'center', justifyContent: 'center', marginTop: 0, fontSize: 18, color: 'black' }}>
                        Para continuar, por favor prueba a:
                    </Text>
                </View>
                <View >
                    <TouchableOpacity style={styles.Botones} onPress={() => navigation.navigate('Iniciar sesión')}>
                        <Text style={styles.textoBoton}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{textAlign: 'center', color: 'gray', justifyContent: 'center', marginTop: -15, fontSize: 22}}>__________________________</Text>
                </View>
                <View >
                    <TouchableOpacity style={styles.Botones} onPress={() => navigation.navigate('Registro')}>
                        <Text style={styles.textoBoton}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', marginTop: 8}} onPress={invited}>
                        <Text style={{color: 'black', textAlign: 'center', borderWidth: 1, width: '75%', borderRadius: 4, paddingHorizontal: 15, paddingVertical: 3}}>Continuar como invitado</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Botones: {
        borderWidth: 1,
        marginTop: 4,
        backgroundColor: 'black',
        borderRadius: 12,
        paddingVertical: 10,
        width: '100%',
        borderColor: 'transparent',
    },
    textoBoton: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
    },
    Invitado: {
        width: '100%',
        padding: 3,
        margin: 0,
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 12,
        color: 'black',
    }
});

export default Inicio;
