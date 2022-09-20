import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Platform,
} from "react-native";
import styles from "../styles";

import SelectBox from "react-native-multi-selectbox-typescript";
import { COLOR } from "../../../constants/Colors";
import { Loader, TextInput } from "../../../components";
import { getAllData } from "../../../Utility/API";
import { endPoints } from "../../../constants/Environment";
import addEditCarData from "../../../constants/addEditCarData";
import { nameValidator } from "../../../Utility/commonUtils";

import CheckBox from "react-native-check-box";

import RNPickerSelect from "react-native-picker-select";

const placeholder = {
  label: "Select ....",
  value: null,
  color: "#9EA0A4",
};
const AddionalInformation = ({
  navigation,
  onBack,
  setFormData,
  formData,
  submitForm,
  Id,
  onDelete
}: any) => {
  console.log('formData',formData)
  const [isChecked, setIsChecked] = useState(false);
  const [engineCapacity, setEngineCapacity] = useState({
    value: formData.engineCapacity || "",
    error: "",
  });

  const [engineTypeList, setEngineTypeList] = useState([]);
  const [engineType, setEngineType] = useState({
    value: formData.engineType || "",
    error: "",
  });

  const [transmissionList, setTransmissionList] = useState([]);
  const [transmission, setTransmission] = useState({
    value: formData.transmission || "",
    error: "",
  });

  const [assemblyList, setAssemblyList] = useState([]);
  const [assembly, setAssembly] = useState({
    value: formData.assembly || "",
    error: "",
  });

  const [bodyTypeList, setBodyTypeList] = useState([]);
  const [bodyType, setBodyType] = useState({
    value: formData.bodyType || "",
    error: "",
  });

  const [bodyConditionList, setBodyConditionList] = useState([]);
  const [bodyCondition, setBodyCondition] = useState({
    value: formData.bodyCondition || "",
    error: "",
  });

  const [sellarTypeList, setSellarTypeList] = useState([]);
  const [sellarType, setSellarType] = useState({
    value: formData.sellerType || "",
    error: "",
  });

  const [featuresArray, setFeaturesArray] = useState<Array<any>>([]);

  const getEngineType = () => {
    let result: any = addEditCarData.fields.engineType.menu.map(
      (item: any, i: any) => ({
        item: item,
        id: `${item}`,
        label: item,
        value: item,
      })
    );
    setEngineTypeList(result);
  };
  const getTransmissionType = () => {
    let result: any = addEditCarData.fields.transmission.menu.map(
      (item: any, i: any) => ({
        label: item,
        value: item,
      })
    );
    setTransmissionList(result);
  };
  const getAssemblyType = () => {
    let result: any = addEditCarData.fields.assembly.menu.map(
      (item: any, i: any) => ({
        label: item,
        value: item,
      })
    );
    setAssemblyList(result);
  };

  const getBodyType = () => {
    getAllData(endPoints.api.BODY_TYPES).then((response) => {
      if (response && response.status === "success") {
        let result = response.data.result.map((item: any, i: any) => ({
          ...item,
          label: item.bodyType,
          value: item.bodyType,
        }));
        setBodyTypeList(result);
      } else {
      }
    });
  };

  const getBodyConditionType = () => {
    let result: any = addEditCarData.fields.bodyCondition.menu.map(
      (item: any, i: any) => ({
        label: item,
        value: item,
      })
    );
    setBodyConditionList(result);
  };

  const getSellarType = () => {
    let result: any = addEditCarData.fields.sellerType.menu.map(
      (item: any, i: any) => ({
        label: item,
        value: item,
      })
    );
    setSellarTypeList(result);
  };
  const getFeatures = () => {
    getAllData(endPoints.api.ADSCAR + endPoints.api.CAR_FEATURES)
      .then((response) => {
        if (response && response.data && response.status === "success") {
          // let result = response.data.result;
          let result = response.data.result.map((item: any, i: any) => ({
            ...item,
            isChecked: false,
          }));
          for (let feature of formData.features) {
            for (let single of result) {
              if (single.name === feature) {
                single.isChecked = true;
              }
            }
          }
          // let featureName = result.map((el: any) => el.name);
       console.log('result ---->',result)
          setFeaturesArray(result);
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getEngineType();
    getTransmissionType();
    getAssemblyType();
    getBodyType();
    getBodyConditionType();
    getSellarType();
    getFeatures();
  }, []);

  function uniqueArray(reference: any, array: any) {
    Object.assign(reference, array, { length: array.length });
  }

  const handleCheckboxChange = (data: any) => {
    const currentName = data.name;
    let temp = formData.features;
    let result: any = featuresArray.map((item: any, i: any) =>
      currentName === item.name
        ? { ...item, isChecked: !item.isChecked }
        : { ...item }
    );
    setFeaturesArray(result);
    let javascript_freelancers = result.filter(function (freelancer: any) {
      return freelancer.isChecked == true;
    });

    let namelist: any = javascript_freelancers.map((key: any) => key.name);
    uniqueArray(temp, namelist);

    setFormData({ name: "features", value: temp });

    // console.log(temp);
  };

  const postAdd = async () => {
    // onNext("upload");
    
    const engineCapError = nameValidator(engineCapacity.value);
    const engineError = nameValidator(engineType.value);
    const transmissionError = nameValidator(transmission.value);
    const assemblyError = nameValidator(assembly.value);
    const bodyError = nameValidator(bodyType.value);
    const bodyCondtionError = nameValidator(bodyCondition.value);
    const sellarError = nameValidator(sellarType.value);

    if (
      engineError ||
      transmissionError ||
      assemblyError ||
      bodyError ||
      bodyCondtionError ||
      sellarError ||
      engineCapError
    ) {
      setEngineType({ ...engineType, error: engineError });
      setTransmission({ ...transmission, error: transmissionError });
      setAssembly({ ...assembly, error: assemblyError });
      setBodyType({ ...bodyType.value, error: bodyError });
      setBodyCondition({ ...bodyCondition, error: bodyCondtionError });
      setSellarType({ ...sellarType, error: sellarError });
      setEngineCapacity({ ...engineCapacity, error: engineCapError });
      return;
    }
    submitForm(false);
    // onNext("upload");
  };

  return (
    <View style={styles.containerStyle}>
      <View>
        <Text style={styles.uploadText}>Additional Information</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>Engine Type</Text>
        <RNPickerSelect
          placeholder={placeholder}
          items={engineTypeList}
          onValueChange={(text: any) => {
            setEngineType({ value: text, error: "" });
            setFormData({ name: "engineType", value: text });
          }}
          useNativeAndroidPickerStyle={false}
          style={!!engineType.error ? pickerErrorStyles : pickerSelectStyles}
          value={engineType.value}
        />
        {!!engineType.error && (
          <Text style={{ color: "red" }}>{engineType.error}</Text>
        )}
      </View>

      <TextInput
        label="Engine Capacity(cc)"
        returnKeyType="next"
        autoCapitalize="none"
        style={styles.input}
        value={engineCapacity.value}
        onChangeText={(text: any) => {
          setEngineCapacity({ value: text, error: "" });
          setFormData({ name: "engineCapacity", value: text });
        }}
        error={!!engineCapacity.error}
        errorText={engineCapacity.error}
        keyboardType="number-pad"
      />
      <View style={{ marginTop: 10 }}>
        <Text>Transmission</Text>
        <RNPickerSelect
          placeholder={placeholder}
          items={transmissionList}
          onValueChange={(text: any) => {
            setTransmission({ value: text, error: "" });
            setFormData({ name: "transmission", value: text });
          }}
          useNativeAndroidPickerStyle={false}
          style={!!transmission.error ? pickerErrorStyles : pickerSelectStyles}
          value={transmission.value}
        />
        {!!transmission.error && (
          <Text style={{ color: "red" }}>{transmission.error}</Text>
        )}
      </View>

      <View style={{ marginTop: 10 }}>
        <Text>Assembly</Text>
        <RNPickerSelect
          placeholder={placeholder}
          items={assemblyList}
          onValueChange={(text: any) => {
            setAssembly({ value: text, error: "" });
            setFormData({ name: "assembly", value: text });
          }}
          useNativeAndroidPickerStyle={false}
          style={!!assembly.error ? pickerErrorStyles : pickerSelectStyles}
          value={assembly.value}
        />
        {!!assembly.error && (
          <Text style={{ color: "red" }}>{assembly.error}</Text>
        )}
      </View>

      <View style={{ marginTop: 10 }}>
        <Text>Body Type</Text>
        <RNPickerSelect
          placeholder={placeholder}
          items={bodyTypeList}
          onValueChange={(text: any) => {
            setBodyType({ value: text, error: "" });
            setFormData({ name: "bodyType", value: text });
          }}
          useNativeAndroidPickerStyle={false}
          style={!!bodyType.error ? pickerErrorStyles : pickerSelectStyles}
          value={bodyType.value}
        />
        {!!bodyType.error && (
          <Text style={{ color: "red" }}>{bodyType.error}</Text>
        )}
      </View>

      <View style={{ marginTop: 10 }}>
        <Text>Body Condition</Text>
        <RNPickerSelect
          placeholder={placeholder}
          items={bodyConditionList}
          onValueChange={(text: any) => {
            setBodyCondition({ value: text, error: "" });
            setFormData({ name: "bodyCondition", value: text });
          }}
          useNativeAndroidPickerStyle={false}
          style={!!bodyCondition.error ? pickerErrorStyles : pickerSelectStyles}
          value={bodyCondition.value}
        />
        {!!bodyCondition.error && (
          <Text style={{ color: "red" }}>{bodyCondition.error}</Text>
        )}
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>Sellar Type</Text>
        <RNPickerSelect
          placeholder={placeholder}
          items={sellarTypeList}
          onValueChange={(text: any) => {
            setSellarType({ value: text, error: "" });
            setFormData({ name: "sellerType", value: text });
          }}
          useNativeAndroidPickerStyle={false}
          style={!!sellarType.error ? pickerErrorStyles : pickerSelectStyles}
          value={sellarType.value}
        />
        {!!sellarType.error && (
          <Text style={{ color: "red" }}>{bodyCondition.error}</Text>
        )}
      </View>

      <View>
        <Text style={styles.uploadText}>Features</Text>
      </View>

      <View style={styles.rowCheck}>
        {featuresArray.map((post: any, id: any) => (
          <View style={[styles.buttonCheck]}>
            <CheckBox
              key={id}
              onClick={() => {
                handleCheckboxChange(post);
              }}
              style={[styles.check]}
              boxStyle="white"
              checkBoxColor={COLOR.darkBlue}
              isChecked={post.isChecked}
              rightText={post.name}
              rightTextStyle={{ color: COLOR.darkBlue }}
            />
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.needBtn}
          onPress={() => {
            onBack("upload");
          }}
        >
          <Text style={styles.needBtnText}>Back </Text>
        </TouchableOpacity>
        {Id && (
          <TouchableOpacity style={styles.deleteBtn} onPress={()=>{onDelete()}}>
            <Text style={styles.deleteBtnText}>Delete</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => {
            // onNext("upload");
            postAdd();
          }}
        >
          <Text style={styles.btnText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddionalInformation;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroidContainer: {
    backgroundColor: "white",
  },
  inputIOSContainer: {
    backgroundColor: "white",
  },
});

const pickerErrorStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroidContainer: {
    backgroundColor: "white",
  },
  inputIOSContainer: {
    backgroundColor: "white",
  },
});
