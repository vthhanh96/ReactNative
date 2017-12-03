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
        console.log(keys.length);
        console.log(this.state.isLoading);
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