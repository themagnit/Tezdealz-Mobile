//Specification

import moment from "moment";
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

const Specification = ({ navigation, data }: any) => {
  return (
    <View style={styles.container}>
          <View>
              <View style={styles.labelHeader}>
                <Text style={styles.label}>Registered City</Text>
                <Text style={styles.lastLabel}>{data.registrationCity}</Text>
              </View>

              <View style={styles.labelHeader}>
                <Text style={styles.label}>Assembly</Text>
                <Text style={styles.lastLabel}>{data.assembly}</Text>
              </View>
              <View style={styles.labelHeader}>
                <Text style={styles.label}>Body Type</Text>
                <Text style={styles.lastLabel}>{data.bodyType}</Text>
              </View>
              <View style={styles.labelHeader}>
                <Text style={styles.label}>Color</Text>
                <Text style={styles.lastLabel}>{data.bodyColor}</Text>
              </View>
              <View style={styles.labelHeader}>
                <Text style={styles.label}>Engine Capacity</Text>
                <Text style={styles.lastLabel}>{data.engineCapacity?.toLocaleString()}</Text>
              </View>
              <View style={styles.labelHeader}>
                <Text style={styles.label}>Last Updated:</Text>
                <Text style={styles.lastLabel}>
                {moment(data.updatedAt).format('MMM D, YYYY')}
                  {/* {data.updatedAt} */}
                </Text>
              </View>
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400
    //marginVertical: 20,
  },
  labelHeader: {
    flexDirection: "row",
    paddingVertical: 20,
  },
  label: {
    color: COLOR.tabActive,
    fontSize: 14,
    fontWeight: "400",
    flex: 1,
    marginStart: 30,
    fontFamily: "Roboto-Medium",
  },
  lastLabel: {
    color: COLOR.darkBlue,
    fontSize: 14,
    fontWeight: "400",
    flex: 1,
    fontFamily: "Roboto-Medium",
  },
});

export default Specification;
