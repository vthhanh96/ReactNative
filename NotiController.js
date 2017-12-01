import React, {Component} from 'react';
import PushNotification from 'react-native-push-notification';

export default class NotiController extends Component{

  componentDidMount(){
    PushNotification.configure({
      onNotification: function(notification) {
       console.log( 'NOTIFICATION:', notification );
     },
    });
  }

  render(){
    return null;
  }
}