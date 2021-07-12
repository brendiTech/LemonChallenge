import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ActivityIndicator, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';


export const CasesScreen = ({navigation, route}) => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);

    const getData = () => {
        setIsLoading(true);
        axios.get(`https://api.covid19api.com/total/dayone/country/${route.params.slug}/status/confirmed`).then(resp => {
            setData(resp.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        setIsLoading(true);
        orderData(filter);
    }, [filter]);

    const orderData = (number) => {
        let value = (number===1 || number === 2) ? 'Cases' : 'Date';
        let sorting = (number===1 || number === -1 || number === 3) ? 'asc' : 'desc';

        if(sorting==='asc')
        {
            data.sort((a, b) => {
                if (a[value] > b[value]) {
                    return 1;
                }
                if (a[value] < b[value]) {
                    return -1;
                }
                return 0;
            });
        }
        else
        {
            data.sort((a, b) => {
                if (a[value] < b[value]) {
                    return 1;
                }
                if (a[value] > b[value]) {
                    return -1;
                }
                return 0;
            });
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getData();
        navigation.setOptions({
            title: route.params.name,
        })
    }, []);

    return (
        <View style={styles.container} >
            <Picker
                selectedValue={filter}
                onValueChange={(itemValue) => { 
                    setIsLoading(true);
                    setFilter(itemValue);
                }}                
            >
                <Picker.Item label='Seleccione un filtro' value={-1}/>
                <Picker.Item label="Casos de Menor a Mayor" value={1} />
                <Picker.Item label="Casos de Mayor a Menor" value={2} />
                <Picker.Item label="Más antiguos" value={3} />
                <Picker.Item label="Más recientes" value={4} />

            </Picker>
            {
                isLoading
                ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View>
                )
                : (
                    <>
                        <FlatList
                            data={data}
                            keyExtractor={ c => c.Date }
                            renderItem={ ({item}) => (
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Text style={styles.countryName}>Date: {moment(item.Date).format('DD/MM/YYYY')} - Cases: {item.Cases}</Text>
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={ () => (
                                <View style={ styles.itemSeparator } />
                            )}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isLoading}
                                    onRefresh={getData}
                                />
                            }
                        />
                    </>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 20
    },
    label: {
        fontSize: 18
    },
    textInput: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderColor: 'rgba(0,0,0,0.2)',
        height: 45,
        marginTop: 5,
        marginBottom: 15
    }
});