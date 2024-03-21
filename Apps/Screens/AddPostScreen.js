import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import app from "../../firebaseConfig";
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import placeholder from "../../assets/images/image.png";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddPostScreen() {
  const db = getFirestore(app);
  const storage = getStorage();
  const { user } = useUser();
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "category"));

    querySnapshot.forEach((doc) => {
      setCategoryList((prev) => [...prev, doc.data()]);
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = async (value) => {
    setLoading(true);
    // Convert uri to Blob
    const res = await fetch(image);
    const blob = await res.blob();

    const storageRef = ref(storage, "CommunityPosts/" + Date.now() + ".jpg");
    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          console.log(downloadURL);
          value.image = downloadURL;
          value.userName = user.fullName;
          value.userEmail = user.primaryEmailAddress.emailAddress;
          value.userImage = user.imageUrl;
          const docRef = await addDoc(collection(db, "UserPost"), value);
          if (docRef.id) {
            setLoading(false);
            Alert.alert("Success", "Post added successfully");
          }
        });
      });
  };
  return (
    <KeyboardAvoidingView>
      <SafeAreaView>
        <ScrollView className="py-5 px-10 bg-white">
          <Text className="text-[27px] font-bold">Add New Post</Text>
          <Text className="text-[16px] text-gray-500 mb-7">
            Create New Post and Start Selling
          </Text>

          <Formik
            initialValues={{
              title: "",
              desc: "",
              category: "",
              address: "",
              price: "",
              image: "",
              userName: "",
              userEmail: "",
              userImage: "",
              createdAt: Date.now(),
            }}
            onSubmit={(value) => onSubmit(value)}
          >
            {({ handleChange, handleSubmit, values, setFieldValue }) => (
              <View>
                <View showsVerticalScrollIndicator={false}>
                  <TouchableOpacity onPress={() => pickImage()}>
                    {image ? (
                      <Image
                        source={{ uri: image }}
                        style={{ height: 100, width: 100, borderRadius: 15 }}
                      />
                    ) : (
                      <Image
                        source={placeholder}
                        style={{ height: 100, width: 100, borderRadius: 15 }}
                      />
                    )}
                  </TouchableOpacity>

                  <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={values?.title}
                    onChangeText={handleChange("title")}
                  />

                  <TextInput
                    multiline
                    style={styles.input}
                    placeholder="Description"
                    value={values?.desc}
                    numberOfLines={5}
                    onChangeText={handleChange("desc")}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Price"
                    value={values?.price}
                    keyboardType="number-pad"
                    onChangeText={handleChange("price")}
                  />

                  <View
                    style={{ borderWidth: 1, borderRadius: 10, marginTop: 10 }}
                  >
                    <Picker
                      selectedValue={values.category}
                      onValueChange={(itemValue) =>
                        setFieldValue("category", itemValue)
                      }
                    >
                      {categoryList.length > 0 &&
                        categoryList.map(
                          (item, ind) =>
                            item && (
                              <Picker.Item
                                key={ind}
                                label={item?.name}
                                value={item?.name}
                              />
                            )
                        )}
                    </Picker>
                  </View>

                  <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={values?.address}
                    onChangeText={handleChange("address")}
                  />

                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={loading}
                    style={{ backgroundColor: loading ? "#ccc" : "#007BFF" }}
                    className="p-4 bg-blue-500 rounded-full mt-10 mb-20"
                  >
                    {loading ? (
                      <ActivityIndicator color="#ffffff" />
                    ) : (
                      <Text className="text-white text-center text-[16px]">
                        Submit
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 17,
    fontSize: 17,
  },
});
