import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { TextInput } from "../../../components";
import { COLOR } from "../../../constants/Colors";
import RangeSlider, { Slider } from "react-native-range-slider-expo";
import { useSelector } from "react-redux";
//import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { minMaxValues } from "../../../constants/language/en/filterData";
import styles from "../styles";

const PriceFilter = ({
  navigation,
  rangeValues,
  setRangeValues,
  handleTextBoxSubmit,
}: any) => {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [value, setValue] = useState(0);
  const carFilters = useSelector((state: any) => state.carFilters.filters);
  const values = useSelector((state: any) => state.carFilters.filters);
  const [multiSliderValue, setMultiSliderValue] = React.useState([0, 5000000]);

  const multiSliderValuesChange = (values: any) => {
    setRangeValues((previousValue: any) => {
      previousValue.price = values;
      return { ...previousValue };
    });
    handleTextBoxSubmit("price");
  };

  const handleRangeFromInputChange = (name: any, value: any) => {
    let newValue: any[] = [...rangeValues[name]];
    // check if new values is greater than maximum values
    if (newValue[1] < Number(value)) {
      if (name in minMaxValues) {
        newValue[1] = minMaxValues[name][1];
      }
    }
    newValue[0] = Number(value);
    setRangeValues((previousValue: any) => {
      previousValue[name] = newValue;
      return { ...previousValue };
    });
  };
  const handleRangeToInputChange = (name: any, value: any) => {
    let newValue: any[] = [...rangeValues[name]];
    if (newValue[0] > Number(value)) {
      if (name in minMaxValues) {
        newValue[0] = minMaxValues[name][0];
      }
    }
    newValue[1] = Number(value);
    setRangeValues((previousValue: any) => {
      previousValue[name] = newValue;
      return { ...previousValue };
    });
  };

  return (
    <View style={styles.containerCheck}>
      <TextInput
        label="From"
        maxLength={8}
        placeholder="0"
        returnKeyType="next"
        autoCapitalize="none"
        style={styles.inputFilter}
        value={rangeValues.price[0].toString()}
        keyboardType="number-pad"
        onBlur={handleTextBoxSubmit("price")}
        onChangeText={(val) => handleRangeFromInputChange("price", val)}
      />
      <TextInput
        label="To"
        placeholder="50000000"
        maxLength={8}
        returnKeyType="next"
        autoCapitalize="none"
        style={styles.inputFilter}
        value={rangeValues.price[1].toString()}
        onBlur={handleTextBoxSubmit("price")}
        keyboardType="number-pad"
        onChangeText={(val) => handleRangeToInputChange("price", val)}
      />
      {/* <View>
        <RangeSlider
          min={rangeValues.price[0]}
          max={rangeValues.price[1]}
          fromValueOnChange={(value) => setFromValue(value)}
          toValueOnChange={(value) => setToValue(value)}
          initialFromValue={0}
          inRangeBarColor={COLOR.tabActive}
          fromKnobColor={COLOR.tabActive}
          toKnobColor={COLOR.tabActive}
          styleSize="small"
          showValueLabels={false}
        />
      </View> */}

      {/* <MultiSlider
        values={[rangeValues.price[0], rangeValues.price[1]]}
        sliderLength={170}
        onValuesChange={multiSliderValuesChange}
        min={0}
        max={5000000}
        step={50000}
        markerStyle={{
          height: 15,
          width: 15,
          borderRadius: 7.5,
          backgroundColor: COLOR.tabActive,
          borderWidth: 0.5,
        }}
        selectedStyle={{ backgroundColor: COLOR.tabActive }}
        unselectedStyle={{ backgroundColor: COLOR.tabInctive }}
        // allowOverlap
        // snapped
      /> */}
    </View>
  );
};



export default PriceFilter;
