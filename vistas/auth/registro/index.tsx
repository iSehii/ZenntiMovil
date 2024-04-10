import React, { useState } from 'react';
import axios from 'axios';
import ModalSelector from 'react-native-modal-selector';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
import { NavigationProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, Text, Platform, StyleSheet, KeyboardAvoidingView,TouchableOpacity, ScrollView, TextInput, TouchableHighlight, ActionSheetIOS, ActivityIndicator, StatusBar } from 'react-native';

interface RegistroProps {
    navigation: NavigationProp<any>;
}
const RegisterScreen: React.FC<RegistroProps> = ({ navigation }) => {
    const [correo, setCorreo] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [colorMensaje, setColorMensaje] = useState('green');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [genero, setGenero] = useState('Seleccionar');
    const day = date.getDate();
    const [isLoading, setIsLoading] = useState(false);
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    const fecha = `${day}/${month}/${year}`;
    const showActionSheet = () => {
        const options = ['Masculino', 'Femenino', 'Cancelar'];
        const cancelButtonIndex = 2; 

        ActionSheetIOS.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    setGenero('Masculino');
                } else if (buttonIndex === 1) {
                    setGenero('Femenino');
                } else if (buttonIndex === cancelButtonIndex) {
                    console.log('Operación cancelada');
                }
            }
        );
    };
    const [selectedValue, setSelectedValue] = useState(null);
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
    
    const Registro = () => {
        if (correo != "" && password != "" && nombre != "" && apellidos != "") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValidEmail = emailRegex.test(correo);
            if (isValidEmail) {
                if (password == password2) {
                    setIsLoading(true);
                    const userData = {
                        correo: correo,
                        password: password,
                        nombre: nombre,
                        fn: date,
                        genero: genero,
                        apellidos: apellidos
                    };
                    //axios.post('https://zennit-api.onrender.com/api/auth/registro', userData)
                    axios.post('https://zennit-api.onrender.com/api/auth/registro', userData)
                        .then(response => {
                            console.log("Conexion exitosa");
                            setColorMensaje('green');
                            setMensaje(response.data.message);
                            logueado(response.data.logueado, response.data.correo, response.data.nombre, response.data.apellidos, response.data.genero, response.data.fn, response.data.rol, response.data.foto);
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'InicioLogueado' }]
                           });
                        })
                        .catch(error => {
                            console.log("Error: "+error.response.data.message);
                            setMensaje(error.response.data.message);
                        })
                        .finally(() => {
                            setIsLoading(false);
                        });
                } else {
                    setMensaje('Las contraseñas no coinciden.');
                    setColorMensaje('red');
                }
            } else {
                setColorMensaje('red');
                setMensaje('Correo no vàlido');
            }
        } else {
            setColorMensaje('red');
            setMensaje('No puedes dejar campos vacíos');
        }
    };
    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <StatusBar backgroundColor="#3f0000" barStyle="light-content" />
        <View style={styles.container}>
            <View style={styles.contenedor1}>
                <View style={{ height: '10%', width: '100%' }}>
                    <Text style={{ textAlign: 'center' }}></Text>
                </View>
            </View>
            <ScrollView style={styles.contenedor2} bounces={false}
                    keyboardShouldPersistTaps='handled'
                    contentContainerStyle={styles.scrollViewContent}
                    scrollEventThrottle={106} // Ajusta según sea necesario
                    decelerationRate="fast" >
                <View style={styles.contenedor3}>
                    <Text style={styles.titulo}>Registro</Text>
                    <Text style={{color: 'black'}}>Crea una cuenta para continuar</Text>
                    <View style={styles.cajas}>
                        <Text style={{ margin: Platform.OS == "ios" ? 3: 0, fontSize: 12, color: '#696969' }}>Nombre(s)</Text>
                        <TextInput
                            style={styles.input}
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        <Text style={{ margin: Platform.OS == "ios" ? 3: 0, fontSize: 12, color: '#696969' }}>Apellidos</Text>
                        <TextInput
                            style={styles.input}
                            value={apellidos}
                            onChangeText={setApellidos}
                        />
                        <Text style={{ margin: Platform.OS == "ios" ? 3: 0, fontSize: 12, color: '#696969' }}>Correo</Text>
                        <TextInput
                            style={styles.input}
                            value={correo}
                            onChangeText={setCorreo}
                        />
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{ width: '48%' }}>
                                <Text style={{ margin: Platform.OS == "ios" ? 3: 0, fontSize: 12, color: '#696969' }}>Fecha de nacimiento</Text>
                                <TouchableOpacity style={styles.fecha} onPress={() => setOpen(true)}>
                                    <Text style={styles.fechaText}>{fecha}</Text>
                                </TouchableOpacity>
                                <DatePicker
                                    modal
                                    open={open}
                                    mode='date'
                                    title={"Introduce tu fecha de nacimiento"}
                                    locale='es'
                                    date={date}
                                    onConfirm={(date) => {
                                        setOpen(false)
                                        setDate(date)
                                    }}
                                    onCancel={() => {
                                        setOpen(false)
                                    }}
                                />
                            </View>
                            <View style={{width: '48%'}}>
                                <Text style={{ margin: Platform.OS == "ios" ? 3: 0, fontSize: 12, color: '#696969' }}>Género</Text>
                                    {Platform.OS === "ios" ? (
                                        <TouchableHighlight
                                            underlayColor="#ffffff"
                                            style={styles.fecha}
                                            onPress={showActionSheet}>
                                            <View style={styles.fecha}>
                                                <Text style={styles.fechaText}>{genero}</Text>
                                            </View>
                                        </TouchableHighlight>
                                    ) : (
                                    <View style={styles.fecha}>
                                        <><Picker
                                                selectedValue={genero}
                                                style={{width: '200%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'black'}}
                                                onValueChange={(itemValue, itemIndex) => setGenero(itemValue) }
                                            >
                                                <Picker.Item label="Masculino" value="Masculino" />
                                                <Picker.Item label="Femenino" value="Femenino" />
                                            </Picker></>
                                    </View>
                                    )}

                            </View>
                        </View>
                        <Text style={{ margin: Platform.OS == "ios" ? 3: 0, fontSize: 12, color: '#696969' }}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <Text style={{ margin: 3, fontSize: 12, color: '#696969' }}>Confirmar contraseña</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            value={password2}
                            onChangeText={setPassword2}
                        />
                    </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={Registro}  
                            disabled={isLoading}
                        >
                            <Text style={styles.buttonText}>
                                {isLoading ? <ActivityIndicator size="large" color="white" /> : 'Registrarse'}
                            </Text>
                        </TouchableOpacity>


                        
                    <Text style={{color: colorMensaje}}>{mensaje}</Text>
                        <View style={{marginBottom: Platform.OS ==  'ios' ? 25: 0, marginTop: 5 }}>
                        <TouchableOpacity onPress={() => {
                            navigation.reset({
                                index: 1,
                                routes: [
                                    { name: 'Inicio' },
                                    { name: 'Iniciar sesión' }, 
                                ],
                            });
                        }}>
                                <Text style={{ textAlign: 'center', color: 'black', marginBottom: Platform.OS == "android" ? 30 : 0, }}>¿Ya tienes una cuenta? <Text style={{ fontWeight: 'bold', color: 'green' }}>Iniciar sesión</Text></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    fechaText: {
        color: 'black',
        fontSize: 20,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    fecha: {
        width: '100%',
        height: 55,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff0f0',
        color: 'white',
        textAlign: 'center',
        borderRadius: 20,
        padding: 10,
    },
    contenedor3: {
        alignContent: 'center',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    select: {
        height: 100,
        width: '100%',
    },
    container: {
        backgroundColor: '#3f0000',
        flex: 1,
    },
    contenedor1: {
        backgroundColor: '#3f0000',
        width: '100%',
        alignContent: 'center',
        color: 'white',
        alignItems: 'center',
    },
    contenedor2: {
        marginTop: Platform.OS == "android" ? -50 : 0,
        backgroundColor: 'white',
        gap: 20,
        borderTopRightRadius: 50,
        height: '90%',
        width: '100%',
        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.8,
        paddingBottom: Platform.OS == "android" ? 0 : 0,
        shadowRadius: 10,
    },
    titulo: {
        fontSize: 45,
        fontWeight: 'bold',
        color: 'black',
        marginTop: Platform.OS == "android" ? 10: 30,
    },
    cajas: {
        margin: Platform.OS == "ios" ? 30: 10,
        width: '80%',
    },
    input: {
        width: '100%',
        height: 55,
        borderWidth: 0,
        backgroundColor: '#fff0f0',
        borderRadius: 20,
        color: 'black',
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    button: {
        backgroundColor: 'black',
        width: '70%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        marginBottom: -3,
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
