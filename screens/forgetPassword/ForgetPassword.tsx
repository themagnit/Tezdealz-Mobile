import React, { memo, useState } from "react";
import { TouchableOpacity, StyleSheet, Image, Text, View } from "react-native";
import { TextInput, Button, Loader } from "../../components/index";
import { theme } from "../../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import OTPTextView from "react-native-otp-textinput";
import { COLOR } from "../../constants/Colors";
import { endPoints } from "../../constants/Environment";
import { addData, updateUser } from "../../Utility/API";
import { nameValidator } from "../../Utility/commonUtils";
import { useToast } from "native-base";
import { TextInput as Input, RadioButton } from "react-native-paper";
import {
  validateConfirmPassword,
  validatePassword,
} from "../../Utility/functions/validations";
const ForgetPassword = ({ navigation }: any) => {
  const toast = useToast();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [otpInput, setOtpInput] = useState({ value: "", error: "" });
  const [otp, setOtp] = useState(false);
  const [emailInput, setEmailInput] = useState(true);
  const [passwordFlag, setPasswordFlag] = useState(false);
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newSecureTextEntry, setNewSecureTextEntry] = useState(true);
  const [conSecureTextEntry, setConSecureTextEntry] = useState(true);

  // const _onLoginPressed = () => {
  //   setOtp(true);
  //   setEmailInput(false);
  //   // navigation.navigate('login');
  // };
  const _onNext = () => {
    if (otpInput && otpInput.value.length == 4) {
      setOtp(false);
      setPasswordFlag(true);
    } else {
      alert("enter otp");
    }
  };

  const _onSubmit = () => {
    setPasswordFlag(false);
    setSuccess(true);
  };
  const _onLogin = () => {
    navigation.navigate("login");
  };

  const _onforgetPressed = async () => {
    const emailError = nameValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    let data = {
      data: email.value,
    };

    let url = `${endPoints.api.FORGET_PASSWORD}`;
    setIsLoading(true);
    await addData(url, data)
      .then((response) => {
        console.log("data", response);

        console.log("response.data", response.data);

        setIsLoading(false);
        if (response && response.data && response.data.status === "success") {
          toast.show({
            title: "OTP sent successfully",
            status: "success",
          });
          setOtp(true);
          setEmailInput(false);
        } else {
          toast.show({
            title: "Please Enter Valid Email/Please Enter Valid Phone Number",
            status: "error",
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const _resetPassword = async () => {
    const passError = validatePassword(password.value);

    const confirmPassError = validateConfirmPassword(
      confirmPassword.value,
      password.value
    );

    if (passError || confirmPassError) {
      setPassword({ ...password, error: passError });
      setConfirmPassword({ ...confirmPassword, error: confirmPassError });

      return;
    }
    setIsLoading(true);
    let url = `${endPoints.api.RESET_PASSWORD}/${otpInput.value}`;
    await updateUser(url, {
      password: password.value,
      passwordConfirm: confirmPassword.value,
    })
      .then((response) => {
        setIsLoading(false);
        if (response.status === "success") {
          setPasswordFlag(false);
          setSuccess(true);
          console.log(response);
          toast.show({
            title: response.message, //   "Password has been updated Successfully",
            status: "success",
          });
        } else {
          // setOpen(true);
          console.log(response);
          toast.show({
            title: response.message,
            status: "error",
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.image}
            source={require("../.././assets/images/Carokta_Logo.png")}
          />
        </View>
        <Loader loading={isLoading} />
        {emailInput && (
          <View>
            <Text style={styles.header}>Account Recovery</Text>
            <Text style={styles.subtext}>
              Enter your Account Email or Account Number to reset your password
            </Text>

            <TextInput
              label="Email/Phone Number"
              placeholder="Enter your Email"
              returnKeyType="next"
              value={email.value}
              onChangeText={(text) => setEmail({ value: text, error: "" })}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              textContentType="emailAddress"
              keyboardType="email-address"
            />
            <TouchableOpacity onPress={_onforgetPressed} style={styles.button}>
              <Text style={styles.text}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}

        {otp && (
          <View>
            <OTPTextView
              containerStyle={styles.otpContainer}
              handleTextChange={(text) =>
                setOtpInput({ value: text, error: "" })
              }
              inputCount={4}
              keyboardType="numeric"
            />
            <Text style={styles.subtext}>
              Please, enter 4-digit code we have sent on your Email
            </Text>
            <TouchableOpacity onPress={_onNext} style={styles.button}>
              <Text style={styles.text}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
        {passwordFlag && (
          <View>
            <TextInput
              label="Enter New Password"
              placeholder="Enter New Password"
              returnKeyType="done"
              value={password.value}
              onChangeText={(text) => setPassword({ value: text, error: "" })}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry={newSecureTextEntry}
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
              returnKeyType="done"
              value={confirmPassword.value}
              onChangeText={(text) =>
                setConfirmPassword({ value: text, error: "" })
              }
              error={!!confirmPassword.error}
              errorText={confirmPassword.error}
              secureTextEntry={conSecureTextEntry}
              right={
                <Input.Icon
                  name="eye"
                  onPress={() => setConSecureTextEntry(!conSecureTextEntry)}
                />
              }
            />
            <TouchableOpacity onPress={_resetPassword} style={styles.button}>
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
        {success && (
          <View>
            <Text style={styles.resetText}>Password Reset successful</Text>
            <TouchableOpacity onPress={_onLogin} style={styles.button}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  image: {
    width: 300,
    height: 70,
    alignSelf: "center",
  },
  otpContainer: {
    marginBottom: 20,
  },
  headerView: {
    flexDirection: "column",
  },
  header: {
    fontSize: 26,
    color: theme.colors.black,
    fontWeight: "bold",
    paddingVertical: 14,
    textAlign: "center",
  },
  button: {
    padding: 15,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: COLOR.tabActive,
    marginTop: 20,
  },
  btnConatineer: {
    marginTop: 20,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
  subtext: {
    textAlign: "center",
    marginBottom: 15,
  },
  resetText: {
    fontSize: 18,
    fontWeight: "400",
    paddingVertical: 40,
    textAlign: "center",
  },
});
export default ForgetPassword;
