import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import Map from './Map';
import ListAlarm from './ListAlarm';
import SetAlarm from './SetAlarm';

export default (MapStack = StackNavigator({
	Map: {screen: Map},
	SetAlarm: {screen: SetAlarm},
}));