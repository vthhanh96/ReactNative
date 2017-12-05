import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Map from './Map';
import SetAlarm from './SetAlarm';

const TravelAlarmApp = StackNavigator({
  Map: {screen: Map},
  SetAlarm: {screen: SetAlarm},
});

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TravelAlarmApp/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;