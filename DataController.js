import {AsyncStorage} from 'react-native';
import React, {Component} from 'react';

const alarmName = '1'
const alarmObj = {latitude: 0, longitude: 0}

export default class Data extends Component{

  componentDidMount()
  {
    //AsyncStorage.setItem(alarmName, JSON.stringify(alarmObj));
    AsyncStorage.getItem(alarmName)
    .then((value) => {
      const data = JSON.parse(value);
      console.log('Gia tri la: ', data.latitude);
    });
  }

  render()
  {
    return null;
  }
}
