import React, {Component} from 'react';
import {Text, Image, View, StyleSheet, Button, StatusBar, TextInput, TouchableOpacity, AsyncStorage, Slider} from 'react-native';
import {StackNavigator} from 'react-navigation';
import ListAlarm from './ListAlarm';

class SetAlarm extends Component {
	constructor(props) {
		super(props);
		const {params} = this.props.navigation.state;
		this.state = {
			lastedKey: -1,
			numList: 0,
			alarmList: [],
			alarm: {
				key: "",
				alarmName: "",
				latitude: params.latitude,
				longitude: params.longitude,
				minDisToAlarm: 100,

			},
			min: 100,
			name: "Báo thức 1"
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

	addAlarm = () => {
		var tempAlarm = {
			key: new Date(),
			alarmname: this.state.name,
			latitude: this.state.alarm.latitude,
			longitude: this.state.alarm.longitude,
			minDisToAlarm: this.state.min
		}

		var tempList = this.state.alarmList;
		tempList.push(tempAlarm);
		this.setState({alarmList: tempList});
		this.setData(tempAlarm.key, tempAlarm);
   }

   initLastedKey()
   {

   } 

	render() {

		return(

			<View style={{flex: 1, position: "relative"}}>
				<View style={styles.statusBar}>
					<TouchableOpacity onPress = {()=> console.log("pressed")}>
				    	<Image source={require('./src/images/menu_white.png')} style={{margin: 15, width: 20, height: 20}} />
				    </TouchableOpacity>
					<Text style = {{paddingLeft: 50,alignSelf: 'center', flex: 1, fontSize: 20, color: 'white'}}>Thêm báo thức</Text>
			        <TouchableOpacity
			          style={styles.saveBtn} onPress={this.addAlarm}>
			          <Text style = {{alignSelf: 'center', paddingLeft: 10, fontSize: 20, color: 'white'}}>Lưu</Text>
			        </TouchableOpacity>
			    </View>

			    <View style = {{height: 50}}></View>
				<View style={styles.propertiseBox}>
					<Text style = {styles.propertiseTitle}>Tên báo thức</Text>
					<TextInput
						style = {{marginLeft: 25, padding: 0}}
						underlineColorAndroid='transparent'
						onChangeText={(tenBaoThuc) => this.setState({name:tenBaoThuc})}
        				value={this.state.name}
					 	/>
				</View>

				<View style={styles.propertiseBox}>
					<Text style = {styles.propertiseTitle}>Địa chỉ</Text>
					<Text style = {{paddingLeft: 25}}>kí túc xóa á á a</Text>
				</View>

				<View style={styles.propertiseBox}>
					<Text style = {styles.propertiseTitle}>Khoảng cách hiện tại</Text>
					<Text style = {{paddingLeft: 25}}>1000m</Text>
				</View>

				<View style={styles.propertiseBox}>
					<Text style = {styles.propertiseTitle}>Khoảng cách báo thức</Text>
					<Text style = {{paddingLeft: 25}}>{this.state.min + "m"}</Text>
					<Slider
				         style={{ width: 320, marginLeft: 20}}
				         step={1}
				         thumbTintColor = {"#e23600"}
				         minimumTrackTintColor = {"#ffaf96"}
				         minimumValue={100}
				         maximumValue={1000}
				         value={this.state.min}
				         onValueChange={val => this.setState({ min: val })}
			        />
				</View>

		        <View style={styles.propertiseBox}>
			        <Text style = {styles.propertiseTitle}>Nhạc chuông báo thức</Text>
					<Text style = {{paddingLeft: 25}}>default</Text>
				</View>

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
     width: 70,
     backgroundColor: 'transparent',
     height: 50,
     shadowColor: '#000000',
     shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  propertiseBox: {
  	paddingBottom: 10
  },
  propertiseText: {

  },
  propertiseTitle: {
  	marginBottom: 10,
  	color: "black",
  	fontWeight: 'bold',
  	padding: 10,
  	backgroundColor: "#D7D7D7",
  	paddingLeft: 20
  }
});

export default SetAlarm;
