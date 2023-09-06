import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../components/mainhome/Header';
import GoogleMapView from '../components/mainhome/GoogleMapView';
import CategoryList from '../components/mainhome/CategoryList';

const MainHome = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header />
      <GoogleMapView />
      <CategoryList setSelectedCategory={value => console.log(value)} />
    </SafeAreaView>
  );
};

export default MainHome;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
  },
});
