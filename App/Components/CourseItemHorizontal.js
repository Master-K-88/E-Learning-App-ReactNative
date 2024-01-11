import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../Utils/Colors'
import { Ionicons } from '@expo/vector-icons';

export default function CourseItemHorizontal(props) {
    const numChapter =  props?.course?.chapters?.length;
    const chapterText = numChapter > 1 ? numChapter + ' Chapters' : numChapter + ' Chapter';
  return (
    <View style={styles.mainContainer}>
      <Image 
      source={{uri: props?.course?.banner?.url}}
      style = {styles.imgContainer}
      />
      <Text style={styles.titleText}>{props.course.courseName}</Text>
      <View style={styles.mainRow}>
        <View style={styles.subRow}>
        <Ionicons name="book-outline" size={18} color={Colors.BLACK} />
        <Text style={styles.subRowText}>{chapterText}</Text>
        </View>
        <View style={styles.subRow}>
        <Ionicons name="time-outline" size={18} color={Colors.BLACK} />
        <Text style={styles.subRowText}>{props.course.time}</Text>
        </View>
      </View>
      <View style={styles.mainRow}>
        <Text style={styles.priceText}>
            {props?.course?.price == 0 ? "Free" : props?.course?.price}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, 
        backgroundColor: Colors.WHITE, 
        marginLeft: 12, 
        marginRight: 12, 
        borderRadius: 15, 
        borderColor: '#00000049', 
        borderWidth: 1
    },
    
    imgContainer: {
        height: 151, 
        borderRadius: 15, 
        marginLeft: 12, 
        marginRight: 12, 
        marginTop: 10
    },

    titleText: {
        marginLeft: 12, 
        marginRight: 12, 
        marginTop: 5, 
        marginBottom: 4, 
        fontSize: 20, 
        fontFamily: 'outfit-medium'
    },

    mainRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 12,
        marginBottom: 10
    },

    subRow: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },

    subRowText: {
        fontSize: 13,
        fontFamily: 'outfit'
    },

    priceText: {
        fontSize: 17,
        fontFamily: 'outfit',
        color: Colors.PRIMARY
    },
})