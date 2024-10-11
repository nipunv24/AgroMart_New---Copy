import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import SubCategoryDropdown from '../../.components/SubCategoryDropdown';
import DistrictDropdown from '../../.components/DistrictDropdown';
import CategoryDropdown from '../../.components/CategoryDropdown';

const Categories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [districts, setDistricts] = useState([]); // Adjust if you have a District model
  // const [selectedCategory, setSelectedCategory] = useState('');
  // const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([]);



  useEffect(() => {
    // Fetch data from the backend
    axios.get(`http://192.168.43.3:3000/products/subcategories`) // Change to your server URL
      .then(response => {
        setSubCategories(response.data);
        setLoading(false); // Data has been fetched, stop loading
      })
      .catch(error => {
        console.error('Failed to fetch sub categories:', error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);


  //useEffect which will fetch the category names
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


  //Below logic handles the storing of the district name selected using the dropdown
  const [selectedDistrictDropdown, setSelectedDistrictDropdown] = useState(''); // State for storing the selected district
  const handleSelectDistrict = (district) => {
    setSelectedDistrictDropdown(district); // Update the selected district
    console.log(selectedDistrictDropdown);
  };


  //Below logic handles the storing of the sub cateogory name selected using the dropdown.
  const [selectedSubCategoryIDDropdown, setSelectedSubCategoryIDDropdown] = useState('');
  const handleSubCategorySelect = (subCategoryName) => {
    setSelectedSubCategoryIDDropdown(subCategoryName);
  }


   //Below logic handles the storing of the cateogory name selected using the dropdown.
   const [selectedCategoryDropdown, setSelectedCategoryDropdown] = useState('');
   const handleCategorySelect = (categoryName) => {
     setSelectedCategoryDropdown(categoryName);
   }


  const handleSearch = async () => {
    try {
      const response = await axios.post('http://192.168.43.3:3000/products/search', {
        categoryId: selectedSubCategoryIDDropdown,
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
        <CategoryDropdown categories={categories} onSelectCategory={handleCategorySelect}/>
      </View>



      <View className='mt-5 mb-5'>
        <Text>Sub Category:</Text>
        <SubCategoryDropdown categories={subCategories} onSelectCategory={handleSubCategorySelect}/>
      </View>


      {/* District Dropdown */}
      <View className=' mb-5'>
        <Text>District:</Text>
        <DistrictDropdown onSelectDistrict={handleSelectDistrict}/>
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


      {/* View to display the selected categoryName*/}
      <View>
      {selectedCategoryDropdown ? (
        <Text>Selected CategoryName: {selectedCategoryDropdown}</Text>
      ) : (
        <Text>No category selected yet.</Text>
      )}
      </View>


      {/* View to display the selected sub category ID*/}
      <View>
      {selectedSubCategoryIDDropdown ? (
        <Text>Selected SubCategoryID: {selectedSubCategoryIDDropdown}</Text>
      ) : (
        <Text>No subcategory ID selected yet.</Text>
      )}
      </View>


      

      {/* View to display the selected districts */}
      <View>
      {selectedDistrictDropdown ? (
        <Text>Selected District: {selectedDistrictDropdown}</Text>
      ) : (
        <Text>No district selected yet.</Text>
      )}
      </View>


      
    

      {/* Display Products */}
      <View className="mt-5">
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
