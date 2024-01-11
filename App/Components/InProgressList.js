import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import CourseItemHorizontal from './CourseItemHorizontal';

export default function InProgressCourseList(props) {
    const navigation = useNavigation();
    const renderItem = ({item}) => (
        <View style = {styles.renderItem}>
            <CourseItemHorizontal course = {item.course} />
        </View>
    );
  return (
    <View style = {styles.mainContainer}>
      <Text style={[{color: props.color, }, styles.titleText]}>{props.title}</Text>
      <FlatList 
      horizontal
      showsHorizontalScrollIndicator = {false}
      data = {props.courseList}
      renderItem={renderItem}
      style = {styles.flatList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        marginBottom: 20
    },

    titleText: {
        paddingLeft: 20, 
        fontSize: 26, 
        fontFamily: 'outfit-bold',
        marginBottom: 20
    },

    flatList: {
        flex: 1, 
        paddingLeft: 8
    },

    renderItem: {
        width: Dimensions.get('screen').width * 0.65
    },
})