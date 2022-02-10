//const styles =
import { StyleSheet } from "react-native";
import { COLOR } from "../../constants/Colors";
export default StyleSheet.create({
  resultNotFound: {
    marginHorizontal: 30,
    marginTop: 50,
    fontFamily: "Roboto-Medium",
    fontSize: 20,
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 40,
    backgroundColor: COLOR.primary,
    borderRadius: 30,
    elevation: 8,
  },
  backGroundImage: {
    flex: 0.5,
    marginVertical: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  input: {
    backgroundColor: COLOR.lightGray,
    flex: 1,
    marginEnd: 10,
  },
  gridActive: {
    padding: 5,
    backgroundColor: COLOR.secondary,
    borderWidth: 0.3,
    // opacity:.8
  },
  gridInactive: {
    padding: 5,
    backgroundColor: COLOR.White,
    borderWidth: 0.3,
    //opacity:.8
  },
  listItem: {
    margin: 5,
    borderWidth: 1,
    flexDirection: "column",
    backgroundColor: COLOR.lightGray,
    borderColor: COLOR.lightGray, //COLOR.veryDarkBlue,
    height: 240,
    maxHeight: 300,
  },
  listText: {
    fontWeight: "500",
    fontSize: 10,
    color: COLOR.darkBlue,
  },
  center: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 5,
  },
  manualMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 5,
  },
  locationMain: {
    flexDirection: "row",
    marginBottom: 10,
    marginStart: 5,
    marginTop: 5,
  },
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  row: {
    flexDirection: "row",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 1,
    marginBottom: 10,
    // borderWidth:1,
    // borderColor:'red'
  },
  sortBtn: {
    padding: 15,
    width: "50%",
    backgroundColor: COLOR.White,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLOR.tabInctive,
  },
  filterBtn: {
    padding: 15,
    width: "50%",
    backgroundColor: COLOR.White,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLOR.tabInctive,
  },
  filterText: {
    fontSize: 16,
    color: COLOR.headerColor,
    marginStart: 5,
    fontFamily: "Roboto-Medium",
  },
  carText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#313131",
    fontFamily: "Roboto-Medium",
  },
  resultText: {
    fontSize: 12,
    fontWeight: "300",
    color: COLOR.darkBlue,
    fontFamily: "Roboto-Medium",
  },
  rowSpace: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    marginHorizontal: 15,
  },
  modalContainer: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  modalHeader: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 350,
  },
  sortText: {
    fontSize: 20,
    color: COLOR.tabInctive,
  },
  sortLabel: {
    color: COLOR.headerColor,
  },
  horizontalLine: {
    borderBottomColor: "#525252",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  modalRow: {
    margin: 10,
  },
  text: {
    fontWeight: "500",
    fontSize: 10,
    color: COLOR.darkBlue,
    fontFamily: "Roboto-Medium",
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginEnd: 10,
    marginTop: 5,
  },
  mainContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginEnd: 10,
    marginTop: 10,
  },
  cardHeader: {
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 6,
    flexDirection: "row",
    backgroundColor: COLOR.White,
    borderColor: COLOR.tabInctive,
    borderWidth: 1,
  },
  card: {
    marginStart: 10,
    flex: 1,
    paddingBottom: 5,
  },
  priceText: {
    fontWeight: "500",
    fontSize: 16,
    color: COLOR.tabActive,
    fontFamily: "Roboto-Medium",
  },
  carNameText: {
    fontWeight: "500",
    fontSize: 16,
    color: COLOR.Black,
    fontFamily: "Roboto-Medium",
  },
  carGrid: {
    margin: 5,
    borderWidth: 1,
    flexDirection: "column",
    borderRadius: 6,
    backgroundColor: COLOR.lightGray,
    borderColor: COLOR.tabInctive,
  },
  carImg: {
    alignItems: "center",
  },
  gridImage: {
    height: 120,
    width: 185,
  },
  gridRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  gridName: {
    marginStart: 10,
    flex: 1,
  },
  spaceMargin: {
    marginHorizontal: 5,
  },
  gridPrice: {
    marginStart: 10,
    marginTop: 5,
  },
  listPrice: {
    marginTop: 5,
  },
  listDate: {
    marginTop: 3,
  },
  defaultImage: {
    height: 100,
    width: 115,
    marginVertical: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },



  searchSection: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  
},
searchIcon: {
    padding: 10,
},
input1: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
  borderWidth: 0.5,
  borderColor: "#000",
  height: 40,
  borderRadius: 5,
  marginVertical: 10,
},
headerContainer:{
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  margin: 10,
},
subHeader:{
  flexDirection: "row",
  flex: 1,
  justifyContent: "center",
}


});
