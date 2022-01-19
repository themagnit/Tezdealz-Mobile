import React from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { COLOR } from "../../../constants/Colors";

const Description = ({ navigation, data }: any) => {
  return (
    <View style={styles.container}>
         <View style={styles.descView}>
              <Text style={styles.content}>{data.description}</Text>
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  descView: {
    paddingHorizontal: 20,
  },
  content: {
    color: COLOR.darkBlue,
    fontSize: 14,
    fontWeight: "400",

  },
});

export default Description;
