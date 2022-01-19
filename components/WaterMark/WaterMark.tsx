import React, { memo } from "react";
import { View, StyleSheet, Image } from "react-native";

const WaterMark = () => (
  <Image
    style={styles.container}
    source={require("../../assets/images/Carokta_Logo.png")}
  />
);

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: 80,
    alignItems: "center",
    justifyContent: "center",

    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
  },
});

export default memo(WaterMark);
