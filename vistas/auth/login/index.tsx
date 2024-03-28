import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

interface LoginProps {
    navigation: NavigationProp<any>;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
    const [correo, setCorreo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        if (!(correo !== '' || password !== '')) {
            setMensaje('No puedes dejar campos vacíos');
        } else {
            setIsLoading(true);

            const userData = {
                correo: correo,
                password: password,
            };

            const logueado = async (sesion: boolean, correo: string, nombre: string, apellidos: string, genero: string, fn: string, rol: number, foto: string) => {
                try {
                    await AsyncStorage.setItem('logueado', `${sesion}`);
                    await AsyncStorage.setItem('correo', `${correo}`);
                    await AsyncStorage.setItem('nombre', `${nombre}`);
                    await AsyncStorage.setItem('apellidos', `${apellidos}`);
                    await AsyncStorage.setItem('fn', `${fn}`);
                    await AsyncStorage.setItem('genero', `${genero}`);
                    await AsyncStorage.setItem('rol', `${rol}`);
                    await AsyncStorage.setItem('foto', `${foto}`);
                } catch (error) {
                    console.error(error);
                }
            };

            axios
                .post('http://192.168.8.100:3005/api/auth/login', userData)
                .then((response) => {
                    setMensaje('Respuesta del servidor: ' + response.data.message);
                    logueado(response.data.logueado, response.data.correo, response.data.nombre, response.data.apellidos, response.data.genero, response.data.fn, response.data.rol, response.data.foto);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'InicioLogueado' }],
                    });
                })
                .catch((error) => {
                    if (error.response) {
                        setMensaje(error.response.data.message);
                    } else if (error.request) {
                        setMensaje('No se recibió respuesta del servidor.');
                    } else {
                        setMensaje(
                            'Hubo un error al enviar los datos: ' + error.response.message
                        );
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    return (
        <KeyboardAvoidingView
            behavior="padding"
            contentContainerStyle={{ flexGrow: 1 }}
            style={styles.container}
        >
            <StatusBar backgroundColor="#00003f" barStyle="light-content" />
            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.scrollViewContent}
                bounces={false}
                scrollEventThrottle={106} // Ajusta según sea necesario
                decelerationRate="fast" 
            >
                <View style={styles.contenedor1}>
                    <View style={{ height: '10%', width: '100%' }}>
                        <Text style={{ textAlign: 'center' }}></Text>
                    </View>
                </View>
                <View style={styles.contenedor2}>
                    <Text style={styles.titulo}>
                        Iniciar sesión{'\n'}
                        <Text style={{ fontSize: 14, textAlign: 'center', width: '100%' }}>
                            Inicia sesión para continuar
                        </Text>
                    </Text>
                    <View style={styles.cajas}>
                        <Text style={{ margin: 3, color: 'black' }}>Correo</Text>
                        <TextInput
                            style={styles.input}
                            value={correo}
                            onChangeText={setCorreo}
                        />
                        <Text style={{ margin: 3, color: 'black' }}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        <Text style={styles.buttonText}>
                            {isLoading ? <ActivityIndicator size="large" color="white" /> : 'Iniciar sesión'}
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ margin: 5 }}>{mensaje}</Text>
                    <View style={{ paddingBottom: 25, marginTop: 5, backgroundColor: 'white', width: '100%', marginBottom: 40 }}>
                        <TouchableOpacity onPress={() => {
                            navigation.reset({
                                index: 1,
                                routes: [
                                    { name: 'Inicio' },
                                    { name: 'Registro' }, 
                                ],
                            });
                        }}>
                            <Text style={{ textAlign: 'center', color: 'black' }}>
                                ¿Aún no tienes una cuenta?{' '}
                                <Text style={{ fontWeight: 'bold', color: 'green'}}>
                                    Regístrate
                                </Text>
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', color: 'black', textDecorationStyle: 'dashed' }}>
                            Olvidé mi contraseña
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00003f',
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    contenedor1: {
        backgroundColor: '#00003f',
        width: '100%',
        alignContent: 'center',
        color: 'white',
        alignItems: 'center',
    },
    contenedor2: {
        backgroundColor: 'white',
        gap: 20,
        borderTopRightRadius: 50,
        height: '90%',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    titulo: {
        fontSize: 45,
        textAlign: 'center',
        fontWeight: 'bold',
        width: '100%',
        color: 'black',
        marginTop: 60,
    },
    cajas: {
        margin: 30,
        width: '80%',
    },
    input: {
        color: 'black',
        width: '100%',
        height: 55,
        borderWidth: 0,
        backgroundColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'black',
        width: '70%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Login;
