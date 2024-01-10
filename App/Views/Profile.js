import { View, Text, SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: Colors.PRIMARY }}>
    <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'space-between', alignItems: 'center', width: Dimensions.get('screen').width, paddingHorizontal: 20}}>
    <Text style={{fontSize: 30, fontFamily: 'outfit-bold', color: Colors.WHITE, textAlign: 'center'}}>Hi</Text>
    </View>
    <View style={{flex: 1,  backgroundColor: Colors.LIGHT_PRIMARY, width: Dimensions.get('screen').width, marginTop: 100, borderTopStartRadius: 40, borderTopEndRadius: 40 }}>
      <View style={{backgroundColor: Colors.LIGHT_PRIMARY, width: 40, height: 40, marginLeft: 'auto', marginRight: 'auto', marginTop: -25, borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
        <View style={{backgroundColor: Colors.PRIMARY, width: 10, height: 10, marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', borderRadius: 50}}>

        </View>
      </View>
      
    </View>
  </SafeAreaView>
  )
}