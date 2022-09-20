import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  Modal,
  SafeAreaView,
  SectionList,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { COLOR } from "../../constants/Colors";
import { Appbar, Divider } from "react-native-paper";

import PriceFilter from "./Price/PriceFilter";
import MakeFilter from "./Make/MakeFilter";
import ModelFilter from "./Model/ModelFilter";
import MileageFilter from "./Mileage/MileageFilter";
import YearFilter from "./Year/YearFilter";
import ProvinceFilter from "./Province/ProvinceFilter";
import CityFilter from "./City/CityFilter";
import RegisteredCityFilter from "./Registered City/RegisteredCityFilter";
import TransmissionFilter from "./Transmission/TransmissionFilter";
import EngineTypeFilter from "./Engine Type/EngineTypeFilter";
import CapacityFilter from "./Engine Capacity/CapacityFilter";
import BodyTypeFilter from "./Body Type/BodyTypeFilter";
import ColorFilter from "./Color/ColorFilter";
import SellarFilter from "./Sellar Type/SellarFilter";
import AssemblyFilter from "./Assembly/AssemblyFilter";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { filterNames } from "../../constants/language/en/filterData";

const FilterModal = ({
  navigation,
  filterVisible,
  filterApply,
  setFilterVisible,
  //  filtersProps,
  bodyTypes,
  bodyColors,
  citiesWithCars,
  makes,
  models,
  handleCheckboxChange,
  resetForm,
  transmissions,
  engineType,
  assembly,
  sellarType,
  rangeValues,
  setRangeValues,
  handleTextBoxSubmit,
  cities,
  province,
}: any) => {
  const [list, setList] = useState(filterNames);
  const [selectFilter, setSelectFilter] = useState("PRICE RANGE");
  const carFilters = useSelector((state: any) => state.carFilters.filters);

  const [isLoading, setIsLoading] = useState(false);

  const selectAction = (user: any) => {
    console.log("user", user);
    for (let section of list) {
      for (let data of section.data) {
        if (data.text == user.text) {
          data.active = !data.active;
        } else {
          data.active = false;
        }
      }
    }
   // setList(list);
    let filterName= user.text === selectFilter ? '' : user.text
    setSelectFilter(filterName);
  };

  const expand = (title: any) => {
    let result: any = list.map((item: any, i: any) =>
      title === item.title
        ? { ...item, isExpanded: !item.isExpanded }
        : { ...item }
    );
    setList(result);
  };

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        visible={filterVisible}
        onRequestClose={setFilterVisible}
      >
        <View>
          <Appbar.Header
            style={{
              backgroundColor: COLOR.White,
              borderBottomColor: COLOR.tabInctive,
              borderBottomWidth: 1,
            }}
          >
            <Appbar.BackAction onPress={setFilterVisible} />
            <View style={styles.header}>
              <Text style={styles.headerText}>Filters</Text>
              <TouchableOpacity onPress={resetForm}>
                <Text style={[styles.headerText, { marginEnd: 10 }]}>
                  Clear Filters
                </Text>
              </TouchableOpacity>
            </View>
          </Appbar.Header>
        </View>
        <View style={styles.filterRow}>
          <SectionList
            extraData={list}
            contentContainerStyle={{ paddingBottom: 40 }}
            stickySectionHeadersEnabled={false}
            keyExtractor={(item, index) => `${item}{+}${index}`}
            showsVerticalScrollIndicator={false}
            sections={list}
            renderSectionHeader={({ section }) => (
              <>
                <TouchableOpacity
                  onPress={() => expand(section.title)}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: 40,
                  }}
                >
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                  {section.isExpanded ? (
                    <AntDesign
                      name="up"
                      size={16}
                      color="black"
                      style={{ marginTop: 12, marginEnd: 10 }}
                    />
                  ) : (
                    <AntDesign
                      name="down"
                      size={16}
                      color="black"
                      style={{ marginTop: 12, marginEnd: 10 }}
                    />
                  )}
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomColor: COLOR.secondary,
                    borderBottomWidth: 1,
                  }}
                />
              </>
            )}
            renderItem={({ item, section }) => {
              if (!section.isExpanded) {
                return <View />;
              } else {
                return (
                  <>
                    <TouchableOpacity
                      style={[
                        styles.active,
                        {
                          height: 40,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        },
                      ]}
                      onPress={() => {
                        selectAction(item);
                      }}
                    >
                      <Text
                        style={
                          item.active ? styles.itemTextActive : styles.itemText
                        }
                      >
                        {item.text}
                      </Text>
                      {item.active ? (
                        <AntDesign
                          name="up"
                          size={16}
                          color="black"
                          style={{ marginTop: 12, marginEnd: 10 }}
                        />
                      ) : (
                        <AntDesign
                          name="down"
                          size={16}
                          color="black"
                          style={{ marginTop: 12, marginEnd: 10 }}
                        />
                      )}
                    </TouchableOpacity>
                    {item.text == "PRICE RANGE" && 
                      selectFilter == "PRICE RANGE" && (
                        <PriceFilter
                          rangeValues={rangeValues}
                          setRangeValues={setRangeValues}
                          handleTextBoxSubmit={handleTextBoxSubmit}
                        />
                      )}
                    {item.text == "MAKE" && selectFilter == "MAKE" && (
                      <MakeFilter
                        makes={makes}
                        handleCheckboxChange={handleCheckboxChange}
                      />
                    )}
                    {item.text == "MODEL" && selectFilter == "MODEL" && (
                      <ModelFilter
                        models={models}
                        handleCheckboxChange={handleCheckboxChange}
                      />
                    )}
                    {item.text == "MILEAGE (KM)" &&
                      selectFilter == "MILEAGE (KM)" && (
                        <MileageFilter
                          rangeValues={rangeValues}
                          setRangeValues={setRangeValues}
                          handleTextBoxSubmit={handleTextBoxSubmit}
                        />
                      )}
                    {item.text == "YEAR" && selectFilter == "YEAR" && (
                      <YearFilter
                        rangeValues={rangeValues}
                        setRangeValues={setRangeValues}
                        handleTextBoxSubmit={handleTextBoxSubmit}
                      />
                    )}
                    {item.text == "PROVINCE" && selectFilter == "PROVINCE" && (
                      <ProvinceFilter
                        province={province}
                        handleCheckboxChange={handleCheckboxChange}
                      />
                    )}
                    {item.text == "CITY" && selectFilter == "CITY" && (
                      <CityFilter
                        citiesWithCars={citiesWithCars}
                        handleCheckboxChange={handleCheckboxChange}
                      />
                    )}
                    {item.text == "REGISTERED CITY" &&
                      selectFilter == "REGISTERED CITY" && (
                        <RegisteredCityFilter
                          cities={cities}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      )}
                    {item.text == "TRANSMISSION" &&
                      selectFilter == "TRANSMISSION" && (
                        <TransmissionFilter
                          transmissions={transmissions}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      )}
                    {item.text == "ENGINE TYPE" &&
                      selectFilter == "ENGINE TYPE" && (
                        <EngineTypeFilter
                          engineType={engineType}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      )}
                    {item.text == "ENGINE CAPACITY (CC)" &&
                      selectFilter == "ENGINE CAPACITY (CC)" && (
                        <CapacityFilter
                          rangeValues={rangeValues}
                          setRangeValues={setRangeValues}
                          handleTextBoxSubmit={handleTextBoxSubmit}
                        />
                      )}

                    {item.text == "BODY TYPE" &&
                      selectFilter == "BODY TYPE" && (
                        <BodyTypeFilter
                          bodyTypes={bodyTypes}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      )}
                    {item.text == "COLOR" && selectFilter == "COLOR" && (
                      <ColorFilter
                        bodyColors={bodyColors}
                        handleCheckboxChange={handleCheckboxChange}
                      />
                    )}
                    {item.text == "ASSEMBLY" && selectFilter == "ASSEMBLY" && (
                      <AssemblyFilter
                        assembly={assembly}
                        handleCheckboxChange={handleCheckboxChange}
                      />
                    )}
                    {item.text == "SELLAR TYPE" &&
                      selectFilter == "SELLAR TYPE" && (
                        <SellarFilter
                          sellarType={sellarType}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      )}

                    <View
                      style={{
                        borderBottomColor: COLOR.secondary,
                        borderBottomWidth: 1,
                      }}
                    />
                  </>
                );
              }
            }}
          />

        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={setFilterVisible} style={[styles.button]}>
            <Text style={styles.text}> Close </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyBtn} onPress={filterApply}>
            <Text style={styles.text}> Apply </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default FilterModal;
