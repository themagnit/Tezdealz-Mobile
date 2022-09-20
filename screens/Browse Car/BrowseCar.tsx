import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

const BrowseCar = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>This is the BrowseCar screen </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebedee",
  },
});

export default BrowseCar;
