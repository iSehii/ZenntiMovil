import React, { useState, useEffect, useRef } from 'react';
import { View, Button, TouchableOpacity, Platform, ScrollView, Text, Image } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps'; // Importa PROVIDER_GOOGLE
import Geolocation from '@react-native-community/geolocation';
import IconoMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import Icono from 'react-native-vector-icons/Ionicons';

const App = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [pinLocation, setPinLocation] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        setPinLocation({ latitude: 19.3399521, longitude: -99.4756845 });
        const watchId = Geolocation.watchPosition(
            position => {
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            error => console.error('Error al obtener la ubicación:', error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

        return () => {
            Geolocation.clearWatch(watchId);
        };
    }, []);

    const handleCenterMapToUserLocation = () => {
        if (currentLocation) {
            mapRef.current.animateToRegion({
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            });
        }
    };

    const handleCenterMapToPin = () => {
        if (pinLocation) {
            mapRef.current.animateToRegion({
                latitude: pinLocation.latitude,
                longitude: pinLocation.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            });
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={mapRef}
                style={{ flex: 1, height: '60%', marginTop: 0 }}
                initialRegion={{
                    latitude: currentLocation ? currentLocation.latitude : 19.3399521,
                    longitude: currentLocation ? currentLocation.longitude : -99.4756845,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
                // Establece PROVIDER_GOOGLE en Android
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
            >
                {currentLocation && (
                    <Circle
                        center={currentLocation}
                        radius={100}
                        fillColor="rgba(0, 0, 255, 0.3)"
                        strokeColor="white"
                        strokeWidth={2}
                    />
                )}
                {pinLocation && <Marker coordinate={pinLocation} title="Banco de energía" />}
            </MapView>
            <View style={{ flexDirection: 'column', gap: 10, right: 10, top: 75, position: 'absolute', justifyContent: 'space-around', alignItems: 'center', padding: 10, backgroundColor: 'white', borderRadius: 100, }}>
                <TouchableOpacity onPress={handleCenterMapToUserLocation}>
                    <IconoMaterial name="crosshairs-gps" color={"darkred"} size={30} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'column', gap: 10, right: 10, top: 15, position: 'absolute', justifyContent: 'space-around', alignItems: 'center', padding: 10, backgroundColor: 'white', borderRadius: 100, }}>
                <TouchableOpacity onPress={handleCenterMapToPin}>
                    <Icono name="location" color={"darkred"} size={30} />
                </TouchableOpacity>
            </View>
            <View>
                <ScrollView style={{ height: '40%' }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 35, margin: 10 }}>Bancos:</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, paddingHorizontal: 10, width: '100%' }}>
                            <View>
                                <Image style={{ height: 100, width: 100 }} source={require('../../public/imagenes/Panel.png')} />
                            </View>
                            <TouchableOpacity onPress={handleCenterMapToPin}>
                                <Text style={{ fontWeight: 'bold', color: 'green' }}>Nombre</Text>
                                <Text style={{ fontSize: 16, width: '80%' }}>Proyecto</Text>
                                <Text style={{ fontWeight: 'bold', color: 'green' }}>Ubicacion</Text>
                                <Text style={{ fontSize: 16, width: '80%' }}>Universidad Tecnológica del Valle de Toluca</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>

        </View>
    );
};

export default App;
