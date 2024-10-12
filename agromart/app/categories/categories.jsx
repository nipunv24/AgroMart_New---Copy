import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import SubCategoryDropdown from '../../.components/SubCategoryDropdown';
import DistrictDropdown from '../../.components/DistrictDropdown';
import CategoryDropdown from '../../.components/CategoryDropdown';
import ProductCard from '../../.components/ProductCard';
import { useRouter } from 'expo-router';

const Categories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [districts, setDistricts] = useState([]); // Adjust if you have a District model
  // const [selectedCategory, setSelectedCategory] = useState('');
  // const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([]);

  //using router to send the filtered products as a parameter into the homepage.
  const router = useRouter();


    // Fetch subcategories from the backend
  useEffect(() => {
    axios.get(`http://192.168.43.3:3000/products/subcategories`) // Change to your server URL
      .then(response => {
        const fetchedSubCategories = response.data;
        setSubCategories([{ id: 'all', name: 'All' }, ...fetchedSubCategories])
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
        const fetchedCategories = response.data;
        setCategories(['All', ...fetchedCategories]);
        setLoading(false); // Data has been fetched, stop loading
      })
      .catch(error => {
        console.error('Failed to fetch categories:', error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);


  


  //This function will handle what happens after search is cliked. Basically it sends the recieved data into the homepage.
  const handleSearch = async () => {
      // Check if category, subcategory, and district are selected
    if (!selectedCategoryDropdown || selectedSubCategoryIDDropdown === '' || selectedDistrictDropdown === '') {
      alert("Please select a category, subcategory, and district. Select All if you have no preference"); // Show an alert
      return; // Exit the function early
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
      // Pass the filtered products and navigate to Home
      router.push({
        pathname: '/(tabs)/home',
        params: { 
          filteredProducts: JSON.stringify(response.data),
          categoryName: selectedCategoryDropdown, //sending main category name to the homepage
          districtName: selectedDistrictDropdown, //sending district name to the homepage
          subCategoryName: selectedSubCategoryNameDropdown, //directly sending the sub category name into the homepage
        },
      });
    } catch (error) {
      console.error(error);
    }
  };


  
  //Below logic handles the storing of the district name selected using the dropdown. Refer line 138 and the functions in the related component.
  const [selectedDistrictDropdown, setSelectedDistrictDropdown] = useState(''); // State for storing the selected district
  const handleSelectDistrict = (district) => {
    setSelectedDistrictDropdown(district); // Update the selected district

  };


  //Below logic handles the storing of the sub cateogory name and id selected using the dropdown. Refer line 131 and the functions in the related component.
  const [selectedSubCategoryIDDropdown, setSelectedSubCategoryIDDropdown] = useState('');
  const [selectedSubCategoryNameDropdown, setSelectedSubCategoryNameDropdown] = useState('');
  const handleSubCategorySelect = (subCategoryName) => { //stores sub category ID
    setSelectedSubCategoryIDDropdown(subCategoryName);
  }
  const handleSubCategoryNameSelect = (categoryName) =>{  //stores sub category name.
      setSelectedSubCategoryNameDropdown(categoryName);
  }


   //Below logic handles the storing of the cateogory name selected using the dropdown. Refer line 124 and the functions in the related component.
   const [selectedCategoryDropdown, setSelectedCategoryDropdown] = useState('');
   const handleCategorySelect = (categoryName) => {
     setSelectedCategoryDropdown(categoryName);
    }
   
    if (loading) {
      return <LoadingIndicator />; // Show loading indicator while data is being fetched
    }


  return (
    <View style={{ padding: 20 ,  marginTop: '10%'  }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Filter Products</Text>

      <View className='mt-5 mb-5'>
        <Text>Category:</Text>
        <CategoryDropdown categories={categories} onSelectCategory={handleCategorySelect}/>
      </View>



      <View className='mt-5 mb-5'>
        <Text>Sub Category:</Text>
        <SubCategoryDropdown categories={subCategories} onSelectCategory={handleSubCategorySelect} onSelectCategoryName={handleSubCategoryNameSelect}/>
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
        <Text>Selected District: {selectedDistrictDropdown}</Text>
      )}
      </View>


      
    

      {/* Display Products */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id} // Ensure the key is unique, convert to string if necessary
        renderItem={({ item }) => (
          // <View className="flex-1 m-1">
          //     <Image source={{ uri: item.imageUrls[0].url }} className="w-full h-40 rounded-lg" />
          //     <Text className="mt-2 font-semibold text-center">{item.name}</Text>
          //     {/* <Text className="text-gray-600 text-center">{item.description}</Text> */}
          // </View>
          <ProductCard key={item.id} product={item}/>
        )}
        numColumns={2} // Ensure this value remains constant
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 0 }} // Add horizontal padding for spacing
        contentContainerStyle={{ paddingBottom: 20 }} // Optional: Adds padding to the bottom of the list
        key={products.length} // Using products.length to force a fresh render if products change
      />
    </View>
  );
};

export default Categories;
