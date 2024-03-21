import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
    const {user} = useUser();
  return (
    <View>
        {/* user Info  */}
        <View className="flex flex-row items-center gap-4" >
            <Image source={{uri: user?.imageUrl}} className="rounded-full h-12 w-12" />
            <View>
                <Text className="text-[16px]" >Welcome</Text>
                <Text className="text-[20px] font-bold" >{user?.fullName}</Text>
            </View>
        </View>

        {/* Search bar  */}
        <View className="p-2 px-5 mt-5 flex flex-row items-center rounded-full bg-blue-50 border-[1px] border-blue-500">
            <Ionicons name="search" size={20} color="gray"/>
            <TextInput placeholder='Search...' className="ml-2 text-[16px]" />
        </View>
    </View>
  )
}