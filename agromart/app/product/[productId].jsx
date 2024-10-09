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
import { Text, View,TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingIndicator from '../../.components/LoadingIndicator';
//import { DOMAIN_URL } from 'react-native-dotenv'; // Import DOMAIN_URL from .env

export default function Page() {
  const { user } = useUser()
  const {productId} = useLocalSearchParams();
  console.log("this is",productId);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [isPressed, setIsPressed] = useState(false); //For the button to show green colour

  const mainCat = 


  useEffect(() => {
    // Fetch data from the backend
    axios.get(`http://10.10.24.163:3000/products/getProduct`, {
        params: {productId}
    }) // Change to your server URL
      .then(response => {
        setProduct(response.data);
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

    <View className='flex-1 items-center justify-center'>
        <Image source={{ uri: product.imageUrls[0].url }} style={{ width: 200, height: 200 }} />
        <Text>{product.mainCategory}</Text>
        <Text>{product.name}</Text>
        <Text>{product.price}</Text>
        {product.discount > 0 && (
          <View>
            <Text>{product.discount}%</Text>
          </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    height: 300,
    backgroundColor: '#D1FAE5',
    borderRadius: 8,
    padding: 5,
    marginBottom: 20,
    elevation: 3,
    marginRight: 10
  },
  header: {
    position: 'relative',
  },
  discountTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#047857',
    padding: 5,
    borderRadius: 50,
  },
  discountText: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  actionIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 5,
  },
  ratingAndSold: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  soldText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  strikedPrice: {
    textDecorationLine: 'line-through',
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  discountPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginLeft: 10,
  },
});

//Create an account or Sign-In! {productId}