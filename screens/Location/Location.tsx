import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
} from "react-native";
import { Searchbar, Appbar } from "react-native-paper";
import { COLOR } from "../../constants/Colors";
import { endPoints } from "../../constants/Environment";
import { getAllData } from "../../Utility/API";

const Location = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [cities, setCities] = useState([]);
  const [fullData, setFullData] = useState([]);
  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    getCitiesData();

    // eslint-disable-next-line
  }, []);

  const getCitiesData = async () => {
    let param = "?sort=name";

    await getAllData(endPoints.api.CITIES + param)
      .then((response) => {
        if (response && response && response.status === "success") {
          let result = response.data.result.map((item: any, i: any) => ({
            ...item,
            isChecked: false,
          }));
          setCities(result);
          setFullData(result);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const Item = ({ title }) => {
    <View style={styles.item}>
      <TouchableWithoutFeedback
        onPress={() => {
          alert("title", title);
          navigation.navigate("home", {
            // cityName: title,
          });
        }}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableWithoutFeedback>
    </View>;
  };
  // const renderItem = ({ item }) => <Item title={item.name} />;

  const renderItem = (item:any) => {
    return (
      <View style={styles.item}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("Home", {
              cityName: item.item.name,
            });
          }}
        >
          <Text style={styles.title}>{item.item.name}</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const handleSearch = (text) => {
    setSearchQuery(text);

    let filteredName = fullData.filter((item) => {
      return item.name.includes(text);
    });

    setCities(filteredName);

    //this.setState({ data, query: text })
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: COLOR.White }}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.input}
        />
      </Appbar.Header>

      <FlatList
        data={cities}
        renderItem={renderItem}
        // ListHeaderComponent={() => {
        //   return (
        //     <Searchbar
        //     placeholder="Search"
        //     onChangeText={onChangeSearch}
        //     value={searchQuery}
        //     style={styles.input}
        //   />

        //   );
        // }}
        //s stickyHeaderIndices={[0]}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  input: {
    backgroundColor: COLOR.lightGray,
    flex: 1,
    marginEnd: 10,
  },
  Btn: {
    marginTop: 30,
    backgroundColor: COLOR.White,
    padding: 10,
    borderRadius: 6,
    width: "100%",
    alignSelf: "center",
  },
  btnText: {
    color: COLOR.tabActive,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    textTransform: "uppercase",
  },
  item: {
    backgroundColor: COLOR.White,
    padding: 15,
    marginVertical: 3,
    //marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

export default Location;
