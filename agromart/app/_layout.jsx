import { View, Text, Button } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'

export default function _layout() {
    const router = useRouter();

    return(
        <Stack>
            <Stack.Screen name="index"/>
            <Stack.Screen name="(tabs)"/>
        </Stack>
    )
}