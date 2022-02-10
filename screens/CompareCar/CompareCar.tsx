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

import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "../../constants/Colors";

import {
  Table,
  Row,
  Rows,
  Col,
  TableWrapper,
  Cols,
  Cell,
} from "react-native-table-component";

import useShortListCars from "../../redux/hooks/useShortListCars";
import { useToast } from "native-base";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { background } from "native-base/lib/typescript/theme/styled-system";

const Tab = createMaterialTopTabNavigator();

const borderColor = "#C1C0B9";
const primaryColor = COLOR.tabActive;
//14

const CompareCar = ({ navigation }: any) => {
  const leftRef = useRef<ScrollView>(null);
  const rightRef = useRef<ScrollView>(null);
  const myRef = useRef(null);

  const flatListRef = useRef(null);

  const toast = useToast();
  const { clearShortListedCars, removeShortListItem, shortListItem } =
    useShortListCars();

  const [selectedRow, setSelectedRow] = useState(0);
  const [img, setImg] = useState([]);
  const [showImage, setShowImage] = useState(false);

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
    widthArr: [100, 100, 100, 150, 120, 120, 120],
  };

  const headerHeight = 50;
  const leftColumnWidth = 120;

  const dispatch = useDispatch();
  const shortListCars = useSelector(
    (state: any) => state.shortlistCars.shortlistCars
  );
  const [campareData, setCompareData] = useState(shortListCars);

 
  const [features, setFeatures] = useState<any>([]);
  const [featureWidth, setFeatureWidth] = useState<any>([]);
  const [featureHeight, setFeatureHeight] = useState<any>([]);
  const [featuresList, setFeaturesList] = useState<any>([]);

  const records: any = shortListCars;

  const carName: any = [];
  const carHeader: any = [];
  const carSingleFeature: any = [];
  const rows: any = [];

  //featurres array
  let newFeaturelist: any = [];
  let newFeatureWidth: any = [];
  let newFeatures: any = [];

  records.forEach((item: any) => {
    carName.push([`${item.make} ${item.model}`]);
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
      item.image[0].location,
    ]);
  });
  records.forEach((item: any) => {
    carSingleFeature.push([
      item.modelYear,
      item.milage,
      item.engineType,
      item.engineCapacity,
      item.bodyColor,
      item.bodyType,
      item.transmission,
      item.image[0].location,
    ]);
  });


  useEffect(() => {
    handleFeatures();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCompareData(shortListCars);
    // eslint-disable-next-line
  }, [shortListCars]);

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


    let result: any = uniqueArray.map((key) => 100);
    let result1: any = uniqueArray.map((key) => 50);



    setFeatureWidth(result);
    setFeatureHeight(result1);

    shortListCars.forEach((item: any) => {
      const newArray: any = [];
      uniqueArray.forEach((uniqueItem: any) => {
        if (item.features.includes(uniqueItem)) {
          newArray.push(TickRight());
        } else {
          newArray.push(CrossRed());
        }
      });
      newFeaturelist.push(newArray);
    });
    setFeaturesList(newFeaturelist);
    console.log("newFeaturelist", newFeaturelist);
  };

  newFeatures = features;
  newFeatureWidth = featureWidth;
  //s newFeaturelist = featuresList

  // loadImage(response.data.result.image);
  const loadImage = (Image: any) => {
    let result: any = Image.map((key: any) => key.location);
    setImg(result);
  };
  const selectItem = (index: any) => {
    if (selectedRow === index) {
      // setSelectedRow(-1);
      setShowImage(false);
    } else {
      setSelectedRow(index);
      setShowImage(true);
      myRef.current.scrollToIndex({
        animated: true,
        index: index,
      });
    }
    var newArray1 = shortListCars.filter(function (el: any, ind: any) {
      return ind == index;
    });
    console.log("newArray", newArray1[0].image);
    loadImage(newArray1[0].image);
  };

  const removeCompare = (index: any) => {
    var newArray1 = shortListCars.filter(function (el: any, ind: any) {
      return ind == index;
    });
    console.log("car id ", newArray1[0]._id);
    removeShortListed(newArray1[0]._id);
  };

  const removeShortListed = (itemId: string) => {
    let result = removeShortListItem(itemId);
    toast.show({
      title: result.message,
      status: result.status,
    });
  };

  const specfications = () => {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.tableContainer}>
          {/* Left Column */}
          <View style={styles.tableLeft}>
            {/* Blank Cell */}

            <View style={styles.blankCell}>
              <View style={styles.leftHeader}>
                <Text style={styles.leftText}>Car Name</Text>
              </View>
            </View>
            {/* Left Container : scroll synced */}
            <ScrollView
              ref={leftRef}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            >
              <Table borderStyle={styles.tableStyle}>
                {carName.map((rowData: any, index: any) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={[leftColumnWidth]}
                    onPress={() => {
                      selectItem(index);
                    }}
                    style={
                      selectedRow === index
                        ? [styles.row, { backgroundColor: COLOR.tabInctive }]
                        : styles.row
                    }
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
          {/* Right Column */}
          <View>
            <ScrollView horizontal={true} bounces={false}>
              <View>
                <Table borderStyle={styles.tableStyle}>
                  <Row
                    data={state.tableHead}
                    widthArr={state.widthArr}
                    style={styles.head}
                    textStyle={{ ...styles.text, color: COLOR.White }}
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
                    {rows.map((rowData: any, index: any) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={state.widthArr}
                        style={
                          selectedRow === index
                            ? [styles.row, { backgroundColor: "#979797" }]
                            : styles.row
                        }
                        onPress={() => {
                          selectItem(index);
                        }}
                        textStyle={styles.text}
                      ></Row>
                    ))}
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    );
  };

  const CrossRed = () => (
    <Image
      source={require("../.././assets/images/cross-red.png")}
      style={{ width: 30, height: 20, alignSelf: "center" }}
    ></Image>
  );
  const TickRight = () => (
    <Image
      source={require("../.././assets/images/right-green.png")}
      style={{ width: 35, height: 20, alignSelf: "center" }}
    ></Image>
  );
  const Features = () => {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.tableContainer}>
          {/* Left Column */}
          <View style={styles.tableLeft}>
            {/* Blank Cell */}

            <View style={styles.blankCell}>
              <View style={styles.leftHeader}>
                <Text style={styles.leftText}>Car Name</Text>
              </View>
            </View>
            {/* Left Container : scroll synced */}
            <ScrollView
              ref={leftRef}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            >
              <Table borderStyle={styles.tableStyle}>
                {carName.map((rowData: any, index: any) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={[leftColumnWidth]}
                    onPress={() => {
                      selectItem(index);
                    }}
                    style={
                      selectedRow === index
                        ? [styles.row, { backgroundColor: COLOR.tabInctive }]
                        : styles.row
                    }
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
          {/* Right Column */}
          <View>
            <ScrollView horizontal={true} bounces={false}>
              <View>
                <Table borderStyle={styles.tableStyle}>
                  <Row
                    data={features}
                    widthArr={featureWidth}
                    // widthArr={state.widthArr}
                    style={styles.head}
                    textStyle={{ ...styles.text, color: COLOR.White }}
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
                  {/* <Table borderStyle={{ borderWidth: 1, borderColor }}>
                    {featuresList.map((rowData: any, index: any) => (
                      <Row
                        key={index}
                        data={rowData}
                        //data={newFeaturelist}
                        widthArr={featureWidth}
                        //widthArr={state.widthArr}
                        style={
                          selectedRow === index
                            ? [styles.row, { backgroundColor: "#979797" }]
                            : styles.row
                        }
                        onPress={() => {
                          selectItem(index);
                        }}
                        textStyle={styles.text}
                      ></Row>
                    ))}
                    
                  </Table> */}
                  <Table
                    style={{ flexDirection: "row" }}
                    borderStyle={{ borderWidth: 1 ,borderColor}}
                  >
                    {/* Left Wrapper */}

                    {/* Right Wrapper */}
                    <TableWrapper>
                      <Rows
                        data={featuresList}
                        widthArr={featureWidth}
                        heightArr={featureHeight}
                        textStyle={styles.text}
                      />
                    </TableWrapper>
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {shortListCars.length == 0 && (
        <View>
          <View style={styles.textHeader}>
            <Text style={styles.commonText}>
              You have to select Cars from the Cars Listing page to compare
              Cars. Please go to Homepage and choose cars for comparison.
            </Text>
          </View>

          <View style={styles.mainContainer}>
            <View style={styles.columnContainer}>
              <Image
                source={{
                  uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/2bdddd81-676d-4380-8c2c-ea2952ddf467.jpg",
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            <View style={styles.columnContainer}>
              <Image
                source={{
                  uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/2bdddd81-676d-4380-8c2c-ea2952ddf467.jpg",
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.circle}>
              <Text style={styles.circleText}>VS</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.Btn}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text style={styles.btnText}>Go To Home </Text>
          </TouchableOpacity>
        </View>
      )}
      {shortListCars.length > 0 && (
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.columnContainer}>
              <FlatList
                horizontal
                ref={myRef}
                data={campareData}
                renderItem={({ item, index }) => (
                  <View
                    style={
                      selectedRow == index
                        ? [
                            styles.contentContainer,
                            { borderWidth: 2, borderColor: COLOR.tabActive },
                          ]
                        : styles.contentContainer
                    }
                  >
                    <ImageBackground
                      source={{
                        uri: item.image[0].location,
                      }}
                      resizeMode="cover"
                      style={
                        selectedRow == index
                          ? { width: 200, height: 200 }
                          : { width: 200, height: 150 }
                      }
                    >
                      {/* <Ionicons
                        name="ios-close-circle-outline"
                        size={30}
                        color={COLOR.primary}
                        style={{ alignSelf: "flex-end" }}
                        onPress={() => {
                          removeShortListed(item._id);
                        }}
                      /> */}
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
                      <Text style={[styles.priceText]}>
                        RS {item.price.toLocaleString()}
                      </Text>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                      <TouchableOpacity
                        style={styles.commonBtn}
                        onPress={() => {
                          navigation.navigate("Car Details", {
                            Id: item.id,
                          });
                        }}
                      >
                        <Text style={styles.commonBtnText}>View Detail</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                      <TouchableOpacity
                        style={styles.commonBtn}
                        onPress={() => {
                          removeShortListed(item._id);
                        }}
                      >
                        <Text style={styles.commonBtnText}>remove</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          <View style={{ height: 600, marginTop: 10 }}>
            <Tab.Navigator
              screenOptions={{
                tabBarIndicatorStyle: {
                  backgroundColor: COLOR.tabActive,
                  height: 3,
                },
              }}
              tabBarOptions={{
                tabStyle: {
                  borderTopWidth: 1,

                  borderTopColor: COLOR.tabInctive,
                },
                labelStyle: {
                  //fontSize: 14,
                  color: "black",
                  fontWeight: "500",
                },
              }}
            >
              <Tab.Screen name="Specfications" component={specfications} />
              <Tab.Screen name="Features" component={Features} />
            </Tab.Navigator>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    marginVertical: 50,
    marginHorizontal: 30,
  },
  commonBtnView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  commonText: {
    fontWeight: "500",
    fontSize: 20,
  },
  commonBtn: {
    backgroundColor: COLOR.tabActive,
    padding: 10,
    borderRadius: 6,
    width: "90%",
    alignSelf: "center",
  },
  commonBtnText: {
    color: COLOR.White,
    textAlign: "center",
  },
  Btn: {
    marginTop: 30,
    backgroundColor: COLOR.tabActive,
    padding: 10,
    borderRadius: 6,
    width: "50%",
    alignSelf: "center",
  },

  btnText: {
    color: COLOR.White,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    textTransform: "uppercase",
  },

  head: { height: 50, backgroundColor: primaryColor },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  row: { height: 50, backgroundColor: COLOR.White },
  text: { textAlign: "center" },
  dataWrapper: { marginTop: -1 },

  tableLeft: {
    width: 120,
    backgroundColor: "yellow",
    borderRightWidth: 1,
    borderRightColor: borderColor,
  },
  tableContainer: {
    flex: 1,
    flexDirection: "row",

    marginTop: 20,
  },
  blankCell: {
    height: 50,
    backgroundColor: primaryColor,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
  },
  leftHeader: {
    justifyContent: "center",
    flex: 1,
  },
  leftText: {
    textAlign: "center",
    color: COLOR.White,
  },
  tableStyle: {
    borderWidth: 1,
    borderColor: "#C1C0B9",
  },

  content: {
    // paddingBottom: 100,
    // marginTop: 20,
  },

  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  columnContainer: {
    // flexDirection: "column",
    // flex: 1,

    paddingStart: 10,
    //   paddingEnd: 2,
  },
  contentContainer: {
    flexDirection: "column",
    // flex: 1,
    marginHorizontal: 5,
    backgroundColor: "white",
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
  },

  image: {
    height: 150,
    width: "100%",
  },

  priceText: {
    fontWeight: "500",
    fontSize: 14,
    color: COLOR.tabActive,
    marginStart: 5,
  },
  carNameView: {
    marginTop: 10,
    marginStart: 5,
  },
  carNameText: {
    fontWeight: "700",
    fontSize: 14,
    color: COLOR.Black,
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
    left: Dimensions.get("window").width - Dimensions.get("window").width / 1.8,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default CompareCar;
