import React, { useState } from "react";
import { View, Button, StyleSheet, ScrollView } from "react-native";
import CheckBox from "react-native-check-box";
import { COLOR } from "../../../constants/Colors";
import styles from "../styles";

const ColorFilter = ({ navigation, bodyColors, handleCheckboxChange }: any) => {
  return (
    <View style={styles.containerCheck}>
      <View style={styles.rowCheck}>
        {bodyColors.map((post: any) => (
          <View style={[styles.buttonCheck]}>
            <CheckBox
              onClick={() => {
                handleCheckboxChange("bodyColor", post);
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

export default ColorFilter;
