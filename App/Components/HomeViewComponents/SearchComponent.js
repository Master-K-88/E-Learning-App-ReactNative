import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../Utils/Colors'
import { Ionicons } from '@expo/vector-icons';

export default function SearchComponent(props) {
    const [textValue, setTextValue] = useState('')
    const onChangeText = (value) => {
       setTextValue(value)
    }

    const performSearch = () => {
        props.performSearch(textValue)
    }

  return (
    <View style={styles.mainContainer}>
      <TextInput
      placeholder='Search Projects'
      onChangeText={onChangeText}
      style={styles.textInput}
      />
      <TouchableOpacity onPress={performSearch}>
        <Ionicons name="search-circle" size={52} color={Colors.SECONDARY} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.WHITE, 
        marginHorizontal: 26, 
        marginTop: 26,
        borderRadius: 99, 
        paddingHorizontal: 0, 
        paddingVertical: 2,
        justifyContent: 'space-between'
    },

    textInput: {
        paddingRight: 5,
        paddingLeft: 20,
        fontSize: 20,
        fontFamily: 'outfit',
        color: Colors.GRAY,
        width: '80%'
    }
})