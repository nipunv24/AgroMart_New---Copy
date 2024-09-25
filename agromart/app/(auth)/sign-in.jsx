import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router'; // Import useRouter

const SignIn = () => {
  const router = useRouter(); // Use the router
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://172.20.10.4:3000/signin', {
        email,
        password,
      });
      alert(response.data.message);
      // Save token and navigate to the profile or home screen
      // You can use AsyncStorage to store the token
      router.push('/profile'); // Use router.push to navigate to the Profile screen
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Failed to sign in');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Sign Up" onPress ={() => router.push('sign-up')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
  },
});

export default SignIn;
