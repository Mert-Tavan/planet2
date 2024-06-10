import React, {Component, useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
  LocaleConfig,
} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import AddPage from '../AddPage';

LocaleConfig.locales['tr'] = {
  monthNames: [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ],
  monthNamesShort: [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Hazir',
    'Temmu.',
    'Ağust',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ],
  dayNames: [
    'Pazar',
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
  ],
  dayNamesShort: ['Pzr', 'Pzrts', 'Salı', 'Çrşmb', 'Prşmb', 'Cuma', 'Cmrts'],
  today: 'Bugün',
};
LocaleConfig.defaultLocale = 'tr';

const AgendaScreen = () => {
  const [items, setItems] = useState();
  const [isVisibleAddPage, setIsVisibleAddPage] = useState(false);
  const [itemName, setItemName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formattedDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('myItems');
      if (storedItems !== null) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Veriler alınırken bir hata oluştu:', error);
    }
  };

  const refreshData = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('myItems');
      if (storedItems !== null) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Veriler alınırken bir hata oluştu:', error);
    }
  };

  const handleDelete = async () => {
    console.log('deneme');
  };
  // reservationsKeyExtractor = (item, index) => {
  //   return `${item?.reservation?.day}${index}`;
  // };

  const renderDay = day => {
    if (day) {
      return <Text style={styles.customDay}>{day.getDay()}</Text>;
    }
    return <View style={styles.dayItem} />;
  };

  const renderItem = (reservation, isFirst) => {
    console.log('🚀 ~ renderItem ~ reservation:', reservation);
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        //testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: reservation.height}]}
        onPress={() => Alert.alert(reservation.name)}>
        <Text style={{fontSize, color}}>{reservation.name}</Text>
        <TouchableOpacity
          onPress={() => handleDelete()}
          style={{zIndex: 1000, position: 'absolute', right: 10}}>
          <Icon name="trash" color="red" size={20} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const handleSave = async () => {
    try {
      const existingItems = await AsyncStorage.getItem('myItems');
      let items = {};
      if (existingItems !== null) {
        items = JSON.parse(existingItems);
      }

      const newItem = {name: itemName};
      const formattedDate = selectedDate.toISOString().split('T')[0];

      const existingItemsForDate = items[formattedDate] || [];

      const updatedItemsForDate = [...existingItemsForDate, newItem];

      items[formattedDate] = updatedItemsForDate;

      await AsyncStorage.setItem('myItems', JSON.stringify(items));
      loadItems();
      Alert.alert('Veri başarıyla kaydedildi.');
      setIsVisibleAddPage(false);
      //navigation.navigate('AgendaPage');
    } catch (error) {
      console.error('Veri kaydedilirken bir hata oluştu:', error);
      Alert.alert('Veri kaydedilirken bir hata oluştu.');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Agenda
        reservationsKeyExtractor={item => item.date}
        //testID={testIDs.agenda.CONTAINER}
        //loadItemsForMonth={this.loadItems}
        // renderDay={renderDay}
        selected={formattedDate}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
        firstDay={1}
        onRefresh={refreshData}
        refreshing={false}
        items={items}
        contentContainerStyle={{paddingBottom: 80}}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        // renderDay={renderDay}
        // hideExtraDays={false}
        // showOnlySelectedDayItems
        // reservationsKeyExtractor={this.reservationsKeyExtractor}
      />
      <TouchableOpacity
        style={{position: 'absolute', bottom: 20, right: 20}}
        onPress={() => {
          setIsVisibleAddPage(true);
        }}>
        <Icon name={'add-circle'} size={60} />
      </TouchableOpacity>
      <AddPage
        isVisible={isVisibleAddPage}
        setIsVisible={setIsVisibleAddPage}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        setItemName={setItemName}
        itemName={itemName}
        handleSave={handleSave}
      />
    </SafeAreaView>
  );
};
export default AgendaScreen;

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: 'green',
  },
  dayItem: {
    marginLeft: 34,
  },
});
