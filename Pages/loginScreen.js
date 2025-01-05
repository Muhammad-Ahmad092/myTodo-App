import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          <Text style={styles.titlePrefix}>my</Text>
          Account
        </Text>

        <Text style={styles.subtitle}>Login</Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input with Eye Icon */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
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

        {/* Signup Section - Side by Side */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={styles.signupLink}>Signup</Text>
          </TouchableOpacity>
        </View>

        {/* Next Button */}
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <MaterialIcons name="chevron-right" size={30} color="#6c5ce7" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Solitreo-Regular', // Apply Solitreo font
  },
  titlePrefix: {
    color: '#6c5ce7',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    fontFamily: 'Solitreo-Regular', // Apply Solitreo font
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: 'Solitreo-Regular', // Apply Solitreo font
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    fontFamily: 'Solitreo-Regular', // Apply Solitreo font
  },
  eyeIcon: {
    padding: 5,
  },
  nextButton: {
    marginTop: 40,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signupContainer: {
    marginTop: 5,
    flexDirection: 'row', // Align items side-by-side
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Solitreo-Regular', // Apply Solitreo font
  },
  signupLink: {
    fontSize: 16,
    color: '#6c5ce7',
    fontWeight: 'bold',
    marginLeft: 5,
    fontFamily: 'Solitreo-Regular', // Apply Solitreo font
  },
});
