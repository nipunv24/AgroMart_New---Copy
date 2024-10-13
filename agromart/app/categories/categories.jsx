import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, StyleSheet, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import SubCategoryDropdown from '../../.components/SubCategoryDropdown';
import DistrictDropdown from '../../.components/DistrictDropdown';
import CategoryDropdown from '../../.components/CategoryDropdown';
import ProductCard from '../../.components/ProductCard';
import LoadingIndicator from '../../.components/LoadingIndicator';
import { useRouter } from 'expo-router';

const Categories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    axios.get(`http://192.168.43.3:3000/products/subcategories`)
      .then(response => {
        const fetchedSubCategories = response.data;
        setSubCategories([{ id: 'all', name: 'All' }, ...fetchedSubCategories]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch sub categories:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://192.168.43.3:3000/products/categories`)
      .then(response => {
        const fetchedCategories = response.data;
        setCategories(['All', ...fetchedCategories]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch categories:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = async () => {
    if (!selectedCategoryDropdown || selectedSubCategoryIDDropdown === '' || selectedDistrictDropdown === '') {
      alert("Please select a category, subcategory, and district. Select All if you have no preference");
      return;
    }
    try {
      const response = await axios.post('http://192.168.43.3:3000/products/search', {
        subCategoryId: selectedSubCategoryIDDropdown,
        categoryName: selectedCategoryDropdown,
        districtName: selectedDistrictDropdown,
        minPrice: parseFloat(minPrice) || 0,
        maxPrice: parseFloat(maxPrice) || Infinity,
      });
      setProducts(response.data);
      router.push({
        pathname: '/(tabs)/home',
        params: { 
          filteredProducts: JSON.stringify(response.data),
          categoryName: selectedCategoryDropdown,
          districtName: selectedDistrictDropdown,
          subCategoryName: selectedSubCategoryNameDropdown,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedDistrictDropdown, setSelectedDistrictDropdown] = useState('');
  const handleSelectDistrict = (district) => setSelectedDistrictDropdown(district);

  const [selectedSubCategoryIDDropdown, setSelectedSubCategoryIDDropdown] = useState('');
  const [selectedSubCategoryNameDropdown, setSelectedSubCategoryNameDropdown] = useState('');
  const handleSubCategorySelect = (subCategoryName) => setSelectedSubCategoryIDDropdown(subCategoryName);
  const handleSubCategoryNameSelect = (categoryName) => setSelectedSubCategoryNameDropdown(categoryName);

  const [selectedCategoryDropdown, setSelectedCategoryDropdown] = useState('');
  const handleCategorySelect = (categoryName) => setSelectedCategoryDropdown(categoryName);

  const dismissKeyboard = () => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss(); // Only dismiss the keyboard on iOS
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ padding: 20, marginTop: '10%' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Filter Products</Text>

        <View className='mt-5 mb-5'>
          <Text>Category:</Text>
          <CategoryDropdown categories={categories} onSelectCategory={handleCategorySelect} />
        </View>

        <View className='mt-5 mb-5'>
          <Text>Sub Category:</Text>
          <SubCategoryDropdown categories={subCategories} onSelectCategory={handleSubCategorySelect} onSelectCategoryName={handleSubCategoryNameSelect} />
        </View>

        <View className=' mb-5'>
          <Text>District:</Text>
          <DistrictDropdown onSelectDistrict={handleSelectDistrict} />
        </View>

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

        <TouchableOpacity onPress={handleSearch} style={{ backgroundColor: 'green', padding: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Search</Text>
        </TouchableOpacity>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard key={item.id} product={item} />}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 0 }}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Categories;
