import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Text, View, Image, ScrollView, Dimensions, SafeAreaView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter} from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingIndicator from '../../.components/LoadingIndicator';
import RatingDisplay from '../../.components/RatingDisplay';
import ButtonInProduct from './components/ButtonInProduct';
import Reviews from './components/Reviews';




export default function Page() {
  const { user } = useUser();
  const { productId } = useLocalSearchParams();
  console.log("this is", productId);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status


  //Getting Discount Price
  const discountPrice = (product.price - (product.price * product.discount) / 100).toFixed(2);


  // Get screen dimensions
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


  //Function to redirect to cart page when "Add to Cart" button is clicked.
  const router = useRouter();
  const goToCart = () => {
    router.push('(tabs)/cart');
  }




  //Function to redirect to notifications page when "Contact seller is pressed" button is clicked.
  const contactSeller = () => {
    router.push('(tabs)/notifications');
  }





  // Function to calculate and return rating
  const calculateRating = () => {
    const reviews = product.reviews;
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1); // Return rating rounded to 1 decimal
  };
  const rating = calculateRating();





  //useEffect which fetches product data
  useEffect(() => {
    // Fetch data from the backend
    axios.get(`http://192.168.43.3:3000/products/product`, {
      params: { productId }
    }) // Change to your server URL
      .then(response => {
        setProduct(response.data);
        setLoading(false); // Data has been fetched, stop loading
      })
      .catch(error => {
        console.error('Failed to fetch products:', error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);





  //This is to wait until the data is recieved from the backend.
  if (loading) {
    return <LoadingIndicator />; // Show loading indicator while data is being fetched
  }





  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className=" p-0">
      <View className="flex-1 items-center bg-white p-2">



        {/* ImageDisplay */}
        {product.imageUrls && product.imageUrls.length > 0 ? (
          <Image
          source={{ uri: product.imageUrls[0].url }}
          style={{
            width: screenWidth, // Set the image width to match the screen width
            height: Platform.OS === 'ios' ? 300 : screenHeight*0.4, // Set a fixed height based on platform
            resizeMode: 'cover', // Ensure the image covers the area
             // Optional: add a border radius for nicer lookcreenWidth, height: screenHeight * 0.4 }}
          }}
          className="mb-4 mt-10"
        />
        ) :
        (
          <Text className="text-center text-gray-500">No image found</Text>
        )}

      


        {/* Name, Main Category, Sub Category */}
        <Text className="text-2xl font-bold text-center">{product.name}</Text>
        <Text className="text-sm text-gray-600 mb-1 text-center">{product.mainCategory}</Text>
        <Text className="text-sm text-gray-600 mb-1 text-center">{product.category.name}</Text>




        {/* StarRating and Sold Amount */}
        <View className="flex-row items-center mb-2 mt-2">
          <RatingDisplay rating={rating}/>  
          <Text className="text-gray-500 text-center ml-2">|   {product.orderIds.length}+ sold</Text>
        </View>





        {/* PriceDisplay */}
        <View className="flex-row items-center mb-2 mt-2">
          <Text className="text-2xl font-bold text-green-700 mr-2">
            ${discountPrice}
          </Text>
          <Text className="text-lg font-medium text-gray-500 line-through mr-2">
            ${product.price}
          </Text>
          {product.discount > 0 && (
          <View className="bg-red-200 p-0.5">
            <Text className="text-red-700 text-center">{product.discount}% off</Text>
          </View>
        )}
        </View>





        {/* Description */}
        <Text className="text-gray-600 mb-4 text-center text-sm">{product.description}</Text>




        {/* Buttons */}
        <View className="flex-row items-center">
        <ButtonInProduct text="Add to Cart" onPress={goToCart} iconName="cart"/>
        <ButtonInProduct text="Contact Seller" onPress={contactSeller} iconName="chat"/>
        </View>
      </View>

      <View className="mb-5 mt-5">
          <Reviews productId={productId}/>
        </View>
    </ScrollView>
  
    </SafeAreaView>
  
  );
}



//Create an account or Sign-In! {productId}