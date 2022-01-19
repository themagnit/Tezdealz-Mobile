import { Entypo, EvilIcons, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "native-base";
import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
  FlatList,
} from "react-native";
import { DataTable } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "../../constants/Colors";

const Compare = ({ navigation }: any) => {
  const [specBtn, setSpecBtn] = useState(true);
  const [featureBtn, setFeatureBtn] = useState(false);
  const [reviewBtn, setReviewBtn] = useState(false);

  const dispatch = useDispatch();
  const shortListCars = useSelector(
    (state: any) => state.shortlistCars.shortlistCars
  );

  const [features, setFeatures] = useState<any>([]);

  useEffect(() => {
    handleFeatures();
    // eslint-disable-next-line
  }, []);

  const handleFeatures = () => {
    let oneArray: string[] = [];
    // eslint-disable-next-line
    shortListCars.map((item: any) => {
      // eslint-disable-next-line
      item.features.map((value: string) => {
        oneArray.push(value);
      });
    });
    let uniqueArray = oneArray.filter(function (item, pos) {
      return oneArray.indexOf(item) === pos;
    });
    setFeatures(uniqueArray);
  };

  const Specification = () => {
    setSpecBtn(true);
    setFeatureBtn(false);
    setReviewBtn(false);
  };
  const Features = () => {
    setSpecBtn(false);
    setFeatureBtn(true);
    setReviewBtn(false);
  };
  const Reviews = () => {
    setSpecBtn(false);
    setFeatureBtn(false);
    setReviewBtn(true);
  };
  const header = () => {
    return (
      <View style={styles.mainContainer}>
      <View style={styles.columnContainer}>
        <Image
          source={{
            uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/2bdddd81-676d-4380-8c2c-ea2952ddf467.jpg",
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.carNameView}>
          <Text style={styles.carNameText}>Toyota Yaris iA </Text>
        </View>
        <View style={styles.locationView}>
          <EvilIcons
            name="location"
            size={15}
            color={COLOR.darkBlue}
            style={{ marginTop: 1 }}
          />
          <Text style={styles.locationText}>Islamabad</Text>
        </View>
        <View style={styles.priceView}>
          <Ionicons
            name="pricetag-outline"
            size={18}
            color={COLOR.tabActive}
          />
          <Text style={[styles.priceText]}>RS 50 lakh</Text>
        </View>
      </View>
      <View style={styles.circle}>
          <Text style={styles.circleText}>VS</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonHeader}>
        <TouchableOpacity
          style={specBtn ? [styles.buttonActive] : [styles.button]}
          onPress={Specification}
        >
          <Text style={specBtn ? styles.btnActiveText : styles.btnText}>
            Specification
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={featureBtn ? [styles.buttonActive] : [styles.button]}
          onPress={Features}
        >
          <Text style={featureBtn ? styles.btnActiveText : styles.btnText}>
            Features
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={reviewBtn ? [styles.buttonActive] : [styles.button]}
          onPress={Reviews}
        >
          <Text style={reviewBtn ? styles.btnActiveText : styles.btnText}>
            Reviews
          </Text>
        </TouchableOpacity>
      </View>

      {/* {shortListCars && (
        <FlatList
          data={shortListCars}
          //numColumns={2}
          renderItem={({ item }) =>   <DataTable>
      
    
          <DataTable.Row>
            <DataTable.Cell>Frozen yogurt</DataTable.Cell>
            <DataTable.Cell numeric>159</DataTable.Cell>
            <DataTable.Cell numeric>6.0</DataTable.Cell>
          </DataTable.Row>
    
          <DataTable.Row>
            <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
            <DataTable.Cell numeric>237</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
          </DataTable.Row></DataTable> }
          keyExtractor={(contact, index) => String(index)}


        //  ListHeaderComponent={header}
          onEndReachedThreshold={50}
        /> 
      )}*/}
{/* {
shortListCars.map((item, i) => {
  return (
    <>
    <DataTable.Row>
       <DataTable.Cell numeric>Engine</DataTable.Cell>
       <DataTable.Cell numeric>2</DataTable.Cell>
       <DataTable.Cell numeric>3</DataTable.Cell>
     </DataTable.Row>
     <DataTable.Row>
     <DataTable.Cell numeric>Fuel Type</DataTable.Cell>
     <DataTable.Cell numeric>2</DataTable.Cell>
     <DataTable.Cell numeric>3</DataTable.Cell>
   </DataTable.Row>
   </>
  );
})
} */}


      <View style={styles.mainContainer}>
        <View style={styles.columnContainer}>
          <Image
            source={{
              uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/2bdddd81-676d-4380-8c2c-ea2952ddf467.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.carNameView}>
            <Text style={styles.carNameText}>Toyota Yaris iA </Text>
          </View>
          <View style={styles.locationView}>
            <EvilIcons
              name="location"
              size={15}
              color={COLOR.darkBlue}
              style={{ marginTop: 1 }}
            />
            <Text style={styles.locationText}>Islamabad</Text>
          </View>
          <View style={styles.priceView}>
            <Ionicons
              name="pricetag-outline"
              size={18}
              color={COLOR.tabActive}
            />
            <Text style={[styles.priceText]}>RS 50 lakh</Text>
          </View>
        </View>

        <View style={styles.columnContainer}>
          <Image
            source={{
              uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/2bdddd81-676d-4380-8c2c-ea2952ddf467.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.carNameView}>
            <Text style={styles.carNameText}>Toyota Yaris iA </Text>
          </View>
          <View style={styles.locationView}>
            <EvilIcons
              name="location"
              size={15}
              color={COLOR.darkBlue}
              style={{ marginTop: 1 }}
            />
            <Text style={styles.locationText}>Islamabad</Text>
          </View>
          <View style={styles.priceView}>
            <Ionicons
              name="pricetag-outline"
              size={18}
              color={COLOR.tabActive}
            />
            <Text style={[styles.priceText]}>RS 50 lakh</Text>
          </View>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>VS</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {specBtn && (
          <View style={{ marginTop: 20 }}>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Engine</Text>
              <Text style={styles.subText}>2998 cc, 6 Cylinders Inline</Text>
              <Text style={styles.subText}>3996 cc, 8 Cylinders In V Sh.</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Fuel Type</Text>
              <Text style={styles.subText}>Petrol</Text>
              <Text style={styles.subText}>Petrol</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>MaxPower (bhp@rpm)</Text>
              <Text style={styles.subText}>375 bhp @ 5000 rpm</Text>
              <Text style={styles.subText}>591 bhp @ 6000 rpm</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Mileage (RAI) (kmpl)</Text>
              <Text style={styles.subText}>11.29</Text>
              <Text style={styles.subText}>8</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Driving Range (Km) </Text>
              <Text style={styles.subText}>587.08</Text>
              <Text style={styles.subText}>680</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Drivetrain </Text>
              <Text style={styles.subText}>RWD</Text>
              <Text style={styles.subText}>RWD</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Doors</Text>
              <Text style={styles.subText}>02</Text>
              <Text style={styles.subText}>05</Text>
            </View>
          </View>
        )}
        {featureBtn && (
          <View style={{ marginTop: 20 }}>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Doors</Text>
              <Text style={[styles.subText]}>02</Text>
              <Text style={styles.subText}>05</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Heated Seats</Text>
              <Text style={styles.subText}>yes</Text>
              <Text style={styles.subText}>no</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Navigation System</Text>
              <Text style={styles.subText}>yes</Text>
              <Text style={styles.subText}>no</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>Climate Control</Text>
              <Text style={styles.subText}>yes</Text>
              <Text style={styles.subText}>no</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>DVD Player</Text>
              <Text style={styles.subText}>no</Text>
              <Text style={styles.subText}>yes</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.mainText}>AM/FM Radio</Text>
              <Text style={styles.subText}>no</Text>
              <Text style={styles.subText}>yes</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 100,
  },
  listItem: {
    marginHorizontal: 10,
    marginVertical: 5,

    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",

    alignItems: "center",
    backgroundColor: "white",
    borderColor: COLOR.lightGray,
    paddingVertical: 10,
  },
  mainText: {
    width: "33%",
    marginStart: 10,
    color: COLOR.Black,
    fontWeight: "500",
  },
  subText: {
    width: "33%",
    fontSize: 12,
    fontWeight: "400",
    color: COLOR.darkBlue,
    textAlign: "center",
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  columnContainer: {
    flexDirection: "column",
    flex: 1,
    // paddingVertical: 20,
    paddingStart: 10,
    paddingEnd: 2,
  },
  locationView: {
    flexDirection: "row",
    marginTop: 5,
  },
  locationText: {
    fontWeight: "500",
    fontSize: 12,
    color: COLOR.darkBlue,
  },
  priceView: {
    flexDirection: "row",
    marginTop: 10,
  },
  container: {
    flex: 1,
    // backgroundColor: COLOR.grayishBlue,
  },
  btnActiveText: {
    color: COLOR.White,
  },
  btnText: {
    color: COLOR.Black,
  },
  buttonActive: {
    backgroundColor: COLOR.tabActive,

    alignItems: "center",
    padding: 10,
    borderRadius: 20,
  },
  button: {
    backgroundColor: COLOR.secondary,
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
  },
  buttonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  image: {
    // height: 150,
    // width: "48%",
    height: 150,
    width: "100%",
  },
  imageHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },

  circleText: {
    color: COLOR.White,
  },
  circle: {
    backgroundColor: COLOR.tabActive,

    alignItems: "center",
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
    padding: 10,
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    position: "absolute",
    top: 50,
    left:
      Dimensions.get("window").width - Dimensions.get("window").width / 1.85,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignSelf: "center",
  },
  priceText: {
    fontWeight: "500",
    fontSize: 14,
    color: COLOR.tabActive,
    marginStart: 5,
  },
  carNameView: {
    marginTop: 10,
  },
  carNameText: {
    fontWeight: "700",
    fontSize: 14,
    color: COLOR.Black,
  },
});

export default Compare;

// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   SectionList,
//   SafeAreaView,
//   Image,
//   FlatList,
// } from 'react-native';

// const ListItem = ({ item }) => {
//   return (
//     <View style={styles.item}>
//       <Image
//         source={{
//           uri: item.uri,
//         }}
//         style={styles.itemPhoto}
//         resizeMode="cover"
//       />
//       <Text style={styles.itemText}>{item.text}</Text>
//     </View>
//   );
// };

// export default () => {
//   return (
//     <View style={styles.container}>
//       <StatusBar style="light" />
//       <SafeAreaView style={{ flex: 1 }}>
//         <SectionList
//           contentContainerStyle={{ paddingHorizontal: 10 }}
//           stickySectionHeadersEnabled={false}
//           sections={SECTIONS}
//           renderSectionHeader={({ section }) => (
//             <>
//               <Text style={styles.sectionHeader}>{section.title}</Text>
//               {section.horizontal ? (
//                 <FlatList
//                   horizontal
//                   data={section.data}
//                   renderItem={({ item }) => <ListItem item={item} />}
//                   showsHorizontalScrollIndicator={false}
//                 />
//               ) : null}
//             </>
//           )}
//           renderItem={({ item, section }) => {
//             if (section.horizontal) {
//               return null;
//             }
//             return <ListItem item={item} />;
//           }}
//         />
//       </SafeAreaView>
//     </View>
//   );
// };

// const SECTIONS = [
//   {
//     title: 'Made for you',
//     horizontal: true,
//     data: [
//       {
//         key: '1',
//         text: 'Item text 1',
//         uri: 'https://picsum.photos/id/1/200',
//       },
//       {
//         key: '2',
//         text: 'Item text 2',
//         uri: 'https://picsum.photos/id/10/200',
//       },

//       {
//         key: '3',
//         text: 'Item text 3',
//         uri: 'https://picsum.photos/id/1002/200',
//       },
//       {
//         key: '4',
//         text: 'Item text 4',
//         uri: 'https://picsum.photos/id/1006/200',
//       },
//       {
//         key: '5',
//         text: 'Item text 5',
//         uri: 'https://picsum.photos/id/1008/200',
//       },
//     ],
//   },
//   {
//     title: 'Punk and hardcore',
//     horizontal: true,
//     data: [
//       {
//         key: '1',
//         text: 'Item text 1',
//         uri: 'https://picsum.photos/id/1011/200',
//       },
//       {
//         key: '2',
//         text: 'Item text 2',
//         uri: 'https://picsum.photos/id/1012/200',
//       },

//       {
//         key: '3',
//         text: 'Item text 3',
//         uri: 'https://picsum.photos/id/1013/200',
//       },
//       {
//         key: '4',
//         text: 'Item text 4',
//         uri: 'https://picsum.photos/id/1015/200',
//       },
//       {
//         key: '5',
//         text: 'Item text 5',
//         uri: 'https://picsum.photos/id/1016/200',
//       },
//     ],
//   },

// ];

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//   },
//   sectionHeader: {
//     fontWeight: '800',
//     fontSize: 18,
//     color: '#f4f4f4',
//     marginTop: 20,
//     marginBottom: 5,
//   },
//   item: {
//     margin: 10,
//   },
//   itemPhoto: {
//     width: 200,
//     height: 200,
//   },
//   itemText: {
//     color: 'rgba(255, 255, 255, 0.5)',
//     marginTop: 5,
//   },
// });
