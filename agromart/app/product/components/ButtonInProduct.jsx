import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { icons } from '../../../constants/vectorIcons';

const ButtonInProduct = ({text, onPress, iconName}) => {

    const iconComponent = icons[iconName];

    return(
        <TouchableOpacity
            className="bg-[#130f43] py-3 shadow-md m-2 flex-1 rounded-lg"
            onPress={onPress}
        >
            <View className="flex-row items-center justify-center">
                {iconComponent ? iconComponent({color: 'white'}) : null }
                <Text className="text-white text-center font-bold text-xs ml-2">{text}</Text>
            </View>
        </TouchableOpacity>

    );
}

export default ButtonInProduct;