import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';


const districtsOfSriLanka = [
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Monaragala",
    "Mullaitivu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya"
];


const DistrictDropdown = () => {
  const [isOpen, setIsOpen] = useState(false); // To toggle the dropdown list
  const [selectedDistrict, setSelectedDistrict] = useState('Select District'); // To display selected district


  // Function to handle category selection
  const handleDistrictSelect = (districtName) => {
    setSelectedDistrict(districtName);
    setIsOpen(false); // Close the dropdown after selecting
  };


  return (
    <View style={styles.container}>
      {/* Text box to display the selected category */}
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.dropdown}>
        <Text style={styles.selectedText}>{selectedDistrict}</Text>
      </TouchableOpacity>

      {/* Dropdown list - only displayed when isOpen is true */}
      {isOpen && (
        <FlatList
          data={districtsOfSriLanka}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDistrictSelect(item)} style={styles.item}>
              <Text style={styles.itemText}>{item}</Text>
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
    borderColor: 'green',
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

export default DistrictDropdown;

