import React, {Component} from 'react';
import {Text, View, Image, AsyncStorage, StyleSheet, ListView, TouchableOpacity, Alert} from 'react-native';

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
		}
	}

	componentDidMount()
	{
		this.loadAllAlarm();
	}

	static navigationOptions = {
		title: 'List Alarm',
		drawerIcon: ({tintColor}) => (
			<Image
			source={require('./ic_list_alarm.png')}
			style={{width: 24, height: 24, tintColor: tintColor}}/>
			),
	}

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

	render() {
		const {navigate} = this.props.navigation;
		return(
			<View style={{flex: 1}}>
			<ListView style={styles.container}
			dataSource={this.state.dataSource}
			enableEmptySections={true}
			renderRow={(rowData) => {
				console.log('rowData', rowData);
				return (
					<TouchableOpacity 
					onPress={() => navigate('EditAlarm', {alarm: rowData})}
					onLongPress={() => this.confirmDeleteAlarm(rowData.key)}>
					<View style={styles.row}>
					<View style={{flex: 10, padding: 10}}>
					<Text>{rowData.alarmname}</Text>
					</View>
					<View style={{flex: 1, justifyContent: 'center'}}>
					<Text>></Text>
					</View>
					</View>
					</TouchableOpacity>
					)
			}
		}
		renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
			<View key={rowID} style={{height: 1, backgroundColor: 'lightgray'}}/>
		}
		/>
		</View>
		)
	}

	reloadAllAlarm = () =>{
		console.log("Xoa key, reload list alarm");
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
			if(value.length > 0)
			{
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
			console.log(this.state.numList);
		});
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		paddingTop: 65,
		flex: 1
	},
	row: {
		flexDirection: 'row',
		height: 100
	},
});
