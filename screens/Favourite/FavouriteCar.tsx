import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  SectionList,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";

import {
  MaterialIcons,
  EvilIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import FilterModal from "../Modal/FilterModal";
import { COLOR } from "../../constants/Colors";
import { addToFav, getAllData } from "../../Utility/API";
import { endPoints } from "../../constants/Environment";
import { useToast } from "native-base";
import { Loader } from "../../components";
import moment from "moment";

const FavouriteCar = ({ navigation }: any) => {
  const toast = useToast();

  const [result, setResult] = useState<any[] | []>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadBtn, setLoadBtn] = useState(true);

  useEffect(() => {
    getAllCars();
  }, []);

  const handleLoadMore = () => {
    setPage(page + 1);
    getAllCars();
  };

  const getAllCars = async (getPage?: number) => {
    let params = `?limit=9&page=${page}`;
    getAllData(endPoints.api.ADSCAR + endPoints.api.GET_FAV + params)
      .then((response) => {
        console.log("page no ", page);
        console.log("page no ", response.data.result);
        setIsLoading(false);
        if (response && response.status === "success") {
          setRefreshing(false);
          setLoadBtn(true);
          if (response.data.result.length > 0) {
            setResult(
              page === 1
                ? response.data.result
                : [...result, ...response.data.result]
            );
            setLoadBtn(response.data.result.length === 9 ? true : false);
          }
        } else {
          setLoadBtn(false);
          setRefreshing(false);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const handleRefresh = () => {
    setPage(1);
    setRefreshing(true);
    getAllCars();
  };
  const favs = (isFav: any, id: string) => {
    setIsLoading(true);
    addToFav(endPoints.api.ADSCAR + endPoints.api.REMOVE_FAVS, id)
      .then((response) => {
        setIsLoading(false);
        if (response && response.status === "success") {
          toast.show({
            title: "Removed from Favourites Successfully",
            status: "success",
          });
          getAllCars();
        } else {
          console.log("response", response);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const footer = () => {
    if (!loadBtn) return null;
    return (
      <View style={{ marginBottom: 50 }}>
        <TouchableOpacity
          style={{
            padding: 10,
            width: "40%",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 5,
            backgroundColor: COLOR.tabInctive,
            marginVertical: 20,
          }}
          onPress={() => {
            handleLoadMore();
          }}
        >
          <Text style={{ color: "white", fontFamily: "Roboto-Medium" }}>
            Show More
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      <Loader loading={isLoading} />
      <FlatList
        data={result}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Car Details", {
                Id: item.id,
              });
            }}
          >
            <View style={styles.cardHeader}>
              {/* <Image
                source={{ uri: item.selectedImage }}
                style={{ flex: 0.5, marginVertical: 3, marginHorizontal: 3 }}
                resizeMethod="resize"
              ></Image> */}

              {item.selectedImage && item.selectedImage.location ? (
                <Image
                  source={{
                    uri: item.selectedImage.location,
                  }}
                  style={{
                    flex: 0.5,
                    marginVertical: 1,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  }}
                  resizeMethod="resize"
                ></Image>
              ) : item.image &&
                item.image.length > 0 &&
                item.image[0].location ? (
                <Image
                  source={{
                    uri: item.image[0].location,
                  }}
                  style={{
                    flex: 0.5,
                    marginVertical: 1,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  }}
                  resizeMethod="resize"
                ></Image>
              ) : (
                <Image
                  source={require("../.././assets/images/no-img.png")}
                  style={{
                    height: 100,
                    width: 115,
                    marginVertical: 1,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  }}
                  resizeMethod="resize"
                  resizeMode="cover"
                ></Image>
              )}

              <View style={styles.card}>
                <View>
                  <Text style={styles.text}>
                    {/* {ConvertDate(item.createdAt)} */}
                    {moment(item.createdAt).format("LL")}
                  </Text>
                </View>
                <View style={[styles.mainContainer]}>
                  <View>
                    <Text style={styles.carNameText}>
                      {item.make} {item.model}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <MaterialIcons
                      name="compare"
                      size={20}
                      color={COLOR.secondary}
                      style={{ marginHorizontal: 5 }}
                    />
                    <MaterialIcons
                      name="favorite"
                      onPress={() => {
                        favs(true, item.id);
                      }}
                      size={20}
                      color={COLOR.primary}
                      style={{ marginHorizontal: 5 }}
                    />
                  </View>
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={styles.priceText}>
                    PKR {item.price.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.mainContainer}>
                  <Text style={styles.text}>{item.modelYear}</Text>
                  <Text style={styles.text}>|</Text>
                  <Text style={styles.text}>{item.milage} KM</Text>
                  <Text style={styles.text}>|</Text>
                  <Text style={styles.text}>{item.engineType}</Text>
                  <Text style={styles.text}>|</Text>
                  <Text style={styles.text}>{item.engineCapacity} CC</Text>
                  <Text style={styles.text}>|</Text>
                  <Text style={styles.text}>{item.transmission}</Text>
                </View>

                <View style={styles.locationContainer}>
                  <View style={styles.row}>
                    <EvilIcons
                      name="location"
                      size={15}
                      color="#484848"
                      style={{ marginTop: 1 }}
                    />
                    <Text style={styles.text}>{item.city}</Text>
                  </View>
                  <View style={{}}>
                    <Text style={styles.text}>
                      {`${"Updated"} ${moment(item.updatedAt).fromNow()}`}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={footer}
        onEndReachedThreshold={50}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </View>
  );
};

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

export default FavouriteCar;

const styles = StyleSheet.create({
  listText: {
    fontWeight: "500",
    fontSize: 10,
    color: COLOR.darkBlue,
  },

  container: {
    flex: 1,
    paddingBottom: 100,
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
  },

  text: {
    fontWeight: "500",
    fontSize: 10,
    color: COLOR.darkBlue,
    fontFamily: "Roboto-Medium",
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginEnd: 10,
    marginTop: 5,
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginEnd: 10,
    marginTop: 20,
  },
  cardHeader: {
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 6,
    flexDirection: "row",
    backgroundColor: COLOR.White,
    borderColor: COLOR.tabInctive,
    borderWidth: 1,
    // height: 110,
  },
  card: {
    marginStart: 10,
    flex: 1,
    paddingBottom: 5,
  },

  priceText: {
    fontWeight: "500",
    fontSize: 16,
    color: COLOR.tabActive,
    fontFamily: "Roboto-Medium",
  },
  carNameText: {
    fontWeight: "500",
    fontSize: 16,
    color: COLOR.Black,
    fontFamily: "Roboto-Medium",
  },
});
