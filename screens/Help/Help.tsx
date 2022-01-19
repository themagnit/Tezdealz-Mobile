import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import { COLOR } from "../../constants/Colors";
import { endPoints } from "../../constants/Environment";
import { addData } from "../../Utility/API";
import { ScrollView, useToast } from "native-base";

const Help = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const needAssistance = () =>
    Alert.alert(
      "Need Assistance?",
      "Do you need assistance in use of Application?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => needAssist(true) },
      ]
    );

  const onHelp = () => {
    Alert.alert(
      "Help Coming!!!",
      "Thank you for contacting us!! Customer Support will contact you within 24 hours!",
      [
        {
          text: "OK",
          onPress: () => {
            console.log("OK Pressed");
          },
        },
      ]
    );
  };

  const needAssist = (needed: boolean = false) => {
    if (needed) {
      setIsLoading(true);
      let body = {
        description: "I Need assistance in creating my advertisement.",
      };
      addData(`${endPoints.api.NEED_ASSISTANCE}`, body)
        .then((response) => {
          setIsLoading(false);
          if (response && response.data && response.data.status === "success") {
            toast.show({
              title: response.data.message,
              status: "success",
            });

            const timer = setTimeout(() => {
              onHelp();
            }, 1000);
          } else {
            toast.show({
              title:
                response && response.message
                  ? response.message
                  : "Network Error",
              status: "success",
            });
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(error);
        });
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/helpImage.png")}
        // source={{uri:'https://www.carokta.com/static/media/helpImage.825937c4.png'}}
      />
      <Text style={styles.helpText}>We are here to help you</Text>
      <Text style={styles.emailText}>
        Email us at: <Text style={styles.email}> www.example@gmail.com</Text>
      </Text>
      <Text style={styles.emailText}>
        Call us at: <Text style={styles.email}> +92 335 1222515</Text>
      </Text>
      <TouchableOpacity
        style={styles.chatBtn}
        onPress={() => {
          needAssistance();
        }}
      >
        <Text style={styles.btnText}>Need Assistance </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    marginTop: 30,
  },
  image: {
    marginTop: 30,
    width: "90%",
    height: "40%",
    alignSelf: "center",
  },
  helpText: {
    fontSize: 20,
    fontWeight: "500",
    color: COLOR.darkBlue,
    textAlign: "center",
    marginTop: 30,
  },
  emailText: {
    fontSize: 20,
    fontWeight: "500",
    color: COLOR.darkBlue,
    textAlign: "center",
    marginTop: 30,
  },
  email: {
    color: COLOR.tabActive,
  },
  chatBtn: {
    marginTop: 30,
    backgroundColor: COLOR.tabActive,
    padding: 10,
    borderRadius: 6,
    width: "50%",
    alignSelf: "center",
  },

  btnText: {
    color: COLOR.White,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Help;
