import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import React, { useState } from "react";
import Login from "../screens/Login/Login";
import Signup from "../screens/Signup/Signup";
import ForgetPassword from "../screens/forgetPassword/ForgetPassword";

const Stack = createStackNavigator();
const Auth = () => {
  return (
    <NavigationContainer >
    <Stack.Navigator  initialRouteName='login' >
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
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Auth;
