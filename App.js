import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import Map from './Map';
import ListAlarm from './ListAlarm';
import SetAlarm from './SetAlarm';
import MapStack from './MapStack';
import ListAlarmStack from './ListAlarmStack';

const TravelAlarm = TabNavigator({
  Map: {
    screen: MapStack,
  },
  ListAlarm: {
    screen: ListAlarmStack,
  },
}, 
{
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#ff5722',
    inactiveTintColor: '#000000',
    style: {
      padding: 2,
      backgroundColor: 'white',
    },
    showIcon: true,
    upperCaseLabel: false,
    indicatorStyle: {
      backgroundColor: '#ff5722',
    },
    tabStyle: {
      paddingVertical: 0,
      height: 50,
    }
  },
});

export default TravelAlarm;
