import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { TextInput } from "../../../components";
import CheckBox from "react-native-check-box";
import { COLOR } from "../../../constants/Colors";
import styles from "../styles";
const MakeData = [
  { id: 1, name: "Automatic" },
  { id: 2, name: "Manual" },
];
const TransmissionFilter = ({
  navigation,
  handleCheckboxChange,
  transmissions,
}: any) => {
  return (
    <View style={styles.containerCheck}>
      <View style={styles.rowCheck}>
        {transmissions.map((post: any, id: any) => (
          <View style={[styles.buttonCheck]}>
            <CheckBox
              key={id}
              onClick={() => {
                handleCheckboxChange("transmission", post);
              }}
              style={[styles.check]}
              boxStyle="white"
              checkBoxColor={COLOR.darkBlue}
              isChecked={post.isChecked}
              rightText={post.name}
              rightTextStyle={{ color: COLOR.darkBlue }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default TransmissionFilter;
