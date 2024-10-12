
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
import LoadingIndicator from '../../.components/LoadingIndicator'; // Import the LoadingIndicator component
import { icons } from '../../constants/vectorIcons';
import ProductCard from '../../.components/ProductCard';
//import { DOMAIN_URL } from '@env'; // Import DOMAIN_URL from .env

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [filteredRecieved, setfilteredRecieved] = useState(false); //This state variable store the state to check if filtered products were searched
  const [isPressed, setIsPressed] = React.useState(false); //For the button to show green colour
  const router = useRouter();
  const { filteredProducts, categoryName, districtName, subCategoryName } = useLocalSearchParams(); // Use to retrieve passed 

  useEffect(() => {
    if(filteredProducts){
      setProducts(JSON.parse(filteredProducts));
      setLoading(false);
      setfilteredRecieved(true);
      console.log("products:"+products);
      console.log(products.length);
    }
    else {
      axios.get(`http://192.168.43.3:3000/products`) 
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

  if (loading) {
    return <LoadingIndicator />; // Show loading indicator while data is being fetched
  }

  return (
    <View className="flex-1 p-4">
      {/* Search input and Login button */}
      <View className="flex-row items-center justify-between mb-4">
        <View className='flex-row items-center w-4/5'>
          

          <TouchableOpacity 
          onPress={() => {
            // Navigate to the category page or perform an action
            router.push('/categories/categories'); // Adjust the route as needed
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
          className="bg-green-800 rounded p-2"
          onPress={() => router.push('(auth)/sign-in')}
        >
          <Text className="text-white font-bold ">Login</Text>
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
