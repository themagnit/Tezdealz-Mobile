import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
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
const prefix = Linking.createURL("/");

const Stack = createStackNavigator();
const Routes = () => {
  const reducerStates = useSelector((state) => state);
  const [userToken, setUserToken] = useState(null);
  console.log(reducerStates);
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
      let userToken: any;

      try {
        userToken = await SecureStore.getItemAsync("token");
        console.log("userToken", userToken);
        setUserToken(userToken);
      } catch (e) {
        // Restoring token failed
      }
    };

    bootstrapAsync();
  }, []);

  console.log("userToken", userToken);

  return (
    <NavigationContainer theme={MyTheme} linking={linking}>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="TableExample"
          component={TableExample}
          options={{
            headerShown: false,
          }}
        /> */}
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
        <Stack.Screen
          name="home"
          component={DrawerNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
