import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import CheckBox from "react-native-check-box";
import { COLOR } from "../../../constants/Colors";
import styles from "../styles";

const AssemblyFilter = ({
  navigation,
  handleCheckboxChange,
  assembly,
}: any) => {
  return (
    <View style={styles.containerCheck}>
      <View style={styles.rowCheck}>
        {assembly.map((post: any) => (
          <View style={[styles.buttonCheck]}>
            <CheckBox
              onClick={() => {
                handleCheckboxChange("assembly", post);
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

export default AssemblyFilter;
