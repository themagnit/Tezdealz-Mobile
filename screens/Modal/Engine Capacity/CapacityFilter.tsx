import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { TextInput } from "../../../components";
import styles from "../styles";
import { minMaxValues } from "../../../constants/language/en/filterData";

const CapacityFilter = ({
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
        placeholder="0"
        returnKeyType="next"
        autoCapitalize="none"
        maxLength={4}
        style={styles.inputFilter}
        value={rangeValues.engineCapacity[0].toString()}
        keyboardType="number-pad"
        onBlur={handleTextBoxSubmit("engineCapacity")}
        onChangeText={(val) =>
          handleRangeFromInputChange("engineCapacity", val)
        }
      />
      <TextInput
        label="To"
        placeholder="10000"
        returnKeyType="next"
        autoCapitalize="none"
        maxLength={4}
        style={styles.inputFilter}
        value={rangeValues.engineCapacity[1].toString()}
        keyboardType="number-pad"
        onBlur={handleTextBoxSubmit("engineCapacity")}
        onChangeText={(val) => handleRangeToInputChange("engineCapacity", val)}
      />
    </View>
  );
};

export default CapacityFilter;
