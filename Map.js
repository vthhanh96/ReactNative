import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
var {height, width} = Dimensions.get('window');

class Map extends Component {

	render() {
		return (
			<View style={styles.container}>
				<MapView style={styles.map}
				    initialRegion={{
				      latitude: 37.78825,
				      longitude: -122.4324,
				      latitudeDelta: 0.0922,
				      longitudeDelta: 0.0421,
				    }}
			  	/>
		  	</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  
  map: {
  	top: 0,
  	bottom: 0,
  	left: 0,
  	right: 0,
  	position: 'absolute'
  }
});

export default Map;