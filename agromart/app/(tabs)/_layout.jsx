import { Tabs } from 'expo-router';
import TabBar from "../../.components/TabBar";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide the default tab header (the one showing `(tabs)`)
      }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: true, // Show the header for this screen
          headerTitle: "Agromart", // Set the header title to "Agromart"
          title: "Home", // Tab bar label
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          headerShown: true, // Show the header for this screen
          headerTitle: "Agromart", // Set the header title to "Agromart"
          tabBarLabel: "Notifications", // Tab bar label
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerShown: true, // Show the header for this screen
          headerTitle: "Agromart", // Set the header title to "Agromart"
          tabBarLabel: "Cart", // Tab bar label
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true, // Show the header for this screen
          headerTitle: "Agromart", // Set the header title to "Agromart"
          tabBarLabel: "Profile", // Tab bar label
        }}
      />
    </Tabs>
  );
}
