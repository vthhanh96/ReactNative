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
	Switch
} from 'react-native';

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
			SwitchValue: true
		}
	}

	componentDidMount()
	{
		this.loadAllAlarm();
	}

	static navigationOptions = {
		title: "List Alarm",
		drawerIcon: ({tintColor}) => (
			<Image
			source={require('./src/images/ic_list_alarm.png')}
			style={{width: 24, height: 24, tintColor: tintColor}}/>
			),
		header:
    		<View></View>
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

	onSwitchRow(rowData){
		console.log("change", this.state.SwitchValue);
		if(this.state.SwitchValue){
			this.setState({src: require('./src/images/belloff.png')});
		}
		else{
			
			this.setState({src: require('./src/images/bell.png')});
		}
	}

	render() {
		const {navigate} = this.props.navigation;
		return(
			<View style={{flex: 1}}>
				<View style={styles.statusBar}>
					<TouchableOpacity onPress = {()=> navigate('DrawerOpen')}>
				    	<Image source={require('./src/images/menu_white.png')} style={{margin: 15, width: 20, height: 20}} />
				    </TouchableOpacity>
					<Text style = {{paddingLeft: 50, flex: 1, fontSize: 20, color: 'white', alignSelf: "center",  }}>Danh sách báo thức</Text>
			        <TouchableOpacity
			          style={styles.saveBtn} onPress={this.addAlarm}>
			          <Text style = {{alignSelf: 'center', paddingLeft: 10, fontSize: 20, color: 'white'}}></Text>
			        </TouchableOpacity>
			    </View>
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
								<Image source={this.state.src} style={{margin: 10, width: 30, height: 25, alignItems: 'center', justifyContent: 'center'}} />
								<View style={{flex: 10, padding: 5, flexDirection: "column"}}>
									<Text style={{fontSize: 17, fontWeight: 'bold'}}>{rowData.alarmname}</Text>
									<Text>Khoảng cách hiện tại: 100m</Text>
								</View>
								<Switch 
							      onValueChange={(value) => {
							      	console.log(this.state.SwitchValue)
							      	this.setState({SwitchValue: value})
							      	console.log(this.state.SwitchValue)
							      	this.onSwitchRow("")
							      }}
							      value={this.state.SwitchValue}
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
		flex: 1,
		justifyContent: 'center',
        alignItems: 'center',
	},
	statusBar:{
     flexDirection: 'row',
     backgroundColor: "#ff5722",
     alignSelf: 'flex-start',
     position: 'absolute',
     right: 0,
     top: 0,
   },
   saveBtn:{
     flexDirection: 'row',
     backgroundColor: 'transparent',
     height: 50,
    }
});
