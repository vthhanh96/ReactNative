import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

class GPlacesDemo extends Component {
  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
      console.log(place);
    })
    .catch(error => console.log(error.message));
  }

  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }

  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.openSearchModal()}>
          <Text style = {{alignSelf: 'center', paddingLeft: 10}}>Thử nhà hàng, trạm xăng...</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    position: 'absolute',
  right: 0,
  top: 0,
  paddingTop: 5,
  paddingLeft: 10,
  paddingRight: 10,
  },
  button:{
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'white',
    height: 50,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  }
});

export default GPlacesDemo;