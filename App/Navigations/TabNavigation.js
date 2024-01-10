import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeView from '../Views/Home/HomeView';
import MyCourse from '../Views/MyCourse';
import LeaderBoard from '../Views/LeaderBoard';
import Profile from '../Views/Profile';

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false
    }}>
      <Tab.Screen name="Home" component={HomeView} />
      <Tab.Screen name="My-Course" component={MyCourse} />
      <Tab.Screen name="LeaderBoard" component={LeaderBoard} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}