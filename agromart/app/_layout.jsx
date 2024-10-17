import { View, Text, Button } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';

export default function _layout() {
    const router = useRouter();

    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

    if (!publishableKey) {
        throw new Error(
            'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
        );
    }

    return (
        <ClerkProvider publishableKey={publishableKey}>
            <ClerkLoaded>
                <Stack 
                    screenOptions={{
                        headerShown: false, // This will hide the header globally for all Stack.Screen components
                    }}
                >
                    <Stack.Screen name="index" />
                    <Stack.Screen name="(tabs)" />
                    
                    {/* Use just the path for the ProductDetails screen 
                    <Stack.Screen name="product/:id" />*/}
                </Stack>
            </ClerkLoaded>
        </ClerkProvider>
    );
}
