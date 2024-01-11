import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useFonts} from 'expo-font';
import { useState } from 'react';
import {ClerkProvider, SignedIn, SignedOut} from '@clerk/clerk-expo'
import LoginView from './App/Views/Login';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigation } from './App/Navigations/TabNavigation';
import { UserPointsContext } from './App/Context/UserPointsContext';
import { CourseProgressContext } from './App/Context/CourseProgressContext';

export default function App() {
  const [userPoints, setUserPoints] = useState(null);
  const [enrolledProgressCourse, setProgressEnrolledCourse] = useState([])
  const [fontsLoaded] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-semibold': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  })
  return fontsLoaded&&(
    <ClerkProvider publishableKey={"pk_test_cGVhY2VmdWwtbGFjZXdpbmctOTYuY2xlcmsuYWNjb3VudHMuZGV2JA"}>
      <CourseProgressContext.Provider value={{enrolledProgressCourse, setProgressEnrolledCourse}}>
        <UserPointsContext.Provider value = {{userPoints, setUserPoints}}>
          {/* <CompletedChapterContext.Provider value={{isChapterCompleted, setIsChapterCompleted}}> */}
            <View style={styles.container}>
              <SignedIn>
              <NavigationContainer style={{flex: 1}}>
                  <TabNavigation />
                </NavigationContainer>
              </SignedIn>
              <SignedOut>
              <LoginView />
              </SignedOut>
            </View>
          {/* </CompletedChapterContext.Provider> */}
      </UserPointsContext.Provider>
    </CourseProgressContext.Provider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  navContainer: {
    flex: 1,
  },
});
