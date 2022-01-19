import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  SectionList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR } from "../constants/Colors";
import { TextInput, Loader } from "../components/index";
import { Searchbar } from "react-native-paper";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";
import { getAllData } from "../Utility/API";
import { endPoints } from "../constants/Environment";
import {
  Select,
  VStack,
  CheckIcon,
  Center,
  useToast,
  NativeBaseProvider,
} from "native-base";
import { Picker } from "@react-native-picker/picker";

const Home = ({ navigation }: any) => {
  const toast = useToast();
  let [service, setService] = React.useState("");
  let [make, setMake] = React.useState("");
  let [model, setModel] = React.useState("");

  const [searchQuery, setSearchQuery] = React.useState("");
  const [carMakes, setCarMakes] = useState<Array<any>>([]);
  const [carMakesList, setCarMakesList] = useState<Array<string>>([]);
  const [carModels, setCarModels] = useState<Array<any>>([]);
  const [carModelsList, setCarModelsList] = useState<Array<string>>([]);
  const [bodyTypesArray, setBodyTypesArray] = useState<Array<any>>([]);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
      fetchMakes();

    fetchModels();
    fetchBodyType();
  }, []);

  useEffect(() => {
     fetchModelsWithId(make);
  }, [make != ""]);

  const fetchBodyType = () => {
    console.log("fetchBodyType  called");
    getAllData(endPoints.api.BODY_TYPES).then((response) => {
      if (response && response.status === "success") {
        let result = response.data.result;
        let bodyTypesName = result.map((el: any) => el.bodyType);
        setIsLoading(false);
        setBodyTypesArray(result);
      } else {
        setIsLoading(false);
        toast.show({
          title:
            response && response.message ? response.message : "Network Error",
          status: "error",
        });
      }
    });
  };

  const fetchMakes = () => {
    setIsLoading(true);
    console.log("fetchMakes  called");
    getAllData(endPoints.api.CAR_MAKES + "?sort=name").then((response) => {
      setIsLoading(false);
      if (response && response.status === "success") {
        setCarMakes(response.data.result);
        let makeList = response.data.result.map((make: any) => {
          make.name;
        });
        setIsLoading(false);
        setCarMakesList(response.data.result);
      } else {
        setIsLoading(false);
        toast.show({
          title:
            response && response.message ? response.message : "Network Error",
          status: "error",
        });
      }
    });
  };
  const fetchModels = () => {
    setIsLoading(true);
    console.log("fetchModels  called");
    getAllData(endPoints.api.CAR_MODELS + "?sort=name").then((response) => {
      setIsLoading(false);
      if (response && response.status === "success") {
        setCarModels(response.data.result);
        let modelList = response.data.result.map((model: any) => model.name);
        setCarModelsList(response.data.result);
      } else {
        setIsLoading(false);
        toast.show({
          title:
            response && response.message ? response.message : "Network Error",
          status: "error",
        });
      }
    });
  };

  const fetchModelsWithId = (makeId: any) => {
    setIsLoading(true);

    if (makeId) {
      console.log("makeId", makeId);
      getAllData(endPoints.api.MAKE_MODELS + makeId + "&sort=name").then(
        (response) => {
          setIsLoading(false);
          if (response && response.status === "success") {
            setCarModels(response.data.result);
            let modelList = response.data.result.map(
              (model: any) => model.name
            );
            // setCarModelsList(modelList);
            setCarModelsList(response.data.result);
          } else {
            setIsLoading(false);
            toast.show({
              title:
                response && response.message
                  ? response.message
                  : "Network Error",
              status: "error",
            });
          }
        }
      );
    }
  };
  const selectMake = (item: any) => {
    setMake(item);
    setModel("");
  };
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <View style={styles.container}>
        {/* <View style={styles.mainHeader}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.input}
          />
        </View> */}
        <Loader loading={isLoading} />
        <View style={styles.textHeader}>
          <Text style={styles.textHeading}>See cars your budget will love</Text>
          <Text style={styles.typeHeading}>
            Which car types do you prefer? Pick all that apply
          </Text>
        </View>

        <FlatList
          style={styles.listConatiner}
          horizontal
          data={bodyTypesArray}
          renderItem={({ item }) => <ListItem item={item} />}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.mainHeader}>
          <View style={styles.dropDownView}>
            <Select
              selectedValue={make}
              minWidth="200"
              accessibilityLabel="e.g. Honda, Toyata"
              placeholder="e.g. Honda, Toyata"
              style={{ height: 50 }}
              _selectedItem={{
                endIcon: <CheckIcon size="5" />,
              }}
              onValueChange={(itemValue) => selectMake(itemValue)}
            >
              <Select.Item label={"Select Make"} value={"Select Make"} />
              {carMakesList.map((item, index) => {
                return <Select.Item label={item.name} value={item.make_id} />;
              })}
            </Select>
          </View>
          <View style={styles.dropDownView}>
            <Select
              selectedValue={model}
              minWidth="200"
              accessibilityLabel="e.g. Honda, Toyata"
              placeholder="e.g. Honda, Toyata"
              style={{ height: 50 }}
              _selectedItem={{
                endIcon: <CheckIcon size="5" />,
              }}
              onValueChange={(itemValue) => setModel(itemValue)}
            >
              <Select.Item label={"Select Model"} value={"Select Model"} />
              {carModelsList.map((item, index) => {
                return <Select.Item label={item.name} value={item.make_id} />;
              })}
            </Select>
          </View>
          {/* <Select
        selectedValue={service}
        minWidth="200"
        accessibilityLabel="Choose Service"
        placeholder="Choose Service"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={(itemValue) => setService(itemValue)}
      >
        <Select.Item label="UX Research" value="ux" />
        <Select.Item label="Web Development" value="web" />
        <Select.Item label="Cross Platform Development" value="cross" />
        <Select.Item label="UI Designing" value="ui" />
        <Select.Item label="Backend Development" value="backend" />
      </Select> */}

          <TextInput
            label="Price Range(Min)"
            placeholder="0"
            returnKeyType="next"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            label="Price Range(Max)"
            placeholder="5000000"
            returnKeyType="next"
            autoCapitalize="none"
            style={styles.input}
          />

          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              navigation.navigate("Car Listing");
            }}
          >
            <Text style={styles.text}>Find Your Car </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.centerContainer}>
        <View style={styles.imageView}>
          <Image
            source={{
              uri: "https://s3.ap-southeast-2.amazonaws.com/cdn.tezdealz.com/87f9599c-4075-43f0-a61b-03907fa1d661.png",
            }}
            style={{ height: 140, width: 230 }}
            resizeMode="contain"
          ></Image>
        </View>
        <View style={styles.sellCarContainer}>
          <Text style={styles.sellText}>Sell your car from Home</Text>
          <Text style={styles.sellSubText}>
            Lorem Ipsum is simply dummy text of the printing abd typesetting
            industry.
          </Text>
          <TouchableOpacity style={styles.bookBtn}>
            <Text style={[styles.textBook]}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          renderSectionHeader={({ section }) => (
            <>
              <Text style={styles.titleText}>{section.title}</Text>

              <FlatList
                horizontal
                data={section.data}
                renderItem={({ item }) => <MostListItem item={item} />}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}
          renderItem={({ item, section }) => {
            if (section.horizontal) {
              return null;
            }
            return <MostListItem item={item} />;
          }}
        />
      </View>
    </ScrollView>
  );
};

const ListItem = ({ item }: any) => {
  return (
    <TouchableOpacity>
      <View style={[styles.item]}>
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.itemPhoto}
        ></ImageBackground>
        <View>
          <Text style={styles.itemText}>{item.bodyType}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MostListItem = ({ item }: any) => {
  return (
    <TouchableOpacity>
      <View style={styles.listItem}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: item.uri }}
            style={styles.image}
            resizeMethod={"auto"}
            resizeMode="cover"
          ></Image>
        </View>
        <View>
          <View style={styles.title}>
            <View style={styles.carHeader}>
              <Text style={styles.carNameText}>Honda City</Text>
            </View>
            <View style={styles.iconHeader}>
              <MaterialIcons
                name="favorite-outline"
                size={20}
                color={COLOR.veryDarkBlue}
                onPress={()=>{alert('favorite click')}}
              />
            </View>
          </View>
          <View style={{ marginStart: 10 }}>
            <Text style={styles.priceText}>PKR 8,900,000</Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.listText}>2018</Text>
            <Text style={styles.listText}>45,000 KM</Text>
            <Text style={styles.listText}>Petrol</Text>
          </View>
          <View style={styles.manualMain}>
            <Text style={styles.listText}>1000 cc</Text>
            <Text style={styles.listText}>Automatice</Text>
          </View>
          <View style={styles.locationMain}>
            <EvilIcons name="location" size={15} color={COLOR.darkBlue} />
            <Text style={styles.listText}>Islamabad</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const data = [
  {
    key: "1",
    text: "Compact sedan",
    uri: "https://s3.ap-southeast-2.amazonaws.com/cdn.tezdealz.com/87f9599c-4075-43f0-a61b-03907fa1d661.png",
  },
  {
    key: "2",
    text: "Convertible",
    uri: "https://s3.ap-southeast-2.amazonaws.com/cdn.tezdealz.com/f89a028d-449d-4303-8ac5-30587cc185a1.png",
  },

  {
    key: "3",
    text: "Coupe",
    uri: "https://s3.ap-southeast-2.amazonaws.com/cdn.tezdealz.com/6fe06442-82fd-4bdc-b808-5172b31100a8.png",
  },
  {
    key: "4",
    text: "Double Cabin",
    uri: "https://s3.ap-southeast-2.amazonaws.com/cdn.tezdealz.com/61b4c6fb-1468-4602-bc1b-b1a7ada8c438.png",
  },
  {
    key: "5",
    text: "Crossover",
    uri: "https://s3.ap-southeast-2.amazonaws.com/cdn.tezdealz.com/cf41715f-2a4d-46fe-9e35-5148c8d00c1d.png",
  },
];
const SECTIONS = [
  {
    title: "Most Searched Cars",
    horizontal: true,
    data: [
      {
        key: "1",
        text: "Compact sedan",
        uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/c024b5ca-16bb-4f96-8440-ad4edc120a1f.jpg",
      },
      {
        key: "2",
        text: "Convertible",
        uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/c440d24c-60bd-42ad-b456-96e4a3a89d0a.jpg",
      },

      {
        key: "3",
        text: "Coupe",
        uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/a7e0155f-e1d0-492f-8c23-624ae2ba1456.jpg",
      },
      {
        key: "4",
        text: "Double Cabin",
        uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/d9f6d3f5-9750-4843-adb5-64aba69f989e.jpg",
      },
      {
        key: "5",
        text: "Crossover",
        uri: "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/9fd0e9e0-aa95-419d-9c3a-544cc6cd0d71.jfif",
      },
    ],
  },
];

const styles = StyleSheet.create({
  iconHeader: {
    alignItems: "flex-end",
    marginEnd: 10,
  },
  title: {
    flexDirection: "row",
    marginTop: 10,
  },
  carHeader: {
    marginStart: 10,
    flex: 1,
  },
  image: {
    height: 120,
    width: 210,
  },
  container: {
    flex: 1,
    //  backgroundColor: "#ebedee",
    marginTop: 20,
  },
  mainHeader: {
    marginHorizontal: 20,
  },
  textHeader: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  scrollContainer: {
    backgroundColor: COLOR.White,
    flex: 1,
    // minHeight: "100%",
  },
  input: {
    backgroundColor: COLOR.White, //COLOR.lightGray,
  },
  listConatiner: {
    marginLeft: 13,
  },
  btnContainer: {
    marginVertical: 20,
  },
  button: {
    padding: 15,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: COLOR.tabActive,
    marginVertical: 20,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: COLOR.White,
  },

  item: {
    margin: 10,
    borderWidth: 1,
    borderColor: COLOR.tabActive,
    backgroundColor: COLOR.White,
    height: 120,
    width: 210,
    alignItems: "center",
    borderRadius: 6,
  },
  itemPhoto: {
    height: 100,
    width: 160,
  },
  itemText: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -10,
    color: COLOR.tabActive
  },
  textHeading: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    height: 35,
    color: COLOR.tabActive,
  },
  typeHeading: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    height: 14,
    color: COLOR.tabActive,
  },
  centerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#E4F6FF",
  },
  imageView: {
    flex: 1,
  },
  sellCarContainer: {
    flex: 1,
    marginEnd: 10,
  },
  sellText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#C20000",
    marginTop: 5,
    marginStart: -20,
  },
  sellSubText: {
    fontSize: 13,
    fontWeight: "300",
    color: "#666666",
    textAlign: "center",
  },
  bookBtn: {
    alignSelf: "center",
    width: "60%",
    marginTop: 10,
    backgroundColor: "#1A75FF",
    padding: 5,
    borderRadius: 5,
  },
  textBook: {
    textAlign: "center",
    backgroundColor: "transparent",
    fontSize: 15,
    color: COLOR.White,
  },
  titleText: {
    fontWeight: "800",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 5,
  },
  listItem: {
    margin: 5,
    borderRadius: 6,
    borderWidth: 1,
    flexDirection: "column",
    backgroundColor: COLOR.lightGray,
    borderColor: COLOR.tabInctive, //COLOR.veryDarkBlue,
    height: 240,
    maxHeight: 300,
    marginBottom: 50,
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
  priceText: {
    fontWeight: "700",
    fontSize: 16,
    color:COLOR.tabActive
  },
  manualMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 3,
  },
  locationMain: {
    flexDirection: "row",
    marginBottom: 10,
    marginStart: 5,
    marginTop: 3,
  },
  carNameText: {
    fontWeight: "500",
    fontSize: 14,
    color: COLOR.Black,
  },
  dropDownView: {
    borderWidth: 1,
    backgroundColor: COLOR.White,
    borderRadius: 8,
    borderColor: COLOR.headerColor,
    marginVertical: 8,
  },
});

export default Home;
