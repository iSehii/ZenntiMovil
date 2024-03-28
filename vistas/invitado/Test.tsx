import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TcpSocket from 'react-native-tcp-socket';

const App = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        const client = TcpSocket.createConnection({ host: '192.168.8.105', port: 80 }, () => {
            console.log('Conexión establecida');
            client.on('data', (data) => {
                setData(data.toString());
            });
        });

        return () => {
            client.destroy();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text>{data}asdasd</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;