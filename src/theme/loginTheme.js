import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingHorizontal: 30
    },
    title: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 120
    },
    subtitle: {
        fontSize: 16,
        color: '#a2a2a2',
    },
    label: {
        marginTop: 25,
        color: '#a2a2a2',
    },
    inputField: {
        color: '#000',
        fontSize: 16,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: '#a2a2a2',
        borderRadius: 4,
        justifyContent: 'center'
    },
    inputFieldIOS: {
        borderBottomColor: '#a2a2a2',
        borderBottomWidth: 2,
        paddingBottom: 4
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 30
    },
    button: {
        height: 45,
        backgroundColor:'#0050a0',
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF'
    },
    separatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 20,
        marginVertical: 20
    },
    separator: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#A2A2A2'
    },
    textSeparator: {
        fontSize: 16,
        position: 'absolute',
        padding: 5,
        top: '100%',
        backgroundColor: '#FFF',
        color: '#A2A2A2'
    },
    buttonGoogle: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#0050a0',
        flexDirection: 'row'
    },
    buttonGoogleText: {
        fontSize: 18,
        color: '#0050a0'
    }
});