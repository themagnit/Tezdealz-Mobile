import {
  MaterialIcons,
  EvilIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import moment from "moment";
import React, { memo } from "react";
import {
  ImageBackground,
  TouchableWithoutFeedback,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useSelector } from "react-redux";
import { COLOR } from "../../../constants/Colors";
import styles from "../styles";

const CarGridCard = (props: any) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Car Details", {
            Id: props.item.id,
          });
        }}
      >
        <View style={styles.carGrid}>
          <View style={styles.carImg}>
            {props.item.selectedImage && props.item.selectedImage.location ? (
              <Image
                source={{
                  uri: props.item.selectedImage.location,
                }}
                style={styles.gridImage}
                resizeMethod={"auto"}
                resizeMode="cover"
              ></Image>
            ) : props.item.image &&
              props.item.image.length > 0 &&
              props.item.image[0].location ? (
              <Image
                source={{
                  uri: props.item.image[0].location,
                }}
                style={styles.gridImage}
                resizeMethod={"auto"}
                resizeMode="cover"
              ></Image>
            ) : (
              <Image
                source={require("../../.././assets/images/no-img.png")}
                style={styles.gridImage}
                resizeMethod={"auto"}
                resizeMode="cover"
              ></Image>
            )}
          </View>
          <View>
            <View style={styles.gridRow}>
              <View style={styles.gridName}>
                <Text
                  style={styles.carNameText}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {props.item.make} {props.item.model}
                </Text>
              </View>
              <View style={styles.row}>
                <MaterialIcons
                  onPress={() => {
                    //  props.favs(props.item.isFav, props.item.id);
                  }}
                  name="favorite"
                  size={20}
                  color={COLOR.primary}
                  style={styles.spaceMargin}
                />
              </View>
            </View>
            <View style={styles.gridPrice}>
            <View style={{ flexDirection: "row", marginBottom: 6 }}>
                <TouchableOpacity
                  style={{
                    width: "30%",
                    padding: 3,
                    backgroundColor: "#26A541",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: COLOR.White,
                      textAlign: "center",
                    }}
                  >
                    4.3
                  </Text>
                  <AntDesign name="star" size={14} color="white" />
                </TouchableOpacity>

                <Text
                  style={{
                    textAlign: "center",
                    marginHorizontal: 10,
                    marginTop: 2,
                    fontSize: 16,
                  }}
                >
                  (754)
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.priceText}>PKR 890</Text>
                <Text style={styles.priceText1}>PKR 890</Text>
              </View>
            </View>
            <View style={{marginHorizontal:10,marginTop:10}}>
              <TouchableOpacity
                style={{
                  width: "100%",
                  padding: 7,
                  backgroundColor: COLOR.tabActive,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: COLOR.White,
                    textAlign: "center",
                    fontSize: 14,
                  }}
                >
                  BUY NOW
                </Text>

                <AntDesign name="pluscircleo" size={20} color="white" />
              </TouchableOpacity>
        
            </View>
            <View style={{margin:10}}>
            <TouchableOpacity
                style={{
                  width: "100%",
                  padding: 7,
                  backgroundColor: COLOR.White,
                  borderColor: COLOR.tabActive,
                  borderWidth: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: COLOR.tabActive,
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 14,

                    fontFamily: "Roboto-Medium",
                  }}
                >
                  ADD TO CART
                </Text>
                <MaterialIcons
                  name="shopping-cart"
                  size={20}
                  color={COLOR.tabActive}
                />
              </TouchableOpacity>
              </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(CarGridCard);
