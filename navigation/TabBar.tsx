import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  FontAwesome as Icon,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";

import { TabBarAdvancedButton } from "../components/index";
import { IS_IPHONE_X } from "../Utility";

import {
  BrowseStackNavigator,
  CompareStackNavigator,
  HelpStackNavigator,
  HomeStackNavigator,
  PostStackNavigator,
} from "./StackNavigator";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR } from "../constants/Colors";
import Profile from "../screens/Profile/Profile";
const BottomBar = createBottomTabNavigator();

type Props = {
  barColor: string;
};

export const TabBar: React.FC<Props> = ({ barColor = COLOR.White }) => (
  <BottomBar.Navigator
    tabBar={(props) => {
      return (
        <View style={styles.navigatorContainer}>
          <BottomTabBar {...props} style={{ backgroundColor: "transparent" }} />
          {IS_IPHONE_X && (
            <View
              style={[
                styles.xFillLine,
                {
                  backgroundColor: barColor,
                },
              ]}
            />
          )}
        </View>
      );
    }}
    tabBarOptions={{
      style: styles.navigator,

      tabStyle: {
        backgroundColor: barColor,
        borderTopWidth: 1,
        borderTopColor: COLOR.tabInctive,
      },
      activeTintColor: COLOR.tabActive,
      inactiveTintColor: COLOR.tabInctive,
    }}
  >
    <BottomBar.Screen
      name="Home"
      component={HomeStackNavigator}
      options={{
        // tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
        tabBarIcon: ({ color, focused }) => (
          <View style={styles.tabHeader}>
            {focused && <View style={styles.activeView} />}
            <Icon name="home" size={24} color={color} style={styles.icon} />
          </View>
        ),
      }}
    />
    <BottomBar.Screen
      name="Compare"
      component={CompareStackNavigator}
      options={{
        // tabBarIcon: ({ color }) => (
        //   <MaterialIcons name="compare" size={24} color={color} />
        // ),
        tabBarIcon: ({ color, focused }) => (
          <View style={styles.tabHeader}>
            {focused && <View style={styles.activeView} />}
            <MaterialIcons
              name="compare"
              size={24}
              color={color}
              style={styles.icon}
            />
          </View>
        ),
      }}
    />
    <BottomBar.Screen
      name="add"
      component={PostStackNavigator}
      options={{
        tabBarButton: (props) => (
          <TabBarAdvancedButton bgColor={barColor} {...props} />
        ),
      }}
    />
    {/* <BottomBar.Screen
      name="Browse Car"
      component={BrowseStackNavigator}
      options={{
        tabBarIcon: ({ color, focused }) => (
          <View style={styles.tabHeader}>
            {focused && <View style={styles.activeView} />}
            <Ionicons
              name="car-outline"
              size={24}
              color={color}
              style={styles.icon}
            />
          </View>
        ),
      }}
    /> */}
    <BottomBar.Screen
      name="Help"
      component={HelpStackNavigator}
      options={{
        tabBarIcon: ({ color, focused }) => (
          <View style={styles.tabHeader}>
            {focused && <View style={styles.activeView} />}
            <Ionicons
              name="md-help-circle-outline"
              size={24}
              color={color}
              style={styles.icon}
            />
          </View>
        ),
      }}
    />
    <BottomBar.Screen
      name="Profile"
      component={BrowseStackNavigator}
      options={{
        tabBarIcon: ({ color, focused }) => (
          <View style={styles.tabHeader}>
            {focused && <View style={styles.activeView} />}
            <Icon
              name="user-circle-o"
              size={24}
              color={color}
              style={styles.icon}
            />
          </View>
        ),
      }}
    />
  </BottomBar.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: "transparent",
    elevation: 30,
  },
  xFillLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
  },
  tabHeader: {
    width: "100%",
    marginTop: -8,
  },
  activeView: {
    borderWidth: 2,
    borderColor: COLOR.tabActive,
  },
  icon: {
    alignSelf: "center",
  },
});
