import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { TextInput } from "../../../components";
import { COLOR } from "../../../constants/Colors";
import styles from "../styles";
import { minMaxValues } from "../../../constants/language/en/filterData";

const MileageFilter = ({
  navigation,
  rangeValues,
  setRangeValues,
  handleTextBoxSubmit,
}: any) => {
  const handleRangeFromInputChange = (name: any, value: any) => {
    let newValue: any[] = [...rangeValues[name]];
    console.log("newValue", newValue);
    // check if new values is greater than maximum values
    if (newValue[1] < Number(value)) {
      if (name in minMaxValues) {
        newValue[1] = minMaxValues[name][1];
      }
    }
    newValue[0] = Number(value);
    setRangeValues((previousValue: any) => {
      previousValue[name] = newValue;
      return { ...previousValue };
    });
  };
  const handleRangeToInputChange = (name: any, value: any) => {
    let newValue: any[] = [...rangeValues[name]];
    if (newValue[0] > Number(value)) {
      if (name in minMaxValues) {
        newValue[0] = minMaxValues[name][0];
      }
    }
    newValue[1] = Number(value);
    setRangeValues((previousValue: any) => {
      previousValue[name] = newValue;
      return { ...previousValue };
    });
  };
  return (
    <View style={styles.containerCheck}>
      <TextInput
        label="From"
        placeholder="0"
        maxLength={6}
        returnKeyType="next"
        autoCapitalize="none"
        style={styles.inputFilter}
        value={rangeValues.milage[0].toString()}
        keyboardType="number-pad"
        onBlur={handleTextBoxSubmit("milage")}
        onChangeText={(val) => handleRangeFromInputChange("milage", val)}
      />
      <TextInput
        label="To"
        maxLength={6}
        placeholder="500000"
        returnKeyType="next"
        autoCapitalize="none"
        style={styles.inputFilter}
        value={rangeValues.milage[1].toString()}
        onBlur={handleTextBoxSubmit("milage")}
        keyboardType="number-pad"
        onChangeText={(val) => handleRangeToInputChange("milage", val)}
      />
    </View>
  );
};

export default MileageFilter;
