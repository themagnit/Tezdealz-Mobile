import React from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Searchbar, Appbar } from "react-native-paper";
import { COLOR } from "../../constants/Colors";

const Search = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <View style={styles.container}>
      <View>
        <Appbar.Header style={{ backgroundColor: COLOR.White }}>
        <Appbar.BackAction onPress={()=>{navigation.goBack()}} />
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.input}
          />
        </Appbar.Header>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: COLOR.lightGray,
    flex:1,
    marginEnd:10
  },
});

export default Search;
