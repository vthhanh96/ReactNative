import React, {Component} from 'react';
import {Text, View, Image, AsyncStorage} from 'react-native';

export default class ListAlarm extends Component {

	constructor(props){
		super(props);
		this.state = {
			numList: 0,
			alarmList: []
		}
	}

	componentDidMount()
	{
		this.loadAllAlarm();
	}

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
            });
						console.log(this.state.alarmList);
          });
        }
				this.setState({numList: value.length});
      }
    );
  }
}
