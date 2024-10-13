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

//import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
//import { Link } from 'expo-router'
import { Text, View,TouchableOpacity, SafeAreaView } from 'react-native'

  const Notifications = () => {
    return (
      <SafeAreaView className="flex-1 p-4 mt-5">
        <Text className="text-2xl font-bold mb-4">Notifications</Text>
      <View className="flex-1">
        {/* Sample notifications */}
        <View className="border-b border-gray-300 py-2">
          <Text className="text-lg font-semibold">New Message</Text>
          <Text className="text-gray-600">You have a new message from store 1.</Text>
          <Text className="text-sm text-gray-400">2 hours ago</Text>
        </View>
        <View className="border-b border-gray-300 py-2">
          <Text className="text-lg font-semibold">Order Shipped</Text>
          <Text className="text-gray-600">Your order #100592564897 has been shipped and is on its way!</Text>
          <Text className="text-sm text-gray-400">3 hours ago</Text>
        </View>
        <View className="border-b border-gray-300 py-2">
          <Text className="text-lg font-semibold">Reminder</Text>
          <Text className="text-gray-600">Don't forget to review your recent purchases.</Text>
          <Text className="text-sm text-gray-400">2 days ago</Text>
        </View>

        {/* Add more notifications as needed */}
      </View>
      </SafeAreaView>
    );
  };

export default Notifications;