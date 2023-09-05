import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/mainhome/Header';
import GoogleMapView from '../components/mainhome/GoogleMapView';

const MainHome = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header />
      <GoogleMapView />
    </SafeAreaView>
  );
};

export default MainHome;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
  },
});
