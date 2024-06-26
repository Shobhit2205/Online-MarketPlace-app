import { Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import app from '../../firebaseConfig';
import LatestItems from '../components/LatestItems';
import { ScrollView } from 'react-native-gesture-handler';

export default function CategoryItem() {
    const {params} = useRoute();
    const db = getFirestore(app);
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        params && getItemListByCategory();
    }, [params])

    const getItemListByCategory = async () => {
        setLoading(true);
        setCategoryList([]);
        
        const q = query(collection(db, 'UserPost'), where('category', '==', params.category));       
        const querySnapShot = await getDocs(q);

        querySnapShot.forEach((doc) => {
            setCategoryList((prev) => [...prev, doc.data()]);
        });
        setLoading(false);
    }
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="p-2">
      {loading ? <ActivityIndicator size="large" color="#3b82f6"/> :
      categoryList.length > 0 ? 
        <LatestItems latestItemsList={categoryList} /> : 
        <Text className="text-center text-[20px] text-gray-500">No Product Found</Text>
      }
    </ScrollView>
  )
}