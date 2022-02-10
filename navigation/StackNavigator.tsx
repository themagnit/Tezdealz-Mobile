import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Entypo as Icon,
  MaterialIcons,
  FontAwesome,
  AntDesign,
  EvilIcons,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import Home from "../screens/Home";
import Compare from "../screens/Compare/Compare";
import CompareNew from '../screens/CompareNew/CompareNew'
import BrowseCar from "../screens/Browse Car/BrowseCar";
import Help from "../screens/Help/Help";
import AddPost from "../screens/AddPost/AddPost";
import CarDetails from "../screens/Car Details/CarDetails";
import CarListing from "../screens/Car Listing/CarListing";
import FavouriteCar from "../screens/Favourite/FavouriteCar";
import Profile from "../screens/Profile/Profile";
import YourAdd from "../screens/Your Add/YourAdd";
import CompletePost from "../screens/AddPost/CompletePost/CompletePost";
import Search from "../screens/Search/Search";
import { COLOR } from "../constants/Colors";
import ChangePassword from "../screens/Settings/ChangePassword";
import CompareCar from "../screens/CompareCar/CompareCar";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: COLOR.White,
    borderBottomColor: COLOR.tabInctive,
    borderBottomWidth: 1,
  },
  headerTintColor: COLOR.headerColor,
  headerBackTitle: "Back",
};

const HomeStackNavigator = ({ navigation }: any) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={CarListing}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Car Details" component={CarDetails} />
      <Stack.Screen
        name="search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CompletePost"
        component={CompletePost}
        options={{
          title: "Complete Post",
        }}
      />
      <Stack.Screen
        name="Your Favourite Cars"
        component={FavouriteCar}
        options={{
          title: "Your Favourites ",
          headerLeft: () => (
            <Icon
              name="menu"
              style={{ margin: 10 }}
              size={30}
              color={COLOR.headerColor}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Your Add"
        component={YourAdd}
        options={{
          headerLeft: () => (
            <Icon
              name="menu"
              style={{ margin: 10 }}
              size={30}
              color={COLOR.headerColor}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
          headerRight: () => (
            <FontAwesome
              name="user-circle-o"
              size={24}
              color={COLOR.headerColor}
              style={{ marginHorizontal: 15 }}
              onPress={() => {
                navigation.navigate("Profile");
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={{
          title: "Post an Ad",
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              style={{ margin: 10 }}
              size={30}
              color={COLOR.headerColor}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerRight: () => (
            <Text
              style={{ margin: 10, color: COLOR.headerColor }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              Cancal
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="Change Password"
        component={ChangePassword}
        options={{
          headerLeft: () => (
            <Icon
              name="menu"
              style={{ margin: 10 }}
              size={30}
              color={COLOR.headerColor}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const CompareStackNavigator = ({ navigation }: any) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Compare"
        component={CompareCar}
        options={{
          headerLeft: () => (
            <Icon
              name="menu"
              style={{ margin: 10 }}
              size={30}
              color={COLOR.headerColor}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const BrowseStackNavigator = ({ navigation }: any) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerLeft: () => (
            <Icon
              name="menu"
              style={{ margin: 10 }}
              size={30}
              color={COLOR.headerColor}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const PostStackNavigator = ({ navigation }: any) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={{
          title: "Post an Ad",
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              style={{ margin: 10 }}
              size={30}
              color={COLOR.headerColor}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerRight: () => (
            <Text
              style={{ margin: 10, color: COLOR.headerColor }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              Cancal
            </Text>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const HelpStackNavigator = ({ navigation }: any) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Help"
        component={Help}
        options={{
          headerLeft: () => (
            <Icon
              name="menu"
              style={{ margin: 10 }}
              size={30}
              color={COLOR.headerColor}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export {
  HomeStackNavigator,
  CompareStackNavigator,
  BrowseStackNavigator,
  PostStackNavigator,
  HelpStackNavigator,
};
