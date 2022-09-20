import { Dimensions, StyleSheet } from "react-native";
import { COLOR } from "../../constants/Colors";

 export default StyleSheet.create({
    check: {
        paddingVertical: 5,
      },
      pickerStyle: {
        //borderWidth: 1,
      },
      itemTextStyle: {
        padding: 20,
      },
      inputContainerStyle: {
        borderWidth: 1,
        backgroundColor: "white",
      },
      line: {
        alignSelf: "center",
        color: "#1A75FF",
      },
      circleMain: {
        flexDirection: "column",
        marginTop: 30,
      },
      circleHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
      },
      textView: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: 25,
      },
      headerText: {
        color: "#053361",
        width: "30%",
        textAlign: "center",
        fontSize: 12,
        fontWeight: "500",
      },
      uploadText: {
        fontSize: 16,
        color: "#053361",
        fontWeight: "500",
        textAlign: "center",
        marginBottom: 20,
      },
      container: {
        flex: 1,
      },
      containerStyle: {
        flex: 1,
        marginHorizontal: 20,
      },
      card: {
        margin: 10,
        height: 140,
      },
      header: {
        height: 50,
        marginHorizontal: 40,
        backgroundColor: "#092c4c",
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
      },
      label: {
        color: COLOR.White,
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
      },
      text: {
        color: COLOR.White,
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
        paddingHorizontal: 18,
        marginTop: 20,
      },
      subText: {
        color: COLOR.White,
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
        marginTop: 10,
      },
      iconView: {
        alignItems: "center",
        marginTop: 10,
      },
      dropdownStyle: {
        backgroundColor: COLOR.lightGray,
        borderWidth: 1,
        borderRadius: 8,
      },
      input: {
        backgroundColor: COLOR.White,
      },
      textArea: {
        backgroundColor: COLOR.White,
        height: 100,
      },
      warningText: {
        color: COLOR.primary,
        fontSize: 12,
        fontWeight: "500",
      },
      btnText: {
        color: COLOR.White,
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
      },
      needBtnText: {
        color: COLOR.Black,
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
      },
      deleteBtnText: {
        color: COLOR.White,
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
      },
      footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
      },
      needBtn: {
        backgroundColor: COLOR.secondary,
        padding: 10,
      },
      deleteBtn:{
        backgroundColor: COLOR.primary,
        padding: 10,
      },
      nextBtn: {
        width: "35%",
        padding: 10,
        backgroundColor: COLOR.tabActive,
      },
      imageHeader: {
        alignSelf: "center",
        paddingVertical: 10,
        backgroundColor: "white",
        width: "20%",
        marginTop: 20,
      },
      imageCard: {
        height: 150,
        borderWidth: 1,
        borderColor: COLOR.primary,
        borderStyle: "dashed",
      },
      imageText: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: "400",
        marginVertical: 10,
        width: "50%",
        color: "#484848",
      },
      imageView: {
        alignItems: "center",
        marginTop: 20,
      },
      circle: {
        borderRadius:
          Math.round(
            Dimensions.get("window").width + Dimensions.get("window").height
          ) / 2,
        width: Dimensions.get("window").width * 0.1,
        height: Dimensions.get("window").width * 0.1,
        backgroundColor: COLOR.tabActive,
        justifyContent: "center",
        alignItems: "center",
      },
      circleText: {
        color: COLOR.White,
      },
      circleUnfilled: {
        borderRadius:
          Math.round(
            Dimensions.get("window").width + Dimensions.get("window").height
          ) / 2,
        width: Dimensions.get("window").width * 0.1,
        height: Dimensions.get("window").width * 0.1,
        backgroundColor: COLOR.tabInctive,
        justifyContent: "center",
        alignItems: "center",
      },
      unfilledText: {
        color: "#000000",
      },
      labeStyle:{
        backgroundColor: COLOR.White, marginTop: 10
      },
      containerCarStyle:{
        backgroundColor: COLOR.White
      },
      optionContainerStyle:{
        backgroundColor: COLOR.tabInctive
      },
      optionsLabelStyle:{
        marginStart: 10
      },
      rowCheck: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
      buttonCheck: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        alignSelf: "flex-start",
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: "48%",
        textAlign: "center",
      },  containerCheck: {
        padding: 10,
        backgroundColor: COLOR.background,
        //marginTop: 20,
      },





  });
  