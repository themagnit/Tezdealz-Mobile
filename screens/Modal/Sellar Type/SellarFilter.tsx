import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { TextInput } from "../../../components";
import CheckBox from "react-native-check-box";
import { COLOR } from "../../../constants/Colors";
import styles from "../styles";

const SellarFilter = ({
  navigation,
  handleCheckboxChange,
  sellarType,
}: any) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <View style={styles.containerCheck}>
      <View style={styles.rowCheck}>
        {sellarType.map((post: any) => (
          <View style={[styles.buttonCheck]}>
            <CheckBox
              onClick={() => {
                handleCheckboxChange("sellerType", post);
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

export default SellarFilter;
