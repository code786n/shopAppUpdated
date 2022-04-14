import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import Qrscan from './Qrscan';
import {navigation} from '@react-navigation/core';
//import {navigation} from '@react-navigation/native';
//const navigation = useNavigation();

export default class LoginScreen extends Component {
  state = {
    userInfo: {},
    userId: '',
  };
  getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  first_name, last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          this.setState({userInfo: result});
          console.log('result:', result);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{flex: 0.15, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontWeight: 'bold',
              backgroundColor: 'blue',
              color: 'white',
            }}>
            Ecommerce App
          </Text>
        </View>
        <View style={{flex: 1, marginTop: 100, alignItems: 'center'}}>
          <LoginButton
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + result.error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  const accessToken = data.accessToken.toString();
                  this.getInfoFromToken(accessToken);
                });
              }
            }}
            onLogoutFinished={() => this.setState({userInfo: {}})}
          />
          {this.state.userInfo.name && (
            <View>
              <Text style={{fontSize: 16, marginVertical: 46}}>
                Logged in As {this.state.userInfo.name} {'\n'}
                IDs is {this.state.userInfo.id} {'\n'}
              </Text>
              <TouchableOpacity
                style={{
                  height: 45,
                  width: '50%',
                  backgroundColor: 'blue',
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => this.props.navigation.navigate('ProductScreen')}>
                <Text style={{color: 'white'}}>Product screen</Text>
              </TouchableOpacity>
              <Qrscan />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5653D4',
  },
  text: {
    color: '#ffff',
    fontSize: 15,
  },
  button: {
    width: '43%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F48D20',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 24,
    color: 'black',
  },
});
