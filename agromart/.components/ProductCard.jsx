import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// import StarRating from 'react-native-star-rating';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import useCart from '@/hooks/addtocardStore';
// import watchCart from '@/hooks/watchlistStore';
// import usePreviewModal from '@/hooks/usePreviewModal';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
// import { StarRatingDisplay } from 'react-native-star-rating-widget';



const screenWidth = Dimensions.get('window').width;

const ProductCard = ({ product }) => {
  // // const [isMounted, setIsMounted] = useState(false);
  // const cart = useCart();
  // const watchlist = watchCart();
  // const previewModal = usePreviewModal();
  // const navigation = useNavigation();
  const router = useRouter();
 
  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // Calculate discount price
  const discountPrice = product.price - (product.price * product.discount) / 100;

  // Calculate rating
  const calculateRating = () => {
    const reviews = product.reviews;
    if (!reviews || reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  rating = calculateRating();

  // Add product to cart
//   const onAddToCart = (event) => {
//     event.stopPropagation();
//     cart.addItem(product);
//   };

//   // Add product to watchlist
//   const onAddToWatchlist = (event) => {
//     event.stopPropagation();
//     watchlist.addItem(product);
//   };

//   // Open preview modal
//   const preview = (event) => {
//     event.stopPropagation();
//     previewModal.open(product);
//   };

  // Navigate to product detail page
  const goToProductPage = (productId) => {
    router.push(`product/${productId}`);
  };

  // if (!isMounted) return null;

  return (
    <TouchableOpacity style={styles.card} onPress={() => goToProductPage(product.id)}>
      <View style={styles.header}>
        {product.discount > 0 && (
          <View style={styles.discountTag}>
            <Text style={styles.discountText}>{product.discount}%</Text>
          </View>
        )}
        <Image source={{ uri: product.imageUrls[0].url }} style={styles.productImage} />
        <View style={styles.actionIcons}>
          {/* <TouchableOpacity onPress={preview}>
            <Icon name="zoom-in" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onAddToCart}>
            <Icon name="shopping-cart" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onAddToWatchlist}>
            <Icon name="bookmark" size={20} color="gray" />
          </TouchableOpacity> */}
        </View>
      </View>
      <Text style={styles.productName} numberOfLines={1}>
        {product.name}
      </Text>
      <View style={styles.ratingAndSold}>
        {/* <StarRating
          disabled={true}
          maxStars={5}
          rating={calculateRating()}
          starSize={15}
          fullStarColor="orange"
        /> */}
         
        <Text style={styles.soldText}>{product.orderIds.length}+ sold</Text>
        <Text>Rating: {rating.toFixed(1)}</Text>
      </View>
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
    backgroundColor: '#047857',
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
    color: '#000',
    marginLeft: 10,
  },
});

export default ProductCard;
