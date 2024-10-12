import { View, Text, Button, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import {images} from '../constants'


export default function Page(){

    const backgroundImage = {uri : 
        "https://images.pexels.com/photos/4451867/pexels-photo-4451867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        //"https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    };
    const { width, height } = Dimensions.get('window');

    // Calculate 40% of the screen height
    const topPosition = height * 0.35; // 40% of the available height


    return(

        <ImageBackground
            source={backgroundImage}
            className= "flex-1"
            resizeMode="cover" // This will cover the entire screen
            style={{ width, height }}
        >

        <View  style={{
                    position: 'absolute', // Use absolute positioning
                    top: topPosition, // Set the top position to 40% of the height
                    left: 0,
                    right: 0,
                    alignItems: 'center', // Center align items
                    justifyContent: 'center', // Center justify content
                }}>
            <Image className="mb-4" source={images.logo}/>
            <Link href="/(tabs)/home" asChild>
                <TouchableOpacity className="bg-green-600 py-2 px-16 mt-8 rounded-full w-[80%] h-14 justify-center" activeOpacity={0.9}>
                    <Text className="text-white text-lg font-semibold text-center">Start Shopping!</Text>
                </TouchableOpacity>
            </Link>
        </View>
        </ImageBackground>
    )
}
