import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router'; // Import useRouter

const SignUp = () => {
  const router = useRouter(); // Use the router
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [area, setArea] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://172.20.10.4:3000/signup', {
        name,
        email,
        password,
        address,
        phoneNum,
        province,
        district,
        area,
      });
      alert(response.data.message);
      router.push('/auth/sign-in'); // Use router.push to navigate to SignIn screen
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Failed to sign up');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
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
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNum}
        onChangeText={setPhoneNum}
        style={styles.input}
      />
      <TextInput
        placeholder="Province"
        value={province}
        onChangeText={setProvince}
        style={styles.input}
      />
      <TextInput
        placeholder="District"
        value={district}
        onChangeText={setDistrict}
        style={styles.input}
      />
      <TextInput
        placeholder="Area"
        value={area}
        onChangeText={setArea}
        style={styles.input}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Sign Up" onPress={handleSignUp} />
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

export default SignUp;
