// import React, { useState } from 'react';
// import { Tabs, useRouter } from 'expo-router';

// const TabsLayout = () => {
//   const [isSignedIn, setIsSignedIn] = useState(false); // Simulating user not being signed in
//   const router = useRouter();

//   const handleTabPress = (routeName) => {
//     if (!isSignedIn && (routeName === 'notifications' || routeName === 'cart')) {
//       // Redirect to sign-in if user is not signed in
//       router.push('/auth/sign-in');
//     }
//   };

//   return (
//     <Tabs>
//       <Tabs.Screen name="home" />
//       <Tabs.Screen name="profile" />
//       <Tabs.Screen 
//         name="notifications" 
//         listeners={{ tabPress: (e) => handleTabPress('notifications') }} 
//       />
//       <Tabs.Screen 
//         name="cart" 
//         listeners={{ tabPress: (e) => handleTabPress('cart') }} 
//       />
//     </Tabs>
//   );
// };

// export default TabsLayout;


// import React from 'react';
// import { Tabs } from 'expo-router';
// import { View, Text, StyleSheet } from 'react-native';

// const TabsLayout = () => {
//   return (
//     <View style={styles.container}>
//       <Tabs>
//         <Tabs.Screen name="home" options={{ title: 'Home' }} />
//         <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
//         <Tabs.Screen name="notifications" options={{ title: 'Notifications' }} />
//         <Tabs.Screen name="cart" options={{ title: 'Cart' }} />
//       </Tabs>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 18,
//     marginTop: 20,
//   },
// });

// export default TabsLayout;

import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

export default function _layout() {
  return (
    <Tabs>
        <Tabs.Screen name="home" options={{
            headerTitle: "Home",
            tabBarLabel: 'Home'
        }} />
        <Tabs.Screen name="notifications" options={{
            headerTitle: "Notifications",
            tabBarLabel: 'Notifications'
        }}/>
        <Tabs.Screen name="cart" options={{
          headerTitle: "Cart",
          tabBarLabel: 'Cart'
        }}
        />
        <Tabs.Screen name="profile" options={{
          headerTitle: "Profile",
          tabBarLabel: 'Profile'
        }}
        />
    </Tabs>
  )
}

