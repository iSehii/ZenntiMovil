import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Icono from 'react-native-vector-icons/MaterialCommunityIcons';
interface MenuProps {
    navigation: NavigationProp<any>;
}
const Menu: React.FC<MenuProps> = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [rol, setRol] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('nombre')
      .then(nombre => {
        if (nombre !== null) {
          setNombre(nombre);
        }
      })
      .catch(error => {
        console.error('Error al obtener el nombre de AsyncStorage:', error);
      });
    AsyncStorage.getItem('apellidos')
      .then(apellidos => {
        if (apellidos !== null) {
          setApellidos(apellidos);
        }
      })
      .catch(error => {
        console.error('Error al obtener el nombre de AsyncStorage:', error);
      });
    AsyncStorage.getItem('rol')
      .then(rol => {
        if (rol !== null) {
          setRol(rol);
        }
      })
      .catch(error => {
        console.error('Error al obtener el nombre de AsyncStorage:', error);
      });
    return () => {
    };
  }, []);  




    const botonCerrar = async () => {
    await AsyncStorage.removeItem('logueado');
    await AsyncStorage.removeItem('correo');
    navigation.reset({
        index: 0,
        routes: [{ name: 'Inicio' }]
   });
    };

  return (
    <View style={styles.container}>
        <View style={styles.menu}>
              <View style={{ justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}>
                <Image style={{ borderRadius: 500, borderWidth: 1, borderColor: 'black', width: 250, height: 250 }} source={(require('../../public/imagenes/Inicio.png'))} />
                <View style={{marginTop: 15}}>
                    <Text style={styles.nombre}>{nombre}</Text>
                    <Text style={styles.nombre}>{apellidos}</Text>
                </View>
              </View>
          <View>
              <View style={{alignContent: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
                <View style={{ marginLeft: 50, marginRight: 50, marginTop: 0, marginBottom: 0, gap: 5 }}>
                  <Text style={{ marginLeft: 10, color: 'black' }}>Usuario:</Text>
                  <TouchableOpacity style={styles.TouchableMenu} onPress={() => { navigation.navigate('Mi cuenta') }}>
                    <Text style={styles.buenMenu}>Mi cuenta</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.TouchableMenu} onPress={() => { navigation.navigate('Favoritos') }}>
                    <Text style={styles.buenMenu}>Favoritos</Text>
                  </TouchableOpacity>
                </View>
                {rol == '1' ? (
                  <View style={{ marginLeft: 50, marginRight: 50, marginTop: 10, marginBottom: 10, gap: 5 }}>
                    <Text style={{marginLeft: 10, color: 'black'}}>Dashboard:</Text>
                    <TouchableOpacity style={styles.TouchableMenu} onPress={() => { navigation.navigate('admin') }}>
                      <Text style={styles.buenMenu}>Usuarios</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  null
                )

                }
            </View>
          </View>
          <View style={{}}>
            <TouchableOpacity onPress={botonCerrar}>
              <Text style={styles.menuItem}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 0,
    paddingBottom: 20,
    justifyContent: 'space-between',
    borderWidth: 0,
    textAlign: 'left',
  },
  menuItem: {
    backgroundColor: 'white',
    color: 'black',
    marginRight: 30,
    marginLeft: 30,
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 10,
    borderRadius: 10,
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 16,
    padding: 0,
  },
  TouchableMenu: {
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: 'black',
    marginLeft: 10,
  },
  buenMenu: {
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 16,
    padding: 0,
  },
nombre: {
  marginRight: 20,
  marginLeft: 20,
  color: 'black',
  marginTop: 0,
  fontSize: 35,
  fontWeight: 'bold',
  textAlign: 'center',
  }});

export default Menu;
