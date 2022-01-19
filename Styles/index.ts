import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { COLOR } from "../constants/Colors";

export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
  },
  inputView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("3%"),
    marginBottom: hp("1%"),
  },
  searchStyle: {
    height: hp("8%"),
    width: wp("91%"),
    backgroundColor: COLOR.LightGrey,
    borderRadius: 6,
  },
  helperText: {
    textAlign: "left",
    width: wp("70%"),
    fontSize: 12,
    lineHeight: 10,
    // backgroundColor:"red"
  },
  activeField: {
    marginVertical: 8,
    width: wp("71%"),
    height: hp("6%"),
    backgroundColor: COLOR.White,
    borderColor: COLOR.primary,
    borderWidth: 2,
    borderRadius: 2,
  },
  inputField: {
    marginVertical: 8,
    width: wp("71%"),
    height: hp("6%"),
    backgroundColor: COLOR.White,
    borderColor: COLOR.DarkCharcoal,
    borderWidth: 2,
    borderRadius: 2,
  },
  errorText: {
    fontSize: 13,
    color: COLOR.primary,
  },
  SignInButton: {
    width: wp("58%"),
    height: hp("6.3%"),
    borderColor: COLOR.primary,
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  loginText: {
    fontFamily: "IBMPlexSans-Medium",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 17,
    color: COLOR.primary,
  },
  forgetButton: {
    marginTop: hp("3%"),
    alignItems: "center",
    justifyContent: "center",
  },
  forgetText: {
    fontFamily: "IBMPlexSans-Medium",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 24,
    color: COLOR.ChineseSilver,
  },

  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },

  activeStyle: {
    marginLeft: wp("2%"),
    width: wp("49%"),
    height: hp("6.1%"),
    backgroundColor: COLOR.primary,
    borderRadius: 22,
    justifyContent: "center",
  },
  inActiveStyle: {
    marginLeft: wp("2%"),
    width: wp("49%"),
    height: hp("6.1%"),
    backgroundColor: COLOR.LightGrey,
    borderRadius: 22,
    justifyContent: "center",
  },
  activeText: {
    fontFamily: "IBMPlexSans-Regular",
    fontSize: 14,
    letterSpacing: 0.6,
    lineHeight: 20,
    textAlign: "center",
    color: COLOR.White,
  },
  inActiveText: {
    fontFamily: "IBMPlexSans-Regular",
    fontSize: 14,
    letterSpacing: 0.6,
    lineHeight: 20,
    textAlign: "center",
    color: COLOR.DarkCharcoal,
  },
  wrapperStyle: {
    backgroundColor: "rgba(0,0,0,.5)",
    height: "100%",
  },
  containerStyle: {
    height: "auto",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  draggableIcon: {
    backgroundColor: "transparent",
  },
  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("25%"),
    marginBottom: hp("35%"),
  },
  searchButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("100%"),
    backgroundColor: COLOR.White,
    alignSelf: "center",
  },
  searchActiveButton: {
    marginLeft: wp("2%"),
    width: wp("30%"),
    justifyContent: "center",
    borderBottomWidth: 2,
    borderColor: COLOR.primary,
  },
  searchInActiveButton: {
    marginLeft: wp("2%"),
    width: wp("30%"),
    justifyContent: "center",
  },
  searchActiveText: {
    fontFamily: "IBMPlexSans-Regular",
    fontSize: 14,
    letterSpacing: 0.6,
    lineHeight: 20,
    textAlign: "center",
    color: COLOR.DarkCharcoal,
    paddingVertical: hp("1.5%"),
  },
  searchInactiveText: {
    fontFamily: "IBMPlexSans-Regular",
    fontSize: 14,
    letterSpacing: 0.6,
    lineHeight: 20,
    textAlign: "center",
    color: COLOR.secondary,
    paddingVertical: hp("1.5%"),
  },
});
