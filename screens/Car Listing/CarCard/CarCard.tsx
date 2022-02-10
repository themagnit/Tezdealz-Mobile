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
            </View>
            <View style={[styles.mainContainer]}>
              <View>
                <Text style={styles.carNameText}>
                  {props.item.make} {props.item.model}
                </Text>
              </View>
              <View style={styles.row}>
                <MaterialIcons
                  onPress={() => {
                    props.toggleShortListCar(props.item);
                  }}
                  name="compare"
                  size={20}
                  color={
                    props.shortlistCars.filter((e) => e._id === props.item._id)
                      .length > 0
                      ? COLOR.primary
                      : COLOR.secondary
                  }
                  style={styles.spaceMargin}
                />
                {user?._id === props.item.createdBy ? null : (
                  <MaterialIcons
                    onPress={() => {
                      props.favs(props.item.isFav, props.item.id);
                    }}
                    name="favorite"
                    size={20}
                    color={props.item.isFav ? COLOR.primary : COLOR.secondary}
                    style={styles.spaceMargin}
                  />
                )}
                {user._id === props.item.createdBy && (
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
                          props.navigation.navigate("AddPost", {
                            Id: props.item._id,
                          });
                        }}
                        text="Edit"
                      />
                      <MenuOption
                        onSelect={() => props.deleteAd(props.item)}
                        text="Delete"
                      />
                      {props.item.isPublished === false ? (
                        <MenuOption
                          onSelect={() => props.publishAd(props.item)}
                          text="Publish"
                        />
                      ) : null}
                      {props.item.isPublished && props.item.active && (
                        <MenuOption
                          onSelect={() => props.toggleSold(props.item)}
                          text={
                            props.item.isSold
                              ? "Mark as Unsold"
                              : "Mark as Sold"
                          }
                        />
                      )}
                      {props.item.isPublished && !props.item.isSold && (
                        <MenuOption
                          onSelect={() => props.toggleActive(props.item)}
                          text={props.item.active ? "Deactivate" : "Activate"}
                        />
                      )}
                    </MenuOptions>
                  </Menu>
                )}
              </View>
            </View>
            <View style={styles.listPrice}>
              <Text style={styles.priceText}>
                PKR {props.item.price.toLocaleString()}
              </Text>
            </View>
            <View style={styles.mainContent}>
              <Text style={styles.text}>{props.item.modelYear}</Text>
              <Text style={styles.text}>|</Text>
              <Text style={styles.text}>{props.item.milage} KM</Text>
              <Text style={styles.text}>|</Text>
              <Text style={styles.text}>{props.item.engineType}</Text>
              <Text style={styles.text}>|</Text>
              <Text style={styles.text}>{props.item.engineCapacity} CC</Text>
              <Text style={styles.text}>|</Text>
              <Text style={styles.text}>{props.item.transmission}</Text>
            </View>

            <View style={styles.mainContent}>
              <View style={styles.row}>
                <EvilIcons name="location" size={15} color={COLOR.tabInctive} />
                <Text style={styles.text}>{props.item.city}</Text>
              </View>
              <View>
                <Text style={styles.text}>
                  {/* {ConvertDate(item.createdAt)} */}
                  {`${"Updated"} ${moment(props.item.updatedAt).fromNow()}`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default memo(CarCard);
