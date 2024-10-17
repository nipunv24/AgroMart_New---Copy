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

import { useAuth } from '@clerk/clerk-expo';
import { Link,useRouter } from 'expo-router'
import { useState } from 'react';
import { Text, View,TouchableOpacity,SafeAreaView, Image } from 'react-native'
import { SignedIn, SignedOut,useUser } from '@clerk/clerk-expo';

const Profile = () => {

  const {signOut } = useAuth();
  const [isLoading,setIsloading]= useState();
  const router = useRouter();

  const handleSignOut = async () => {
    setIsloading(true)
    try {
      await signOut(); // Call the signOut method
      // Optionally, navigate to a sign-in screen or show a success message
    } catch (err) {
      console.error('Error signing out:', err); // Handle errors if any
    }
    setIsloading(false)
    router.push("/(auth)/sign-in")
  };


  return (
    <SafeAreaView className="flex-1 p-4 mt-5">
      <Text className="text-2xl font-bold mb-4">My Profile</Text>
      <View className="flex-1">
        {/* Profile Picture */}
        <View className="flex items-center mb-4">
          <Image
            source={{ uri: 'https://img.freepik.com/premium-vector/people-profile-graphic_24911-21373.jpg' }} // Replace with actual image URL
            className="w-24 h-24 rounded-full border border-gray-300 mb-2"
          />
          <Text className="text-xl font-bold">John Doe</Text>
        </View>

        {/* Profile Details */}
        <View className="border-b border-gray-300 py-2">
          <Text className="text-lg font-bold">Email: </Text>
          <Text className="text-gray-600">nipunviraj24@gmail.com</Text>
        </View>
        <View className="border-b border-gray-300 py-2">
          <Text className="text-lg font-bold">Phone: </Text>
          <Text className="text-gray-600">+94718795359</Text>
        </View>
        <View className="border-b border-gray-300 py-2">
          <Text className="text-lg font-bold">Address: </Text>
          <Text className="text-gray-600">No 217/1, Bakery Road, Ratnapura</Text>
        </View>



        {/* Logout Button */}
        <TouchableOpacity disabled={isLoading} className="bg-red-600 rounded p-2 mt-4" onPress={handleSignOut}>
          <Text className="text-white font-bold text-center">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
