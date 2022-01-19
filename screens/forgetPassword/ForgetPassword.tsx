import React, { memo, useState } from "react";
import { TouchableOpacity, StyleSheet, Image, Text, View } from "react-native";
import { TextInput, Button } from "../../components/index";
import { theme } from "../../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import OTPTextView from "react-native-otp-textinput";
import { COLOR } from "../../constants/Colors";

const ForgetPassword = ({ navigation }: any) => {
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

  const _onLoginPressed = () => {
    setOtp(true);
    setEmailInput(false);
    // navigation.navigate('login');
  };
  const _onNext = () => {
    setOtp(false);
    setPasswordFlag(true);
  };

  const _onSubmit = () => {
    setPasswordFlag(false);
    setSuccess(true);
  };
  const _onLogin = () => {
    navigation.navigate("login");
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
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
            />
            <TouchableOpacity onPress={_onLoginPressed} style={styles.button}>
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
              secureTextEntry={true}
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
              secureTextEntry={true}
            />
            <TouchableOpacity onPress={_onSubmit} style={styles.button}>
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
