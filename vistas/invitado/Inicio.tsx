import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import React, { useState } from 'react';
import Svg, { Rect } from 'react-native-svg';
import Icono from 'react-native-vector-icons/MaterialCommunityIcons';
import IconoMaterial from 'react-native-vector-icons/Ionicons';


const BatteryIcon = () => {
    const percentage = 90;
    const batteryWidth = 40;
    const batteryHeight = 20;
    const borderWidth = 2;

    const batteryLevel = (batteryWidth - 2 * borderWidth) * (percentage / 100);
    let color = "#70b578";
    if (percentage <= 10) {
        color = 'red'; // Menor o igual al 10%, color rojo
    } else if (percentage <= 25) {
        color = 'orange'; // Menor o igual al 25%, color naranja
    } else {
        color = '#70b578'; // Resto, color verde
    }
    //     
    //        if (percentage>=0 && percentage<=20) {
    //          setColor('orange');
    //    } else {
    //      setColor("green");
    // }

    return (
        <View style={styles.contenedor}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={{ margin: 0, backgroundColor: 'white', paddingBottom: 0, borderTopRightRadius: 15 }}>
                <Text style={styles.Titulo}>Bancos disponibles</Text>
                <View style={{
                    marginLeft: 10, marginRight: 10, borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    borderWidth: 1,
                    }}>
                    <Image style={{
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                        borderWidth: 0,
                        width: '100%', height: 75,
                        borderColor: 'black',
                        }} source={require('../../public/imagenes/Fondo.jpeg')} />
                </View>
            </View>
            <View style={styles.banco}>
                <View style={{ gap: 10, alignContent: 'center', justifyContent: 'center' }}>
                    <Text style={styles.bancoTitulo}>Proyecto</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 0 }}>
                        <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Svg width={batteryWidth} height={batteryHeight} viewBox={`0 0 ${batteryWidth} ${batteryHeight}`}>
                                <Rect
                                    x={0}
                                    y={0}
                                    width={batteryWidth}
                                    height={batteryHeight}
                                    stroke="black"
                                    strokeWidth={borderWidth}
                                    fill="none" />
                                <Text style={{ textAlign: 'center', justifyContent: 'center', flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: 1.5, fontWeight: 'bold' }}>{`${percentage}`}</Text>
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
                <View style={styles.bancoPorcentaje}>
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                        <TouchableOpacity>
                            <Icono name="google-maps" color={"darkred"} size={40} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <IconoMaterial name="analytics" color={"darkred"} size={40} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <IconoMaterial name="arrow-forward-circle-sharp" color={"darkred"} size={40} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


        </View>
    );
};
const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: 'white',
    },
    Titulo: {
        fontSize: 50,
        color: 'black',
        margin: 20,
        fontWeight: 'bold',
    },
    banco: {
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 0,
        height: '15%',
        color: 'black',
        flexDirection: 'row',
        borderLeftWidth: 1,
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
export default BatteryIcon;
