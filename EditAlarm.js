import React, {Component} from 'react';
import {
	Text,
	Image,
	View,
	StyleSheet,
	Button,
	StatusBar,
	TextInput,
	TouchableOpacity,
	AsyncStorage,
	Slider,
	Picker
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import geolib from 'geolib';

class EditAlarm extends Component {
	constructor(props) {
		super(props);
		const {params} = this.props.navigation.state;
		this.state = {
			alarm: {
				key: params.alarm.key,
				alarmname: params.alarm.alarmname,
				address: params.alarm.address,
				latitude: params.alarm.latitude,
				longitude: params.alarm.longitude,
				minDisToAlarm: params.alarm.minDisToAlarm,
				ringtone: params.alarm.ringtone,
				enable: params.alarm.enable,
			},
			distance: geolib.getDistance(params.currentPosition, params.alarm),
			min: params.alarm.minDisToAlarm,
			name: params.alarm.alarmname,
			ringtone: params.alarm.ringtone,
		}
	}

	static navigationOptions = {
	    title: 'Alarm Editting',
	    tabBarVisible: false,
		header:
	      <View></View>
	};

	saveAlarm = () => {
		var tempAlarm = {
			key: this.state.alarm.key,
			alarmname: this.state.name,
			address: this.state.alarm.address,
			latitude: this.state.alarm.latitude,
			longitude: this.state.alarm.longitude,
			minDisToAlarm: this.state.min,
			ringtone: this.state.ringtone,
			enable: this.state.alarm.enable,
		}

		this.updateData(tempAlarm.key, tempAlarm).then(this.goBackToListAlarm());
    }

    goBackToListAlarm = () => {
    	this.props.navigation.state.params.onGoBack();
    	this.props.navigation.goBack();
    }


	render() {
		return(
			<View style={{flex: 1, position: "relative"}}>
				<View style={styles.statusBar}>
				<TouchableOpacity onPress = {() => this.props.navigation.goBack()}>
					<Image source={require('./src/images/back_icon.png')} style={{margin: 15, width: 20, height: 20}} />
				</TouchableOpacity>
					<Text style = {{paddingLeft: 20,alignSelf: 'center', flex: 1, fontSize: 20, color: 'white'}}>Edit Alarm</Text>
			        <TouchableOpacity
			          style={styles.saveBtn} onPress={this.saveAlarm}>
			          <Text style = {{alignSelf: 'center', paddingLeft: 10, fontSize: 20, color: 'white'}}>Save</Text>
			        </TouchableOpacity>
			    </View>

			    <View style = {{height: 50}}></View>
				<View style={styles.propertiseBox}>
			<Text style = {styles.propertiseTitle}>Alarm name</Text>
					<TextInput
						style = {{marginLeft: 25, padding: 0}}
						underlineColorAndroid='transparent'
						onChangeText={(tenBaoThuc) => this.setState({name:tenBaoThuc})}
        				value={this.state.name}
					 	/>
				</View>

				<View style={styles.propertiseBox}>
			<Text style = {styles.propertiseTitle}>Destination</Text>
					<Text style = {{paddingLeft: 25}}>{this.state.alarm.address}</Text>
				</View>

				<View style={styles.propertiseBox}>
			<Text style = {styles.propertiseTitle}>Distance</Text>
					<Text style = {{paddingLeft: 25}}>{this.state.distance + "m"}</Text>
				</View>

				<View style={styles.propertiseBox}>
					<Text style = {styles.propertiseTitle}>Min Distance</Text>
					<Text style = {{paddingLeft: 25}}>{this.state.min + "m"}</Text>
					<Slider
				         style={{ width: 320, marginLeft: 20}}
				         step={1}
				         thumbTintColor = {"#ff5722"}
				         minimumTrackTintColor = {"#ff5722"}
				         minimumValue={100}
				         maximumValue={1000}
				         value={this.state.min}
				         onValueChange={val => this.setState({ min: val })}
			        />
				</View>

		        <View style={styles.propertiseBox}>
			<Text style = {styles.propertiseTitle}>Ringtone</Text>
				<Picker style = {styles.picker}
				  selectedValue={this.state.ringtone}
				  onValueChange={(itemValue, itemIndex) => this.setState({ringtone: itemValue})}>
				  <Picker.Item label="Oop oop" value="oop.mp3" />
				  <Picker.Item label="Hello" value="hello_ringtone.mp3" />
				  <Picker.Item label="In My Heart" value="in_my_heart.mp3" />
				  <Picker.Item label="Sweet Ringtone" value="sweet.mp3" />
				</Picker>
			</View>

			</View>
		)
	}

  async updateData(keyAlarm, alarmObj)
  {
    await AsyncStorage.mergeItem(keyAlarm, JSON.stringify(alarmObj));
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
  	picker: {
		height: 20,
		marginLeft: 20,
		opacity: 0.6,
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

export default EditAlarm;
