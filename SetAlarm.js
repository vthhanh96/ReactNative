import React, {Component} from 'react';
import {Text, View, Button, StatusBar, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Data from './DataController';

class SetAlarm extends Component {

	constructor(props) {
		super(props);
		const {params} = this.props.navigation.state;
		this.state = {
			numList: 0,
			alarmList: [],
			alarm: {
				alarmName: "",
				latitude: params.latitude,
				longitude: params.longitude,
				minDisToAlarm: 100,
			}
		}
	}

	componentDidMount()
	{
		this.loadAllAlarm();
	}

	static navigationOptions = {
	    title: 'Alarm Settings',
			header:
	      <View></View>
	};

	addAlarm = (name) => {
		var tempAlarm = {
			alarmnam: name,
			latitude: this.state.alarm.latitude,
			longitude: this.state.alarm.longitude,
			minDisToAlarm: 100
		}
		var tempList = this.state.alarmList;
		tempList.push(tempAlarm);
		this.setState({alarmList: tempList});
		this.setData(this.state.alarmList.length - 1 + "", tempAlarm);

  }

	logAllAlarm = () =>
	{
		AsyncStorage.getAllKeys()
		.then(keys => {
			console.log(keys);
		});
	}

	render() {

		return(

			<View style={{padding: 20, paddingTop: 100}}>
		   <TextInput
			 	   onChange ={(name) =>  {}}
			 />
			 <TextInput
			 	value = {"latitude " + this.state.alarm.latitude}/>
			 <TextInput
			 	value = {"longitude " + this.state.alarm.longitude}/>
			 <TextInput/>
			 <TouchableOpacity
			 	style = {{width : 100, height : 25, backgroundColor : "blue"}}
				onPress = {() => this.addAlarm("tempName")}
			 />
			 <TouchableOpacity
			 	style = {{width : 100, height : 25, backgroundColor : "pink"}}
				onPress = {this.logAllAlarm}
			 />
			</View>
		)
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
        for(var i = 0; i < value.length; i++)
        {
          AsyncStorage.getItem(keyArray[i])
          .then(itemValue => {
            const objValue = JSON.parse(itemValue);
            tempList.push(objValue);
            this.setState({
              alarmList: tempList
            })
          });
        }
				this.setState({numList: value.length});
      }
    );
  }

  setData(keyAlarm, alarmObj)
  {
    AsyncStorage.setItem(keyAlarm, JSON.stringify(alarmObj));
  }

  updateData(keyAlarm, alarmObj)
  {
    AsyncStorage.mergeItem(keyAlarm, JSON.stringify(alarmObj));
  }
}

export default SetAlarm;
