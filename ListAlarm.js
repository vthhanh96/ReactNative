import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';

export default class ListAlarm extends Component {
	static navigationOptions = {
		tabBarLabel: 'List Alarm',
		drawerIcon: ({tintColor}) => (
	      <Image
	      source={require('./ic_list_alarm.png')}
	      style={{width: 24, height: 24, tintColor: tintColor}}/>
	    ),
	}

	render() {
		return(
			<View style={{padding: 20, paddingTop: 100}}>
			<Text style={{fontSize: 30}}>
				list alarm
			</Text>
			
			</View>
		)
	}
}