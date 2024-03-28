import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Svg, { Rect } from 'react-native-svg';
import Icono from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';

interface ChequeoProps {
    navigation: NavigationProp<any>;
}
const Chequeo: React.FC<ChequeoProps>  = ({ navigation }) => {
    const checkLogueado = async () => {
      try {
        const sesion = await AsyncStorage.getItem('logueado');
        if (sesion == '1') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'InicioLogueado' }]
           });
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Inicio' }]
           });
        }
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
        checkLogueado();
        return () => {}; // Empty cleanup function to avoid re-running on unmount
      }, []);      
      return null;
};

export default Chequeo;
