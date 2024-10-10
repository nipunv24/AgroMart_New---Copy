import { AntDesign, Feather, Entypo, Ionicons } from "@expo/vector-icons";

export const icons = {
    home: (props)=> <AntDesign name="home" size={26} {...props} />,
    notifications: (props)=> <AntDesign name="message1" size={26} {...props} />,
    cart: (props)=> <AntDesign name="shoppingcart" size={26} {...props} />,
    profile: (props)=> <AntDesign name="user" size={26} {...props} />,
    categories: (props)=> <Entypo name="sound-mix" size={26} {...props} />,
    chat: (props) => <Ionicons name="chatbox-ellipses-outline" size={26} {...props}/>
}