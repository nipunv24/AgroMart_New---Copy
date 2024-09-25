import { router } from "expo-router";
import { View, Text, Button } from "react-native";

const Cart = () => {
   return(
    <View>
        <Text>Cart Page</Text>
        <Button title="Sign In" onPress={() => router.push('(auth)/sign-in')} />
    </View>
   );
};
export default Cart;