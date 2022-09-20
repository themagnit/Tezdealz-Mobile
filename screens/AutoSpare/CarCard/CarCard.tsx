import {
  MaterialIcons,
  EvilIcons,
  MaterialCommunityIcons,
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
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { COLOR } from "../../../constants/Colors";
import styles from "../styles";

const CarCard = (props: any) => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => {
          props.navigation.navigate("Car Details", {
            Id: props.item.id,
          });
        }}
      >
        <View style={styles.cardHeader}>
          {props.item.selectedImage && props.item.selectedImage.location ? (
            <ImageBackground
              source={{ uri: props.item.selectedImage.location }}
              resizeMode="cover"
              style={styles.backGroundImage}
            >
              {/* <WaterMark /> */}
            </ImageBackground>
          ) : props.item.image &&
            props.item.image.length > 0 &&
            props.item.image[0].location ? (
            <ImageBackground
              source={{ uri: props.item.image[0].location }}
              resizeMode="cover"
              style={styles.backGroundImage}
            >
              {/* <WaterMark /> */}
            </ImageBackground>
          ) : (
            <Image
              source={require("../../.././assets/images/no-img.png")}
              style={styles.defaultImage}
              resizeMethod="resize"
              resizeMode="cover"
            ></Image>
          )}

          <View style={styles.card}>
            <View style={styles.listDate}>
              <Text style={styles.text}>
                {/* {ConvertDate(item.createdAt)} */}
                {moment(props.item.createdAt).format("LL")}
              </Text>
              <MaterialIcons
                name="favorite"
                size={20}
                color={COLOR.primary}
                style={styles.spaceMargin}
              />
            </View>
            <View style={[styles.mainContainer]}>
              <View style={{ width: "70%" }}>
                <Text
                  style={styles.carNameText}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {props.item.make} {props.item.model}
                </Text>
              </View>
            </View>
            <View style={styles.listPrice}>
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
            <View style={styles.mainContent}>
              <TouchableOpacity
                style={{
                  width: "48%",
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
                  BUY
                </Text>

                <AntDesign name="pluscircleo" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "45%",
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
                  CART
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
      </TouchableWithoutFeedback>
    </View>
  );
};

export default memo(CarCard);
