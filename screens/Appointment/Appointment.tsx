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

import { Loader, TextInput } from "../../components";
import { COLOR } from "../../constants/Colors";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { getAuthentication } from "../../redux/Actions/authenticationActions";
import { useToast } from "native-base";
import { useRoute } from "@react-navigation/native";
import { addData } from "../../Utility/API";
import { endPoints } from "../../constants/Environment";

const Appointment = ({ navigation }: any) => {
  const route: any = useRoute();
  console.log("route", route);

  const toast = useToast();
  const reducerStates = useSelector((state) => state);
  const userProfile = reducerStates.auth.user;
  console.log("userProfile", userProfile);
  const [firstName, setFirstName] = useState(userProfile.firstName);
  const [lastName, setLastName] = useState(userProfile.lastName);

  const [phoneNumber, setPhoneNumber] = useState(userProfile.phone || "");
  const [altPhone, setAltPhone] = useState("");
  const [address, setAddress] = useState({
    value: "",
    error: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // getCitiesData();
  }, []);

  const scheduleAppointment = async () => {
    let data = {
      user_id: userProfile._id,
      ad_id: route.params._id,
      firstName: firstName,
      lastName: lastName,
      phone: phoneNumber,
      alternativePhone: altPhone,
      carLocation: {
        city: route.params.city,
        province: route.params.province,
        address: address.value,
      },
      carMake: route.params.make,
      carModel: route.params.model,
      modelYear: route.params.modelYear,
      bodyColor: route.params.bodyColor,
      transmission: route.params.transmission,
      engineType: route.params.engineType,
    };

    let url = `${endPoints.api.CAR_INSPECTION}`;
    debugger;
    setIsLoading(true);
    //dispatch(showLoader())
    await addData(url, data)
      .then((response) => {
        console.log("data", response);

        console.log("response.data", response.data);

        setIsLoading(false);
        if (response && response.data && response.data.status === "success") {
          // navigation.navigate("home");
        } else {
          toast.show({
            title: "eror",
            status: "error",
          });
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

          <TextInput
            label="FIRST NAME"
            placeholder="FIRST NAME"
            returnKeyType="next"
            autoCapitalize="none"
            style={styles.input}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            disabled={true}
          />
          <TextInput
            label="LAST NAME"
            placeholder="LAST NAME"
            returnKeyType="next"
            autoCapitalize="none"
            style={styles.input}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            disabled={true}
          />
          <TextInput
            label="MAKE"
            placeholder="MAKE"
            returnKeyType="next"
            autoCapitalize="none"
            style={styles.input}
            value={route.params.make}
            disabled={true}
          />
          <TextInput
            label="MODEL"
            placeholder="MODEL"
            returnKeyType="next"
            autoCapitalize="none"
            style={styles.input}
            value={route.params.model}
            disabled={true}
          />
          <TextInput
            label="MODEL YEAR"
            placeholder="MODEL YEAR"
            returnKeyType="next"
            autoCapitalize="none"
            style={styles.input}
            value={route.params.modelYear.toString()}
            disabled={true}
          />
          <TextInput
            label="PROVINCE"
            placeholder="PROVINCE"
            returnKeyType="next"
            autoCapitalize="none"
            style={styles.input}
            value={route.params.province}
            disabled={true}
          />
          <TextInput
            label="CITY"
            placeholder="CITY"
            returnKeyType="next"
            autoCapitalize="none"
            style={styles.input}
            value={route.params.city}
            disabled={true}
          />
          <TextInput
            label="PHONE NUMBER"
            placeholder="PHONE NUMBER"
            returnKeyType="next"
            autoCapitalize="none"
            style={styles.input}
            value={altPhone}
            onChangeText={(text) => setAltPhone(text)}
          />
          <TextInput
            multiline
            mode="outlined"
            label="Full Address(Area, Street & Locality)"
            placeholder="Full Address(Area, Street & Locality)"
            style={styles.textArea}
            value={address.value}
            onChangeText={(text: any) => {
              setAddress({ value: text, error: "" });
            }}
            error={!!address.error}
            errorText={address.error}
          />
          <TouchableOpacity
            style={styles.Btn}
            onPress={() => {
            //  scheduleAppointment();
              //   navigation.navigate("Appointment");
            }}
          >
            <Text style={styles.btnText}>SCHEDULE AN APPOINTMENT</Text>
          </TouchableOpacity>
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
    paddingBottom: 150,
  },
  input: {
    backgroundColor: COLOR.White,
  },
  textArea: {
    backgroundColor: COLOR.White,
    height: 100,
  },
  Btn: {
    marginTop: 30,
    backgroundColor: COLOR.tabActive,
    padding: 10,
    borderRadius: 6,
    alignSelf: "center",
  },

  btnText: {
    color: COLOR.White,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default Appointment;
