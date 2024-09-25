import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'


export default function Page(){
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>Home Page is this</Text>
            <Link href="/home" asChild>
                <Button title="Open home" />
            </Link>
        </View>
    )
}
