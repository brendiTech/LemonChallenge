import React from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const InputSearch = ({search, searchValue, setSearchValue}) => {
    return (
        <View style={styles.container}>
            {
            searchValue
                ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setSearchValue('')}
                        style={styles.deleteSearch}
                    >
                        <Icon name="close-sharp" size={25} color='#A2A2A2' />
                    </TouchableOpacity> 
                )
                : <></>
            }
            <TextInput
                placeholder='Search...'
                style={styles.textInput}
                value={searchValue}
                onChangeText={(value) => {
                    search(value);
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
    textInput: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderColor: 'rgba(0,0,0,0.2)',
        height: 45,
        marginVertical: 15,
    },
    deleteSearch: {
        position: 'absolute',
        right: 10,
        padding: 10,
        zIndex: 99
    }
});
