
import {Text, View, StyleSheet, AppState, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import NotiController from './NotiController';
import PushNotification from 'react-native-push-notification';

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
        //soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        });
    }
  }

  render(){

    return(
      <View
        style = {styles.container}>
        <Text> ALARM </Text>
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