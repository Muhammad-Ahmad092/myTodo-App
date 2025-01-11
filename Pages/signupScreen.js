import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordsMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    setPasswordsMatch(value === password);
  };

  const handleSignupPress = async () => {
    console.log('Request Body:', { email, password, confirmPassword }); // Debugging

    if (!email) {
        Alert.alert('Validation Error', 'Please enter an email address.');
    } else if (!isValidEmail(email)) {
        Alert.alert('Validation Error', 'Please enter a valid email address.');
    } else if (!password || !confirmPassword) {
        Alert.alert('Validation Error', 'Please enter and confirm your password.');
    } else if (!passwordsMatch) {
        Alert.alert('Validation Error', 'Passwords do not match.');
    } else {
        try {
          const response = await axios.post('http://192.168.0.119:5000/api/signup', {
            email,
            password,
        });
            Alert.alert('Success', response.data.message);
            navigation.navigate('LoginScreen');
        } catch (error) {
            console.error('Signup Error:', error); // Log error for debugging
            if (error.response) {
                Alert.alert('Error', error.response.data.message);
            } else {
                Alert.alert('Error', 'Something went wrong. Please try again.');
            }
        }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          <Text style={styles.titlePrefix}>my</Text>
          Account
        </Text>

        <Text style={styles.subtitle}>Create an Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <MaterialIcons
              name={isPasswordVisible ? 'visibility' : 'visibility-off'}
              size={24}
              color="#6c5ce7"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <MaterialIcons
              name={isPasswordVisible ? 'visibility' : 'visibility-off'}
              size={24}
              color="#6c5ce7"
            />
          </TouchableOpacity>
        </View>

        {!passwordsMatch && confirmPassword !== '' && (
          <Text style={styles.errorText}>Passwords do not match</Text>
        )}

        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleSignupPress}
        >
          <MaterialIcons name="chevron-right" size={30} color="#6c5ce7" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  titlePrefix: { color: '#6c5ce7' },
  subtitle: { fontSize: 18, color: '#666', marginBottom: 30 },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 16, paddingHorizontal: 15, marginBottom: 15, fontSize: 16 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 16, marginBottom: 15, paddingHorizontal: 10 },
  passwordInput: { flex: 1, height: 50, fontSize: 16 },
  eyeIcon: { padding: 5 },
  errorText: { color: 'red', fontSize: 14, marginTop: 5 },
  nextButton: { marginTop: 40, width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 },
});
