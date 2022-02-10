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
                <Text style={styles.carNameText} > 
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
            <View style={styles.gridPrice}>
              <Text style={styles.priceText}>
                PKR {props.item.price.toLocaleString()}
              </Text>
            </View>

            <View style={styles.center}>
              <Text style={styles.listText}>{props.item.modelYear}</Text>
              <Text style={styles.listText}>{props.item.milage} KM</Text>
              <Text style={styles.listText}>{props.item.engineType}</Text>
            </View>
            <View style={styles.manualMain}>
              <Text style={styles.listText}>
                {props.item.engineCapacity} CC
              </Text>
              <Text style={styles.listText}>{props.item.transmission}</Text>
            </View>
            <View style={styles.locationMain}>
              <EvilIcons name="location" size={15} color={COLOR.tabInctive} />
              <Text style={styles.listText}>{props.item.city}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(CarGridCard);
