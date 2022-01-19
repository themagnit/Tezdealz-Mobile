import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Button as ButtonExample,
  Dimensions,
} from "react-native";
import { Avatar } from "react-native-paper";

import { Button, Menu, Divider, Provider } from "react-native-paper";
import { Loader, TextInput } from "../../components";
import { COLOR } from "../../constants/Colors";
import { useSelector } from "react-redux";

import DatePicker from "react-native-datepicker";
import { Feather, FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { getAllData, updateUser } from "../../Utility/API";
import { endPoints } from "../../constants/Environment";
import { useDispatch } from "react-redux";
import { getAuthentication } from "../../redux/Actions/authenticationActions";
import { useToast } from "native-base";
import * as ImagePicker from "expo-image-picker";

import SelectBox from "react-native-multi-selectbox-typescript";
import RNPickerSelect from "react-native-picker-select";

const genderList = [
  {
    item: "Male",
    id: "Male",
    label: "Male",
    value: "Male",
  },
  {
    item: "Female",
    id: "Female",
    label: "Female",
    value: "Female",
  },
];
const placeholder = {
  label: "Select ....",
  value: null,
  color: "#9EA0A4",
};

const Profile = ({ navigation }: any) => {
  const toast = useToast();
  const reducerStates = useSelector((state) => state);
  const userProfile = reducerStates.auth.user;
  const dob = userProfile.dateOfBirth
    ? moment(userProfile.dateOfBirth).format("DD-MM-YYYY")
    : null;
  const [firstName, setFirstName] = useState(userProfile.firstName);
  const [lastName, setLastName] = useState(userProfile.lastName);
  const [userName, setUserName] = useState(userProfile.username);

  const [token, setToken] = useState(reducerStates.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(userProfile.email);
  const [gender, setGender] = useState(
    { label: userProfile.gender, value: userProfile.gender } || ""
  );
  const [gender1, setGender1] = useState({ value: userProfile.gender || "", error: "" });
    console.log('userProfile',userProfile)
  const [date, setDate] = useState(dob);
  const [image, setImage] = useState(userProfile.image || null);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({ value: userProfile.city || "", error: "" });

  const [selectedTeam, setSelectedTeam] = useState(
    { label: userProfile.city, value: userProfile.city } || ""
  );

  const dispatch = useDispatch();

  // const onChangeSS = (value: any) => {
  //   setGender(value);
  // };
  // const onChange = (val: any) => {
  //   setSelectedTeam(val);
  // };

  const getCitiesData = async () => {
    let param = "?sort=name";
    await getAllData(endPoints.api.CITIES + param)
      .then((response) => {
        if (response && response && response.status === "success") {
          let result = response.data.result.map((item: any, i: any) => ({
            ...item,
            // item: item.name,
            // id: item.stateCode,
            label: item.name,
            value: item.name,
          }));
          setCities(result);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCitiesData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      // allowsMultipleSelection:true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const resetProfile = () => {
    const dob = userProfile.dateOfBirth
      ? moment(userProfile.dateOfBirth).format("DD-MM-YYYY")
      : null;
    setFirstName(userProfile.firstName || "");
    setLastName(userProfile.lastName || "");
    setGender(userProfile.gender || "");
    setDate(dob);
  };

  const updateProfile = async () => {
    //UPDATE_PROFILE

    console.log("image", selectedTeam , 'gender',gender);
    debugger
    setIsLoading(true);
    console.log(date);
    var formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    if (firstName) {
      formData.append("firstName", firstName);
    }
    if (lastName) {
      formData.append("lastName", lastName);
    }
    if (gender1.value) {
      formData.append("gender", gender1.value);
    }
    if (city.value) {
      formData.append("city", city.value);
    }
    if (date) {
      formData.append("dateOfBirth", date + "");
    }

    await updateUser(endPoints.api.UPDATE_PROFILE, formData)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        if (response && response.status === "success") {
          dispatch(getAuthentication(token, response.result.user));
          toast.show({
            title: "Your Profile has been updated Successfully",
            status: "success",
          });
        } else {
          console.log("error message");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginHorizontal: 20 }}>
          <Loader loading={isLoading} />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            {image ? (
              <Avatar.Image
                size={120}
                style={{ marginTop: 30 }}
                source={{
                  uri: image,
                }}
              />
            ) : (
              <Avatar.Image
                size={120}
                style={{ marginTop: 30 }}
                source={require("../../assets/images/profile.png")}
              />
            )}

            <TouchableOpacity
              onPress={pickImage}
              style={{
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 25,
                backgroundColor: COLOR.tabActive,
                marginTop: -40,
                marginLeft: 70,
              }}
            >
              <FontAwesome name="camera" size={24} color="white" />
            </TouchableOpacity>

            <Text style={styles.uploadText}>Personal Information </Text>
          </View>

          <TextInput
            label="First Name"
            placeholder="First Name"
            returnKeyType="next"
            autoCapitalize="none"
            style={styles.input}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <TextInput
            label="Last Name"
            placeholder="Last Name"
            returnKeyType="next"
            autoCapitalize="none"
            style={styles.input}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />

          <View>
            <Text>Gender</Text>
            <RNPickerSelect
              placeholder={placeholder}
              items={genderList}

              onValueChange={(text: any) => {
                setGender1({ value: text, error: "" });
              }}
              useNativeAndroidPickerStyle={false}
              style={pickerSelectStyles}
              value={gender1.value}
            />
          </View>

          <TextInput
            label="Username"
            placeholder="Username"
            returnKeyType="next"
            autoCapitalize="none"
            style={styles.input}
            value={userName}
            onChangeText={(text) => setUserName(text)}
            disabled={true}
          />

          <View
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 6,
              height: 50,
            }}
          >
            <DatePicker
              showIcon={true}
              androidMode="spinner"
              style={{ width: "97%", marginStart: 10 }}
              date={date}
              mode="date"
              placeholder="Date Of Birth"
              format="DD-MM-YYYY"
              maxDate={moment().format("DD-MM-YYYY")}
              confirmBtnText="Done"
              cancelBtnText="cancal"
              customStyles={{
                dateInput: {
                  backgroundColor: "white",
                  borderColor: "white",
                },
              }}
              onDateChange={(date) => {
                setDate(date);
              }}
            />
          </View>

          <View style={{marginTop:10}}>
            <Text>City</Text>
            <RNPickerSelect
              placeholder={placeholder}
              items={cities}

              onValueChange={(text: any) => {
                setCity({ value: text, error: "" });
              }}
              
              useNativeAndroidPickerStyle={false}
              style={pickerSelectStyles}
              value={city.value}
            />
          </View>

          <TextInput
            label="Email"
            placeholder="Email"
            returnKeyType="next"
            autoCapitalize="none"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            disabled={true}
          />
          <TextInput
            label="Mobile No"
            placeholder="Mobile No"
            returnKeyType="next"
            autoCapitalize="none"
            style={styles.input}
          />

          <View style={styles.footer}>
            <TouchableOpacity style={styles.needBtn} onPress={resetProfile}>
              <Text style={styles.btnText}>Cancal </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextBtn} onPress={updateProfile}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  input: {
    backgroundColor: COLOR.White,
  },
  uploadText: {
    fontSize: 16,
    color: COLOR.tabActive,
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingBottom: 50,
  },
  needBtn: {
    backgroundColor: COLOR.primary,
    padding: 10,
    width: "35%",
  },
  nextBtn: {
    width: "35%",
    padding: 10,
    backgroundColor: COLOR.tabActive,
  },
  btnText: {
    color: COLOR.White,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  footerBtn: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginVertical: 20,
    marginBottom: 30,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroidContainer: {
    backgroundColor: "white",
  },
  inputIOSContainer: {
    backgroundColor: "white",
  },
});

export default Profile;
