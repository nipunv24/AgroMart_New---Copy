import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import LoadingIndicator from '../../.components/LoadingIndicator'; // Import the LoadingIndicator component

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const router = useRouter();

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://172.20.10.4:3000/products') // Change to your server URL
      .then(response => {
        setProducts(response.data);
        setLoading(false); // Data has been fetched, stop loading
      })
      .catch(error => {
        console.error('Failed to fetch products:', error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  if (loading) {
    return <LoadingIndicator />; // Show loading indicator while data is being fetched
  }

  return (
    <View style={styles.container}>
      <Button title="Sign New Feature" onPress={() => router.push('(auth)/sign-in')} />
        
      <FlatList
        data={products}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.imageUrls[0].url }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default Home;
