import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { COLOR } from "../../../constants/Colors";

import { ProgressBar } from "../../../components";

const InspectionData = [
  {
    id: 1,
    name: "ENGINE / TRANSMISSION / CLUTCH",
    percentage: 50,
  },
  {
    id: 2,
    name: "SUSPENSION/STEERING",
    percentage: 80,
  },
  {
    id: 3,
    name: "AC/HEATER",
    percentage: 60,
  },
  {
    id: 4,
    name: "EXTERIOR & BODY",
    percentage: 10,
  },
  {
    id: 5,
    name: "BRAKES",
    percentage: 90,
  },
  {
    id: 6,
    name: "INTERIOR",
    percentage: 60,
  },
  {
    id: 7,
    name: "ELECTRICAL & ELECTRONICS",
    percentage: 90,
  },
  {
    id: 8,
    name: "TYRES",
    percentage: 80,
  },
];

const CarInspection = ({ navigation, data }: any) => {
  const [progress, setProgress] = useState(0);
  const [appoint, setAppoint] = useState(true);

  console.log('dfa',data)

  const ListHeader = () => {
    //View to set in Header
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 15,
          marginBottom: 10,
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>OVERALL CONDITION</Text>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderColor: "#26A541",
            width: 40,
            height: 40,
            borderRadius: 20,
            borderWidth: 3,
          }}
        >
          <Text
            style={{
              textAlign: "center",

              color: "#26A541",
            }}
          >
            {"9/10"}
          </Text>
        </View>
      </View>
    );
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 15,
          }}
        >
          <Text>{item.name}</Text>
          <Text>{item.percentage}%</Text>
        </View>
        <ProgressBar
          height={8}
          backgroundColor={"#C4C4C4 "} //C4C4C4
          completedColor={"#26A541"}
          percentage={`${item.percentage}%`}
        />
      </View>
    );
  };

  const ListFooter = () => {
    //View to set in Footer
    return (
      <View style={{ width: "100%", height: 45, marginBottom: 50 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ViewReport");
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#092C4C",
                fontSize: 12,
              }}
            >
              View Full Inspection Report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                color: "#092C4C",
                fontSize: 12,
              }}
            >
              Learn More
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!appoint && (
        <>
          {" "}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 15,
              marginBottom: 10,
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text>OVERALL CONDITION</Text>
            </View>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                borderColor: "#26A541",
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 3,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#26A541",
                }}
              >
                {"9/10"}
              </Text>
            </View>
          </View>
          <View style={styles.horizontalLine} />
          <FlatList
            data={InspectionData}
            // ListHeaderComponent={ListHeader}
            ListFooterComponent={ListFooter}
            renderItem={ItemView}
            keyExtractor={(item: any) => item.id}
          />
        </>
      )}

      {appoint && (
        <View style={styles.descView}>
          <Text style={styles.appointText}>
            Whether you want to buy a used car or want to check the condition of
            your own, Carokta experts will visit you wherever you want. Choose
            what's best for you today.
          </Text>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() => {
              navigation.navigate("Appointment", {
                make: data.make,
                model: data.model,
                province: data.province,
                modelYear: data.modelYear,
                city: data.city,
                bodyColor: data.bodyColor,
                transmission: data.transmission,
                engineType: data.engineType,
                _id:data._id
              });
            }}
          >
            <Text style={styles.btnText}>SCHEDULE AN APPOINTMENT</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: "#525252",
    borderBottomWidth: 1,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  progress: {
    margin: 10,
  },
  container: {
    // flex: 1,
    marginVertical: 20,
  },
  appointText: {
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    color: COLOR.tabActive,
    textAlign: "center",
  },
  descView: {
    paddingHorizontal: 20,
  },
  content: {
    color: COLOR.darkBlue,
    fontSize: 14,
    fontWeight: "400",
  },
  Btn: {
    marginTop: 30,
    backgroundColor: COLOR.tabActive,
    padding: 10,
    borderRadius: 6,
    // width: "50%",
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

export default CarInspection;
