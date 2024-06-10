// OnboardingScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleSelection = (type) => {
    setSelectedType(type);
  };

  const handleSignUp = () => {
    // Handle sign-up logic based on selectedType
    console.log(`Selected type: ${selectedType}`);
    // Example navigation
    // navigation.navigate('NextScreen', { accountType: selectedType });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select account type</Text>
      <Text style={styles.subtitle}>
        You can only create one account per phone number.
        Use separate numbers to create different accounts.
      </Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedType === 'Customer' && styles.selectedOption,
          ]}
          onPress={() => handleSelection('Customer')}
        >
          <Text style={styles.optionText}>Customer</Text>
          <Text style={styles.optionSubtext}>Request repair services and authorize parts for your location.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            selectedType === 'Repairer' && styles.selectedOption,
          ]}
          onPress={() => handleSelection('Repairer')}
        >
          <Text style={styles.optionText}>Repairer</Text>
          <Text style={styles.optionSubtext}>Render repair services to customers close to your location.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            selectedType === 'RepairCompany' && styles.selectedOption,
          ]}
          onPress={() => handleSelection('RepairCompany')}
        >
          <Text style={styles.optionText}>Repair company</Text>
          <Text style={styles.optionSubtext}>Request repair services and authorize parts for your location.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            selectedType === 'Vendor' && styles.selectedOption,
          ]}
          onPress={() => handleSelection('Vendor')}
        >
          <Text style={styles.optionText}>Vendor</Text>
          <Text style={styles.optionSubtext}>Sell spare parts to repairers and repair companies.</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={handleSignUp}
        disabled={!selectedType}
      >
        <Text style={styles.signUpButtonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  option: {
    width: width * 0.8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  selectedOption: {
    borderColor: '#FFA500',
    borderWidth: 2,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionSubtext: {
    fontSize: 14,
    marginTop: 5,
  },
  signUpButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.8,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;


