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
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Image,
  AsyncStorage,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import RNGooglePlaces from 'react-native-google-places';
import geolib from 'geolib';
import PushNotification from 'react-native-push-notification';
import GPlacesDemo from './SearchPlace';

var {width, height} = Dimensions.get('window')

const SCREEN_WIDTH = width
const SCREEN_HEIGHT = height
const ASPECT_RADIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RADIO

export default class Map extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerCurrentPosition: {
        latitude: 0,
        longitude: 0
      },
      markerDestination: {
        latitude: 0,
        longitude: 0
      },
      isGotPossition: false,
      alarmList: [],
    };
  }

  static navigationOptions = {
    title: 'Map',
    drawerIcon: ({tintColor}) => (
      <Image
      source={require('./ic_map.png')}
      style={{width: 24, height: 24, tintColor: tintColor}}/>
      ),
    header: 
    <View></View>
  };

  watchId: ?number = null

  componentDidMount() {
    ///load alarm
    this.loadAllAlarm();

     PushNotification.configure({
      onNotification: function(notification) {
       console.log( 'NOTIFICATION:', notification );
     },
    });

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

        this.setState({markerCurrentPosition: initalRegion})
        if(!this.state.isGotPossition){
         this.setState({initialPosition : initalRegion})
         this.setState({isGotPossition: true})
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

        this.setState({markerCurrentPosition: lastRegion})
        if(!this.state.isGotPossition){
          this.setState({initialPosition : lastRegion})
          this.setState({isGotPossition: true})
        }

        //Check alarm
        this.checkAlarm();
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: Platform.OS != 'android', timeout: 2000, distanceFilter: 1},
      );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  checkAlarm() {
    for(var i = 0; i < this.state.alarmList.length; i++) {
      var alarmPosition = {
        latitude: this.state.alarmList[i].latitude,
        longitude: this.state.alarmList[i].longitude,
      }
      var distance = geolib.getDistance(this.state.markerCurrentPosition, alarmPosition);
      console.log("distance(" + i + "): "+ distance);
      console.log("minDisToAlarm(" + i + "): "+ this.state.alarmList[i].minDisToAlarm)

      //notify if near destination
      if(distance < this.state.alarmList[i].minDisToAlarm)
      {
        console.log("push notification for alarm " + i);
        this.onAlarm();
      }
    }
  }


  onAlarm=()=>
  {
    console.log("chich chich chich");
    {
      //TODO: schedule background notification
      PushNotification.localNotificationSchedule({
        date: new Date(Date.now()), // in 5 secs
        title: "Day la title", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
        message: "Day la message", // (required)
        //playSound: false, // (optional) default: true
        //soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      });
    }
  }

  loadAllAlarm()
  {
    AsyncStorage.getAllKeys()
    .then(keys => {
      this.getAllData(keys);
    });
  }

  getAllData(keyArray)
  {
    var tempList = new Array();
    AsyncStorage.multiGet(keyArray).then(
      value => {
        for(var i = 0; i < value.length; i++)
        {
          AsyncStorage.getItem(keyArray[i])
          .then(itemValue => {
            const objValue = JSON.parse(itemValue);
            tempList.push(objValue);
            this.setState({
              alarmList: tempList
            });
          });
        }
      });
  }

  openSearchModal = () => {
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
    const {navigate} = this.props.navigation;
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
        this.setState({initialPosition: e});
      }}>

      <MapView.Marker
      coordinate={this.state.markerDestination}>
      </MapView.Marker>

      <MapView.Marker
      coordinate={this.state.markerCurrentPosition}>
      <View style={styles.radius}>
      <View style={styles.marker}></View>
      </View>
      </MapView.Marker>
      </MapView>

      <View style={styles.searchBar}>
      <TouchableOpacity onPress = {()=> navigate('DrawerOpen')}>
      <Image source={require('./menu.png')} style={{margin: 15, width: 20, height: 20}} />
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.searchBtn}
      onPress={() => this.openSearchModal()}>
      <Text style = {{alignSelf: 'center', paddingLeft: 10}}>Tìm kiếm địa điểm...</Text>
      </TouchableOpacity>
      </View>

      <TouchableHighlight style={[styles.button, {bottom:20}]}
      underlayColor='#ff7043' 
      onPress={() => navigate('SetAlarm', {
        latitude: this.state.markerDestination.latitude,
        longitude: this.state.markerDestination.longitude})}>
      <Image source={require('./addBtn.png')} style={styles.imgBtn} />
      </TouchableHighlight>

      <TouchableOpacity style={[styles.button, {bottom:80}]} 
      onPress={()=>{
        this.setState({initialPosition: this.state.markerCurrentPosition})
      }}>
      <Image source={require('./locationBtn.png')} style={styles.imgBtn} />
      </TouchableOpacity>
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
     backgroundColor: 'white',
     alignSelf: 'flex-start',
     position: 'absolute',
     right: 0,
     top: 0,
     marginTop: 5,
     marginLeft: 10,
     marginRight: 10,
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
  },
  button: {
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
  imgBtn: {
    height: 50,
    width: 50,
    borderRadius: 50,
  }
});
