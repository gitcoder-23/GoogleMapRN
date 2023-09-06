import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../components/mainhome/Header';
import GoogleMapView from '../components/mainhome/GoogleMapView';
import CategoryList from '../components/mainhome/CategoryList';
import GlobalApi from '../services/GlobalApi';
import {UserLocationContext} from '../context/UserLocationContext';

const MainHome = () => {
  // Get data by context data taken from App.js
  const {
    locationAddressData,
    setLocationAddressData,
    locationTrackData,
    setLocationTrackData,
  } = useContext(UserLocationContext);

  const [placeList, setPlaceList] = useState([]);

  useEffect(() => {
    if (locationTrackData && locationTrackData?.coords) {
      GetNearBySearchPlace('restaurant');
    }
  }, [locationTrackData]);

  const GetNearBySearchPlace = value => {
    GlobalApi.nearByPlace(
      locationTrackData?.coords?.latitude,
      locationTrackData?.coords?.longitude,
      value,
    ).then(resp => {
      console.log('GetNearBySearchPlace-resp=>', resp);
      setPlaceList(resp.data.results);
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header />
      <GoogleMapView />
      <CategoryList
        setSelectedCategory={value => GetNearBySearchPlace(value)}
      />
    </SafeAreaView>
  );
};

export default MainHome;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
  },
});
