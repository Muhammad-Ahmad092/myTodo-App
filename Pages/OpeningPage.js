import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OpeningScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')} // Add your logo image here
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* App Title */}
        <Text style={styles.title}>
          <Text style={styles.titlePrefix}>my</Text>
          Todo
        </Text>

        {/* Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Organize your tasks efficiently and boost your productivity with our simple and intuitive todo app
          </Text>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
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
  logoContainer: {
    width: 180,
    height: 180,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    fontFamily: 'Solitreo-Regular', // Apply Solitreo font
  },
  titlePrefix: {
    color: '#6c5ce7',
  },
  card: {
    width: '100%',
    padding: 25,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Solitreo-Regular', // Apply Solitreo font
  },
  button: {
    paddingHorizontal: 50,
    paddingVertical: 15,
    backgroundColor: '#6c5ce7',
    borderRadius: 30,
    shadowColor: '#6c5ce7',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Solitreo-Regular', // Apply Solitreo font
  },
});