import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';




const StarRating = () =>{

    const [defaultRating, setdefaultRating] = useState(2);
    const [maxRating, setmaxRating] = useState([1,2,3,4,5]);

    const starImgFilled = 'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';
    const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/refs/heads/main/star_corner.png';

    const customerRatingBar = () => {
        return(
            <View>
                {
                    maxRating.map((item,key)=> {                       
                        return(
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={item}
                            >
                            
                            </TouchableOpacity>
                        )
                    }
                    )
                }
            </View>
        )
    }

};

export default StarRating