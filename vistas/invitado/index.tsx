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
            <InicioGuest navigation={navigation}/>
    );

    const Ubicaciones = () => (
        <View style={{
            paddingTop: Platform.OS == "android" ? 0 : 0,
            flex: 1,
            paddingBottom: Platform.OS == "android" ? 0 : 5,
            flexDirection: 'column'
        }}>
            <Mapa />
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
                        tabBarInactiveTintColor: 'gray',
                        tabBarStyle: [
                            {
                                paddingTop: Platform.OS == "android" ? 0 : 15,
                                height: Platform.OS == "android" ? '8%' : '10%',
                                display: 'flex',
                                borderTopWidth: 2,
                                borderTopColor: '#ccc'
                            },
                        ],
                        tabBarLabelStyle: {
                            marginTop: Platform.OS == "android" ? -12 : 0, // Ajusta la distancia entre el icono y el texto
                            paddingBottom: Platform.OS == "android" ? 10 : 0,
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
