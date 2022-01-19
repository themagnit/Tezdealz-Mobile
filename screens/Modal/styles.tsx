import { StyleSheet } from "react-native";
import { COLOR } from "../../constants/Colors";
 export default StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
  
      flex: 1,
    },
    headerText: {
      fontSize: 16,
      color: COLOR.Black,
    },
    title: {
      backgroundColor: COLOR.White,
    },
    filterRow: {
      flexDirection: "row",
      flex: 1,
      backgroundColor: COLOR.White //'white'//  COLOR.lightGray, // "#E5E5E5",
    },
    leftSide: {
      //flex: 1.7,
      //backgroundColor: "white",
     // height: 400,
      //width:160
      // borderWidth: 1,
      // marginVertical: 20,
      // marginTop:10,
      // marginBottom:20,
      // backgroundColor:   'red' //COLOR.grayishBlue,
    },
    rightSide: {
      flex: 2,
      //  backgroundColor: COLOR.grayishBlue,
    },
    text: {
      backgroundColor: "transparent",
      fontSize: 16,
      color: COLOR.White,
      fontWeight: "700",
    },
    button: {
      backgroundColor: COLOR.tabActive,
      padding: 10,
      marginVertical: 15,
      marginStart: 30,
      borderRadius: 6,
    },
    applyBtn: {
      backgroundColor: COLOR.tabActive,
      padding: 10,
      marginVertical: 15,
      marginEnd: 30,
      // paddingHorizontal: 20,
      borderRadius: 6,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      height: 70,
      backgroundColor: COLOR.White,
      borderTopWidth:1.5,
      borderTopColor: COLOR.tabInctive,
    },
  
    container: {
      flex: 1,
      backgroundColor: "#ebedee",
    },
    sectionHeader: {
      fontWeight: "600",
      fontSize: 15,
      color: COLOR.tabActive,
      fontFamily: "Roboto-Medium",
      marginTop: 10,
      marginBottom: 5,
      marginStart: 13,
    },
    item: {
      backgroundColor: COLOR.secondary, // '#979797'  // "#E3E3E3",
    },
    active: {
      backgroundColor: COLOR.White,
    },
    itemText: {
      padding: 10,
      marginStart: 3,
      fontWeight: "400",
      fontSize: 10,
      color: COLOR.headerColor,
      fontFamily: "Roboto-Medium",
    },
    itemTextActive: {
      padding: 10,
      marginStart: 3,
      fontWeight: "400",
      fontSize: 10,
      color: COLOR.Black,
      fontFamily: "Roboto-Medium",
    },
    input: {
      backgroundColor: COLOR.lightGray,
    },

    containerCheck: {
      padding: 10,
      backgroundColor: COLOR.background,
      //marginTop: 20,
    },
    check: {
      // paddingVertical: 5,
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
    },
    inputFilter: {
      backgroundColor: COLOR.White,
    },

  });
  