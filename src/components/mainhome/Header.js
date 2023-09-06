import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../../shared/Colors';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logoStyle}
      />
      <View>
        <TextInput placeholder="Search" style={styles.searchText} />
      </View>

      <Image
        source={require('../../assets/placeholder.jpg')}
        style={styles.userImage}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 3,
    alignItems: 'center',
  },
  logoStyle: {
    width: 50,
    height: 50,
  },
  searchText: {
    borderWidth: 1,
    borderColor: Colors.BLACK,
    padding: 10,
    // marginTop: 4,
    borderRadius: 50,
    paddingLeft: 10,
    width: Dimensions.get('screen').width * 0.65,
  },
  userImage: {width: 50, height: 50, borderRadius: 100},
});
