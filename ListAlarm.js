import React, {Component} from 'react';
import {
	Text,
	View,
	Image,
	AsyncStorage,
	StyleSheet,
	ListView,
	TouchableOpacity,
	Alert,
	Switch,
	ToastAndroid,
	Platform,
} from 'react-native';
import Map from './Map'

export default class ListAlarm extends Component {

	constructor(props){
		super(props);
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		}
		);

		this.state = {
			numList: 0,
			alarmList: [],
			dataSource: ds.cloneWithRows([]),

			//src & SwitchValue phải để trong dataSource để mỗi row có giá trị khác nhau
			src: require('./src/images/bell.png'),
			SwitchValue: true,
			markerCurrentPosition: {
        latitude: 0,
        longitude: 0
      },
		}
	}

	componentDidMount()
	{
		this.loadAllAlarm();

		navigator.geolocation.getCurrentPosition(
     (position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initalRegion = {
        latitude: lat,
        longitude: long
      }

      this.setState({markerCurrentPosition: initalRegion});
   },
   (error) => console.log(error.message),
   { enableHighAccuracy: Platform.OS != 'android', timeout: 2000 },
   );

		this.watchId = navigator.geolocation.watchPosition(
		 (position) => {
			var lat = parseFloat(position.coords.latitude)
			var long = parseFloat(position.coords.longitude)

			var lastRegion = {
				latitude: lat,
				longitude: long,
			}

			this.setState({markerCurrentPosition: lastRegion});
	},
	(error) => console.log(error.message),
		{enableHighAccuracy: Platform.OS != 'android', timeout: 2000, distanceFilter: 1},
	);
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchId);
	}

	static navigationOptions = {
		tabBarLabel: "List Alarm",
		tabBarIcon: ({ tintColor }) => (
			<Image
			source={require('./src/images/ic_list_alarm.png')}
			style={{width: 24, height: 24, tintColor: tintColor}}
			/>
		),
		header: <View></View>
	}

//
	confirmDeleteAlarm=(key) => {
		console.log(key);
		Alert.alert(
			'Delete Alarm',
			'Do you want to delete this alarm?',
			[
			{text: 'Cancel', onPress: () => console.log('cancel')},
			{text: 'OK', onPress: () => this.deleteAlarm(key)},
			],
			{cancelable: false}
			);
	}

	deleteAlarm(key) {
		AsyncStorage.removeItem(key).then(this.reloadAllAlarm);
	}

	async updateData(keyAlarm, alarmObj)
	{
	    await AsyncStorage.mergeItem(keyAlarm, JSON.stringify(alarmObj));
	}

	onSwitchRow(rowData, value){
		if(value){
			this.setState({src: require('./src/images/bell.png')});
			ToastAndroid.show('Turn on alarm ' + rowData.alarmname + ' successfully!', ToastAndroid.SHORT);
		}
		else{
			this.setState({src: require('./src/images/belloff.png')});
			ToastAndroid.show('Turn off alarm ' + rowData.alarmname + 'successfully!', ToastAndroid.SHORT);
		}
		rowData.enable = value;
		this.updateData(rowData.key, rowData);
	}

	refresh = () => {
		this.loadAllAlarm();
		console.log(this.props.navigation.state);
	}

	render() {
		const {navigate} = this.props.navigation;
		return(
			<View style={{flex: 1}}>
			<View style={styles.statusBar}>
				<Text style = {{paddingLeft: 15, flex: 1, fontSize: 20, color: 'white', alignSelf: "center",  }}>List Alarm</Text>
				<TouchableOpacity
				style={styles.saveBtn} onPress = {this.refresh}>
					<Image source={require('./src/images/reload.png')} style={{margin: 15, width: 20, height: 20}} />
				</TouchableOpacity>
			</View>
			<ListView style={styles.container}
			dataSource={this.state.dataSource}
			enableEmptySections={true}
			renderRow={(rowData) => {
				return (
				<TouchableOpacity
				onPress={() => navigate('EditAlarm', {alarm: rowData, currentPosition: this.state.markerCurrentPosition, onGoBack: () => this.refresh()})}
				onLongPress={() => this.confirmDeleteAlarm(rowData.key)}>
				<View style={styles.row}>
				{rowData.enable
					? <Image source={require('./src/images/bell.png')} style={{margin: 10, width: 30, height: 25, alignItems: 'center', justifyContent: 'center'}} />
					: <Image source={require('./src/images/belloff.png')} style={{margin: 10, width: 30, height: 25, alignItems: 'center', justifyContent: 'center'}} />
				}
				<View style={{flex: 10, padding: 5, flexDirection: "column"}}>
				<Text style={{fontSize: 17, fontWeight: 'bold'}}>{rowData.alarmname}</Text>
				<Text>Địa chỉ: {rowData.address}</Text>
				</View>
				<Switch
				onValueChange={(value) => {
					this.onSwitchRow(rowData, value);
				}}
				value={rowData.enable}
				thumbTintColor = {"#e23600"}
				onTintColor = {"#ffaf96"} />
				</View>
				</TouchableOpacity>
				)
			}}
			renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
				<View key={rowID} style={{height: 1, backgroundColor: 'lightgray'}}/>
			}
			/>
			</View>
			)
		}

		//

		reloadAllAlarm = () =>{
			AsyncStorage.getAllKeys()
			.then(keys => {
				this.getAllData(keys);
			});
		}

		loadAllAlarm()
		{
			AsyncStorage.getAllKeys()
			.then(keys => {
				this.getAllData(keys);
			});
		}

		getAllData(keyArray)
		{
			var tempList = new Array();
			AsyncStorage.multiGet(keyArray).then(
				value => {
					if(value.length > 0) {
						for(var i = 0; i < value.length; i++)
						{
							AsyncStorage.getItem(keyArray[i])
							.then(itemValue => {
								const objValue = JSON.parse(itemValue);
								tempList.push(objValue);
								this.setState({
									alarmList: tempList
								});
								const ds = new ListView.DataSource({
									rowHasChanged: (r1, r2) => r1 !== r2
								});
								this.setState({dataSource: ds.cloneWithRows(this.state.alarmList)});
							});
						}
					}
					else {
						this.setState({alarmList: tempList})
						const ds = new ListView.DataSource({
							rowHasChanged: (r1, r2) => r1 !== r2
						});
						this.setState({dataSource: ds.cloneWithRows(this.state.alarmList)});
					}

					this.setState({numList: value.length});
					console.log(this.state.alarmList);
				});
		}
	}

	const styles = StyleSheet.create({
		container: {
			padding: 10,
			flex: 1
		},
		row: {
			flexDirection: 'row',
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		statusBar:{
			flexDirection: 'row',
			backgroundColor: "#ff5722",
			alignSelf: 'flex-start',
			right: 0,
			top: 0,
		},
		saveBtn:{
			flexDirection: 'row',
			backgroundColor: 'transparent',
			height: 50,
		}
	});
