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

const Features = ({ navigation, carFeatures }: any) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={carFeatures}
        numColumns={2}
        renderItem={({ item }) => (
          <View
            style={[
              styles.featureLabel,
              { flexDirection: "row", marginBottom: 10 },
            ]}
          >
            <Image
              source={{
                uri: item.image,
              }}
              style={{ width: 25, height: 30 }}
            />
            <Text
              style={[
                styles.featureLastLabel,
                { marginStart: 10, textAlign: "left" },
              ]}
            >
              {item.name}
            </Text>
          </View>
        )}
        keyExtractor={(contact, index) => String(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   // flex: 1,
    marginVertical: 20,
  },

  featureLabel: {
    flex: 1,
    paddingLeft: 20,
  },
  featureLastLabel: {
    color: COLOR.darkBlue,
    fontSize: 14,
    fontWeight: "400",
    flex: 1,
    fontFamily: "Roboto-Medium",
    marginTop: 10,
  },
});

export default Features;
