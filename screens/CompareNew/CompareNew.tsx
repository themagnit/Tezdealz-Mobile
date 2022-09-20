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
import { SliderBox } from "react-native-image-slider-box";
import {
  Table,
  Row,
  Rows,
  Col,
  TableWrapper,
  Cell,
} from "react-native-table-component";
import { FunctionSelectItem } from "native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types";
import useShortListCars from "../../redux/hooks/useShortListCars";
import { useToast } from "native-base";
const borderColor = "#C1C0B9";
const primaryColor = "dodgerblue";
const backgroundColor = "white"; // "#F7F6E7";

const CompareNew = ({ navigation }: any) => {
  const leftRef = useRef<ScrollView>(null);
  const rightRef = useRef<ScrollView>(null);
  const toast = useToast();
  const { clearShortListedCars, removeShortListItem, shortListItem } =
    useShortListCars();

  const [changeColor, setChangeColor] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
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
      // "Image"
    ],
    widthArr: [100, 100, 100, 150, 120, 120, 120],
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
    // carName.push([
    //     "Model Year",
    //     "Mileage",
    //     "Engine Type",
    //     "Engine Capacity",
    //     "Body Color",
    //     "Body Type",
    //     "Transmission",
    //   ]);
  });

  // records.forEach((item: any) => {
  //   carHeader.push([
  //     "Model Year",
  //     "Mileage",
  //     "Engine Type",
  //     "Engine Capacity",
  //     "Body Color",
  //     "Body Type",
  //     "Transmission",
  //   ]);
  // });

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

  // loadImage(response.data.result.image);
  const loadImage = (Image: any) => {
    let result: any = Image.map((key) => key.location);
    setImg(result);
  };
  const selectItem = (index: any) => {
    if (selectedRow === index) {
      setSelectedRow("");
      setShowImage(false);
    } else {
      setSelectedRow(index);
      setShowImage(true);
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

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.columnContainer}>
          {showImage ? (
            <View>
              <SliderBox
                images={img}
                sliderBoxHeight={200}
                onCurrentImagePressed={(index: any) =>
                  console.warn(`image ${index} pressed`)
                }
                dotColor={COLOR.tabActive}
                inactiveDotColor={COLOR.tabInctive}
                autoplay
                circleLoop
                resizeMethod={"resize"}
                resizeMode={"cover"}
                ImageComponentStyle={{
                  borderRadius: 15,
                  width: "95%",
                  marginTop: 5,
                }}
                imageLoadingColor="#2196F3"
              ></SliderBox>
            </View>
          ) : (
            <FlatList
              horizontal
              data={shortListCars}
              renderItem={({ item, index }) => (
                <View style={styles.columnContainer}>
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
                        removeShortListed(item._id);
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
                    <Text style={[styles.priceText]}>
                      RS {item.price.toLocaleString()}
                    </Text>
                  </View>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#eee",
            marginTop: 20,
            marginBottom: 30,
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
                    onPress={() => {
                      if (selectedRow === index) {
                        setSelectedRow("");
                      } else {
                        setSelectedRow(index);
                      }
                    }}
                    style={
                      selectedRow === index
                        ? [styles.row, { backgroundColor:COLOR.tabInctive,}]
                        : styles.row
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
                    {rows.map((rowData: any, index: any) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={state.widthArr}
                        style={
                          selectedRow === index
                            ? [styles.row, { backgroundColor:COLOR.tabInctive}]
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
    </View>
  );
};

const styles = StyleSheet.create({
  //container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#eee" },
  head: { height: 50, backgroundColor: primaryColor },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  row: { height: 60, backgroundColor: "white" },
  text: { textAlign: "center" },
  dataWrapper: { marginTop: -1 },

  content: {
    // paddingBottom: 100,
    marginTop: 20,
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
    marginTop: 20,
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
    marginStart: 5,
  },
  carNameText: {
    fontWeight: "700",
    fontSize: 14,
    color: COLOR.Black,
  },
});

export default CompareNew;
