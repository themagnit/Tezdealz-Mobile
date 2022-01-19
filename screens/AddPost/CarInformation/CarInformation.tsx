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
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";

export type Item = {
  id: string | number;
  item: string;
};
const placeholder = {
  label: "Select ....",
  value: null,
  color: "#9EA0A4",
};

const CarInformation = ({
  navigation,
  onNext,
  setFormData,
  formData,
  Id,
  onDelete,
  needAssistance,
}: any) => {

  const [description, setDescription] = useState({
    value: formData.description || "",
    error: "",
  });
  const [mileage, setMileage] = useState({
    value: formData.mileage || "",
    error: "",
  });
  const [registrationNo, setRegistrationNo] = useState({
    value: formData.registrationNo || "",
    error: "",
  });
  const [price, setPrice] = useState({
    value: formData.price || "",
    error: "",
  });

  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({ value: formData.city || "", error: "" });

  const [registered, setRegistered] = useState({
    value: formData.registeredIn || "",
    error: "",
  });

  useEffect(() => {
    setDescription({ value: formData.description, error: "" });
    setMileage({ value: formData.mileage, error: "" });
    setRegistrationNo({ value: formData.registrationNo, error: "" });
    setPrice({ value: formData.price, error: "" });
    setCity({ value: formData.city, error: "" });
    setRegistered({ value: formData.registeredIn, error: "" });
    setCarMakes({ value: formData.carMake, error: "" });
    setCarModels({ value: formData.carModel, error: "" });
    setCarModelVersion({ value: formData.modelVersion, error: "" });
    setCarYear({ value: formData.modelYear, error: "" });
    setBodyColor({ value: formData.bodyColor, error: "" });
  }, [formData]);

  const [isLoading, setIsLoading] = useState(false);

  const [carMakesList, setCarMakesList] = useState([]);
  const [carMakes, setCarMakes] = useState({
    value: formData.carMake || "",
    error: "",
  });

  const [carModelsList, setCarModelsList] = useState([]);
  const [carModels, setCarModels] = useState({
    value: formData.carModel || "",
    error: "",
  });

  const [carModelVersionList, setCarModelVersionList] = useState([]);
  const [carModelVersion, setCarModelVersion] = useState({
    value: formData.modelVersion || "",
    error: "",
  });

  const [bodyColorArray, setBodyColorArray] = useState([]);
  const [bodyColor, setBodyColor] = useState({
    value: formData.bodyColor || "",
    error: "",
  });
  const [yearList, setYearList] = useState([]);
  const [carYear, setCarYear] = useState({
    value: formData.modelYear || "",
    error: "",
  });

  const fetchMakes = () => {
    setIsLoading(true);
    getAllData(endPoints.api.CAR_MAKES + "?sort=name").then((response) => {
      setIsLoading(false);
      if (response && response.status === "success") {
        setIsLoading(false);
        let result = response.data.result.map((item: any, i: any) => ({
          ...item,
          item: item.name,
          id: item.make_id,
          label: item.name,
          value: item.name,
        }));

        setCarMakesList(result);
      } else {
        setIsLoading(false);
      }
    });
  };

  const getCitiesData = async () => {
    let param = "?sort=name";
    await getAllData(endPoints.api.CITIES + param)
      .then((response) => {
        if (response && response && response.status === "success") {
          let result = response.data.result.map((item: any, i: any) => ({
            ...item,
            item: item.name,
            id: item.stateCode,
            label: item.name,
            value: item.name,
          }));
          setCities(result);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchModelsWithId = (makeId: any) => {
    setIsLoading(true);
    if (makeId) {
      getAllData(endPoints.api.MAKE_MODELS + makeId + "&sort=name").then(
        (response) => {
          setIsLoading(false);
          if (response && response.status === "success" && response.data) {
            let result = response.data.result.map((item: any, i: any) => ({
              ...item,
              item: item.name,
              id: item.model_id,
              label: item.name,
              value: item.name,
            }));
            setCarModelsList(result);
          } else {
            setIsLoading(false);
          }
        }
      );
    }
  };

  const fetchModelVersionWithId = (modelId: any) => {
    setIsLoading(true);
    if (modelId) {
      getAllData(endPoints.api.MODEL_VERSION + modelId + "&sort=name").then(
        (response) => {
          setIsLoading(false);
          if (response && response.status === "success") {
            let result = response.data.result.map((item: any, i: any) => ({
              ...item,
              item: `${item.name} | ${item.fuel_type} | ${item.capacity} cc | ${item.transmission_type}`,
              id: item.model_id,
              label: `${item.name} | ${item.fuel_type} | ${item.capacity} cc | ${item.transmission_type}`,
              value: `${item.name} | ${item.fuel_type} | ${item.capacity} cc | ${item.transmission_type}`,
            }));
            setCarModelVersionList(result);
          } else {
            setIsLoading(false);
          }
        }
      );
    }
  };

  const getColors = () => {
    setIsLoading(true);

    getAllData(endPoints.api.CAR_COLORS).then((response) => {
      setIsLoading(false);
      if (response && response.status === "success") {
        let result = response.data.result.map((item: any, i: any) => ({
          ...item,
          item: item.name,
          id: item.code,
          label: item.name,
          value: item.name,
        }));
        setBodyColorArray(result);
      } else {
        setIsLoading(false);
      }
    });
  };
  const getYears = () => {
    let result: any = addEditCarData.fields.modelYear.menu.map(
      (item: any, i: any) => ({
        item: item,
        id: `${item}`,
        label: item,
        value: item,
      })
    );
    setYearList(result);
  };

  const _onNext = async () => {
    // onNext("upload");

    const cityError = nameValidator(city.value);
    const carMakeError = nameValidator(carMakes.value);
    const registeredError = nameValidator(registered.value);
    const carModelError = nameValidator(carModels.value);
    const carYearError = nameValidator(carYear.value);
    const modelVersionError = nameValidator(carModelVersion.value);
    const bodyColorError = nameValidator(bodyColor.value);

    const mileageError = nameValidator(mileage.value);
    const priceError = nameValidator(price.value);
    const regNoError = nameValidator(registrationNo.value);
    const desError = nameValidator(description.value);
    if (mileageError || priceError || regNoError) {
      setCity({ ...city, error: cityError });
      setCarMakes({ ...carMakes, error: carMakeError });
      setRegistered({ ...registered, error: registeredError });
      setCarModels({ ...carModels, error: carModelError });
      setCarYear({ ...carYear, error: carYearError });
      setCarModelVersion({ ...carModelVersion, error: modelVersionError });
      setBodyColor({ ...bodyColor, error: bodyColorError });
      setMileage({ ...mileage, error: mileageError });
      setPrice({ ...price, error: priceError });
      setRegistrationNo({ ...registrationNo, error: regNoError });
      setDescription({ ...description, error: desError });
      return;
    }

    if (formValidated()) {
      onNext("upload");
    }
  };

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const formValidated = async () => {
    let cityInformation: any = cities?.filter(
      (item: any) => item.name === city.value
    );
    let params = `${cityInformation[0].stateCode}/${"PK"}`;
    await getAllData(endPoints.api.PROVINCE + params)
      .then((response) => {
        if (response && response && response.status === "success") {
          console.log(response.data.result);
          setFormData({
            name: "location",
            value: {
              coordinate: {
                lat: cityInformation[0].latitude,
                long: cityInformation[0].longitude,
              },
              address: `${city.value}, ${response.data.result[0]?.name}`,
            },
          });
          setFormData({
            name: "province",
            value: response.data.result[0]?.name,
          });
          return true;
        }
      })
      .catch((error) => {
        console.error(error);
        return false;
      });

    return true;
  };

  useEffect(() => {
    getCitiesData();
    fetchMakes();
    getColors();
    getYears();
  }, []);

  useEffect(() => {
    if (carMakes && carMakes.value) {
      let make: any = carMakesList.filter(
        (make: any) => make.name === carMakes.value
      );
      if (make.length > 0) {
        fetchModelsWithId(make[0].make_id);
      }
    }
  }, [carMakes]);

  useEffect(() => {
    if (carModels && carModels.value) {
      let model: any = carModelsList.filter(
        (models: any) => models.name === carModels.value
      );
      if (model.length > 0) {
        fetchModelVersionWithId(model[0].model_id);
      }
    }
  }, [carModels]);

  return (
    <View style={styles.containerStyle}>
      {/* <Loader loading={isLoading} /> */}
      <View>
        <Text>City</Text>
        <RNPickerSelect
          placeholder={placeholder}
          items={cities}
          onValueChange={(text: any) => {
            setCity({ value: text, error: "" });
            setFormData({ name: "city", value: text });
          }}
          useNativeAndroidPickerStyle={false}
          style={!!city.error ? pickerErrorStyles : pickerSelectStyles}
          value={city.value}
        />
        {!!city.error && <Text style={{ color: "red" }}>{city.error}</Text>}
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>Car Make</Text>
        <RNPickerSelect
          placeholder={placeholder}
          items={carMakesList}
          onValueChange={(text: any) => {
            setCarMakes({ value: text, error: "" });
            setFormData({ name: "carMake", value: text });
          }}
          useNativeAndroidPickerStyle={false}
          style={!!carMakes.error ? pickerErrorStyles : pickerSelectStyles}
          value={carMakes.value}
        />
        {!!carMakes.error && (
          <Text style={{ color: "red" }}>{carMakes.error}</Text>
        )}
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>Registered in</Text>
        <RNPickerSelect
          placeholder={placeholder}
          items={cities}
          onValueChange={(text: any) => {
            setRegistered({ value: text, error: "" });
            setFormData({ name: "registeredIn", value: text });
          }}
          useNativeAndroidPickerStyle={false}
          style={!!registered.error ? pickerErrorStyles : pickerSelectStyles}
          value={registered.value}
        />
        {!!registered.error && (
          <Text style={{ color: "red" }}>{registered.error}</Text>
        )}
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>Car Model</Text>
        <RNPickerSelect
          placeholder={placeholder}
          items={carModelsList}
          onValueChange={(text: any) => {
            setCarModels({ value: text, error: "" });
            setFormData({ name: "carModel", value: text });
          }}
          useNativeAndroidPickerStyle={false}
          style={!!carModels.error ? pickerErrorStyles : pickerSelectStyles}
          value={carModels.value}
        />
        {!!carModels.error && (
          <Text style={{ color: "red" }}>{carModels.error}</Text>
        )}
      </View>

      <View style={{ marginTop: 10 }}>
        <Text>Car Year</Text>
        <RNPickerSelect
          placeholder={placeholder}
          items={yearList}
          onValueChange={(text: any) => {
            setCarYear({ value: text, error: "" });
            setFormData({ name: "modelYear", value: text });
          }}
          useNativeAndroidPickerStyle={false}
          style={!!carYear.error ? pickerErrorStyles : pickerSelectStyles}
          value={carYear.value}
        />
        {!!carYear.error && (
          <Text style={{ color: "red" }}>{carYear.error}</Text>
        )}
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>Model Version</Text>
        <RNPickerSelect
          placeholder={placeholder}
          items={carModelVersionList}
          onValueChange={(text: any) => {
            setCarModelVersion({ value: text, error: "" });
            setFormData({ name: "modelVersion", value: text });
          }}
          useNativeAndroidPickerStyle={false}
          style={
            !!carModelVersion.error ? pickerErrorStyles : pickerSelectStyles
          }
          value={carModelVersion.value}
        />
        {!!carModelVersion.error && (
          <Text style={{ color: "red" }}>{carModelVersion.error}</Text>
        )}
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>Body Color</Text>
        <RNPickerSelect
          placeholder={placeholder}
          items={bodyColorArray}
          onValueChange={(text: any) => {
            setBodyColor({ value: text, error: "" });
            setFormData({ name: "bodyColor", value: text });
          }}
          useNativeAndroidPickerStyle={false}
          style={!!bodyColor.error ? pickerErrorStyles : pickerSelectStyles}
          value={bodyColor.value}
        />
        {!!bodyColor.error && (
          <Text style={{ color: "red" }}>{bodyColor.error}</Text>
        )}
      </View>

      <TextInput
        label="Mileage (Km)"
        placeholder="e.g. Honda, Toyata"
        returnKeyType="next"
        autoCapitalize="none"
        style={styles.input}
        value={mileage.value}
        onChangeText={(text: any) => {
          setMileage({ value: text, error: "" });
          setFormData({ name: "mileage", value: text });
        }}
        error={!!mileage.error}
        errorText={mileage.error}
        keyboardType="number-pad"
      />
      <TextInput
        label="Registration No."
        placeholder="e.g. AAA-001"
        returnKeyType="next"
        autoCapitalize="none"
        style={styles.input}
        value={registrationNo.value}
        onChangeText={(text: any) => {
          setRegistrationNo({ value: text, error: "" });
          setFormData({ name: "registrationNo", value: text });
        }}
        error={!!registrationNo.error}
        errorText={registrationNo.error}
      />
      <Text style={styles.warningText}>
        *Registration Number will not be displayed on the platform
      </Text>
      <TextInput
        label="Price"
        placeholder="e.g. 2,0000"
        returnKeyType="next"
        autoCapitalize="none"
        style={styles.input}
        value={price.value}
        onChangeText={(text: any) => {
          setPrice({ value: text, error: "" });
          setFormData({ name: "price", value: text });
        }}
        error={!!price.error}
        errorText={price.error}
        keyboardType="number-pad"
      />

      <TextInput
        multiline
        mode="outlined"
        label="Description"
        placeholder="Add Description"
        style={styles.textArea}
        value={description.value}
        onChangeText={(text: any) => {
          setDescription({ value: text, error: "" });
          setFormData({ name: "description", value: text });
        }}
        error={!!description.error}
        errorText={description.error}
      />
      <View style={styles.footer}>
        {/* <TouchableOpacity
          style={styles.needBtn}
          onPress={() => {
            needAssistance();
          }}
        >
          <Text style={styles.needBtnText}>Need Assistance </Text>
        </TouchableOpacity> */}
        {Id && (
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => {
              onDelete();
            }}
          >
            <Text style={styles.deleteBtnText}>Delete</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => {
            // onNext("upload");
            _onNext();
          }}
        >
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CarInformation;

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
