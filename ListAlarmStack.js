import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import ListAlarm from './ListAlarm';
import EditAlarm from './EditAlarm';

export default (ListAlarmStack = StackNavigator({
	ListAlarm: {screen: ListAlarm},
	EditAlarm: {screen: EditAlarm},
}));