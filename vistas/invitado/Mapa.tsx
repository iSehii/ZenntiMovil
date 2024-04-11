import Mapbox from '@rnmapbox/maps';
import { PointAnnotation } from '@rnmapbox/maps';
import { View, Button, TouchableOpacity, Platform, ScrollView, Text, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, Circle } from 'react-native-maps'; // Importa PROVIDER_GOOGLE
import Geolocation from '@react-native-community/geolocation';
import IconoMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import Icono from 'react-native-vector-icons/Ionicons';
const tokenmapbox = "pk.eyJ1IjoiaXNlaGlpIiwiYSI6ImNsdXRhd25weDBweDYyaW05anQweTRnbTcifQ.0clORVe7HZLcO0wHm9brsg";
Mapbox.setAccessToken(tokenmapbox);

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
            if (Platform.OS === "android") {
                // Acciones para Android con Mapbox
                mapRef.current.setCamera({
                    centerCoordinate: [currentLocation.longitude, currentLocation.latitude],
                    zoomLevel: 12.5,
                });
            } else {
                // Acciones para iOS con react-native-maps
                mapRef.current.animateToRegion({
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                });
            }
        }
    };

    const handleCenterMapToPin = () => {
        if (pinLocation) {
            if (Platform.OS === "android") {
                // Acciones para Android con Mapbox
                mapRef.current.setCamera({
                    centerCoordinate: [pinLocation.longitude, pinLocation.latitude],
                    zoomLevel: 12.5,
                });
            } else {
                // Acciones para iOS con react-native-maps
                mapRef.current.animateToRegion({
                    latitude: pinLocation.latitude,
                    longitude: pinLocation.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                });
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {Platform.OS == "ios" ?
                (
                    <MapView
                        ref={mapRef}
                        style={{ flex: 1, height: '60%', marginTop: 0 }}
                        initialRegion={{
                            latitude: currentLocation ? currentLocation.latitude : 19.3399521,
                            longitude: currentLocation ? currentLocation.longitude : -99.4756845,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                        }}
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

                ) : (

                    <Mapbox.MapView style={{ flex: 1, height: '60%' }}>
                        <Mapbox.Camera
                            zoomLevel={12.5}
                            centerCoordinate={[-99.4756845, 19.3399521]}
                        />
                        <Mapbox.MarkerView
                            id="myMarker"
                            coordinate={[-99.4756845, 19.3399521]}
                        >
                            <View style={{}}>
                                <Image source={require('../../public/imagenes/red_marker.png')} />
                            </View>
                        </Mapbox.MarkerView>
                    </Mapbox.MapView>
                )
            }
            <View style={{ flexDirection: 'column', gap: 10, right: 10, top: 75, position: 'absolute', justifyContent: 'space-around', alignItems: 'center', padding: 10, backgroundColor: 'white', borderRadius: 100, }}>
                {Platform.OS == "ios"? 
             (
                        <TouchableOpacity onPress={handleCenterMapToUserLocation}>
                            <IconoMaterial name="crosshairs-gps" color={"darkred"} size={30} />
                        </TouchableOpacity>
             )   : ( null )
            }
            </View>
            <View style={{ flexDirection: 'column', gap: 10, right: 10, top: 15, position: 'absolute', justifyContent: 'space-around', alignItems: 'center', padding: 10, backgroundColor: 'white', borderRadius: 100, }}>
                {Platform.OS == "ios" ? (
                    <TouchableOpacity onPress={handleCenterMapToPin}>
                        <Icono name="location" color={"darkred"} size={30} />
                    </TouchableOpacity>
                ) : (
                    null
                ) }
            </View>
            <View>
                <ScrollView style={{ height: '40%' }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 35, margin: 10 }}>Bancos:</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, paddingHorizontal: 10, width: '100%' }}>
                            <View>
                                <Image style={{ height: 100, width: 100 }} source={require('../../public/imagenes/Panel.png')} />
                            </View>
                            {Platform.OS == "ios" ? (
                                <TouchableOpacity onPress={handleCenterMapToPin}>
                                    <Text style={{ fontWeight: 'bold', color: 'green' }}>Nombre</Text>
                                    <Text style={{ fontSize: 16, width: '80%' }}>Proyecto</Text>
                                    <Text style={{ fontWeight: 'bold', color: 'green' }}>Ubicacion</Text>
                                    <Text style={{ fontSize: 16, width: '80%' }}>Universidad Tecnológica del Valle de Toluca</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity>
                                    <Text style={{ fontWeight: 'bold', color: 'green' }}>Nombre</Text>
                                    <Text style={{ fontSize: 16, width: '80%' }}>Proyecto</Text>
                                    <Text style={{ fontWeight: 'bold', color: 'green' }}>Ubicacion</Text>
                                    <Text style={{ fontSize: 16, width: '80%' }}>Universidad Tecnológica del Valle de Toluca</Text>
                                </TouchableOpacity>
                            )}

                        </View>
                    </View>
                </ScrollView>
            </View>

        </View>
    );
};

export default App;
