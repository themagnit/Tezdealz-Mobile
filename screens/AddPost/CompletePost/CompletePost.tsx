import { LinearGradient } from "expo-linear-gradient";
import React, { memo, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { COLOR } from "../../../constants/Colors";

const CompletePost = ({ navigation }: any) => {
  const _onLoginPressed = async () => {
    navigation.replace("home");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/Carokta_Logo_BGT.png")}
        />
        <Text style={styles.header}>Congratulations !!</Text>
        <Image
          style={styles.addImage}
          source={require("../../../assets/images/postSubmit.png")}
        />

        <Text style={styles.adsText}>
          Your Add has been successfully listed on
          <Text style={{ color: "#055FFF" }}>Carokta</Text>
        </Text>

        <TouchableOpacity onPress={_onLoginPressed}      style={styles.button}>

            <Text style={styles.text}>Back To Home</Text>
      
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Your Add");
          }}
          style={styles.button}
        >

            <Text style={styles.text}>See Your Add </Text>
        
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CompletePost;

const styles = StyleSheet.create({
  scrollContainer: {
    minHeight: "100%",
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    marginHorizontal: 20,
  },
  image: {
    // marginTop: 30,
    width: "70%",
    height: "15%",
    alignSelf: "center",
  },
  addImage: {
    // marginTop: 30,
    width: "70%",
    height: "35%",
    alignSelf: "center",
  },

  header: {
    fontSize: 26,
    color: COLOR.darkBlue,
    fontWeight: "500",
    // paddingVertical: 14,
    textAlign: "center",
  },

  adsText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "500",
  },
  button: {
    padding: 15,
    width: "60%",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
    marginTop: 20,
    backgroundColor:COLOR.tabActive
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});
