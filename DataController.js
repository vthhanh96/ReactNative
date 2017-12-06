import {AsyncStorage,
TouchableOpacity,
View} from 'react-native';
import React, {Component} from 'react';

export default class Data extends Component{

  constructor()
  {
    super();
    this.state = {
      alarmList: []
    }
  }

  componentDidMount(){
    this.loadAllAlarm();
  }

  callBackTest = () => {
    for(var i = 0; i < this.state.alarmList.length; i++)
      console.log(this.state.alarmList[i]);
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

  render()
  {
    return(
      <View
        style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ backgroundColor: "blue", flex: 0.5 }}
          onPress = {this.callBackTest}
        />
        <TouchableOpacity
          style={{ backgroundColor: "pink", flex: 0.5 }}
          onPress = {this.callBackTest}
        />
      </View>
    )
  }
}
