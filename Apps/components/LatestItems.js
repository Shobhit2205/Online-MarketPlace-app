import { View, Text, FlatList } from 'react-native'
import React from 'react'
import PostItem from './PostItem'

export default function LatestItems({latestItemsList, heading}) {
  return (
    <View className="mt-3">
      {heading && <Text className="font-bold text-[20px]">{heading}</Text>}
      <FlatList
        data={latestItemsList}
        numColumns={2}
        scrollEnabled={false}
        nestedScrollEnabled={true}
        renderItem={({item, index}) => (
            <PostItem item = {item}/>
        )}
      />
    </View>
  )
}