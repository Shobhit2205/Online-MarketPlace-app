import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { SafeAreaView } from 'react-native-safe-area-context';
import notebook from "../../assets/images/notebook.webp";
import search from "../../assets/images/search.png";
import addPost from "../../assets/images/addPost.png";
import logout from "../../assets/images/logout.png";
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const {user} = useUser();
  const navigation = useNavigation();
  const {signOut} = useAuth();
  const menuList=[
    {
      id: 1,
      name : "My Products",
      icon: notebook,
      path: "my-products"
    },
    {
      id: 2,
      name : "Explore",
      icon: search,
      path: "explore"
    },
    {
      id: 3,
      name : "Add Post",
      icon: addPost,
      path: "addPost"
    },
    {
      id: 4,
      name : "Log Out",
      icon: logout
    },
  ]

  const onMenuPress = (item) => {
    item.path && navigation.navigate(item.path);
  }
  return (
    <SafeAreaView className="p-5 flex-1">
      <View className="items-center mt-12">
        <Image source={{uri: user?.imageUrl}} className="h-[100px] w-[100px] rounded-full" />
        <Text className="font-bold text-[25px] mt-2">{user?.fullName}</Text>
        <Text className="text-[18px] text-gray-500">{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>
      <FlatList
        data={menuList}
        numColumns={3}
        style={{marginTop: 20}}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => {
            if(item.name === "Log Out"){
              signOut();
              return;
            }
            onMenuPress(item)
          }} 
            className="flex-1 border-[1px] items-center p-3 mx-2 mt-4 rounded-lg border-gray-300 bg-white">
            <Image source={item.icon} className="w-[50px] h-[50px]"/>
            <Text className="text-[12px] font-bold mt-2">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}