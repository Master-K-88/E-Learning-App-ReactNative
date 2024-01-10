import { View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo';
import { createNewUser, getUserDetail, getAllUserEnrolledCourse } from '../../Services';
import Colors from '../../Utils/Colors';
import HeaderInfoView from '../../Components/HomeViewComponents/HeaderView';
import { UserPointsContext } from '../../Context/UserPointsContext';
import SearchComponent from '../../Components/HomeViewComponents/SearchComponent';

export default function HomeView() {
  const {isLoaded, signOut} = useAuth();
  const {user} = useUser();
  // const {enrolledProgressCourse, setProgressEnrolledCourse} = useContext(CourseProgressContext)
  const {userPoints, setUserPoints} = useContext(UserPointsContext);
  useEffect(() => {
    console.log("I am here")
    user&&CreateUser();
  }, [user])

  useEffect(() => {
    user&&GetAllUserEnrolledCourse();
  }, [user])

  const CreateUser = () => {
    if (user) {
      createNewUser(user.fullName, user.primaryEmailAddress.emailAddress, user.imageUrl)
      .then(resp => {
        if (resp)
        console.log("Create resp: ", resp, " Email: ", user.primaryEmailAddress.emailAddress)
        GetUser()
      })
    }
  }

  const GetUser = () => {
    getUserDetail(user.primaryEmailAddress.emailAddress)
    .then(resp => {
      setUserPoints(resp.userDetail?.point)
      console.log("Get user Resp", resp)
    })
  }
    
  const GetAllUserEnrolledCourse = () => {
      getAllUserEnrolledCourse(user?.primaryEmailAddress?.emailAddress)
      .then(res => {
        // setProgressEnrolledCourse(res?.userEnrolledCourses)
        console.log("All user enrolled courses", res?.userEnrolledCourses, " Image Url: ", user?.imageUrl)
      })
  }

  const performSearch = (value) => {
    console.log("Here is the value", value)
  }
  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: Colors.PRIMARY, flex: 0.4, flexDirection: 'column', width: '100%'}}>
        <HeaderInfoView user={user} userPoints={userPoints}/>
        <SearchComponent performSearch={performSearch}/>
      </View>
      <View style={{flex: 0.6}}>

      </View>
    </View>
  )
}