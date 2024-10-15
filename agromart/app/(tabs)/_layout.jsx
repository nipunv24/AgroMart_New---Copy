import { Tabs } from 'expo-router';
import TabBar from "../../.components/TabBar";
import { SafeAreaView } from 'react-native';



export default function _layout() {

  return (
    <>

      <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false, // Hide the default tab header (the one showing `(tabs)`)
        }}
        tabBar={props => <TabBar {...props} />}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false, // Show the header for this screen
            headerTitle: "Agromart", // Set the header title to "Agromart"
            title: "Home", // Tab bar label
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            headerShown: false, // Show the header for this screen
            headerTitle: "Agromart", // Set the header title to "Agromart"
            tabBarLabel: "Notifications", // Tab bar label
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            headerShown: false, // Show the header for this screen
            headerTitle: "Agromart", // Set the header title to "Agromart"
            tabBarLabel: "Cart", // Tab bar label
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false, // Show the header for this screen
            headerTitle: "Agromart", // Set the header title to "Agromart"
            tabBarLabel: "Profile", // Tab bar label
          }}
        />
      </Tabs>
      </SafeAreaView>
    </>
  );
}
