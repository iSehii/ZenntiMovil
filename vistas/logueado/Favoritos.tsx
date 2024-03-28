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
        <View style={{ marginTop: Platform.OS == "ios" ? '10%' : 0, paddingBottom: Platform.OS == "android" ? 40 : '10%', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>

            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Text style={{ textAlign: 'center', fontSize: 30, color: 'black', fontWeight: 'bold' }}>No tienes favoritos actualmente.</Text>
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
