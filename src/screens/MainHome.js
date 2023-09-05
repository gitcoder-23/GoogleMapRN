import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/mainhome/Header';

const MainHome = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header />
      {/* <Text>MainHome</Text> */}
    </SafeAreaView>
  );
};

export default MainHome;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
  },
});
