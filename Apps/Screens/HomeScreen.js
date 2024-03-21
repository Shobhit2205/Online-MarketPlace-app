import { ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Slider from '../components/Slider'
import { collection, getDocs, getFirestore, orderBy } from 'firebase/firestore'
import app from '../../firebaseConfig';
import Categories from '../components/Categories'
import LatestItems from '../components/LatestItems'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {   
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([])
  const [latestItemsList, setLatestItemsList] = useState([])
  const navigation = useNavigation();

  useEffect(() => {
      getSlider();
      getCategoryList();
      getLatestItems();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getSlider();
      getCategoryList();
      getLatestItems();
    })
  }, [])

  const getSlider = async () => {
      setSliderList([]);
      const querySnapshot = await getDocs(collection(db, "banner"));

      querySnapshot.forEach((doc) => {
          setSliderList((prev) => [...prev, doc.data()])
      })
  }

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'category'));

    querySnapshot.forEach((doc) => {
        setCategoryList((prev) => [...prev, doc.data()]);
    })
  }

  const getLatestItems = async () => {
    setLatestItemsList([]);
    const querySnapshot = await getDocs(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));

    querySnapshot.forEach((doc) => {
      setLatestItemsList((prev) => [...prev, doc.data()]);
    })
  }

  return (
    <SafeAreaView className="py-2 px-6 bg-white flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View> */}
        <Header/>
        <Slider sliderList={sliderList}/>
        <Categories categoryList={categoryList} />
        <LatestItems latestItemsList={latestItemsList} heading="Latest Items" />
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  )
}