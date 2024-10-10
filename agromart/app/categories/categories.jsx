import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import CategoryDropdown from '../../.components/CategoryDropdown';
import DistrictDropdown from '../../.components/DistrictDropdown';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]); // Adjust if you have a District model
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([]);



  useEffect(() => {
    // Fetch data from the backend
    axios.get(`http://192.168.43.3:3000/products/categories`) // Change to your server URL
      .then(response => {
        setCategories(response.data);
        setLoading(false); // Data has been fetched, stop loading
      })
      .catch(error => {
        console.error('Failed to fetch categories:', error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);


  //useEffect to fetch the districts
  useEffect(() => {
    // Fetch data from the backend
    axios.get(`http://192.168.43.3:3000/products/districts`) // Change to your server URL
      .then(response => {
        setDistricts(response.data);
        setLoading(false); // Data has been fetched, stop loading
      })
      .catch(error => {
        console.error('Failed to fetch categories:', error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

    // Fetch districts (if you have a District model)
  //   const fetchDistricts = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/products/districts');
  //       setDistricts(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchCategories();
  //   fetchDistricts();
  // }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:3000/products/search', {
        categoryId: selectedCategory,
        districtId: selectedDistrict,
        minPrice: parseInt(minPrice) || 0,
        maxPrice: parseInt(maxPrice) || Infinity,
      });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 20 ,  marginTop: '10%'  }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Filter Products</Text>
      <View className='mt-5 mb-5'>
        <Text>Category:</Text>
        <CategoryDropdown categories={categories}/>
      </View>


      {/* District Dropdown */}
      <View className=' mb-5'>
        <Text>District:</Text>
        <DistrictDropdown/>
      </View>
      

      {/* Price Range Inputs */}
      <Text>Price Range:</Text>
      <TextInput
        placeholder="Min Price"
        keyboardType="numeric"
        value={minPrice}
        onChangeText={setMinPrice}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <TextInput
        placeholder="Max Price"
        keyboardType="numeric"
        value={maxPrice}
        onChangeText={setMaxPrice}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />

      {/* Search Button */}
      <TouchableOpacity onPress={handleSearch} style={{ backgroundColor: 'green', padding: 10 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Search</Text>
      </TouchableOpacity>

      {/* Display Products */}
      <View>
        {products.map((product) => (
          <View key={product.id}>
            <Text>{product.name}</Text>
            <Text>{product.price}</Text>
            <Text>{product.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Categories;
