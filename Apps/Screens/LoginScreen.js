import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Login from '../../assets/images/login.webp'
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from '@clerk/clerk-expo';
 
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View>
      <Image source={Login} className="w-full h-[400px] object-cover" />
      <View className="p-8 bg-white mt-[-20px] rounded-t-3xl" >
        <Text className="text-[25px] text-center font-bold" >Community Marketplace</Text>
        <Text className="text-[18px] text-center text-slate-500 mt-4" >Buy and sell item and make money</Text>
        <TouchableOpacity onPress={onPress} className="p-4 bg-blue-500 rounded-full mt-16" >
            <Text className="text-white text-center text-[16px]" >Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}