import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import CheckBox from "react-native-check-box";
import { COLOR } from "../../../constants/Colors";
import styles from "../styles";

const MakeFilter = ({ navigation, makes, handleCheckboxChange }: any) => {
  return (
    <View style={styles.containerCheck}>
      <ScrollView>
        {/* {makes.map((post) => (
          <View>
            <CheckBox
              onClick={() => {
                handleCheckboxChange("make", post);
              }}
              style={styles.check}
              boxStyle="white"
              checkBoxColor={COLOR.darkBlue}
              isChecked={post.isChecked}
              rightText={post.name}
              rightTextStyle={{ color: COLOR.darkBlue }}
            />
          </View>
        ))} */}

        <View style={styles.rowCheck}>
          {makes.map((post: any, id: any) => (
            <View style={[styles.buttonCheck]}>
              <CheckBox
                key={id}
                onClick={() => {
                  handleCheckboxChange("make", post);
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

export default MakeFilter;
