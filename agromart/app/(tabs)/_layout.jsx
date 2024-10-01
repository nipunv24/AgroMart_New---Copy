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

import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from "../../.components/TabBar"

export default function _layout() {
  return (
    <Tabs
      tabBar={props => <TabBar {...props}/>}
    >
        <Tabs.Screen name="home" options={{
             headerShown: false,
             title:"Home"
        }} />
        <Tabs.Screen name="notifications" options={{
            headerShown: false,
            tabBarLabel: 'Notifications'
        }}/>
        <Tabs.Screen name="cart" options={{
          headerShown: false,
          tabBarLabel: 'Cart'
        }}
        />
        <Tabs.Screen name="profile" options={{
          headerShown: false,
          tabBarLabel: 'Profile'
        }}
        />
    </Tabs>
  )
}

