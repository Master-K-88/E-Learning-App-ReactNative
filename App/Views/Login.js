import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
// import appimg from './../../assets/images/app_review.png'
import appimg from './../../assets/images/app-review.png'
import googleImg from './../../assets/images/Google.png'
import Colors from '../Utils/Colors';
// import styles from './../Utils/AppStyles'

import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';

WebBrowser.maybeCompleteAuthSession();

export default function LoginView() {

    useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style = {{
        display: 'flex', 
        width: Dimensions.get('screen').width,
        alignItems: 'center',
    }}>
      <Image source={appimg}
      style = { {
        width: 250, 
        height: 500, 
        objectFit: 'contain',
        marginTop: 150,
      } } />
      
      <View style = {
       {
        width: '100%',
        backgroundColor: Colors.PRIMARY,
        alignItems: 'center',
        marginTop: -120,
        height: '60%'
       }
        }>
            <Text style = {
                {
                    fontSize: 60,
                    fontFamily: 'outfit-bold',
                    color: Colors.WHITE,
                    paddingTop: 30,
                }}
            >
                {'</>'}
            </Text>
            <Text style = {
                {
                    fontSize: 40,
                    fontFamily: 'outfit-bold',
                    color: Colors.WHITE,
                    marginTop: -5,
                }}
            >
                KodeBox
            </Text>

            <Text style = {
                {
                    paddingHorizontal: 28,
                    fontSize: 26,
                    textAlign: 'center',
                    paddingTop: 32,
                    fontFamily: 'outfit',
                    color: Colors.LIGHT_PRIMARY,
                }}
            >
            Your Ultimate Programming Learning Box
            </Text>
            <TouchableOpacity 
            onPress={onPress}
            style = {
                {
                    backgroundColor: Colors.WHITE,
                    padding: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 99,
                    marginTop: 36,
                    gap: 14
                }}>
                <Image 
                source = {googleImg} 
                style = {
                    {
                        width: 40,
                        height: 40,
                    }
                }
                />
                <Text style = {{
                    fontSize: 23,
                    color: Colors.PRIMARY
                }
                }>
                    Login with Google
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

