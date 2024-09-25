import { View, Text, Button } from "react-native";
import { router } from "expo-router";

const Notifications = () => {
   return(
    <View>
        <Text>Notifications Page</Text>
        <Button title="Sign In" onPress={() => router.push('(auth)/sign-in')} />
    </View>
   );
};
export default Notifications;