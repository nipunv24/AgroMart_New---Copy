import { AntDesign, Feather } from "@expo/vector-icons";

export const icons = {
    home: (props)=> <AntDesign name="home" size={26} {...props} />,
    notifications: (props)=> <Feather name="compass" size={26} {...props} />,
    cart: (props)=> <AntDesign name="pluscircleo" size={26} {...props} />,
    profile: (props)=> <AntDesign name="user" size={26} {...props} />,
}