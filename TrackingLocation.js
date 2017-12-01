import React, {Component} from 'react';
import {View, Text} from 'react-native';

class GeolocationTracking extends Component {
	constructor(props) {
		super(props);

		this.state = {
			latitude: null,
			longitude: null,
			error: null,
			times: 0,
		};
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					error: null,
				});
			},
			(error) => this.setState({ error: error.message }),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
		);

		this.watchId = navigator.geolocation.watchPosition(
			(position) => {
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					error: null,
					times: this.state.times + 1,
				});
				console.log("change location success");
			},
			(error) => this.setState({error: error.message}),
			{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 1},
			);
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchId);
	}

	render() {
		return (
			<View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text>Latitude: {this.state.latitude}</Text>
			<Text>Longitude: {this.state.longitude}</Text>
			<Text>Error: {this.state.error}</Text>
			<Text>Times: {this.state.times}</Text>
			</View>
			);
		}
	}

	export default GeolocationTracking;