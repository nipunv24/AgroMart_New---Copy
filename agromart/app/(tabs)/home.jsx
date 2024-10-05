
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import LoadingIndicator from '../../.components/LoadingIndicator'; // Import the LoadingIndicator component

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const router = useRouter();

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://192.168.43.3:3000/products') // Change to your server URL
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
    <View className="flex-1 p-4" style={{ marginTop: '10%' }}>
      {/* Search input and Login button */}
      <View className="flex-row items-center mb-4">
        <TextInput 
          className="flex-1 border border-gray-300 rounded p-2 mr-2"
          placeholder="Search for products..." 
          placeholderTextColor="#888" 
        />
        <TouchableOpacity 
          className="bg-green-500 rounded p-2"
          onPress={() => router.push('(auth)/sign-in')}
        >
          <Text className="text-white font-bold">Login</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.name} // Ensure the key is unique, convert to string if necessary
        renderItem={({ item }) => (
          <View className="flex-1 m-1">
              <Image source={{ uri: item.imageUrls[0].url }} className="w-full h-40 rounded-lg" />
              <Text className="mt-2 font-semibold text-center">{item.name}</Text>
              {/* <Text className="text-gray-600 text-center">{item.description}</Text> */}
          </View>
        )}
        numColumns={2} // Ensure this value remains constant
        columnWrapperStyle={{ justifyContent: 'space-between' }} // Style for each row
        key={products.length} // Using products.length to force a fresh render if products change
      />
    </View>
  );
};

export default Home;
