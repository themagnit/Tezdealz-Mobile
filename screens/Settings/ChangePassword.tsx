import { LinearGradient } from "expo-linear-gradient";
import { useToast } from "native-base";
import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useDispatch } from "react-redux";
import { TextInput as Input, RadioButton } from "react-native-paper";
import { Loader, TextInput } from "../../components";
import { COLOR } from "../../constants/Colors";
import { endPoints } from "../../constants/Environment";
import { updateUser } from "../../Utility/API";
import {
  validateConfirmPassword,
  validatePassword,
} from "../../Utility/functions/validations";
import { getAuthentication } from "../../redux/Actions/authenticationActions";
import { getToken, save } from "../../Utility/commonUtils";

const ChangePassword = ({ navigation }: any) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState({ value: "", error: "" });
  const [newPassword, setNewPassword] = useState({ value: "", error: "" });

  const [newSecureTextEntry, setNewSecureTextEntry] = useState(true);
  const [conSecureTextEntry, setConSecureTextEntry] = useState(true);

  const [secureTextEntryPassword, setSecureTextEntryPassword] = useState(true);

  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });

  const changePassword = async (url: string, data: any) => {
    const passError = validatePassword(password.value);
    const newPassError = validatePassword(newPassword.value);

    const confirmPassError = validateConfirmPassword(
      confirmPassword.value,
      newPassword.value
    );
    let token = await getToken("token");
    if (passError || newPassError || confirmPassError) {
      setPassword({ ...password, error: passError });
      setNewPassword({ ...newPassword, error: newPassError });
      setConfirmPassword({ ...confirmPassword, error: confirmPassError });

      return;
    }
    setIsLoading(true);
    await updateUser(endPoints.api.UPDATE_PASSWORD, {
      passwordCurrent: password.value,
      password: newPassword.value,
      passwordConfirm: confirmPassword.value,
    })
      .then((response) => {
        setIsLoading(false);
        if (response.status === "success") {

          console.log(response);
          toast.show({
            title: "Password has been updated Successfully",
            status: "success",
          });
          dispatch(getAuthentication(response.token, response.data.user));
          save("token", response.token);
          navigation.navigate("Home");
        } else {
          // setOpen(true);
          console.log(response);
          toast.show({
            title: "Something went wronng",
            status: "error",
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ marginHorizontal: 20 }}>
          <Loader loading={isLoading} />
          <Text style={styles.passwordText}>Password Setting</Text>
          <TextInput
            label="Old Password"
            placeholder="Old Password"
            returnKeyType="next"
            autoCapitalize="none"
            secureTextEntry={secureTextEntryPassword}
            style={styles.input}
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: "" })}
            error={!!password.error}
            errorText={password.error}
            right={
              <Input.Icon
                name="eye"
                onPress={() =>
                  setSecureTextEntryPassword(!secureTextEntryPassword)
                }
              />
            }
          />
          <TextInput
            label="New Password"
            placeholder="New Password"
            returnKeyType="next"
            secureTextEntry={newSecureTextEntry}
            autoCapitalize="none"
            style={styles.input}
            value={newPassword.value}
            onChangeText={(text) => setNewPassword({ value: text, error: "" })}
            error={!!newPassword.error}
            errorText={newPassword.error}
            right={
              <Input.Icon
                name="eye"
                onPress={() => setNewSecureTextEntry(!newSecureTextEntry)}
              />
            }
          />
          <TextInput
            label="Confirm New Password"
            placeholder="Confirm New Password"
            returnKeyType="next"
            secureTextEntry={conSecureTextEntry}
            autoCapitalize="none"
            style={styles.input}
            value={confirmPassword.value}
            onChangeText={(text) =>
              setConfirmPassword({ value: text, error: "" })
            }
            error={!!confirmPassword.error}
            errorText={confirmPassword.error}
            right={
              <Input.Icon
                name="eye"
                onPress={() => setConSecureTextEntry(!conSecureTextEntry)}
              />
            }
          />
          <View style={styles.footerBtn}>
            <TouchableOpacity
              onPress={changePassword}
              style={{ padding: 10, backgroundColor: COLOR.tabActive }}
            >
              <Text style={styles.btnText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  passwordText: {
    color: COLOR.tabActive,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
    marginVertical: 20,
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  input: {
    backgroundColor: COLOR.lightGray,
  },
  uploadText: {
    fontSize: 16,
    color: "#053361",
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  needBtn: {
    backgroundColor: COLOR.primary,
    padding: 10,
    width: "35%",
  },
  nextBtn: {
    width: "35%",
  },
  btnText: {
    color: COLOR.White,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  footerBtn: {
    width: "50%",
    alignSelf: "center",
    marginVertical: 20,
  },
});

export default ChangePassword;
