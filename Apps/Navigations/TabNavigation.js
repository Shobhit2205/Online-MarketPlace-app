import { Text, Dimensions } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddPostScreen from '../Screens/AddPostScreen';
import { Ionicons } from '@expo/vector-icons';
import HomeScreenStackNav from './HomeScreenStackNav';
import ExploreScreenStackNav from './ExploreScreenStackNav';
import ProfileScreenStackNav from './ProfileScreenStackNav';

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window")
export default function TabNavigation() {
  return (
    // <View style={{
    //     width,
    //     height,
    // }}>
    <Tab.Navigator screenOptions={{headerShown: false, tabBarHideOnKeyboard: true }} >
      <Tab.Screen name="home-tab" component={HomeScreenStackNav} 
        options={{
            tabBarLabel: ({color}) => (
                <Text style={{color:color, fontSize: 12, marginBottom: 3}}>Home</Text>
            ),
            tabBarIcon: ({color, size}) => (
                <Ionicons name="home" size={size} color={color} />
            )
        }}
      />
      <Tab.Screen name="explore" component={ExploreScreenStackNav}
        options={{
            tabBarLabel: ({color}) => (
                <Text style={{color:color, fontSize: 12, marginBottom: 3}}>Explore</Text>
            ),
            tabBarIcon: ({color, size}) => (
                <Ionicons name="search" size={size} color={color} />
            )
        }}
      />
      <Tab.Screen name="addPost" component={AddPostScreen}
        options={{
            tabBarLabel: ({color}) => (
                <Text style={{color:color, fontSize: 12, marginBottom: 3}}>Add Post</Text>
            ),
            tabBarIcon: ({color, size}) => (
                <Ionicons name="camera" size={size} color={color} />
            )
        }}
       />
      <Tab.Screen name="profile" component={ProfileScreenStackNav} 
        options={{
            tabBarLabel: ({color}) => (
                <Text style={{color:color, fontSize: 12, marginBottom: 3}}>Profile</Text>
            ),
            tabBarIcon: ({color, size}) => (
                <Ionicons name="person-circle" size={size} color={color} />
            )
        }}
      />
    </Tab.Navigator>
    // </View>
  )
}