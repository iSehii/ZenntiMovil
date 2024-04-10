import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Svg, { Rect } from 'react-native-svg';
import Icono from 'react-native-vector-icons/MaterialCommunityIcons';
import IconoMaterial from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';


interface InicioProps {
    navigation: NavigationProp<any>;
}
const InicioLogueado: React.FC<InicioProps> = ({ navigation }) => {
    const [percentage, setPercentage] = useState(0);
    const [nombre, setNombre] = useState(null);
    const [ubicacion, setUbicacion] = useState(null);
    const [token, setToken] = useState('');
    const [tokenInput, setTokenInput] = useState('');
    const [usuario, setUsuario] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [disponible, setDisponible] = useState(null);
    const [correo, setCorreo] = useState('');
    const [rol, setRol] = useState('');
    const batteryWidth = 40;
    const batteryHeight = 20;
    const borderWidth = 2;

    const batteryLevel = (batteryWidth - 2 * borderWidth) * (percentage / 100);
    let color = "#70b578";

    const Usar = () => {
        const updateData = {
            usuario: correo,
            disponible: false,
            token: tokenInput,
        };
        const response = axios.put(`https://zennit-api.onrender.com/api/bancos/dejar/Proyecto`, updateData)
            .then(response => {
                setMensaje(response.data.message);
            })
            .catch(error => {
                console.log("Errors: " + error.response.data.message);
            });
    }
    const DejarUsar = () => {
        const updateData = {
            usuario: null,
            disponible: true,
            token: token,
        };
        const response = axios.put(`https://zennit-api.onrender.com/api/bancos/dejar/Proyecto`, updateData)
            .then(response => {
                setTokenInput('');
            })
            .catch(error => {
                console.log("Errors: " + error.response.data.message);
            });
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://zennit-api.onrender.com/api/bancos/Proyecto');
                // Verifica si la respuesta es exitosa
                if (response.status === 200) {
                    // Asigna el valor de la batería a un estado
                    setPercentage(response.data.bateria);
                    setNombre(response.data.nombre);
                    setUbicacion(response.data.ubicacion);
                    setDisponible(response.data.disponible);
                    setToken(response.data.token);
                    setUsuario(response.data.usuario);
                    if (percentage <= 10) {
                        color = 'red'; // Menor o igual al 10%, color rojo
                    } else if (percentage <= 25) {
                        color = 'orange'; // Menor o igual al 25%, color naranja
                    } else {
                        color = '#70b578'; // Resto, color verde
                    }
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        AsyncStorage.getItem('correo')
            .then((correo) => {
                console.log('Correo recuperado de AsyncStorage:', correo);
                if (correo != null) {
                    setCorreo(correo);
                }
            })
            .catch((error: any) => {
                console.error('Error al obtener el nombre de AsyncStorage:', error);
            });
        AsyncStorage.getItem('rol')
            .then((rol) => {
                console.log('Correo recuperado de AsyncStorage:', rol);
                if (rol != null) {
                    setRol(rol);
                }
            })
            .catch((error: any) => {
                console.error('Error al obtener el nombre de AsyncStorage:', error);
            });

        fetchData();
        const interval = setInterval(fetchData, 500); // Consulta cada 5 segundos
        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, []);

    return (
        <KeyboardAvoidingView
            behavior="padding"
            contentContainerStyle={{ flexGrow: 1 }}
            style={styles.contenedor}
        >
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={{
                width: '100%', borderTopRightRadius: 15,
                borderTopLeftRadius: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderBottomWidth: 0, borderColor: 'black'
            }}>
                <Image style={{
                    borderWidth: 0,
                    width: '50%', height: '40%',
                    borderColor: 'black',
                }} source={require('../../public/imagenes/Panel.png')} />
                <Text style={styles.Titulo}>{nombre}</Text>
            </View>

            <View style={styles.banco}>
                <View style={{ gap: 10 }}>
                    <View style={{ gap: 0 }}>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: -50 }}>
                            <Text style={{ color: 'black' }}>Batería:</Text>
                            <Svg width={batteryWidth} height={batteryHeight} viewBox={`0 0 ${batteryWidth} ${batteryHeight}`}>
                                <Rect
                                    x={0}
                                    y={0}
                                    width={batteryWidth}
                                    height={batteryHeight}
                                    stroke="black"
                                    strokeWidth={borderWidth}
                                    fill="none" />
                                <Text style={{ textAlign: 'center', justifyContent: 'center', flexDirection: 'row', alignContent: 'center', alignItems: 'center', color: 'black', marginTop: 1.5, fontWeight: 'bold' }}>{`${percentage}`}</Text>
                                <Rect
                                    x={borderWidth}
                                    y={borderWidth}
                                    width={batteryLevel}
                                    height={batteryHeight - 2 * borderWidth}
                                    fill={color} />
                            </Svg>
                        </View>
                    </View>
                </View>
                <View style={{ paddingBottom: 0 }}>
                    <Text style={{ color: 'black' }} >Ubicación:</Text>
                    <Text style={{ color: 'black', fontSize: 18, marginBottom: 10 }}>{ubicacion}</Text>
                    {disponible == true ? (
                        <>
                            <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 25, margin: 5 }}>Disponible</Text>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={styles.inputs}
                                    secureTextEntry={false}
                                    value={tokenInput}
                                    onChangeText={setTokenInput}
                                />
                                <TouchableOpacity style={styles.input} onPress={Usar}>
                                    <Text style={{ color: 'black', textAlign: 'center', paddingHorizontal: 10, paddingVertical: 5, fontSize: 19 }}>Usar banco</Text>
                                </TouchableOpacity>
                                <Text style={{ textAlign: 'center', color: 'darkred' }}>{mensaje}</Text>
                            </View>
                        </>
                    ) : (
                        <>
                            <Text style={{ color: 'darkred', fontWeight: 'bold', fontSize: 20 }}>En uso</Text>
                            {correo === usuario ? (
                                <View style={{ justifyContent: 'center', width: '100%' }}>
                                    <Text style={{ color: 'black', fontSize: 18 }}>Token actual: <Text style={{ color: 'green', fontWeight: 'bold' }}>{token}</Text></Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <TouchableOpacity style={styles.input} onPress={DejarUsar}>
                                            <Text style={{ color: 'black', textAlign: 'center', fontSize: 18, paddingHorizontal: 0, paddingVertical: 5 }}>Dejar de usar banco</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <View></View>
                            )}
                            {rol == "1" && correo != usuario ? (
                                <View style={{ justifyContent: 'center', width: '100%' }}>
                                    <Text style={{ color: 'black', fontSize: 18 }}>Token actual: <Text style={{ color: 'green', fontWeight: 'bold' }}>{token}</Text></Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <Text style={{ color: 'black', textAlign: 'center', fontSize: 18, paddingHorizontal: 0, paddingVertical: 5 }}>En uso por: {usuario}</Text>
                                        <TouchableOpacity style={styles.input} onPress={DejarUsar}>
                                            <Text style={{ color: 'black', textAlign: 'center', fontSize: 18, paddingHorizontal: 0, paddingVertical: 5 }}>Liberar banco</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <View></View>
                            )}
                        </>
                    )}

                    <View>

                    </View>
                </View>
            </View>


        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        height: '100%',
        marginTop: Platform.OS == "ios" ? 50 : 0,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    Titulo: {
        fontSize: 50,
        color: 'black',
        margin: 20,
        fontWeight: 'bold',
    },
    inputs: {
        width: '100%',
        height: 55,
        marginTop: 20,
        borderWidth: 0,
        backgroundColor: 'aliceblue',
        borderColor: 'black',
        borderRadius: 20,
        color: 'black',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    input: {
        margin: 10,
        width: '50%',
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        paddingHorizontal: 5,
        paddingVertical: 4,
        fontSize: 25,
    },
    banco: {
        paddingHorizontal: 15,
        width: '100%',
        color: 'black',
        borderLeftWidth: 1,
        paddingBottom: 0,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderRightWidth: 1,
        borderBottomWidth: 1,
    },
    bancoTitulo: {
        alignContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold',
    },
    bancoPorcentaje: {
        alignContent: 'center',
        justifyContent: 'center',
        right: 0,
        color: 'black',
        flexDirection: 'row',
        alignItems: 'center',

    },
    title: {
        fontSize: 30,
        color: 'black',
    },
    battery: {
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',
        borderWidth: 0,
    },
    batteryTitle: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    batteryPercentage: {
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        flexDirection: 'row',
    }
});
export default InicioLogueado;
