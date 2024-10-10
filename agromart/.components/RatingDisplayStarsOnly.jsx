import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RatingDisplayStarsOnly = ({ rating }) => {
  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.fullStar}>{'★'.repeat(Math.floor(rating))}</Text>
      <Text style={styles.emptyStar}>{'☆'.repeat(5 - Math.floor(rating))}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Equivalent to mb-4 in Tailwind
  },
  fullStar: {
    color: '#fbbf24', // Equivalent to text-yellow-500
    fontSize: 15, // Equivalent to text-2xl
  },
  emptyStar: {
    color: '#d1d5db', // Equivalent to text-gray-400
    fontSize: 15, // Equivalent to text-2xl
  },
  ratingText: {
    color: '#4b5563', // Equivalent to text-gray-600
    marginLeft: 2, // Equivalent to ml-2 in Tailwind
  },
});

export default RatingDisplayStarsOnly;
