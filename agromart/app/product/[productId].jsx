// import { router } from "expo-router";
// import { View, Text, Button } from "react-native";

// const Cart = () => {
//    return(
//     <View>
//         <Text>Cart Page</Text>
//         <Button title="Sign In" onPress={() => router.push('(auth)/sign-in')} />
//     </View>
//    );
// };
// export default Cart;

import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View,TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Page() {
  const { user } = useUser()
  const {productId} = useLocalSearchParams();
  console.log("this is",productId);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [isPressed, setIsPressed] = useState(false); //For the button to show green colour


  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://10.10.24.163:3000/products/getProduct', {
        params: {productId}
    }) // Change to your server URL
      .then(response => {
        setProducts(response.data);
        setLoading(false); // Data has been fetched, stop loading
      })
      .catch(error => {
        console.error('Failed to fetch products:', error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  return (

    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <View className="items-center justify-center p-6" style={{ marginTop: '50%' }}>
          <Text className="text-2xl font-bold text-center mb-8">
            Create an account or Sign-In! {productId}
          </Text>
          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity className="bg-green-500 py-2 px-8 mt-4 rounded-full mb-4 w-full h-14 justify-center" activeOpacity={0.9}>
              <Text className="text-white text-lg font-semibold text-center">Sign In</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/(auth)/sign-up" asChild>
            <TouchableOpacity className="bg-green-600 py-2 px-16 mt-8 rounded-full w-full h-14 justify-center" activeOpacity={0.9}>
              <Text className="text-white text-lg font-semibold text-center">Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SignedOut>
    </View>
  )
}