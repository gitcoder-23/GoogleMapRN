import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../../shared/Colors';

const CategoryItem = ({category}) => {
  return (
    <View style={styles.categoryItemContainer}>
      <Image source={category.icon} style={styles.catItemImage} />
      <Text style={styles.catItemText}>{category.name}</Text>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  categoryItemContainer: {
    padding: 5,
    alignItems: 'center',
    margin: 5,
    width: 95,
    height: 95,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: Colors.GRAY,
  },
  catItemImage: {width: 40, height: 30},
  catItemText: {fontSize: 13, fontFamily: 'raleway'},
});
