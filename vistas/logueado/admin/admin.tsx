import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationProp } from '@react-navigation/native';
import Icono from 'react-native-vector-icons/MaterialCommunityIcons';
import IconoMaterial from 'react-native-vector-icons/Ionicons';

interface UserProps {
    navigation: NavigationProp<any>;
}

const UserList: React.FC<UserProps> = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [actualizar, setActualizar] = useState(false); 

    useEffect(() => {
        fetchUsers();
    }, [actualizar]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://192.168.8.100:3005/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    const borrar = async ( correos: string ) => {
        const response = axios.delete(`http://192.168.8.100:3005/api/users/${correos}`)
            .catch(error => {
                console.log("Errores: " + error.response.data.message);
            })
            .finally(() => {
                if (actualizar) {

                    setActualizar(false);
                } else {
                    setActualizar(true);

                }
            });
    };
    return (
        <View style={styles.contenedor}>
        <View>
            <Text style={{textAlign: 'center', fontSize: 45, fontWeight: 'bold', paddingBottom: 15}}>Usuarios</Text>
        </View>
        <ScrollView
        bounces= {false}
        >

            {users.map(user => (
                <View style={styles.contenedorUser} key={user._id} >
                    <View style={styles.imagenContenedor}>
                        <Image style={styles.imagen} source={require('../../../public/imagenes/Inicio.png')} />
                    </View>
                    <View style={styles.contenedorDatos}>
                        <Text style={styles.nombre}>{user.nombre} {user.apellidos}</Text>
                        <Text>Correo: {user.correo}</Text>
                        <Text>Fecha de Nacimiento: {user.fn}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '20%', alignContent: 'flex-start', alignItems: 'center', justifyContent: 'center', gap: 0}}>
                        <TouchableOpacity>
                            <Icono name="delete" color={"darkred"} size={35} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CRUD', {user})}>
                            <IconoMaterial name="arrow-forward-circle-sharp" color={"darkred"} size={35} />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    contenedorDatos: {
        width: '50%',
    },
    imagenContenedor: {
        justifyContent: 'center',
        width: '30%',
        height: '60%',
        alignItems: 'center',
        shadowColor: 'black',
        shadowRadius: 10,
        padding: 10,
        borderRadius: 100,
    },
    imagen: {
        backgroundColor: '#ccc',
        borderRadius: 100,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        width: '100%',
        height: '100%',
    },
    contenedor: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: Platform.OS == 'ios' ? 15:0,
    },
    nombre: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    contenedorUser: {
        justifyContent: 'space-between',
        width: '100%',
        gap: 0,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingBottom: 0,
        paddingTop: 0,
    },
});

export default UserList;
