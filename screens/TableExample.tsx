import React, { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Table, Row, Rows, Col } from "react-native-table-component";

const borderColor = "#C1C0B9";
const primaryColor = "dodgerblue";
const backgroundColor =  'white'  // "#F7F6E7";

export default function TableExample() {
  const leftRef = useRef<ScrollView>(null);
  const rightRef = useRef<ScrollView>(null);

  const state = {
    tableHead: [
      "Honda City",
      "Toyata Corolla",
      "Suzuki Mehran",
      "Daihatsu Mira",
      "Toyota Corolla",
 
   
    ],
    widthArr: [100, 100, 100, 100, 120, ],
  };

  const headerHeight = 50;
  const leftColumnWidth = 120;

  const recordData = [];
  const tableData1 = [
    {
      name: "storgae",
    },
    {
      name: "color",
    },
    {
      name: "mileage",
    },
    {
      name: "Km's",
    },
    {
      name: "capacity",
    },
    {
      name: "fuel type",
    },
    {
      name: "doors",
    },
  ];
  for (let i = 0; i < tableData1.length; i += 1) {
    const rowData = [];
    rowData.push(tableData1[i].name);
    recordData.push(rowData);
  }

  const tableData = [];
  for (let i = 0; i < 7; i += 1) {
    const rowData = [];
    for (let j = 0; j < 6; j += 1) {
      rowData.push(`${i}${j}`);
    }
    tableData.push(rowData);
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#eee",
        marginTop: 50,
      }}
    >
      {/* Left Column */}
      <View
        style={{
          width: leftColumnWidth,
          backgroundColor: "yellow",
          borderRightWidth: 1,
          borderRightColor: borderColor,
        }}
      >
        {/* Blank Cell */}
        <View
          style={{
            height: headerHeight,
            backgroundColor: primaryColor,
            borderBottomWidth: 1,
            borderBottomColor: borderColor,
          }}
        ></View>
        {/* Left Container : scroll synced */}
        <ScrollView
          ref={leftRef}
          style={{
            flex: 1,
            backgroundColor: "white",
          }}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          <Table
            borderStyle={{
              borderWidth: 1,
              borderColor,
            }}
          >
            {recordData.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                widthArr={[leftColumnWidth]}
                style={index % 2 ? styles.row : { backgroundColor,height: 50 }}
                textStyle={styles.text}
              />
            ))}
          </Table>
        </ScrollView>
      </View>
      {/* Right Column */}
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <ScrollView horizontal={true} bounces={false}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor }}>
              <Row
                data={state.tableHead}
                widthArr={state.widthArr}
                style={styles.head}
                textStyle={{ ...styles.text, color: "white" }}
              />
            </Table>
            <ScrollView
              ref={rightRef}
              style={styles.dataWrapper}
              scrollEventThrottle={16}
              bounces={false}
              onScroll={(e) => {
                const { y } = e.nativeEvent.contentOffset;
                leftRef.current?.scrollTo({ y, animated: false });
              }}
            >
              <Table borderStyle={{ borderWidth: 1, borderColor }}>
                {tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr}
                    style={index % 2 ? styles.row : { backgroundColor,height: 50 }}
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#eee" },
  head: { height: 50, backgroundColor: primaryColor },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  row: { height: 50 },
  text: { textAlign: "center" },
  dataWrapper: { marginTop: -1 },
});
