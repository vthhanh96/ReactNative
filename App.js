/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import MapView from 'react-native-maps';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PushNotification,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Button,
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

import GPlacesDemo from './SearchPlace';

var {width, height} = Dimensions.get('window')

const SCREEN_WIDTH = width
const SCREEN_HEIGHT = height
const ASPECT_RADIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RADIO

export default class App extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      markerDestination: {
        latitude: 0,
        longitude: 0
      },
      makerSearch: {
        latitude: 0,
        longitude: 0
      },
      isGotPossition: false,
    };
  }

  watchId: ?number = null

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
          var lat = parseFloat(position.coords.latitude)
          var long = parseFloat(position.coords.longitude)

          var initalRegion = {
            latitude: lat,
            longitude: long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }

          if(!this.state.isGotPossition){
          	this.setState({initialPosition : initalRegion})
	          this.setState({markerPosition: initalRegion})
	          this.setState({markerPosition: initalRegion})
	          this.setState({isGotPossition: true})
	          console.log(this.state.initialPosition)
          }
          
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: Platform.OS != 'android', timeout: 2000 },
    );

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)

         var lastRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }

        if(!this.state.isGotPossition){
			this.setState({initialPosition : lastRegion})
	        this.setState({markerPosition: lastRegion})
	        this.setState({isGotPossition: true})
	        console.log(this.state.initialPosition)
        }
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: Platform.OS != 'android', timeout: 2000, distanceFilter: 1},
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  onRegionChange(region) {
    console.log('onRegionChange')
  }

  openSearchModal() {
  		console.log("hihihihihihi");
		RNGooglePlaces.openAutocompleteModal()
		.then((place) => {
			console.log(place);
			this.setState({searchResult: place});
			this.setState({markerDestination: {
						        latitude: place.latitude,
						        longitude: place.longitude
					      }});
			this.setState({initialPosition: {
						        latitude: place.latitude,
						        longitude: place.longitude,
						        latitudeDelta: LATITUDE_DELTA,
						        longitudeDelta: LONGITUDE_DELTA
					      }});
			console.log(this.state.searchResult);

		})
		.catch(error => console.log(error.message));
	}


   render() {
    return (
      <View style ={styles.container}>

        <MapView
          style={styles.map}
          region={this.state.initialPosition}
          showsMyLocationButton = {true}
          onPress={e =>
            {
              console.log(e.nativeEvent);
              this.setState({markerDestination: e.nativeEvent.coordinate})
            }
          }
          onRegionChange={(e) => {
              console.log("onRegionChange");
              this.setState({initialPosition: e});
            }}
          >

          <MapView.Marker
            coordinate={this.state.markerDestination}>
          </MapView.Marker>

          <MapView.Marker
            coordinate={this.state.markerPosition}>
            <View style={styles.radius}>
                <View style={styles.marker}></View>
            </View>
          </MapView.Marker>

        </MapView>
        
        <View style={styles.searchBar}>
			<TouchableOpacity
				style={styles.searchBtn}
				onPress={() => this.openSearchModal()}>
				<Text style = {{alignSelf: 'center', paddingLeft: 10}}>Thử nhà hàng, trạm xăng...</Text>
			</TouchableOpacity>
		</View>

        <TouchableHighlight style={styles.addButton}
          underlayColor='#ff7043' onPress={()=>{console.log('pressed')}}>
          <Text style={{fontSize: 50, color: 'white'}}>+</Text>
        </TouchableHighlight>
     </View>
    );
   }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
  destinationMarker:{
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: 'pink'
  },
  addButton: {
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right:20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 200,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  searchBar:{
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
  searchBtn:{
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
