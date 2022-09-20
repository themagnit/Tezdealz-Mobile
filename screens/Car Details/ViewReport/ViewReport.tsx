import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,ScrollView
} from "react-native";
import { Card } from "../../../components";
import { COLOR } from "../../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Engine } from "../../../assets/Icons";
const ReportData: any = [
  {
    id: 1,
    name: "Car has no white or black smoke",
  },
  {
    id: 2,
    name: "Car has no white or black smoke",
  },
  {
    id: 3,
    name: "Car has no white or black smoke",
  },
  {
    id: 4,
    name: "Car has no white or black smoke",
  },
  {
    id: 5,
    name: "Car has no white or black smoke",
  },
];
const ViewReport = ({ navigation }: any) => {
  const [progress, setProgress] = useState(0);
  const [appoint, setAppoint] = useState(false);

  const ItemView = ({ item }) => {
    return (
      <View>
        <View style={styles.horizontalLine} />
        <View style={styles.content}>
          <Text style={styles.text}>{item.name}</Text>
          <Feather name="check-circle" size={20} color={COLOR.green} />
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.cardContainer}>
        <View style={styles.headingView}>
          <Engine />
          <Text style={styles.mainText}>ENGINE</Text>
        </View>
        <View style={styles.horizontalLine} />
        {ReportData.map((item: any, index: any) => (
          <View key={index}>
            <View style={styles.content}>
              <Text style={styles.text}>{item.name}</Text>
              <Feather name="check-circle" size={20} color={COLOR.green} />
            </View>
            <View style={styles.horizontalLine1} />
          </View>
        ))}
      </Card>
      <Card style={styles.cardContainer}>
        <View style={styles.headingView}>
          <Engine />
          <Text style={styles.mainText}>SUSPENSION</Text>
        </View>
        <View style={styles.horizontalLine} />
        {ReportData.map((item: any, index: any) => (
          <View key={index}>
            <View style={styles.content}>
              <Text style={styles.text}>{item.name}</Text>
              <Feather name="check-circle" size={20} color={COLOR.green} />
            </View>
            <View style={styles.horizontalLine1} />
          </View>
        ))}
      </Card>
      <Card style={styles.cardContainer}>
        <View style={styles.headingView}>
          <Engine />
          <Text style={styles.mainText}>EXTERIOR</Text>
        </View>
        <View style={styles.horizontalLine} />
        {ReportData.map((item: any, index: any) => (
          <View key={index}>
            <View style={styles.content}>
              <Text style={styles.text}>{item.name}</Text>
              <Feather name="check-circle" size={20} color={COLOR.green} />
            </View>
            <View style={styles.horizontalLine1} />
          </View>
        ))}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom:100
  },
  cardContainer: {
    marginTop: 20,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  headingView: {
    flexDirection: "row",
    marginBottom: 10,
  },

  mainText: {
    color: COLOR.vivBlue,
    fontFamily: "Roboto-Medium",
    fontWeight: "600",
    fontSize: 16,
    marginStart: 10,
  },
  text: {
    color: COLOR.darkBlue,
    fontFamily: "Roboto-Medium",
    fontWeight: "400",
    fontSize: 14,
  },
  horizontalLine: {
    borderBottomColor: COLOR.vivBlue,
    borderBottomWidth: 1,
  },
  horizontalLine1: {
    borderBottomColor: COLOR.darkBlue,
    borderBottomWidth: 1,
  },
});

export default ViewReport;
