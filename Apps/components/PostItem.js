import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function PostItem({item}) {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.push('product-detail', {product: item})} className="flex-1 m-2 p-2 border-[1px] rounded-lg border-slate-200">
      <Image
        source={{ uri: item.image }}
        className="w-full h-[160px] rounded-lg"
      />
      <View>
        <View className="items-baseline">
          <Text className="text-[12px] font-medium px-1 mt-1 bg-gray-300 rounded-lg border-[1px] border-gray-300">
            {item.category}
          </Text>
        </View>
        <Text className="text-[15px] font-bold mt-2">{item.title}</Text>
        <Text className="text-[18px] font-bold text-blue-400">
          Rs. {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
