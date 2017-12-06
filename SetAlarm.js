import React, {Component} from 'react';
import {Text, View, Button, StatusBar} from 'react-native';
import {StackNavigator} from 'react-navigation';

class SetAlarm extends Component {

	constructor(props) {
		super(props);

		const {params} = this.props.navigation.state;

		this.state = {
			alarm: {
				latitude: params.latitude,
				longitude: params.longitude,
				minDisToAlarm: 100,
			}
		}
	}

	static navigationOptions = {
	    title: 'Alarm Settings',
	    headerRight: <Button 
	    				title="Save"
	    				onPress={() => console.log("Click save button")}/>
	};


	render() {
		return(
			<View style={{padding: 20, paddingTop: 100}}>
			<Text style={{fontSize: 30}}>
				Latitude: {this.state.alarm.latitude}
			</Text>
			<Text style={{fontSize: 30}}>
				Longitude: {this.state.alarm.longitude}
			</Text>
			<Text style={{fontSize: 30}}>
				Min distance to alarm: {this.state.alarm.minDisToAlarm}m
			</Text>
			</View>
		)
	}
}

export default SetAlarm;