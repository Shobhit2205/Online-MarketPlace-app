import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import app from "../../firebaseConfig";
import { useUser } from '@clerk/clerk-expo';
import LatestItems from '../components/LatestItems';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export default function MyProductsScreen() {
    const db = getFirestore(app);
    const {user} = useUser();
    const [userProducts, setUserProducts] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        user && getUserProducts();
    }, [user]);

    useEffect(() => {
        navigation.addListener('focus', () => {
            getUserProducts();
        })
    }, [])

    const getUserProducts = async () => {
        setUserProducts([])
        const q = query(collection(db, 'UserPost'), where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
        const querySnapShot = await getDocs(q);
        
        querySnapShot.forEach((doc) => {
            setUserProducts((prev) => [...prev, doc.data()]);
        });
    }
  return (
    <ScrollView>
      <LatestItems latestItemsList={userProducts} />
    </ScrollView>
  )
}