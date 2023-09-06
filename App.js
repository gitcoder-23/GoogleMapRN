import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './src/navigations/TabNavigation';
import {UserLocationContext} from './src/context/UserLocationContext';
import * as Location from 'expo-location';
import {useFonts} from 'expo-font';

const App = () => {
  const [fontsLoaded] = useFonts({
    raleway: require('./src/assets/Fonts/Raleway-Regular.ttf'),
    'raleway-bold': require('./src/assets/Fonts/Raleway-SemiBold.ttf'),
  });
  const [locationError, setLocationError] = useState('');
  const [locationAddressData, setLocationAddressData] = useState({});
  const [locationTrackData, setLocationTrackData] = useState();
  const checkLocation = async () => {
    try {
      let _serviceEnabled = await Location.hasServicesEnabledAsync();
      if (!_serviceEnabled) {
        await Location.enableNetworkProviderAsync();
        _serviceEnabled = await Location.hasServicesEnabledAsync();
        if (!_serviceEnabled) {
          return false;
        }
      }

      let _permissionGranted = await Location.getForegroundPermissionsAsync();
      if (_permissionGranted.status != 'granted') {
        _permissionGranted = await Location.requestForegroundPermissionsAsync();
        if (_permissionGranted.status != 'granted') {
          return false;
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      let status = await checkLocation();
      if (!status) {
        setLocationError('Permission to access location was denied');
        return;
      }
      // maintain promise using await
      let locationDeteail = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.Highest,
      });
      setLocationTrackData(locationDeteail);
      let address = await Location.reverseGeocodeAsync({
        latitude: locationDeteail.coords.latitude,
        longitude: locationDeteail.coords.longitude,
      });
      console.log('address->', address);

      setLocationAddressData(address);
      locationCheck(address);
    })();
  }, []);

  const locationCheck = address => {
    console.log(address, 'modeFn', address[0].postalCode, address[0].region);
  };

  console.log('locationAddressData-->', locationAddressData, locationTrackData);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <UserLocationContext.Provider
        value={{
          locationAddressData,
          setLocationAddressData,
          locationTrackData,
          setLocationTrackData,
        }}>
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </UserLocationContext.Provider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
