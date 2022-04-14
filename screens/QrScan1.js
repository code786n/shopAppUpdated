import React from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import {Camera} from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class QrScan extends React.Component{
  constructor(){
    super();
    this.state={
      hasCameraPermissions: null,
      scanned: false,
      scannedData:'',
      buttonState:'normal',
      type: Camera.Constants.Type.back,
    }
  }

  getCameraPermissions= async()=>{

    const {status}= await Camera.requestCameraPermissionsAsync();
    this.setState({
      hasCameraPermissions: status==='granted'
    });
  }

handleBarCodeScanned= async({type,data})=>{
    this.setState({
      scanned:true,
      scannedData:data,
      buttonState:'normal'
    })
}

render(){

  const hasCameraPermissions= this.state.hasCameraPermissions;
  const scanned=this.state.scanned;
  const buttonState=this.state.buttonState;

  if(buttonState==="clicked" && hasCameraPermissions){
    return(
      <BarCodeScanner
      onBarCodeScanned={scanned ? undefined:this.handleBarCodeScanned}
      />
    )
  }
  
 else if(buttonState==='normal')
 {
  return(
    <View style={styles.container}>
       <Text>{
      
       hasCameraPermissions===true? this.state.scannedData: "Request Camera Permissions"}</Text>

      <TouchableOpacity style={styles.button}
      onPress={this.getCameraPermissions}>
        <Text style={styles.buttonText}>
        Scan QR Code
      </Text>
      </TouchableOpacity>
    </View>
  )
 }
 }
}

  

const styles= StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center" 
   },
   buttonText:{
     fontSize:20,
     textDecorationLine:'underline',
     textAlign:'center'
   }, 
   button:{
     backgroundColor:'lightblue',
     margin:5,
     padding:5,
     borderRadius:50
   }
})