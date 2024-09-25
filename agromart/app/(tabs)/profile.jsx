import { View, Text, Button } from "react-native";
import { router } from "expo-router";

const Profile = () => {
   return(
    <View>
        <Text>Profile Page</Text>
        <Button title="Sign In" onPress={() => router.push('(auth)/sign-in')} />
    </View>
   );
};
export default Profile;