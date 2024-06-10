import React, {useState} from 'react';
import {View, TextInput, Button, Dimensions} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import ReactNativeModal from 'react-native-modal';
const window = Dimensions.get('screen');
const AddPage = ({
  isVisible,
  setIsVisible,
  handleSave,
  itemName,
  setItemName,
  selectedDate,
  setSelectedDate,
}) => {
  const navigation = useNavigation();

  const clearData = () => {
    setItemName('');
    setSelectedDate(new Date());
  };

  return (
    <ReactNativeModal
      onBackdropPress={() => setIsVisible(prev => !prev)}
      isVisible={isVisible}>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          borderRadius: 12,
          padding: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <DatePicker
          date={selectedDate}
          mode="date"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: window.width,
          }}
          onDateChange={date => setSelectedDate(date)}
        />
        <TextInput
          placeholder="Öğe adı"
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            width: '100%',
            borderRadius: 12,
          }}
          value={itemName}
          onChangeText={text => setItemName(text)}
        />
        <View
          style={{
            marginTop: 12,
            width: '100%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Button title="Kaydet" onPress={handleSave} />
          <Button title="Temizle" onPress={clearData} />
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default AddPage;
