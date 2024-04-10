import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TextInput, ActivityIndicator, Platform, TouchableHighlight, ActionSheetIOS } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';

interface InvitadoProps {
    navigation: NavigationProp<any>;
}

function Invitado ({ route }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [genero, setGenero] = useState('');
    const [open, setOpen] = useState(false);
    const [fn, setFn] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [rol, setRol] = useState('');
    const [cancel, setCancel] = useState(false);
    const [foto, setFoto] = useState('');
    const sistema = Platform.OS;
    const [date, setDate] = useState(new Date());
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
        const { user } = route.params;
        console.log(user);
    useEffect(() => {
                    setNombre(user.nombre);
                    setApellidos(user.apellidos);
                    setCorreo(user.correo);
                    setGenero(user.genero);
                    setFn(formatearFecha(user.fn));
                    setDate(new Date(user.fn));
                    if (user.rol == "3") {
                        setRol("Usuario");
                    } else if (user.rol == "1") {
                        setRol("Administrador");
                    }
                
                    setFoto(foto);

    }, [cancel]);
    function formatDate(date: any) {
        // Obtener el mes, día y año de la fecha
        const day = date.getDate();
        const month = date.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }
    function formatearFecha(cadenaFecha: string): string {
        const [ano, mes, dia] = cadenaFecha.split('T')[0].split('-');
        return `${mes}/${dia}/${ano}`;
    }
    const cancelar = () => {
        setIsLoading(false);
        setIsEditing(false);
        if (cancel) {
            setCancel(false);
        } else {
            setCancel(true);
        }
    };
    const handleEdit = async () => {
        if (isEditing) {
            setIsLoading(true);
            const updateData = {
                correo: correo,
                nombre: nombre,
                fn: fn,
                genero: genero,
                apellidos: apellidos
            };
            console.log(updateData);
            const response = axios.put(`https://zennit-api.onrender.com/api/users/${correo}`, updateData)
                .then(response => {
                    setMensaje(response.data.message);
                    setTimeout(() => {
                        setMensaje('');
                    }, 2000);
                })
                .catch(error => {
                    console.log("Errorss: " + error.response.data.message);
                    setMensaje(error.response.data.message);
                })
                .finally(() => {
                    setIsEditing(false);
                    setIsLoading(false);
                });
        } else {
            setIsEditing(true);
        }
    };
    const borrar = async () => {
            const response = axios.delete(`https://zennit-api.onrender.com/api/users/${correo}`)
                .then(response => {
                    setMensaje(response.data.message);
                    setTimeout(() => {
                        setMensaje('');
                    }, 2000);
                })
                .catch(error => {
                    console.log("Errores: " + error.response.data.message);
                    setMensaje(error.response.data.message);
                });
    };

    // Resto del código del componente Invitad
    return (
        <View style={styles.container}>
            <View style={{ width: '80%' }}>
                <View style={{ gap: Platform.OS == "ios" ? 30 : 0 }}>
                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        <Image style={{ borderWidth: 1, borderColor: 'black', borderRadius: 500, width: 250, height: 250 }} source={require('../../../public/imagenes/Inicio.png')} />
                    </View>
                    <View style={{ width: '100%' }}>
                        <Text style={styles.textoSub}>Nombre(s):</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.textInput}
                                value={nombre}
                                onChangeText={setNombre} />
                        ) : (
                            <Text style={styles.texto}>{nombre}</Text>
                        )}
                        <Text style={styles.textoSub}>Apellidos:</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.textInput}
                                value={apellidos}
                                onChangeText={setApellidos} />
                        ) : (
                            <Text style={styles.texto}>{apellidos}</Text>
                        )}
                        <Text style={styles.textoSub}>Correo:</Text>
                        <Text style={styles.texto}>{correo}</Text>
                        <Text style={styles.textoSub}>Género:</Text>
                        {isEditing ? (
                            Platform.OS == "ios" ? (
                                <TouchableHighlight
                                    underlayColor="#ffffff"
                                    onPress={showActionSheet}>
                                    <View style={styles.fecha}>
                                        <Text style={styles.fechaText}>{genero}</Text>
                                    </View>
                                </TouchableHighlight>
                            ) : (
                                <View style={styles.fecha}>
                                    <><Picker
                                        selectedValue={genero}
                                        style={{ width: '200%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'black' }}
                                        onValueChange={(itemValue, itemIndex) => setGenero(itemValue)}
                                    >
                                        <Picker.Item label="Masculino" value="Masculino" />
                                        <Picker.Item label="Femenino" value="Femenino" />
                                    </Picker></>
                                </View>
                            )

                        ) : (
                            <Text style={styles.texto}>{genero}</Text>
                        )}
                        <Text style={styles.textoSub}>Fecha de nacimiento:</Text>
                        {isEditing ? (
                            <>
                                <TouchableOpacity style={styles.fecha} onPress={() => setOpen(true)}>
                                    <Text style={styles.fechaText}>{formatDate(date)}</Text>
                                </TouchableOpacity>
                                <DatePicker
                                    modal
                                    open={open}
                                    mode='date'
                                    title={"Introduce tu fecha de nacimiento"}
                                    locale='es'
                                    date={date}
                                    onConfirm={(date) => {
                                        setOpen(false);
                                        setDate(date);
                                        setFn(formatDate(date)); // Aquí aplicamos el formateo antes de asignar a 'fn'
                                    } }
                                    onCancel={() => {
                                        setOpen(false);
                                    } } />
                            </>
                        ) : (
                            <Text style={styles.texto}>{fn}</Text>
                        )}
                        <Text style={styles.textoSub}>Rol:</Text>
                        <Text style={styles.texto}>{rol}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={styles.buttonText}>{isEditing ? 'Guardar' : 'Editar'}</Text>
                    )}
                </TouchableOpacity>
                {isEditing ? (
                    <TouchableOpacity style={styles.deleteButton} onPress={cancelar}>
                        <Text style={{ color: 'red', paddingBottom: 5 }}>Cancelar</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.deleteButton} onPress={borrar}>
                        <Text style={{ color: 'red', paddingBottom: 5 }}>Eliminar cuenta</Text>
                    </TouchableOpacity>
                )}

                <View>
                    <Text>{mensaje}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Negritas: {
        fontWeight: 'bold',
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
        height: 35,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        color: 'white',
        borderWidth: 1,
        textAlign: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 0,
    },
    container: {
        paddingTop: 20,
        paddingBottom: 40,
        gap: 30,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
        flexDirection: 'column'
    },
    buttonsContainer: {
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        gap: 10,
    },
    editButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        color: 'white',
        width: '60%',
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    deleteButton: {
        paddingVertical: 10,
        paddingBottom: 0,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        padding: 0,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    texto: {
        margin: 2,
        color: 'black',
        fontSize: 20,
        paddingTop: Platform.OS == "ios" ? 6 : 0,
        paddingBottom: Platform.OS == "ios" ? 5.9 : 0,
        marginLeft: 9,
    },
    textoSub: {
        color: 'gray',
        fontWeight: 'bold',
    },
    textInput: {
        marginTop: 0,
        marginBottom: 3.5,
        marginLeft: 3,
        color: 'black',
        width: '100%',
        paddingTop: Platform.OS == "ios" ? 4 : 0,
        paddingBottom: Platform.OS == "ios" ? 4 : 0,
        borderWidth: 1,
        borderColor: 'gray',
        fontSize: 20,
        paddingVertical: 1,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
});

export default Invitado;
