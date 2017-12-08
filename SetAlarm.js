import React, {Component} from 'react';
import {Text, Image, View, StyleSheet, Button, StatusBar, TextInput, TouchableOpacity, AsyncStorage, Slider} from 'react-native';
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

			},
			min: 100,
			name: "hi"
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


	getVal(val){

	}

	render() {

		return(
			<View style={{paddingTop: 100, flex: 1}}>
				<View style={{paddingBottom: 10}}>
					<Text style = {{marginBottom: 10, color: "black", fontWeight: 'bold', padding: 10, backgroundColor: "#D7D7D7", paddingLeft: 20 }}>Tên báo thức</Text>
					<TextInput
						style = {{marginLeft: 25, padding: 0}}
						underlineColorAndroid='transparent'
						onChangeText={(tenBaoThuc) => this.setState({name:tenBaoThuc})}
        				value={this.state.name}
					 	/>
				</View>
				
				<View style={{paddingBottom: 10}}>
					<Text style = {{marginBottom: 10, color: "black", fontWeight: 'bold', padding: 10, backgroundColor: "#D7D7D7", paddingLeft: 20 }}>Địa chỉ</Text>
					<Text style = {{paddingLeft: 25}}>kí túc xóa á á a</Text>
				</View>
				
				<View style={{paddingBottom: 10}}>
					<Text style = {{marginBottom: 10, color: "black", fontWeight: 'bold', padding: 10, backgroundColor: "#D7D7D7", paddingLeft: 20 }}>Khoảng cách hiện tại</Text>
					<Text style = {{paddingLeft: 25}}>1000m</Text>
				</View>
				
				<View style={{paddingBottom: 10}}>
					<Text style = {{marginBottom: 10, color: "black", fontWeight: 'bold', padding: 10, backgroundColor: "#D7D7D7", paddingLeft: 20 }}>Khoảng cách báo thức</Text>
					<Text style = {{paddingLeft: 25}}>{this.state.min + "m"}</Text>
					<Slider
				         style={{ width: 320, marginLeft: 20}}
				         step={1}
				         thumbTintColor = {"#19c029"}
				         minimumTrackTintColor = {"#19c029"}
				         minimumValue={100}
				         maximumValue={1000}
				         value={this.state.min}
				         onValueChange={val => this.setState({ min: val })}
			        />
				</View>

		        <View style={{paddingBottom: 10}}>
			        <Text style = {{marginBottom: 10, color: "black", fontWeight: 'bold', padding: 10, backgroundColor: "#D7D7D7", paddingLeft: 20 }}>Nhạc chuông báo thức</Text>
					<Text style = {{paddingLeft: 25}}>default</Text>
				</View>

			    <TouchableOpacity style={[styles.button, {bottom:20}]} onPress={()=>{console.log(this.state.name)}}>
		        	<Image source={require('./doneBtn.png')} style={styles.imgBtn} />
		    	</TouchableOpacity>
				
			</View>
		)
	}

			/*<TextInput
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
			 />*/

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

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right:20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 200,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  imgBtn: {
  	height: 50,
    width: 50,
    borderRadius: 50,
  }
});

export default SetAlarm;
