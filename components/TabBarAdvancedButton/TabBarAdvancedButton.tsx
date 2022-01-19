import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { Ionicons as Icon } from "@expo/vector-icons";
import { TabBg } from "../../svg";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR } from "../../constants/Colors";

type Props = BottomTabBarButtonProps & {
  bgColor?: string;
};

export const TabBarAdvancedButton: React.FC<Props> = ({
  bgColor,
  ...props
}) => (
  <View style={[styles.container]} pointerEvents="box-none">
    <TabBg color={bgColor} style={styles.background} />

    <TouchableOpacity onPress={props.onPress}>
      <LinearGradient colors={[COLOR.tabActive ,COLOR.tabActive ]} style={styles.button}>
        <Icon name="add" style={styles.buttonIcon} />
      </LinearGradient>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 75,
    alignItems: "center",
  },
  background: {
    position: "absolute",
    top: 0,
  },
  button: {
    top: -22.5,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 27,
  },
  buttonIcon: {
    fontSize: 24,
    color: "#FFFFFF",
  },
});
