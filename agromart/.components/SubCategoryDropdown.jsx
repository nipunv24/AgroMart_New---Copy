import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const SubCategoryDropdown = ({ categories, onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false); // To toggle the dropdown list
  const [selectedCategory, setSelectedCategory] = useState('Select Sub Category'); // To display selected category

  // Function to handle category selection
  const handleCategorySelect = (categoryName, categoryID) => {
    setSelectedCategory(categoryName);
    setIsOpen(false); // Close the dropdown after selecting
    onSelectCategory(categoryID); //passing the categoryName to the parent component
  };

  return (
    <View style={styles.container}>
      {/* Text box to display the selected category */}
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.dropdown}>
        <Text style={styles.selectedText}>{selectedCategory}</Text>
      </TouchableOpacity>

      {/* Dropdown list - only displayed when isOpen is true */}
      {isOpen && (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCategorySelect(item.name, item.id)} style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dropdown: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold'
  },
  list: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    maxHeight: 150, // Ensure there's enough space for the dropdown
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default SubCategoryDropdown;
