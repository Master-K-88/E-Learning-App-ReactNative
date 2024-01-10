import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeView from '../Views/Home/HomeView';
import MyCourse from '../Views/MyCourse';
import LeaderBoard from '../Views/LeaderBoard';
import Profile from '../Views/Profile';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen 
        name="Home"
        component={HomeView} 
        options={{tabBarIcon: ({color, size}) => 
        (<Ionicons name="home" size={size} color={color} />)}}
        />
        <Tab.Screen 
        name="My-Courses" 
        component={MyCourse} 
        options={{tabBarIcon: ({color, size}) => 
        (<Ionicons name="book" size={size} color={color} />)}}
        />
        <Tab.Screen 
        name='LeaderBoard' 
        component={LeaderBoard} 
        options={{tabBarIcon: ({color, size}) => 
        (<Ionicons name="medal" size={size} color={color} />)}}
        />
        <Tab.Screen 
        name='Profile' 
        component={Profile} 
        options={{tabBarIcon: ({color, size}) => 
        (<Ionicons name="person" size={size} color={color} />)}}
        />
    </Tab.Navigator>
  );
}