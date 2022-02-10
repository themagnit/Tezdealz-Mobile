import { Entypo, EvilIcons, Ionicons } from "@expo/vector-icons";

import React, { useEffect, useState, useRef } from "react";

import {
  View,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
  ScrollView,
  FlatList,
} from "react-native";
import { DataTable } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "../../constants/Colors";
import { Table, Row, Rows, Col } from "react-native-table-component";
const borderColor = "#C1C0B9";
const primaryColor = "dodgerblue";
const backgroundColor = "white"; // "#F7F6E7";

const Compare = ({ navigation }: any) => {
  const leftRef = useRef<ScrollView>(null);
  const rightRef = useRef<ScrollView>(null);

  const state = {
    tableHead: [
      "Model Year",
      "Mileage",
      "Engine Type",
      "Engine Capacity",
      "Body Color",
      "Body Type",
      "Transmission",
    ],
    widthArr: [100, 100, 100, 150, 120],
  };

  const headerHeight = 50;
  const leftColumnWidth = 120;

  const [specBtn, setSpecBtn] = useState(true);
  const [featureBtn, setFeatureBtn] = useState(false);
  const [reviewBtn, setReviewBtn] = useState(false);

  const dispatch = useDispatch();
  const shortListCars = useSelector(
    (state: any) => state.shortlistCars.shortlistCars
  );

  console.log("shortListCars", shortListCars);
  const [features, setFeatures] = useState<any>([]);

  const records: any = shortListCars;

  const carName: any = [];
  const carHeader: any = [];
  const rows: any = [];
  records.forEach((item: any) => {
    carName.push([`${item.make} ${item.model}`]);
  });
  records.forEach((item: any) => {
    carHeader.push([
      "Model Year",
      "Mileage",
      "Engine Type",
      "Engine Capacity",
      "Body Color",
      "Body Type",
      "Transmission",
    ]);
  });

  records.forEach((item: any) => {
    rows.push([
      item.modelYear,
      item.milage,
      item.engineType,
      item.engineCapacity,
      item.bodyColor,
      item.bodyType,
      item.transmission,
    ]);
  });

  useEffect(() => {
    handleFeatures();
    // eslint-disable-next-line
  }, []);

  const handleFeatures = () => {
    let oneArray: string[] = [];
    // eslint-disable-next-line
    shortListCars.map((item: any) => {
      // eslint-disable-next-line
      item.features.map((value: string) => {
        oneArray.push(value);
      });
    });
    let uniqueArray = oneArray.filter(function (item, pos) {
      return oneArray.indexOf(item) === pos;
    });
    setFeatures(uniqueArray);
  };

  const Specification = () => {
    setSpecBtn(true);
    setFeatureBtn(false);
    setReviewBtn(false);
  };
  const Features = () => {
    setSpecBtn(false);
    setFeatureBtn(true);
    setReviewBtn(false);
  };
  const Reviews = () => {
    setSpecBtn(false);
    setFeatureBtn(false);
    setReviewBtn(true);
  };
  const header = () => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.columnContainer}>
          <Image
            source={{
              uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/2bdddd81-676d-4380-8c2c-ea2952ddf467.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.carNameView}>
            <Text style={styles.carNameText}>Toyota Yaris iA </Text>
          </View>
          <View style={styles.locationView}>
            <EvilIcons
              name="location"
              size={15}
              color={COLOR.darkBlue}
              style={{ marginTop: 1 }}
            />
            <Text style={styles.locationText}>Islamabad</Text>
          </View>
          <View style={styles.priceView}>
            <Ionicons
              name="pricetag-outline"
              size={18}
              color={COLOR.tabActive}
            />
            <Text style={[styles.priceText]}>RS 50 lakh</Text>
          </View>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>VS</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonHeader}>
        <TouchableOpacity
          style={specBtn ? [styles.buttonActive] : [styles.button]}
          onPress={Specification}
        >
          <Text style={specBtn ? styles.btnActiveText : styles.btnText}>
            Specification
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={featureBtn ? [styles.buttonActive] : [styles.button]}
          onPress={Features}
        >
          <Text style={featureBtn ? styles.btnActiveText : styles.btnText}>
            Features
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={reviewBtn ? [styles.buttonActive] : [styles.button]}
          onPress={Reviews}
        >
          <Text style={reviewBtn ? styles.btnActiveText : styles.btnText}>
            Reviews
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <FlatList
          horizontal
          data={shortListCars}
          renderItem={({ item, index }) => (
            <View style={styles.columnContainer}>
              {/* <Image
                source={{
                  uri: item.image[0].location,
                }}
                style={{ width: 200, height: 180, marginStart: 5 }}
              /> */}
                <ImageBackground
           source={{
            uri: item.image[0].location,
          }}
              resizeMode="cover"
              style={{ width: 150, height: 150 }}
            >
              <Ionicons
                name="ios-close-circle-outline"
                size={24}
                color={COLOR.primary}
                style={{ alignSelf: "flex-end" }}
                onPress={() => {
                 // removePhoto(item, index);
                }}
              />
            </ImageBackground>
              <View style={styles.carNameView}>
                <Text style={styles.carNameText}>
                  {item.make} {item.model}
                </Text>
              </View>
              <View style={styles.locationView}>
                <EvilIcons
                  name="location"
                  size={15}
                  color={COLOR.darkBlue}
                  style={{ marginTop: 1 }}
                />
                <Text style={styles.locationText}>{item.city}</Text>
              </View>
              <View style={styles.priceView}>
                <Ionicons
                  name="pricetag-outline"
                  size={18}
                  color={COLOR.tabActive}
                />
                <Text style={[styles.priceText]}>RS {item.price.toLocaleString()}</Text>
              </View>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {/* <View style={styles.mainContainer}>
        <View style={styles.columnContainer}>
          <Image
            source={{
              uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/2bdddd81-676d-4380-8c2c-ea2952ddf467.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.carNameView}>
            <Text style={styles.carNameText}>Toyota Yaris iA </Text>
          </View>
          <View style={styles.locationView}>
            <EvilIcons
              name="location"
              size={15}
              color={COLOR.darkBlue}
              style={{ marginTop: 1 }}
            />
            <Text style={styles.locationText}>Islamabad</Text>
          </View>
          <View style={styles.priceView}>
            <Ionicons
              name="pricetag-outline"
              size={18}
              color={COLOR.tabActive}
            />
            <Text style={[styles.priceText]}>RS 50 lakh</Text>
          </View>
        </View>

        <View style={styles.columnContainer}>
          <Image
            source={{
              uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/2bdddd81-676d-4380-8c2c-ea2952ddf467.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.carNameView}>
            <Text style={styles.carNameText}>Toyota Yaris iA </Text>
          </View>
          <View style={styles.locationView}>
            <EvilIcons
              name="location"
              size={15}
              color={COLOR.darkBlue}
              style={{ marginTop: 1 }}
            />
            <Text style={styles.locationText}>Islamabad</Text>
          </View>
          <View style={styles.priceView}>
            <Ionicons
              name="pricetag-outline"
              size={18}
              color={COLOR.tabActive}
            />
            <Text style={[styles.priceText]}>RS 50 lakh</Text>
          </View>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>VS</Text>
        </View>
      </View>
      */}
      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#eee",
            marginTop: 50,
          }}
        >
          {/* Left Column */}
          <View
            style={{
              width: leftColumnWidth,
              backgroundColor: "yellow",
              borderRightWidth: 1,
              borderRightColor: borderColor,
            }}
          >
            {/* Blank Cell */}
            <View
              style={{
                height: headerHeight,
                backgroundColor: primaryColor,
                borderBottomWidth: 1,
                borderBottomColor: borderColor,
              }}
            ></View>
            {/* Left Container : scroll synced */}
            <ScrollView
              ref={leftRef}
              style={{
                flex: 1,
                backgroundColor: "white",
              }}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            >
              <Table
                borderStyle={{
                  borderWidth: 1,
                  borderColor,
                }}
              >
                {carName.map((rowData: any, index: any) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={[leftColumnWidth]}
                    style={
                      index % 2 ? styles.row : { backgroundColor, height: 50 }
                    }
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
          {/* Right Column */}
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
            }}
          >
            <ScrollView horizontal={true} bounces={false}>
              <View>
                <Table borderStyle={{ borderWidth: 1, borderColor }}>
                  <Row
                    data={state.tableHead}
                    widthArr={state.widthArr}
                    style={styles.head}
                    textStyle={{ ...styles.text, color: "white" }}
                  />
                </Table>
                <ScrollView
                  ref={rightRef}
                  style={styles.dataWrapper}
                  scrollEventThrottle={16}
                  bounces={false}
                  onScroll={(e) => {
                    const { y } = e.nativeEvent.contentOffset;
                    leftRef.current?.scrollTo({ y, animated: false });
                  }}
                >
                  <Table borderStyle={{ borderWidth: 1, borderColor }}>
                    {rows.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={state.widthArr}
                        style={
                          index % 2
                            ? styles.row
                            : { backgroundColor, height: 50 }
                        }
                        textStyle={styles.text}
                      />
                    ))}
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>

        {/* {specBtn && (
          <View style={{ marginTop: 20 }}>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Engine</Text>
              <Text style={styles.subText}>2998 cc, 6 Cylinders Inline</Text>
              <Text style={styles.subText}>3996 cc, 8 Cylinders In V Sh.</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Fuel Type</Text>
              <Text style={styles.subText}>Petrol</Text>
              <Text style={styles.subText}>Petrol</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>MaxPower (bhp@rpm)</Text>
              <Text style={styles.subText}>375 bhp @ 5000 rpm</Text>
              <Text style={styles.subText}>591 bhp @ 6000 rpm</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Mileage (RAI) (kmpl)</Text>
              <Text style={styles.subText}>11.29</Text>
              <Text style={styles.subText}>8</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Driving Range (Km) </Text>
              <Text style={styles.subText}>587.08</Text>
              <Text style={styles.subText}>680</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Drivetrain </Text>
              <Text style={styles.subText}>RWD</Text>
              <Text style={styles.subText}>RWD</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Doors</Text>
              <Text style={styles.subText}>02</Text>
              <Text style={styles.subText}>05</Text>
            </View>
          </View>
        )}
        {featureBtn && (
          <View style={{ marginTop: 20 }}>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Doors</Text>
              <Text style={[styles.subText]}>02</Text>
              <Text style={styles.subText}>05</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Heated Seats</Text>
              <Text style={styles.subText}>yes</Text>
              <Text style={styles.subText}>no</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Navigation System</Text>
              <Text style={styles.subText}>yes</Text>
              <Text style={styles.subText}>no</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Climate Control</Text>
              <Text style={styles.subText}>yes</Text>
              <Text style={styles.subText}>no</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>DVD Player</Text>
              <Text style={styles.subText}>no</Text>
              <Text style={styles.subText}>yes</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>AM/FM Radio</Text>
              <Text style={styles.subText}>no</Text>
              <Text style={styles.subText}>yes</Text>
            </View>
          </View>
        )} */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  //container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#eee" },
  head: { height: 50, backgroundColor: primaryColor },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  row: { height: 50 },
  text: { textAlign: "center" },
  dataWrapper: { marginTop: -1 },

  content: {
    paddingBottom: 100,
  },
  listItem: {
    marginHorizontal: 10,
    marginVertical: 5,

    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",

    alignItems: "center",
    backgroundColor: "white",
    borderColor: COLOR.lightGray,
    paddingVertical: 10,
  },
  mainText: {
    width: "33%",
    marginStart: 10,
    color: COLOR.Black,
    fontWeight: "500",
  },
  subText: {
    width: "33%",
    fontSize: 12,
    fontWeight: "400",
    color: COLOR.darkBlue,
    textAlign: "center",
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  columnContainer: {
    flexDirection: "column",
    flex: 1,
    // paddingVertical: 20,
    paddingStart: 5,
    paddingEnd: 2,
  },
  locationView: {
    flexDirection: "row",
    marginTop: 5,
  },
  locationText: {
    fontWeight: "500",
    fontSize: 12,
    color: COLOR.darkBlue,
  },
  priceView: {
    flexDirection: "row",
    marginTop: 10,
  },
  container: {
    flex: 1,
    // backgroundColor: COLOR.grayishBlue,
  },
  btnActiveText: {
    color: COLOR.White,
  },
  btnText: {
    color: COLOR.Black,
  },
  buttonActive: {
    backgroundColor: COLOR.tabActive,

    alignItems: "center",
    padding: 10,
    borderRadius: 20,
  },
  button: {
    backgroundColor: COLOR.secondary,
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
  },
  buttonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  image: {
    // height: 150,
    // width: "48%",
    height: 150,
    width: "100%",
  },
  imageHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },

  circleText: {
    color: COLOR.White,
  },
  circle: {
    backgroundColor: COLOR.tabActive,

    alignItems: "center",
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
    padding: 10,
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    position: "absolute",
    top: 50,
    left: Dimensions.get("window").width - Dimensions.get("window").width / 1.9,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignSelf: "center",
  },
  priceText: {
    fontWeight: "500",
    fontSize: 14,
    color: COLOR.tabActive,
    marginStart: 5,
  },
  carNameView: {
    marginTop: 10,
    marginStart:5
  },
  carNameText: {
    fontWeight: "700",
    fontSize: 14,
    color: COLOR.Black,
  },
});

export default Compare;
