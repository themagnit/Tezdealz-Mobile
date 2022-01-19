import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { TextInput } from "../../../components";

import { minMaxValues } from "../../../constants/language/en/filterData";
import styles from "../styles";

const YearFilter = ({
  navigation,
  rangeValues,
  setRangeValues,
  handleTextBoxSubmit,
}: any) => {
  const handleRangeFromInputChange = (name: any, value: any) => {
    let newValue: any[] = [...rangeValues[name]];
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
        placeholder="1971"
        returnKeyType="next"
        autoCapitalize="none"
        maxLength={4}
        style={styles.inputFilter}
        value={rangeValues.modelYear[0].toString()}
        keyboardType="number-pad"
        onBlur={handleTextBoxSubmit("modelYear")}
        onChangeText={(val) => handleRangeFromInputChange("modelYear", val)}
      />
      <TextInput
        label="To"
        placeholder="2021"
        maxLength={4}
        returnKeyType="next"
        autoCapitalize="none"
        style={styles.inputFilter}
        value={rangeValues.modelYear[1].toString()}
        keyboardType="number-pad"
        onBlur={handleTextBoxSubmit("modelYear")}
        onChangeText={(val) => handleRangeToInputChange("modelYear", val)}
      />
    </View>
  );
};

export default YearFilter;
