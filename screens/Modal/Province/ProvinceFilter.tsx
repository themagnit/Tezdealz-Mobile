import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { TextInput } from "../../../components";
import CheckBox from "react-native-check-box";
import { COLOR } from "../../../constants/Colors";
import styles from "../styles";

const ProvinceFilter = ({
  navigation,
  province,
  handleCheckboxChange,
}: any) => {
  return (
    <View style={styles.containerCheck}>
      <ScrollView>
        <View style={styles.rowCheck}>
          {province.map((post: any,id:any) => (
            <View style={[styles.buttonCheck]}>
              <CheckBox
               key={id}
                onClick={() => {
                  handleCheckboxChange("province", post);
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
      </ScrollView>
    </View>
  );
};

export default ProvinceFilter;
