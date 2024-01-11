import { ScrollView, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo';
import { createNewUser, getUserDetail, getAllUserEnrolledCourse, getCourseList } from '../../Services';
import Colors from '../../Utils/Colors';
import HeaderInfoView from '../../Components/HomeViewComponents/HeaderView';
import { UserPointsContext } from '../../Context/UserPointsContext';
import SearchComponent from '../../Components/HomeViewComponents/SearchComponent';
import CourseList from '../../Components/CourseList';
import { CourseProgressContext } from '../../Context/CourseProgressContext';
import InProgressCourseList from '../../Components/InProgressList';

export default function HomeView() {
  const {isLoaded, signOut} = useAuth();
  const {user} = useUser();
  const {enrolledProgressCourse, setProgressEnrolledCourse} = useContext(CourseProgressContext)
  const {userPoints, setUserPoints} = useContext(UserPointsContext);
  const [searched, setSearched] = useState(false);
  useEffect(() => {
    user&&CreateUser();
  }, [user])

  useEffect(() => {
    user&&GetAllUserEnrolledCourse();
  }, [user])

  const [courseList, setCourseList] = useState([]);
  const [advanceCourseList, setAdvanceCourseList] = useState([]);

  const [tempcourseList, setTempCourseList] = useState([]);
  const [value, setValue] = useState("");
    
    useEffect(() => {
        getCourse("Basic");
    }, [])

    useEffect(() => {
      getAdvanceCourse("Advance");
  }, [])

    const getCourse = (title) => {
        getCourseList(title).then(resp => {
            setCourseList(resp?.courses)
        })
    }

    const getAdvanceCourse = (title) => {
      getCourseList(title).then(resp => {
          setAdvanceCourseList(resp?.courses)
      })
  }

  const CreateUser = () => {
    if (user) {
      createNewUser(user.fullName, user.primaryEmailAddress.emailAddress, user.imageUrl)
      .then(resp => {
        if (resp)
        GetUser()
      })
    }
  }

  const GetUser = () => {
    getUserDetail(user.primaryEmailAddress.emailAddress)
    .then(resp => {
      setUserPoints(resp.userDetail?.point)
    })
  }
    
  const GetAllUserEnrolledCourse = () => {
      getAllUserEnrolledCourse(user?.primaryEmailAddress?.emailAddress)
      .then(res => {
        setProgressEnrolledCourse(res?.userEnrolledCourses)
      })
  }

  const performSearch = (value) => {
    setValue(value);
    setSearched(!searched)
  }

  useEffect(() => {
    searchContent(value);
  }, [searched])

  const searchContent = (value) => {
    if (searched) {
      const totalArray = courseList.concat(advanceCourseList);
      const newCourseList = totalArray.filter(item => {
        return item.courseName.toLowerCase().includes(value.toLowerCase())
      });
      setTempCourseList(newCourseList)
    } else {
      setValue('');
      setTempCourseList([])
    }
  }
  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: Colors.PRIMARY, flex: 0.4, flexDirection: 'column', width: '100%', marginBottom: 40}}>
        <HeaderInfoView user={user} userPoints={userPoints}/>
        <SearchComponent performSearch={performSearch} searched = {searched}/>
      </View>
      <View style={{flex: 0.6, marginTop: -200}}>
        <ScrollView>
          {
            enrolledProgressCourse.length > 0 && !searched ? 
              <InProgressCourseList 
              title = { "In-Progress"} 
              color = {Colors.WHITE} 
              courseList = {enrolledProgressCourse}/> :
              null 
          }
          {
            courseList.length > 0 && !searched ? 
            <CourseList 
            title = {"Basic"} 
            color = {enrolledProgressCourse.length > 0 ? Colors.GRAY : Colors.WHITE}
            courseList = {courseList}/> : 
            null
          }
          {
            advanceCourseList.length > 0 && !searched ? 
            <CourseList 
            title = {"Advance"} 
            color = {Colors.GRAY} 
            courseList={advanceCourseList}/> : 
            null
          }
          {
            tempcourseList.length > 0 && searched ? 
            <CourseList 
            title = {"Search result"} 
            color = {Colors.WHITE} 
            courseList={tempcourseList}/> : 
            null
          }
        </ScrollView>
        
      </View>
    </View>
  )
}