import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Image } from 'react-native';
import { images } from '../../constants';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View className="flex-1 p-5 justify-center bg-[#F0F4EF]">
      <Image className="mb-8 self-center" source={images.logo} />
      <TextInput
        className="h-12 border-b border-[#4CAF50] mb-4 bg-transparent p-2"
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        placeholderTextColor="#256509" // Match Sign Up placeholder
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        className="h-12 border-b border-[#4CAF50] mb-4 bg-transparent p-2"
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        placeholderTextColor="#256509" // Match Sign Up placeholder
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity
        className="bg-[#4CAF50] rounded-full py-3 shadow-md mb-5 mt-5"
        onPress={onSignInPress}
      >
        <Text className="text-white text-center font-bold text-lg">Sign In</Text>
      </TouchableOpacity>
      <View className="mt-5 items-center">
        <Text className="text-[#4CAF50] text-lg">Don't have an account?</Text>
        <Link href="/sign-up">
          <Text className="text-[#4CAF50] font-bold mt-1 underline text-lg">Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
