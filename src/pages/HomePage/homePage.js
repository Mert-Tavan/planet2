import React from 'react';
import {StyleSheet, Dimensions, Image, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Linking} from 'react-native';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');
const imageHeight = height * 0.27;

const HomePage = () => {
  const handlePressYoutube = () => {
    Linking.openURL('https://www.youtube.com/watch?v=d7L5Vc-YFNo&ab_channel=Geli%C5%9FimKutusu');
  };

  const handlePressWeb = () => {
    Linking.openURL('https://tamadres.com/blog/yazi/ajanda-nasil-kullanilir');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          source={require('../../assets/LoginPagesIcon/planet.jpg')}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>
            Selamlar ! 
          </Text>
          <Text style={styles.text}>
            Hoşgeldin! Planet uygulaması günlük aktivitelerini not almana yardımcı olmak, planlarını gerçekleştirmek ve takibini yapmanı kolaylaştırmak için basit bir ajanda sistemi oluşturmana yardımcı olacak.  
          </Text>
        </View>

        <View style={styles.container2}>
          <Text style={styles.text}>
            Ajanda tutmana yardımcı olacak örnek video ve siteyi incelemek istersen aşağıdaki kaynaklara ulaşabilirsin !
          </Text>
          <View style={styles.buttontContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePressYoutube}>
            <View style={styles.iconContainer}>
              <Icon name="logo-youtube" size={30} color="#fff" />
            </View>
            <Text style={styles.buttonText}>YouTube</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button2} onPress={handlePressWeb}>
            <View style={styles.iconContainer}>
              <Icon name="logo-web-component" size={30} color="#fff" />
            </View>
            <Text style={styles.buttonText}>Web</Text>
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    padding: 50,
    width: '100%',
    height: imageHeight,
    resizeMode: 'center',
    marginTop: 10,
  },
  textContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    margin: 10,
    marginBottom: 85,
  },
  headerText: {
    fontSize: 22, 
    fontWeight: 'bold', 
    fontFamily: 'Arial', 
    marginVertical: 5,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    marginLeft: 10,
    marginEnd: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
  container2: {
    alignSelf: 'center',
    margin: 10,
  },
  buttontContainer: {
    width: '80%',
    alignSelf: 'center',
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    height: 60,
    borderRadius: 15,
  },
  iconContainer: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    width: '45%',
    height: 60,
    padding: 10,
    borderRadius: 15,
  },
});

export default HomePage;