import {Dimensions, StyleSheet, Text, View} from 'react-native';
import * as Location from 'expo-location';
import React, {useContext, useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserLocationContext} from '../../context/UserLocationContext';

const GoogleMapView = () => {
  const [mapRegion, setMapRegion] = useState();
  const [locationError, setLocationError] = useState('');
  const [locationAddress, setLocationAddress] = useState({});
  const [locationTrack, setLocationTrack] = useState();
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
      setLocationTrack(locationDeteail);
      let address = await Location.reverseGeocodeAsync({
        latitude: locationDeteail.coords.latitude,
        longitude: locationDeteail.coords.longitude,
      });
      console.log('address->', address);

      setLocationAddress(address);
      locationCheck(address);
    })();
  }, []);

  const locationCheck = address => {
    console.log(address, 'modeFn', address[0].postalCode, address[0].region);
  };

  // Get data by context data taken from App.js
  const {
    locationAddressData,
    setLocationAddressData,
    locationTrackData,
    setLocationTrackData,
  } = useContext(UserLocationContext);

  useEffect(() => {
    if (locationTrackData && locationTrackData?.coords) {
      setMapRegion({
        latitude: locationTrackData?.coords?.latitude,
        longitude: locationTrackData?.coords?.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
      });
    }
  }, [locationTrackData]);

  console.log(
    'locationAddressData@@@->',
    locationAddressData,
    locationTrackData,
  );

  return (
    <SafeAreaView style={styles.mapContainer}>
      <Text
        style={{
          fontSize: 20,
          marginBottom: 10,
          fontWeight: '600',
          fontFamily: 'raleway-bold',
        }}>
        Top Near By Places
      </Text>
      <MapView
        style={styles.mapViewStyle}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        // zoomEnabled={true}
        // showsCompass={true}
        // zoomControlEnabled={true}
        // showsMyLocationButton={true}
        // userLocationCalloutEnabled={true}
        // minZoomLevel={5}
        // maxZoomLevel={10}
        // scrollEnabled={true}
        region={mapRegion}
        // initialRegion={mapRegion}
        // initialRegion={{
        //   latitude: 37.78825,
        //   longitude: -122.4324,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
      >
        <Marker title={locationAddressData[0]?.city} coordinate={mapRegion} />
      </MapView>
    </SafeAreaView>
  );
};

export default GoogleMapView;

const styles = StyleSheet.create({
  mapContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  mapViewStyle: {
    width: Dimensions.get('screen').width * 0.89,
    height: Dimensions.get('screen').height * 0.23,
    // width: '100%',
    // height: '100%',
    borderRadius: 20,
  },
});
