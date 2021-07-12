import React, { useEffect, useState, useContext } from 'react';
import { Alert, Image, ActivityIndicator, View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl, TextInput} from 'react-native';
import axios from 'axios';
import { InputSearch } from '../components/InputSearch';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';

export const CountriesScreen = ({navigation}) => {

    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const { signOut } = useContext(AuthContext);

    const getCountries = () => {
        setIsLoading(true);
        axios.get('https://api.covid19api.com/countries').then(resp => {
            setCountries(resp.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getCountries();
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{marginRight: 10, padding: 10}}
                    onPress={onSignOut}
                >
                    <Icon name="log-out-outline" size={25} color="#000" />
                </TouchableOpacity>
            )
        })

    }, []);

    const onSignOut = () => {
        Alert.alert(
            "Log Out",
            "Are you sure do you want to log out?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { 
                text: "Yes", 
                onPress: () => {
                    signOut();
                }
              }
            ]
        );
    }

    const search = (value) => {
        setSearchValue(value);
        if(searchValue)
        {
            let result = countries.filter(country => country.Country.toLowerCase().includes(value.toLowerCase()));
            setSearchResult(result);
        }

    }

    return (
        <View style={{ flex: 1, marginHorizontal: 10 }}>
            {
                isLoading 
                ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View>
                )
                : (
                    <>
                        <InputSearch
                            searchValue={searchValue}
                            search={search}
                            setSearchValue={setSearchValue}
                        />
                        <FlatList
                            data={(searchValue && searchResult.length>0) ? searchResult : countries}
                            keyExtractor={ c => c.ISO2 }
                            keyboardShouldPersistTaps={'handled'}
                            renderItem={ ({item}) => (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={{flexDirection: 'row', alignItems: 'center'}}
                                    onPress={ 
                                        () => navigation.navigate('CasesScreen', {
                                            id: item.ISO2,
                                            name: item.Country,
                                            slug: item.Slug
                                        })
                                    }
                                >
                                    <Image
                                        source={{uri: `https://www.countryflags.io/${item.ISO2}/flat/32.png`}}
                                        style={{ width: 30, height: 30, marginRight: 10}}
                                    />
                                    <Text style={styles.countryName}>{item.Country} - {item.ISO2}</Text>
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={ () => (
                                <View style={ styles.itemSeparator } />
                            )}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isLoading}
                                    onRefresh={getCountries}
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
    countryName: {
        fontSize: 20,
    },
    itemSeparator: {
        borderBottomWidth: 1,
        marginVertical: 5,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    }
});
