import React, { memo, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
} from "react-native";
import { TextInput, Button, Loader } from "../../components/index";
import { theme } from "../../constants/theme";
import { TextInput as Input, RadioButton } from "react-native-paper";
import { ApiService } from "../../Utility/apiUtils";
import { useDispatch } from "react-redux";
import { endPoints } from "../../constants/Environment";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR } from "../../constants/Colors";
import { Radio, Center, NativeBaseProvider } from "native-base";
import { useToast } from "native-base";
import {
  validateName,
  userNameValidator,
  validatePhone,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../Utility/functions/validations";
import { addData } from "../../Utility/API";
const Signup = ({ navigation }: any) => {
  const toast = useToast();
  const [firstName, setFirstName] = useState({ value: "", error: "" });
  const [lastName, setLastName] = useState({ value: "", error: "" });
  const [userName, setUserName] = useState({ value: "", error: "" });
  const [phone, setPhone] = useState({ value: "", error: "" });

  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });
  const [checked, setChecked] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryPassword, setSecureTextEntryPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const _onSignUpPressed = async () => {
    const type = checked == "Email" ? email.value : phone.value;
    const firstNameError = validateName(firstName.value);
    const lastNameError = validateName(lastName.value);
    const userNameError = userNameValidator(userName.value);
    let phoneError = "";
    let emailError = "";
    if (checked === "Email") {
      emailError = validateEmail(email.value);
    } else if (checked === "Phone") {
      phoneError = validatePhone(phone.value);
    }

    const passError = validatePassword(password.value);
    const confirmPassError = validateConfirmPassword(
      confirmPassword.value,
      password.value
    );

    if (
      firstNameError ||
      lastNameError ||
      userNameError ||
      phoneError ||
      emailError ||
      passError ||
      confirmPassError
    ) {
      setFirstName({ ...firstName, error: firstNameError });
      setLastName({ ...lastName, error: lastNameError });
      setUserName({ ...userName, error: userNameError });
      setEmail({ ...email, error: emailError });
      setPhone({ ...phone, error: phoneError });
      setPassword({ ...password, error: passError });
      setConfirmPassword({ ...confirmPassword, error: confirmPassError });
      return;
    }

    let data = {
      firstName: firstName.value,
      lastName: lastName.value,
      data: type,
      username: userName.value,
      password: password.value,
      passwordConfirm: confirmPassword.value,
    };
    console.log("data", data);
    let url = `${endPoints.apiBaseUrl}${endPoints.api.SIGNUP_ENDPOINT}`;
    setIsLoading(true);
    await addData(url, data).then((response) => {
      setIsLoading(false);
      if (response && response.data && response.data.status === "success") {
        toast.show({
          title: "SignUp Successfully",
          status: "success",
          description: "Thanks for signing up with us.",
        });
        // dispatch(
        //   getAuthentication(response.data.token, response.data.data.user)
        // );
        // save("token", response.data.token);
        navigation.replace("login");
      } else {
        console.log("response error", response);
        setIsLoading(false);
        // alert('Please Provide Valid Credentials.')
        toast.show({
          title:
            response && response.daamessage
              ? response.message
              : "Network Error",
          status: "error",
        });
      }
    });

    // const response = await ApiService(url, "POST", data);

    // // dispatch(getAuthentication(response.data.token, response.data.data.user));
    // navigation.navigate("login");
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={{ marginTop: 70 }}>
            <Image
              style={styles.image}
              source={require("../.././assets/images/Carokta_Logo.png")}
            />
          </View>

          <View>
            <Text style={styles.header}>Sign Up</Text>
          </View>
          <Loader loading={isLoading} />
          <TextInput
            label="First Name"
            placeholder="Enter your First Name"
            returnKeyType="next"
            autoCapitalize="none"
            value={firstName.value}
            onChangeText={(text) => setFirstName({ value: text, error: "" })}
            error={!!firstName.error}
            errorText={firstName.error}
          />
          <TextInput
            label="Last Name"
            placeholder="Enter your Last Name"
            returnKeyType="next"
            autoCapitalize="none"
            value={lastName.value}
            onChangeText={(text) => setLastName({ value: text, error: "" })}
            error={!!lastName.error}
            errorText={lastName.error}
          />
          <TextInput
            label="Username"
            placeholder="Enter your Username"
            returnKeyType="next"
            autoCapitalize="none"
            value={userName.value}
            onChangeText={(text) => setUserName({ value: text, error: "" })}
            error={!!userName.error}
            errorText={userName.error}
          />
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            onChange={(value) => setChecked(value)}
            value={checked}
          >
            <Radio value="Email" my={1}>
              Continue with Email
            </Radio>
            <Radio value="Phone" my={1}>
              Continue with Phone
            </Radio>
          </Radio.Group>

          {checked === "Email" && (
            <TextInput
              label="Email"
              placeholder="Enter your Email"
              returnKeyType="next"
              autoCapitalize="none"
              value={email.value}
              onChangeText={(text) => setEmail({ value: text, error: "" })}
              error={!!email.error}
              errorText={email.error}
            />
          )}

          {checked === "Phone" && (
            <TextInput
              label="Phone"
              placeholder="Enter your Phone Number"
              returnKeyType="next"
              autoCapitalize="none"
              value={phone.value}
              onChangeText={(text) => setPhone({ value: text, error: "" })}
              error={!!phone.error}
              errorText={phone.error}
            />
          )}

          <TextInput
            label="Password"
            placeholder="Enter Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: "" })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry={secureTextEntry}
            right={
              <Input.Icon
                name="eye"
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              />
            }
          />
          <TextInput
            label="Confirm Password"
            placeholder="Enter Confirm Password"
            returnKeyType="done"
            value={confirmPassword.value}
            
            onChangeText={(text) =>
              setConfirmPassword({ value: text, error: "" })
            }
            error={!!confirmPassword.error}
            errorText={confirmPassword.error}
            secureTextEntry={secureTextEntryPassword}
            right={
              <Input.Icon
                name="eye"
                onPress={() =>
                  setSecureTextEntryPassword(!secureTextEntryPassword)
                }
              />
            }
          />

          <View style={styles.row}>
            <Text style={styles.label}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text style={styles.link}>Sign In</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={_onSignUpPressed} style={styles.button}>
            <Text style={styles.text}>Continue </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "white",
    minHeight: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
    paddingBottom: 200,
  },
  image: {
    width: 300,
    height: 70,
    alignSelf: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
  },
  label: {
    color: theme.colors.secondary,
  },

  link: {
    fontWeight: "bold",
    color: theme.colors.violet,
  },
  header: {
    fontSize: 26,
    color: theme.colors.black,
    fontWeight: "bold",
    paddingVertical: 8,
    textAlign: "center",
  },
  button: {
    padding: 15,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: COLOR.tabActive,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});
export default Signup;
