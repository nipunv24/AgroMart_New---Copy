
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import LoadingIndicator from '../../.components/LoadingIndicator'; // Import the LoadingIndicator component
import { icons } from '../../constants/vectorIcons';
import ProductCard from '../../.components/ProductCard';
//import { DOMAIN_URL } from '@env'; // Import DOMAIN_URL from .env

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [isPressed, setIsPressed] = React.useState(false); //For the button to show green colour
  const router = useRouter();

  useEffect(() => {
    // Fetch data from the backend
    axios.get(`http://10.10.24.163:3000/products`) // Change to your server URL
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
      <View className="flex-row items-center justify-between mb-4">
        <View className='flex-row items-center w-4/5'>
          {/* <TextInput 
            className="w-4/5 rounded border p-2 underline text-lg mr-3"
            placeholder="Search for products..." 
            placeholderTextColor="#888" 
          /> */}
          <TouchableOpacity 
          onPress={() => {
            // Navigate to the category page or perform an action
            router.push('/categories/categories2'); // Adjust the route as needed
          }}
          onPressIn={() => setIsPressed(true)} // Change color on press
          onPressOut={() => setIsPressed(false)} // Reset color on release
          activeOpacity={0.4}
          className={`flex-row items-center p-1  transition duration-200 ease-in-out transform ${isPressed ? 'scale-95' : 'scale-100'}`}
          >
            <Text 
                className={` rounded p-2 text-lg mr-3 text-center underline`}
            >
              Browse by Category
            </Text>
          {icons.categories({ color: 'black' })}
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          className="bg-green-500 rounded p-2"
          onPress={() => router.push('(auth)/sign-in')}
        >
          <Text className="text-white font-bold ">Login</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id} // Ensure the key is unique, convert to string if necessary
        renderItem={({ item }) => (
          // <View className="flex-1 m-1">
          //     <Image source={{ uri: item.imageUrls[0].url }} className="w-full h-40 rounded-lg" />
          //     <Text className="mt-2 font-semibold text-center">{item.name}</Text>
          //     {/* <Text className="text-gray-600 text-center">{item.description}</Text> */}
          // </View>
          <ProductCard key={item.id} product={item}/>
        )}
        numColumns={2} // Ensure this value remains constant
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 0 }} // Add horizontal padding for spacing
        contentContainerStyle={{ paddingBottom: 20 }} // Optional: Adds padding to the bottom of the list
        key={products.length} // Using products.length to force a fresh render if products change
      />
    </View>
  );
};

export default Home;
