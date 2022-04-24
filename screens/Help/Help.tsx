import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import { COLOR } from "../../constants/Colors";
import { endPoints } from "../../constants/Environment";
import { addData } from "../../Utility/API";
import { ScrollView, useToast } from "native-base";
import { TextInput, Loader } from "../../components/index";
import { useSelector } from "react-redux";
const Help = ({ navigation }: any) => {
  const reducerStates = useSelector((state) => state);
  const userProfile = reducerStates.auth.user;
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("");

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

  const generalQuery = () => {
    setIsLoading(true);
    let body = {
      email:userProfile.email,
      phone: "+918439440094",
      description:description,
    };
    addData(`${endPoints.api.GENERAL_TICKET}`, body)
      .then((response) => {
        setIsLoading(false);
        if (response && response.data && response.data.status === "success") {
          setModalVisible(!modalVisible)
          toast.show({
            title: response.data.message,
            status: "success",
          });
        } else {
          toast.show({
            title:
              response && response.message ? response.message : "Network Error",
            status: "error",
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
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
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.btnText}>Help </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.chatBtn}
        onPress={() => {
          needAssistance();
        }}
      >
        <Text style={styles.btnText}>Need Assistance </Text>
      </TouchableOpacity>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Need Help?</Text>
              <Text>Fill the below form and submit to open help ticket.</Text>
              <TextInput
                multiline
                label="Description"
                placeholder="Description the issue/bug"
                returnKeyType="next"
                value={description}
                onChangeText={(text) => setDescription(text)}
                autoCapitalize="none"
                style={{ maxHeight: 100 }}
              />

              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.cancalBtn}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.btnText}>Cancal </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitbtn} onPress={() => {
          generalQuery();
        }} >
                  <Text style={styles.btnText}>Yes </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
  },

  modalText: {
    marginBottom: 15,

    fontWeight: "bold",
    fontSize: 18,
  },
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
  cancalBtn: {
    marginTop: 30,
    backgroundColor: COLOR.tabActive,
    padding: 10,
    borderRadius: 6,
    width: "45%",
    alignSelf: "center",
    marginHorizontal: 10,
  },
  submitbtn: {
    marginTop: 30,
    backgroundColor: COLOR.tabActive,
    padding: 10,
    borderRadius: 6,
    width: "45%",
    alignSelf: "center",
    marginHorizontal: 10,
  },

  btnText: {
    color: COLOR.White,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Help;
