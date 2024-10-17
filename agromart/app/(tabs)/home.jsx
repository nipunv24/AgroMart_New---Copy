
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, Animated, SafeAreaView, Dimensions, Platform, Button } from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';
import LoadingIndicator from '../../.components/LoadingIndicator'; // Import the LoadingIndicator component
import { icons } from '../../constants/vectorIcons';
import ProductCard from '../../.components/ProductCard';
import ShiningBrowsebyCategory from '../../.components/ShiningBrowsebyCategoryButton';
//import { DOMAIN_URL } from '@env'; // Import DOMAIN_URL from .env

import { SignedIn, SignedOut,useUser } from '@clerk/clerk-expo';


const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [filteredRecieved, setfilteredRecieved] = useState(false); //This state variable store the state to check if filtered products were searched
  const [isPressed, setIsPressed] = React.useState(false); //For the button to show green colour
  const router = useRouter();
  const { filteredProducts, categoryName, districtName, subCategoryName } = useLocalSearchParams(); // Use to retrieve passed 

  const user = useUser();

  console.log("User = ; ",user)

  useEffect(() => {


    if(filteredProducts){
      setProducts(JSON.parse(filteredProducts));
      setLoading(false);
      setfilteredRecieved(true);
      console.log("products:"+products);
      console.log(products.length);
    }
    else {
      axios.get(`http://192.168.8.178:3000/products`) 
        .then(response => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Failed to fetch products:', error);
          setLoading(false);
        });
    }
  }, [filteredProducts]);

  // Get screen dimensions
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


  if (loading) {
    return <LoadingIndicator />; // Show loading indicator while data is being fetched
  }

  return (
    <>
    <SignedIn>
    <SafeAreaView 
    className="flex-1"
    style={{
      paddingHorizontal: screenWidth * 0.04, // 4% of screen width as padding
      paddingVertical: Platform.OS === 'android' ? 20 : screenHeight*0.04,
      marginHorizontal: Platform.OS === 'android' ? 0 : screenWidth * 0.04
    }}
    >
      {/* Search input and Login button */}
      <View className="flex-row items-center justify-between mb-4 mt-4">
        <View className='flex-row items-center'>
          <ShiningBrowsebyCategory label="Browse by Category" />
        </View>
        <TouchableOpacity 
          className="bg-green-800 rounded p-2"
          onPress={() => router.push('(auth)/sign-in')}
        >
          <Text className="text-white font-bold">Login</Text>
        </TouchableOpacity>
      </View>

      {filteredRecieved ? (
        products.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-lg text-center text-red-700 font-semibold mt-4">
              Sorry. No products found! Check other filters.
            </Text>
          </View>
        ) : (
          <Text className="text-lg font-bold text-gray-800 mb-5">
            <Text className="text-green-600">Category: </Text>{categoryName} {"\n"}
            <Text className="text-green-600">SubCategory: </Text>{subCategoryName} {"\n"}
            <Text className="text-green-600">District: </Text>{districtName}
          </Text>
        )
      ) : null}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id} // Ensure the key is unique, convert to string if necessary
        renderItem={({ item }) => (
          <ProductCard key={item.id} product={item} />
        )}
        numColumns={2} // Ensure this value remains constant
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal:0 }} // Add horizontal padding for spacing
        contentContainerStyle={{ paddingBottom: 20 }} // Optional: Adds padding to the bottom of the list
        key={products.length} // Using products.length to force a fresh render if products change
      />
    </SafeAreaView>
    </SignedIn>
    <SignedOut>
      <View className='mt-20 bg-green-400 p-1 text-lg items-center'>

        <Link href='/(auth)/sign-in'>
          sign in 
        </Link>
      </View>
    </SignedOut>
    </>
  );
};

export default Home;
