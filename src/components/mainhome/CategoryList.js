import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CategoryItem from './CategoryItem';

const CategoryList = ({setSelectedCategory}) => {
  const categoryList = [
    {
      id: 1,
      name: 'Gas Station',
      value: 'gas_station',
      icon: require('../../assets/gas.png'),
    },
    {
      id: 2,
      name: 'Restaurants',
      value: 'restaurant',
      icon: require('../../assets/food.png'),
    },
    {
      id: 3,
      name: 'Cafe',
      value: 'cafe',
      icon: require('../../assets/cafe.png'),
    },
    {
      id: 3,
      name: 'Gym',
      value: 'gym',
      icon: require('../../assets/gym.png'),
    },
    {
      id: 3,
      name: 'Hospital',
      value: 'hospital',
      icon: require('../../assets/hospital.png'),
    },
    {
      id: 3,
      name: 'Zoo',
      value: 'zoo',
      icon: require('../../assets/zoo.png'),
    },
    {
      id: 3,
      name: 'Store',
      value: 'store',
      icon: require('../../assets/store.png'),
    },
    {
      id: 3,
      name: 'Park',
      value: 'park',
      icon: require('../../assets/park.png'),
    },
    {
      id: 3,
      name: 'Police',
      value: 'police',
      icon: require('../../assets/police.png'),
    },
    {
      id: 3,
      name: 'Bar',
      value: 'bar',
      icon: require('../../assets/bar.png'),
    },
  ];
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.catTopTest}>Select Top Category</Text>
      <FlatList
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.listStyle}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => setSelectedCategory(item.value)}>
              <CategoryItem category={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  categoryContainer: {
    marginTop: 15,
  },
  catTopTest: {
    fontSize: 20,
    fontFamily: 'raleway-bold',
    textAlign: 'center',
  },
  listStyle: {marginTop: 5},
});
