import { View, Text, Button, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import {images} from '../constants'


export default function Page(){
    return(
        <View className="flex-1 items-center justify-center">
            <Image className="mb-8" source={images.logo}/>
            <Link href="/(tabs)/home" asChild>
                <TouchableOpacity className="bg-green-600 py-2 px-16 mt-8 rounded-full w-[80%] h-14 justify-center" activeOpacity={0.9}>
                    <Text className="text-white text-lg font-semibold text-center">Start Shopping!</Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}
