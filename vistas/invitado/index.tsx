// GuestScreen.js
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from '../auth/login';
import Mapa from '../invitado/Mapa';
import Test from '../invitado/Test';
import InicioGuest from '../invitado/Inicio';
interface InvitadoProps {
    navigation: NavigationProp<any>;
}
const Invitado: React.FC<InvitadoProps> = ({ navigation }) => {
    const Tab = createBottomTabNavigator();

    const Inicio = () => (
            <InicioGuest/>
    );

    const Ubicaciones = () => (
        <View style={styles.container}>
            <Mapa/>
        </View>
    );

    const Menu = () => (
        <View style={styles.container}>
            <Text>Settings Screen</Text>
        </View>
    );

    const Estadisticas = () => (
        <View style={styles.container}>
            <Test/>
        </View>
    );

    return (
        <View style={styles.container}>

            <View style={[styles.box, styles.box3]}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarActiveTintColor: 'red',
                        tabBarStyle: {
                            height: 70, // Ajusta la altura de la pestaña
                            paddingTop: 10,
                            display: 'flex',
                            borderTopWidth: 2,
                            borderTopColor: '#ccc',
                        },
                        tabBarLabelStyle: {
                            marginTop: -50, // Ajusta la distancia entre el icono y el texto
                        },
                    }}
                >
                    <Tab.Screen
                        name="Inicio"
                        component={Inicio}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="home" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Ubicaciones"
                        component={Ubicaciones}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="map" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Menú"
                        component={Menu}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="menu" color={color} size={size} />
                                ),
                            }}
                    />
                </Tab.Navigator>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS == "android" ? 25:0,
        flex: 1,
        flexDirection: 'column'
    },
    box: {
    },
    box1: {
        flex: 1,
            backgroundColor: '#2196F3'
    },
    //content 
    box2: {
        flex: 10,
            backgroundColor: '#8BC34A'
    },
    //footer 
    box3: {
        paddingTop: 0,
        flex: 1,
        backgroundColor: '#e3aa1a'
    }
});
export default Invitado;
