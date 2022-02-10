import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import {
  MaterialIcons,
  Entypo,
  EvilIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLOR } from "../../constants/Colors";
import ColorFilter from "../Modal/Color/ColorFilter";
import {
  Calender,
  FuelType,
  Speedometer,
  Transmission,
} from "../../assets/Icons";

import {
  addToFav,
  deleteData,
  getAllData,
  updateData,
} from "../../Utility/API";
import { endPoints } from "../../constants/Environment";
import { useToast } from "native-base";
import { Loader, WaterMark } from "../../components";
import { SliderBox } from "react-native-image-slider-box";

import Features from "./Features/Features";
import Description from "./Description/Description";
import Specification from "./Specification/Specification";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSelector } from "react-redux";
import useShortListCars from "../../redux/hooks/useShortListCars";

const Tab = createMaterialTopTabNavigator();

const CarDetails = ({ navigation, route }: any) => {
  const { user } = useSelector((state: any) => state.auth);
  const [img, setImg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [obj, setObj] = useState<any>({});
  const [featuresArray, setFeaturesArray] = useState<Array<any>>([]);
  const [carFeatures, setCarFeatures] = useState<Array<any>>([]);
  const { shortlistCars } = useSelector((state: any) => state.shortlistCars);
  const { Id } = route.params;
  const toast = useToast();
  const { clearShortListedCars, removeShortListItem, shortListItem } =
    useShortListCars();

  const toggleShortListCar = (car: any) => {
    if (shortlistCars.filter((item: any) => item._id === car._id).length > 0) {
      removeShortListed && removeShortListed(car._id);
    } else {
      handleShortList && handleShortList(car);
    }
  };

  const removeShortListed = (itemId: string) => {
    let result = removeShortListItem(itemId);
    toast.show({
      title: result.message,
      status: result.status,
    });
  };

  const handleShortList = (car: any) => {
    let result = shortListItem(car);
    toast.show({
      title: result.message,
      status: result.status,
    });
  };

  useEffect(() => {
    if (Id) {
      getFeatures();
      //  setObj(undefined);
      loadSingleData(Id);
    }
  }, [Id]);

  useEffect(() => {
    if (featuresArray.length > 0 && obj) {
      makeFeatureArray();
    }
  }, [featuresArray, obj]);

  const getFeatures = () => {
    getAllData(endPoints.api.ADSCAR + endPoints.api.CAR_FEATURES)
      .then((response) => {
        if (response && response.data && response.status === "success") {
          let result = response.data.result;
          // let featureName = result.map((el: any) => el.name);
          setFeaturesArray(result);
        } else {
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };
  //CAR_FEATURES

  const makeFeatureArray = () => {
    let temp: Array<any> = [];
    if (obj) {
      temp = featuresArray.filter((item: any) =>
        obj.features?.some((el: any) => item.name === el)
      );
    }

    setCarFeatures(temp);
  };

  const favs = (isFav: any, id: string) => {
    setIsLoading(true);
    addToFav(
      isFav
        ? endPoints.api.ADSCAR + endPoints.api.REMOVE_FAVS
        : endPoints.api.ADSCAR + endPoints.api.ADD_TO_FAVS,
      id
    )
      .then((response) => {
        setIsLoading(false);
        if (response && response.status === "success") {
          toast.show({
            title: isFav
              ? "Removed from Favourites Successfully"
              : "Added to Favourites Successfully",
            status: "success",
          });
          loadSingleData(Id);
        } else {
          console.log("response", response);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const loadSingleData = async (Id: string) => {
    setIsLoading(true);

    await getAllData(`${endPoints.api.ADSCAR}/${Id}`)
      .then((response) => {
        setIsLoading(false);
        if (response && response.status === "success") {
          setObj(response.data.result);
          setImg(response.data.result.image);
          loadImage(response.data.result.image);
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const loadImage = (Image: any) => {
    let result: any = Image.map((key) => key.location);
    setImg(result);
  };

  const toggleActive = (item: any) => {
    console.log("toggleActive car details ", item);
    let activeInactive = item.active
      ? endPoints.api.INACTIVE
      : endPoints.api.ACTIVE;
    setIsLoading(true);
    updateData(`${endPoints.api.ADSCAR}${activeInactive}/${item._id}`)
      .then((response: any) => {
        setIsLoading(false);

        if (response && response.data && response.data.status === "success") {
          toast.show({
            title: response.data.message,
            status: "success",
          });
          loadSingleData(Id);
        } else {
          toast.show({
            title: response.data.message,
            status: "error",
          });
          console.log(response);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const toggleSold = (item: any, soldHere: boolean = false) => {
    let isSoldMark = item.isSold;
    let soldUnsold = item.isSold
      ? endPoints.api.MARK_UNSOLD
      : endPoints.api.MARK_SOLD;

    let requestBody = { soldByUs: soldHere };
    setIsLoading(true);
    updateData(
      `${endPoints.api.ADSCAR}${soldUnsold}/${item._id}`,
      !isSoldMark ? requestBody : undefined
    )
      .then((response: any) => {
        if (response && response.data && response.data.status === "success") {
          toast.show({
            title: response.data.message,
            status: "success",
          });
          loadSingleData(Id);
        } else {
          toast.show({
            title: response.data.message,
            status: "error",
          });
          console.log(response);
        }

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };
  const deleteAd = (data: any) => {
    setIsLoading(true);
    deleteData(`${endPoints.api.ADSCAR}/${data._id}`)
      .then((response: any) => {
        if (response && response.data && response.data.status === "success") {
          toast.show({
            title: response.data.message,
            status: "success",
          });
          loadSingleData(Id);
        } else {
          toast.show({
            title: response.data.message,
            status: "error",
          });
        }

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const publishAd = (data: any) => {
    setIsLoading(true);
    updateData(`${endPoints.api.ADSCAR}${endPoints.api.PUBLISH}/${data._id}`)
      .then((response: any) => {
        if (response && response.data && response.data.status === "success") {
          toast.show({
            title: response.data.message,
            status: "success",
          });
          loadSingleData(Id);
        } else {
          toast.show({
            title: response.data.message,
            status: "error",
          });
        }

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
      <View>
        <Loader loading={isLoading} />
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
          <View style={{ marginEnd: 20 }}>
            <WaterMark />
          </View>
        </View>

        <View style={styles.main}>
          <View style={styles.mainView}>
            <View style={styles.carView}>
              <Text style={styles.carNameText}>
                {obj.make} {obj.model}
              </Text>
            </View>
            <View style={styles.mainView}>
              <MaterialIcons
                onPress={() => {
                  toggleShortListCar(obj);
                }}
                name="compare"
                size={20}
                color={
                  shortlistCars.filter((e: any) => e._id === obj._id).length > 0
                    ? COLOR.primary
                    : COLOR.secondary
                }
                //  style={styles.spaceMargin}
              />
              <Entypo
                name="share"
                size={20}
                color={COLOR.tabInctive}
                style={styles.icon}
              />
              {obj.createdBy !== undefined &&
              user?._id === obj?.createdBy._id ? null : (
                <MaterialIcons
                  name="favorite"
                  size={20}
                  onPress={() => {
                    favs(obj.isFav, obj.id);
                  }}
                  style={styles.icon}
                  color={obj.isFav ? COLOR.primary : COLOR.secondary}
                />
              )}
              {obj.createdBy !== undefined && user._id === obj.createdBy._id && (
                <Menu>
                  <MenuTrigger>
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={20}
                      color={COLOR.secondary}
                      style={{ marginHorizontal: 5 }}
                    />
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption
                      onSelect={() => {
                        navigation.navigate("AddPost", {
                          Id: obj._id,
                        });
                      }}
                      text="Edit"
                    />
                    <MenuOption onSelect={() => deleteAd(obj)} text="Delete" />
                    {obj.isPublished === false ? (
                      <MenuOption
                        onSelect={() => publishAd(obj)}
                        text="Publish"
                      />
                    ) : null}
                    {obj.isPublished && obj.active && (
                      <MenuOption
                        onSelect={() => toggleSold(obj)}
                        text={obj.isSold ? "Mark as Unsold" : "Mark as Sold"}
                      />
                    )}
                    {obj.isPublished && !obj.isSold && (
                      <MenuOption
                        onSelect={() => toggleActive(obj)}
                        text={obj.active ? "Deactivate" : "Activate"}
                      />
                    )}
                  </MenuOptions>
                </Menu>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.priceText}>
              PKR {obj.price?.toLocaleString()}
            </Text>
          </View>
          <View style={styles.locationMain}>
            <EvilIcons name="location" size={15} color={COLOR.darkBlue} />
            <Text style={styles.locationText}> {obj.registrationCity}</Text>
          </View>
          <View style={styles.center}>
            <View style={styles.column}>
              <Calender />
              <Text style={styles.listText}>{obj.modelYear}</Text>
            </View>

            <View style={styles.column}>
              <Speedometer />
              <Text style={styles.listText}>
                {obj.milage?.toLocaleString()} KM
              </Text>
            </View>
            <View style={styles.column}>
              <Transmission />

              <Text style={styles.listText}>{obj.transmission}</Text>
            </View>

            <View style={styles.column}>
              <FuelType />

              <Text style={styles.listText}>{obj.engineType}</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 400 }}>
          <Tab.Navigator
            screenOptions={{
              tabBarScrollEnabled: true,
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
            <Tab.Screen name="Specification">
              {(props) => <Specification {...props} data={obj} />}
            </Tab.Screen>
            <Tab.Screen name="Description">
              {(props) => <Description {...props} data={obj} />}
            </Tab.Screen>
            <Tab.Screen name="Features">
              {(props) => <Features {...props} carFeatures={carFeatures} />}
            </Tab.Screen>
          </Tab.Navigator>
        </View>

        <View style={styles.imageView}>
          <FlatList
            horizontal
            data={DATA}
            renderItem={({ item }) => <MostListItem item={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const MostListItem = ({ item }: any) => {
  return (
    <TouchableOpacity>
      <View style={styles.listItem}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: item.uri }}
            style={styles.image}
            resizeMethod={"auto"}
            resizeMode="cover"
          ></Image>
        </View>
        <View>
          <View style={styles.title}>
            <View style={styles.carHeader}>
              <Text style={styles.carText}>Honda City</Text>
            </View>
            <View style={styles.iconHeader}>
              <MaterialIcons
                name="favorite"
                size={20}
                color={COLOR.veryDarkBlue}
              />
            </View>
          </View>
          <View style={{ marginStart: 10 }}>
            <Text style={styles.priceText}>PKR 8,900,000</Text>
          </View>
          <View style={styles.centerCar}>
            <Text style={styles.labelText}>2018</Text>
            <Text style={styles.labelText}>45,000 KM</Text>
            <Text style={styles.labelText}>Petrol</Text>
          </View>
          <View style={styles.manualMain}>
            <Text style={styles.labelText}>1000 cc</Text>
            <Text style={styles.labelText}>Automatice</Text>
          </View>
          <View style={styles.location}>
            <EvilIcons name="location" size={15} color={COLOR.darkBlue} />
            <Text style={styles.labelText}>Islamabad</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    padding: 10,
  },
  // detailView: {
  //   paddingVertical: 15,
  // },
  imageView: {
    paddingHorizontal: 10,
  },

  descText: {
    color: "#053361",
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    color: COLOR.darkBlue,
    fontSize: 14,
    fontWeight: "400",
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  mainImage: {
    height: 200,
    width: "100%",
    borderRadius: 10,
  },
  main: {
    padding: 15,
  },
  iconHeader: {
    alignItems: "flex-end",
    marginEnd: 10,
  },
  mainView: {
    flexDirection: "row",
  },
  carView: {
    flex: 1,
  },
  title: {
    flexDirection: "row",
    marginTop: 10,
  },
  carHeader: {
    marginStart: 10,
    flex: 1,
  },
  image: {
    height: 120,
    width: 210,
  },
  location: {
    flexDirection: "row",
    marginBottom: 10,
    marginStart: 5,
    marginTop: 5,
  },
  listItem: {
    margin: 5,
    borderRadius: 6,
    borderWidth: 1,
    flexDirection: "column",
    backgroundColor: COLOR.lightGray,
    borderColor: COLOR.tabInctive,
    //  borderColor: COLOR.lightGray, //COLOR.veryDarkBlue,
    height: 240,
    maxHeight: 300,
    marginBottom: 50,
  },
  carText: {
    fontWeight: "500",
    fontSize: 16,
    color: COLOR.Black,
    fontFamily: "Roboto-Medium",
  },
  manualMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 5,
  },
  labelText: {
    fontWeight: "500",
    fontSize: 10,
    color: COLOR.darkBlue,
    fontFamily: "Roboto-Medium",
  },

  container: {
    flex: 1,
    backgroundColor: "#ebedee",
  },
  carNameText: {
    fontWeight: "500",
    fontSize: 16,
    color: COLOR.Black,
    fontFamily: "Roboto-Medium",
  },

  priceText: {
    fontWeight: "500",
    fontSize: 19,
    color: COLOR.tabActive,
    fontFamily: "Roboto-Medium",
  },
  locationMain: {
    flexDirection: "row",
    marginBottom: 10,

    marginTop: 3,
  },
  locationText: {
    fontWeight: "500",
    fontSize: 12,
    color: COLOR.darkBlue,
  },
  listText: {
    fontWeight: "700",
    fontSize: 14,
    color: COLOR.tabActive,
    marginTop: 10,
    fontFamily: "Roboto-Medium",
  },
  center: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    paddingVertical: 20,
  },
  centerCar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 5,
  },
  column: {
    flexDirection: "column",

    alignItems: "center",
  },
});

export default CarDetails;

const DATA = [
  {
    id: "1",
    text: "Compact sedan",
    uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/c024b5ca-16bb-4f96-8440-ad4edc120a1f.jpg",
  },
  {
    id: "2",
    text: "Convertible",
    uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/c440d24c-60bd-42ad-b456-96e4a3a89d0a.jpg",
  },

  {
    id: "3",
    text: "Coupe",
    uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/a7e0155f-e1d0-492f-8c23-624ae2ba1456.jpg",
  },
  {
    id: "4",
    text: "Double Cabin dcd",
    uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/d9f6d3f5-9750-4843-adb5-64aba69f989e.jpg",
  },
  {
    id: "5",
    text: "Crossoverd",
    uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/9fd0e9e0-aa95-419d-9c3a-544cc6cd0d71.jfif",
  },
  {
    id: "6",
    text: "Compact sedan",
    uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/c024b5ca-16bb-4f96-8440-ad4edc120a1f.jpg",
  },
  {
    id: "7",
    text: "Convertible",
    uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/c440d24c-60bd-42ad-b456-96e4a3a89d0a.jpg",
  },

  {
    id: "8",
    text: "Coupe",
    uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/a7e0155f-e1d0-492f-8c23-624ae2ba1456.jpg",
  },
  {
    id: "9",
    text: "Double Cabin dcd",
    uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/d9f6d3f5-9750-4843-adb5-64aba69f989e.jpg",
  },
  {
    id: "10",
    text: "Crossoverd",
    uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/9fd0e9e0-aa95-419d-9c3a-544cc6cd0d71.jfif",
  },
  {
    id: "11",
    text: "Compact sedan",
    uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/c024b5ca-16bb-4f96-8440-ad4edc120a1f.jpg",
  },
  {
    id: "12",
    text: "Convertible",
    uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/c440d24c-60bd-42ad-b456-96e4a3a89d0a.jpg",
  },

  {
    id: "13",
    text: "Coupe",
    uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/a7e0155f-e1d0-492f-8c23-624ae2ba1456.jpg",
  },
  {
    id: "14",
    text: "Double Cabin dcd",
    uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/d9f6d3f5-9750-4843-adb5-64aba69f989e.jpg",
  },
  {
    id: "15",
    text: "Crossoverd",
    uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/9fd0e9e0-aa95-419d-9c3a-544cc6cd0d71.jfif",
  },
  {
    id: "16",
    text: "Crossoverd",
    uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/9fd0e9e0-aa95-419d-9c3a-544cc6cd0d71.jfif",
  },
];
