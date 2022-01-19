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
import { TextInput, Loader } from "../../components/index";
import { theme } from "../../constants/theme";
import { TextInput as Input } from "react-native-paper";
import { getAuthentication } from "../../redux/Actions/authenticationActions";
import { connect } from "react-redux";
import { ApiService } from "../../Utility/apiUtils";
import { useDispatch } from "react-redux";
import { endPoints } from "../../constants/Environment";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR } from "../../constants/Colors";
import { addData } from "../../Utility/API";
import { useToast } from "native-base";
import {
  nameValidator,
  passwordValidator,
  save,
} from "../../Utility/commonUtils";



const Login = ({ navigation }: any) => {
  const toast = useToast();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const _onLoginPressed = async () => {
    const emailError = nameValidator(email.value);
    const passwordError = passwordValidator(password.value);
    // navigation.replace("home");
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    let data = {
      data: email.value,
      password: password.value,
    };

    let url = `${endPoints.api.LOGIN_ENDPOINT}`;

    setIsLoading(true);
    //dispatch(showLoader())
    await addData(url, data).then((response) => {
      console.log("data", response);

      console.log("response.data", response.data);
      console.log("response.message", response.message);
      console.log("response.response", response.response);
      setIsLoading(false);
      if (response && response.data && response.data.status === "success") {
        dispatch(
          getAuthentication(response.data.token, response.data.data.user)
        );
        save("token", response.data.token);
        navigation.replace("home");
      } else {
        toast.show({
          title: "Please Provide Valid Credentials.",
          status: "error",
        });
      }
    });
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Loader loading={isLoading} />
        <View style={styles.container}>
          <View>
            <Image
              style={styles.image}
              source={require("../.././assets/images/Carokta_Logo.png")}
            />
          </View>

          <View>
            <Text style={styles.header}>Sign In</Text>
          </View>

          <TextInput
            label="Email/Phone Number"
            placeholder="Enter your Email/Phone Number"
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

          <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgetPassword")}
            >
              <Text style={styles.forget}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("signup")}>
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* <Button mode="contained" onPress={_onLoginPressed} style={styles.button}>
        Sign In
      </Button> */}
          <TouchableOpacity onPress={_onLoginPressed} style={styles.button}>
            <Text style={styles.text}>Sign In </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  scrollContainer: {
    minHeight: "100%",
  },
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
  forgotPassword: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
  },
  label: {
    color: theme.colors.secondary,
  },
  forget: {
    color: theme.colors.violet,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.violet,
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
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});
