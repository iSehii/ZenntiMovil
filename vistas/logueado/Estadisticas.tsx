import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const VoltageChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://zennit-api.onrender.com/api/bancos/Proyecto/voltaje'); 
                setData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos de voltaje:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 2000); // Consulta cada 5 segundos
        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, []);

    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'left', fontSize: 35, color: 'black', fontWeight: 'bold', marginTop: 25}}>Estadísticas de uso:</Text>
            <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginTop: 20}}>Proyecto:</Text>

            <View style={{alignItems: 'center', marginTop: 15}}>
            <LineChart
                data={{
                    labels: data.map((item, index) => index.toString()),
                    datasets: [{
                        data: data.map(item => item.voltage),
                        
                    },
                    {
                        data: [3] ,
                        withDots: false
                    },
                    {
                        withDots: false,
                        data: [4.2]
                    }
                ],
            }}
            width={350}
            height={220}
            yAxisLabel="V"
            chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                    borderRadius: 16,
                },
                propsForDots: {
                    r: '4',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                },
            }}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16,
            }}
            />
            <LineChart
                data={{
                    labels: data.map((item, index) => index.toString()),
                    datasets: [{
                        data: data.map(item => item.porcentaje),
                        
                    },
                    {
                        data: [100],
                        withDots: false
                    },
                    {
                        withDots: false,
                        data: [0]
                    }
                ],
            }}
            width={350}
            height={220}
            yAxisLabel=""
            xAxisLabel=''
            chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: '#ffa726',
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
                />
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15,
        justifyContent: 'flex-start',
    },
});

export default VoltageChart;
