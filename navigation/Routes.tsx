import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, createContext, useReducer } from "react";
import { useSelector } from "react-redux";
import Login from "../screens/Login/Login";
import Signup from "../screens/Signup/Signup";
import ForgetPassword from "../screens/forgetPassword/ForgetPassword";
import TabOneScreen from "../screens/TabOneScreen";
import DrawerNavigator from "./DrawerNavigator";
import { COLOR } from "../constants/Colors";
import * as SecureStore from "expo-secure-store";
import * as Linking from "expo-linking";
import TableExample from "../screens/TableExample";
import { getAuthentication } from "../redux/Actions/authenticationActions";
import { useDispatch } from "react-redux";
const prefix = Linking.createURL("/");

const Stack = createStackNavigator();
const AuthContext = createContext(null);

const Routes = () => {
  const reducerStates = useSelector((state) => state);
  const dispatch = useDispatch();
  const userProfile = reducerStates.auth;
  const [userToken, setUserToken] = useState(null);

  const isAuthenticated = false;
  const linking = {
    // prefixes: [prefix],
    prefixes: ["https://myapp.com", "myapp:"],
    // prefixes: ['https://app.example.com'],
  };

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLOR.background,
    },
  };
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken: any = "";
      let userInfo: any = "";

      try {
     
        userToken = await SecureStore.getItemAsync("token");
        userInfo = await SecureStore.getItemAsync("user");
        if(userToken && userInfo){
          dispatch(getAuthentication(userToken, JSON.parse(userInfo)));
        }
      //  dispatch(getAuthentication(userToken, userInfo));
        // setUserToken(userToken);
      } catch (e) {
        // Restoring token failed
      }
    };

    bootstrapAsync();
  }, []);

  console.log("userToken", userToken);

  return (
    <NavigationContainer theme={MyTheme} linking={linking}>
      <Stack.Navigator initialRouteName={userToken === null ? "login" : "home"}>
        {!userProfile.isAuthenticated ? (
          <>
            <Stack.Screen
              name="login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="signup"
              component={Signup}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ForgetPassword"
              component={ForgetPassword}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="home"
              component={DrawerNavigator}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
