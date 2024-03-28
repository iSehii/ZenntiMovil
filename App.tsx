// App.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Inicio from './vistas/auth/index';
import Login from './vistas/auth/login/index';
import Registro from './vistas/auth/registro/index';
import Invitado from './vistas/invitado/index';
import InicioLogueado from './vistas/logueado/index';
import Dashboard from './vistas/bancos/dashboard';
import MiCuenta from './vistas/logueado/MiCuenta';
import Favoritos from './vistas/logueado/Favoritos';
import Chequeo from './vistas/chequeo';
import Estadisticas from './vistas/logueado/Estadisticas';
import Admin from './vistas/logueado/admin/admin';
import Mapa from './vistas/invitado/Mapa';
import CRUD from './vistas/logueado/admin/CRUD';
const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Chequeo'>
          <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false, headerBackTitle: ' Volver' }} />
          <Stack.Screen name="Iniciar sesión" component={Login} options={{ headerShown: false, headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false, headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="Invitado" component={Invitado} options={{ headerShown: false }} />
          <Stack.Screen name="InicioLogueado" component={InicioLogueado} options={{ headerShown: false }} />
          <Stack.Screen name="Chequeo" component={Chequeo} options={{ headerShown: false }} />
          <Stack.Screen name="Mi cuenta" component={MiCuenta} options={{ headerShown: true, headerBackTitle: "Menú" }} />
          <Stack.Screen name="dashboard" component={Dashboard} options={{ headerShown: false }} />
          <Stack.Screen name="Estadisticas" component={Estadisticas} options={{ headerShown: true, headerTitle: 'Estadisticas', headerBackTitle: 'Volver' }} />
          <Stack.Screen name="admin" component={Admin} options={{ headerShown: true, headerTitle: 'Administrador - Usuarios', headerBackTitle: 'Menù' }} />
          <Stack.Screen name="CRUD" component={CRUD} options={{ headerShown: true }} />
          <Stack.Screen name="Favoritos" component={Favoritos} options={{ headerShown: true, headerTitle: 'Favoritos', headerBackTitle: 'Regresar' }} />
          <Stack.Screen name="Mapa" component={Mapa} options={{ headerShown: true, headerTitle: 'Ubicación', headerBackTitle: 'Regresar' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
