import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VIPCodeScreen = () => {
    const navigation = useNavigation();
    const [code, setCode] = useState('');

    const handleSubmit = () => {
        if (code.trim() === '') {
            Alert.alert('Error', 'Please enter a valid code.');
        } else {
            Alert.alert('Success', `Your code: ${code} has been submitted.`);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>VIP Code</Text>
            </View>
            <Text style={styles.title}>Enter Code</Text>
            <Text style={styles.subtitle}>Can you please confirm your code?</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Code</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Code"
                    value={code}
                    onChangeText={setCode}
                    keyboardType="default"
                />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
      
    },
    backButton: {
        marginRight: 15,
    },
    backButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
        gap: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#000',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#7E7E7E',
        marginBottom: 30,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        color: '#000',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        color: '#000',
    },
    submitButton: {
        backgroundColor: '#000',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default VIPCodeScreen;
