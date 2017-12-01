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
  Dimensions
} from 'react-native'; 

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
      }
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

          this.setState({initialPosition : initalRegion})
          this.setState({markerPosition: initalRegion})
          console.log(this.state.initialPosition)
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

        this.setState({initialPosition : lastRegion})
        this.setState({markerPosition: lastRegion})
        console.log(this.state.initialPosition)
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: Platform.OS != 'android', timeout: 2000, distanceFilter: 1},
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

   render() {
    return (
      <View style ={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.initialPosition}>

          <MapView.Marker
            coordinate={this.state.markerPosition}>
            <View style={styles.radius}>
                <View style={styles.marker}></View>
            </View>
          </MapView.Marker>
        </MapView>
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
});
