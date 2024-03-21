import { View, Text, Image, TouchableOpacity, Linking, Share, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import app from "../../firebaseConfig";

export default function ProductDetail({navigation}) {
    const {params} = useRoute();
    const [product, setProduct] = useState([]);
    const {user} = useUser();
    const db = getFirestore(app);
    const nav = useNavigation();

    useEffect(() => {
        params && setProduct(params.product);
        shareButton();
    }, [params, navigation]);

    const sendEmailMessage = () => {
        const subject = "Regarding " + product.title;
        const body = "Hi " + product.userName + ",\n" + "I am interested in this product" + "\n\n" + "Product Name : " + product.title + "\n" + "Product Description : " + product.desc + "\n" + "Price : " + product.price;
        Linking.openURL('mailto:' + product.userEmail + "?subject=" + subject + "&body=" + body);
    }

    const shareButton = () => {
        navigation.setOptions({
            headerRight: () => (
                <Ionicons name="share-social-sharp" size={24} color="white" style={{marginRight: 18}} onPress={() => shareProduct()} />
            ),
        });
    }

    const shareProduct = () => {
        const content = {
            message: product?.title + '\n' + product?.desc,
        }
        Share.share(content).then(resp => {
            console.log(resp)
        }, (error) => {
            console.log(error);
        })
    }

    const deleteUserPost = () => {
        Alert.alert('Delete Post', 'Are you sure you want to delete this post?', [
            {
                text: 'Yes',
                onPress: () => deletePost()
            },
            {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel'
            }
        ])
    }

    const deletePost = async () => {
        const q = query(collection(db, 'UserPost'), where('title', '==', product?.title));
        const querySnapShot = await getDocs(q);

        querySnapShot.forEach((doc) => {
             deleteDoc(doc.ref).then(resp=>{
                console.log(resp);
                nav.goBack();
            })
        })
    }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Image source={{uri: product?.image}} className="h-[320px] w-full"/>
      <View className="p-3">
        <Text className="text-[24px] font-bold">{product?.title}</Text>
        <View className="items-baseline">
            <Text className="px-2 bg-blue-300 text-blue-500 rounded-full">{product?.category}</Text>
        </View>
        <Text className="mt-2 font-bold text-[20px]">Description</Text>
        <Text className="text-[17px] text-gray-500">{product?.desc}</Text>
      </View>

      {/* User Info  */}
      <View className="p-3 flex flex-row items-center gap-2">
        <Image source={{uri: product?.userImage}} className="h-12 w-12 rounded-full" />
        <View>
            <Text className="font-bold text-[18px]">{product?.userName}</Text>
            <Text className="text-gray-500">{product?.userEmail}</Text>
        </View>
      </View>

      {user.primaryEmailAddress.emailAddress === product.userEmail ? 
        <TouchableOpacity onPress={() => deleteUserPost()} className="z-40 bg-red-500 m-2 p-3 rounded-full">
        <Text className="text-center text-white">Delete Product</Text>
        </TouchableOpacity> 
        :
        <TouchableOpacity onPress={() => sendEmailMessage()} className="z-40 bg-blue-500 m-2 p-3 rounded-full">
        <Text className="text-center text-white">Send Message</Text>
        </TouchableOpacity>
      }
    </ScrollView>
  )
}