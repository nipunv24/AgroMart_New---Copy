import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import RatingDisplayStarsOnly from './RatingDisplayStarsOnly';


const screenWidth = Dimensions.get('window').width;

const ProductCard = ({ product }) => {

  // Calculate discount price
  const discountPrice = (product.price - (product.price * product.discount) / 100).toFixed(2);

  // Calculate rating
  const calculateRating = () => {
    const reviews = product.reviews;
    if (!reviews || reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };
  rating = calculateRating();


  // Navigate to product detail page
  const router = useRouter();
  const goToProductPage = (productId) => {
    router.push(`product/${productId}`);
  };


  //Used a useState and placeholder image to prevent errors if image not uploaded.
  const [imageUri, setImageUri] = useState(product?.imageUrls?.[0]?.url);
  const placeholderImage = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";



  return (
    <TouchableOpacity style={styles.card} onPress={() => goToProductPage(product.id)}>

      {/* ImageDisplay */}
      <View style={styles.header}>
        {/* ImageDisplay */}
        <Image
          source={{ uri: imageUri || placeholderImage }}
          onError={() => setImageUri(placeholderImage)}
          style={styles.productImage}
        />
      </View>

      {/* ProductName Display */}
      <Text style={styles.productName} numberOfLines={1}>
        {product.name}
      </Text>


      {/* DiscountTag Display */}
      {product.discount > 0 && (
          <View style={styles.discountTag}>
            <Text style={styles.discountText}>{product.discount}%</Text>
          </View>
        )}

      {/* SoldAmount and Rating Display */}
      <View style={styles.ratingAndSold}>  
        <Text style={styles.soldText}>{product.orderIds.length}+ sold</Text>
        <RatingDisplayStarsOnly rating={rating}/>
      </View>

      {/* Initial and Discounted Price Display */}
      <View style={styles.priceContainer}>
        <Text style={[styles.price, product.discount > 0 && styles.strikedPrice]}>
          ${product.price}
        </Text>
        {product.discount > 0 && <Text style={styles.discountPrice}>${discountPrice}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.42,
    height: 300,
    backgroundColor: '#D1FAE5',
    borderRadius: 8,
    padding: 5,
    marginBottom: 20,
    elevation: 3,
    marginRight: 10
  },
  header: {
    position: 'relative',
  },
  discountTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 50,
  },
  discountText: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  actionIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 5,
  },
  ratingAndSold: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  soldText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 10,
    marginRight: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  strikedPrice: {
    textDecorationLine: 'line-through',
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  discountPrice: {
    fontSize: 18,
    fontWeight: '700',
    //color: '#000',
    color:'brown',
    marginLeft: 10,
  },
});

export default ProductCard;
