import React, {Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';


export default class ProductScreen extends Component {
 

  render() {
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
       <Text style={{fontSize:20, fontWeight:'bold'}}>Hello</Text>
      
      <TouchableOpacity  style={{
        height: 45,
        width: '50%',
        backgroundColor: 'blue',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => this.props.navigation.navigate('LoginScreen')}>
      <Text style={{color: 'white'}}>Product screen</Text>
      </TouchableOpacity>
      </View>

    );
  }
}