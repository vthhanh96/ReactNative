import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

class GPlacesDemo extends Component {
	openSearchModal() {
		RNGooglePlaces.openAutocompleteModal()
		.then((place) => {
			console.log(place);
		})
		.catch(error => console.log(error.message));
	}

	render() {
		return(
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => this.openSearchModal()}>
					<Text>Pick a place</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container:{
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : 'pink'
  },
  button:{
    backgroundColor: 'green',
    width: 100,
    height: 100
  }
});

export default GPlacesDemo;