import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Text, View, Image, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter} from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RatingDisplayStarsOnly from '../../../.components/RatingDisplayStarsOnly';



const Reviews = ({productId}) => {

    const[reviews,setReviews] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // Fetch data from the backend
        axios.get(`http://192.168.43.3:3000/products/reviews`, {
          params: { productId }
        }) // Change to your server URL
          .then(response => {
            setReviews(response.data);
            setLoading(false); // Data has been fetched, stop loading
          })
          .catch(error => {
            console.error('Failed to fetch products:', error);
            setLoading(false); // Stop loading even if there's an error
          });
      }, [productId]);


    if(loading){
        return <Text>Loading Reviews</Text>;
    }

    if (reviews.length === 0) {
        return <Text> </Text>;
    }

    return (
        <ScrollView className="p-4 bg-white w-[100vw]" contentContainerStyle={{ flexGrow: 1 }}>
            <Text className="text-lg font-bold text-center mb-5">Reviews</Text>
            {reviews.map((review, index) => (
                <View key={index} className="mb-4 p-4 border rounded-lg shadow">
                    <Text className="text-lg font-semibold text-gray-800">Anonymous User</Text>
                    <Text className="text-gray-600 mt-1 text-sm">{review.comment}</Text>
                    <RatingDisplayStarsOnly rating={review.rating}/>
                </View>
            ))}
        </ScrollView>
    )

}
export default Reviews;