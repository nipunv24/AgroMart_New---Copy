import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router'; // or your routing method

const ShiningButton = ({ label }) => {
  const [isPressed, setIsPressed] = useState(false);
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push('/categories/categories'); // Adjust the route as needed
      }}
      onPressIn={() => setIsPressed(true)} // Change scale on press
      onPressOut={() => setIsPressed(false)} // Reset scale on release
      activeOpacity={0.4}
      className={`relative flex-row items-center  transition duration-200 ease-in-out transform ${isPressed ? 'scale-95' : 'scale-100'}`}
      style={{
        height: 45, // Adjust height as needed
        paddingVertical: 2, // Control vertical padding
      }}
    >
      <LinearGradient
        colors={['#1b5e20', '#4caf50']} // Dark green gradient colors
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          borderRadius:10,
        }}
      />
      <Text className={`rounded p-2 text-lg mr-3 text-center underline z-10 text-white`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ShiningButton;
