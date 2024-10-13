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
import { Text, View,TouchableOpacity, SafeAreaView} from 'react-native'

const Cart = () => {
  return (
    <SafeAreaView className="flex-1 p-4 mt-5">
      <Text className="text-2xl font-bold">Shopping Cart</Text>
      <View className="flex-1">
        {/* Sample cart items */}
        <View className="border-b border-gray-300 py-2">
          <Text className="text-lg">Tomatoes 1kg</Text>
          <Text className="text-gray-600">Quantity: 1</Text>
        </View>
        <View className="border-b border-gray-300 py-2">
          <Text className="text-lg">Lettuce</Text>
          <Text className="text-gray-600">Quantity: 2</Text>
        </View>
        <View className="flex-row justify-between mt-4">
          <Text className="text-lg font-bold">Total:</Text>
          <Text className="text-lg font-bold">$62.00</Text>
        </View>
        <TouchableOpacity className="bg-green-800 rounded p-2 mt-4">
          <Text className="text-white font-bold text-center">Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
