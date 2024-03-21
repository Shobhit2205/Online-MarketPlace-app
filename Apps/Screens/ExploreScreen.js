import { Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import app from '../../firebaseConfig';
import { collection, getDocs, getFirestore, orderBy } from 'firebase/firestore';
import LatestItems from '../components/LatestItems';
import { ScrollView } from 'react-native-gesture-handler';

export default function ExploreScreen() {
  const db = getFirestore(app);
  const [latestItemsList, setLatestItemsList] = useState([])

  useEffect(() => {
    getAllProducts();
  }, [])

  const getAllProducts = async () => {
    setLatestItemsList([]);
    const querySnapshot = await getDocs(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));

    querySnapshot.forEach((doc) => {
      setLatestItemsList((prev) => [...prev, doc.data()]);
    })
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="p-5 py-8">
      <Text className="text-[30px] font-bold">Explore More</Text>
      <LatestItems latestItemsList={latestItemsList}/>
    </ScrollView>
  )
}