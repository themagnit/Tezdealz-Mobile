import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useSelector } from "react-redux";
import Login from "../screens/Login/Login";
import Signup from "../screens/Signup/Signup";
import TabOneScreen from "../screens/TabOneScreen";

const Stack = createStackNavigator();
const Routes = () => {
  const reducerStates = useSelector((state) => state);
  console.log(reducerStates);
  const isAuthenticated = false;
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="/">
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
          name="home"
          component={TabOneScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
