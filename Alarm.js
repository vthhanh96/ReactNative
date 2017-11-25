import RNCalendarEvents from 'react-native-calendar-events';
import {Text, Picker, View, StyleSheet, AppState, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import NotiController from './NotiController';
import PushNotification from 'react-native-push-notification';
import KeepAwake from 'react-native-keep-awake';

export default class AlarmScene extends Component<{}>{
  constructor(props){
    super(props);
    //this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.state = {
      seconds : 5
    };
  }

   componentDidMount()
   {
     //AppState.addEventListener('change', this.handleAppStateChange);
   }

  componentWillUnmount()
  {
    //AppState.addEventListener('change', this.handleAppStateChange);
  }

  onClickCallBack=() =>
  {
    {
      //TODO: schedule background notification
        PushNotification.localNotificationSchedule({
        message: "My Notification Message", // (required)
        date: new Date(Date.now()), // in 5 secs
        title: "Day la title", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
        message: "Day la message", // (required)
        //playSound: false, // (optional) default: true
        soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        });
        <KeepAwake />
    }
  }

  render(){

    return(
      <View
        style = {styles.container}>
        <Text> ALARM </Text>

        <Picker
          style = {styles.picker}
          selectedValue={this.state.seconds}
          onValueChange={(seconds)=>this.setState({seconds})}>
          <Picker.Item label = "5" value = {5}/>
          <Picker.Item label = "10" value = {10}/>
          <Picker.Item label = "15" value = {15}/>
        </Picker>
        <TouchableOpacity
          style = {styles.button}
          onPress={this.onClickCallBack}>
        </TouchableOpacity>
        <NotiController />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picker:{
    width : 100
  },
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
