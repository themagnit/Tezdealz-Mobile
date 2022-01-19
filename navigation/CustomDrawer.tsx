import React, { useDebugValue, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Title,
  Caption,
  Paragraph,
  Drawer,
} from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import {
  MaterialCommunityIcons as Icon,
  FontAwesome5,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { COLOR } from "../constants/Colors";

export function CustomDrawerContent(props: any) {
  const signOut = () => {
    SecureStore.deleteItemAsync("token").then(
      props.navigation.navigate("login")
    );
  };
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section style={styles.drawerContent}>
          <DrawerItem
            icon={({ color, size }) => (
              <FontAwesome
                name="user-circle"
                size={24}
                color={COLOR.darkBlue}
              />
            )}
            label="Profile"
            labelStyle={styles.labelStyle}
            onPress={() => {
              props.navigation.navigate("Profile");
            }}
          />
          <View style={styles.separator} />

          <DrawerItem
            icon={({ color, size }) => (
              <MaterialIcons name="favorite" size={24} color={COLOR.darkBlue} />
            )}
            labelStyle={styles.labelStyle}
            label="Favourites"
            onPress={() => {
              props.navigation.navigate("Your Favourite Cars");
            }}
          />
          <View style={styles.separator} />
          <DrawerItem
            icon={({ color, size }) => (
              <Ionicons name="car" size={24} color={COLOR.darkBlue} />
            )}
            labelStyle={styles.labelStyle}
            label="My Ads"
            onPress={() => {
              props.navigation.navigate("Your Add");
            }}
          />
          <View style={styles.separator} />
          <DrawerItem
            icon={({ color, size }) => (
              <Ionicons name="settings" size={24} color={COLOR.darkBlue} />
            )}
            labelStyle={styles.labelStyle}
            label="Settings"
            onPress={() => {
              props.navigation.navigate("Change Password");
            }}
          />
          <View style={styles.separator} />
          <DrawerItem
            icon={({ color, size }) => (
              <Entypo
                name="help-with-circle"
                size={24}
                color={COLOR.darkBlue}
              />
            )}
            labelStyle={styles.labelStyle}
            label="Help"
            onPress={() => {
              props.navigation.navigate("Help");
            }}
          />
          <View style={styles.separator} />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={COLOR.darkBlue} size={24} />
          )}
          label="Sign Out"
          labelStyle={styles.labelStyle}
          onPress={signOut}
          // onPress={() => {
          //   props.navigation.navigate("login");
          // }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
    marginBottom: 20,
    marginTop: 30,
  },

  labelStyle: {
    color: COLOR.darkBlue,
    fontSize: 20,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  separator: {
    marginVertical: 2,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
