import {Picker} from '@react-native-picker/picker';
import { useState} from 'react';
import { View } from 'react-native';

const Categories2 = () =>{

const [selectedLanguage, setSelectedLanguage] = useState();

return (
  <View className="mt-10">
    <Picker
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) =>
        setSelectedLanguage(itemValue)
      }>
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  </View>
)

};

export default Categories2