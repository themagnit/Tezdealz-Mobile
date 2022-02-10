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
  ImageBackground,
} from "react-native";
import {
  MaterialIcons,
  EvilIcons,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import FilterModal from "../Modal/FilterModal";
import { COLOR } from "../../constants/Colors";
import {
  addToFav,
  deleteData,
  getAllData,
  updateData,
} from "../../Utility/API";
import { endPoints } from "../../constants/Environment";
import { useToast } from "native-base";
import { Loader } from "../../components";
import moment from "moment";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { save } from "../../Utility/commonUtils";

const YourAdd = ({ navigation }: any) => {
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

  const getAllCars = async () => {
    let params = `?limit=9&page=${page}`;
    getAllData(endPoints.api.ADSCAR + endPoints.api.MY_CARS + params)
      .then((response) => {
        setIsLoading(false);
        if (response && response.status === "success" && response.data) {
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

  const toggleActive = (item: any) => {
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
          getAllCars();
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
          getAllCars();
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
          getAllCars();
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
          getAllCars();
        } else {
          toast.show({
            title: response.data.message,
            status: "error",
          });
          getAllCars();
        }

        setIsLoading(false);
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
      {result.length > 0 && (
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
                  <View style={{ marginTop: 3 }}>
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
                                Id: item._id,
                              });
                            }}
                            text="Edit"
                          />
                          <MenuOption
                            onSelect={() => deleteAd(item)}
                            text="Delete"
                          />
                          {item.isPublished === false ? (
                            <MenuOption
                              onSelect={() => publishAd(item)}
                              text="Publish"
                            />
                          ) : null}
                          {item.isPublished && item.active && (
                            <MenuOption
                              onSelect={() => toggleSold(item)}
                              text={
                                item.isSold ? "Mark as Unsold" : "Mark as Sold"
                              }
                            />
                          )}
                          
                          {item.isPublished && !item.isSold && (
                            <MenuOption
                              onSelect={() => toggleActive(item)}
                              text={item.active ? "Deactivate" : "Activate"}
                            />
                          )}
                        </MenuOptions>
                      </Menu>
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
      )}
      {result.length === 0 && (
        <Text style={styles.resultNotFound}>No Result Found</Text>
      )}
    </View>
  );
};

export default YourAdd;

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
  resultNotFound: {
    marginHorizontal: 30,
    marginTop: 50,
    fontFamily: "Roboto-Medium",
    fontSize: 20,
    textAlign: "center",
  },
});
