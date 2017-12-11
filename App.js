import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import Map from './Map';
import ListAlarm from './ListAlarm';
import SetAlarm from './SetAlarm';
import MapStack from './MapStack';
import ListAlarmStack from './ListAlarmStack';

const TravelAlarmDrawer = DrawerNavigator({
  MapStack: {screen: MapStack},
  ListAlarmStack: {screen: ListAlarmStack},
  }
);

export default TravelAlarmDrawer;
