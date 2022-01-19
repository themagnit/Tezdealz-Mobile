import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState, useReducer } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Modal,
  Alert,
} from "react-native";

import { ScrollView, useToast } from "native-base";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import styles from "./styles";
import CarInformation from "./CarInformation/CarInformation";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import UploadPhoto from "./UploadPhoto/UploadPhoto";
import AddionalInformation from "./AdditionalInformation/AdditionalInformation";
import { addData, deleteData, getAllData, updateData } from "../../Utility/API";
import { endPoints } from "../../constants/Environment";
import { getToken } from "../../Utility/commonUtils";
import { Loader } from "../../components";

const formReducer = (state: any, event: any) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};
const initialFieldValues = {
  city: "",
  carModel: "",
  carMake: "",
  modelYear: "",
  modelVersion: "",
  modelVersionDisplayName: "",
  bodyColor: "",
  bodyType: "",
  bodyCondition: "",
  registeredIn: "",
  mileage: "",
  price: "",
  registrationNo: "",
  description: "",
  engineType: "",
  engineCapacity: "",
  transmission: "",
  assembly: "",
  sellerType: "",
  images: [
    {
      location:
        "https://s3.ap-south-1.amazonaws.com/cdn.carokta.com/09e043d0-05ca-4f07-ab58-ee4dd1286425.png",
      reference: "09e043d0-05ca-4f07-ab58-ee4dd1286425.png",
    },
  ],
  selectedImage: false, //"",
  features: [],
  province: "",
  location: { coordinates: { lat: "", long: "" }, address: "" },
};

const AddPost = ({ navigation, route }: any) => {
  const { Id } = route.params != undefined ? route.params : "";
  const toast = useToast();
  const [isVisible, setIsVisible] = useState(false);

  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);

  const [formData, setFormData] = useReducer(formReducer, initialFieldValues);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<Array<any>>([]);

  const updateImagesState = (img: any) => {
     setImages(img);
     setFormData({ name: 'images', value: img });
  };

  const onNext = (name: string) => {
    if (name === "upload") {
      setFirst(false);
      setSecond(true);
    } else if (name === "additional") {
      setSecond(false);
      setThird(true);
    }
  };
  const onBack = (name: string) => {
    if (name === "carInfo") {
      setFirst(true);
      setSecond(false);
    } else if (name === "upload") {
      setSecond(true);
      setThird(false);
    }
  };

  useEffect(() => {
    if (Id) {
      loadSingleData(Id);
    }
  }, [Id]);

  const loadSingleData = async (Id: any) => {
    setIsLoading(true);

    if (Id) {
      await getAllData(`${endPoints.api.ADSCAR}/${Id}`)
        .then((response) => {
          setIsLoading(false);
          if (response && response.data && response.status === "success") {
            let result = response.data.result;

            let FieldValues = formData;
            FieldValues = {
              city: result.city,
              carModel: result.model,
              carMake: result.make,
              modelVersion: result.version,
              modelYear: result.modelYear.toString(),
              bodyColor: result.bodyColor,
              bodyType: result.bodyType,
              bodyCondition: result.condition,
              registeredIn: result.registrationCity,
              mileage: result.milage.toString(),
              price: result.price.toString(),
              registrationNo: result.regNumber,
              description: result.description,
              engineType: result.engineType,
              engineCapacity: result.engineCapacity.toString(),
              transmission: result.transmission,
              assembly: result.assembly,
              images: result.image,
              features: result.features,
              province: result.province,
              sellerType: result.sellerType,
              selectedImage: result.selectedImage
                ? result.selectedImage
                : result.image[0]
                ? result.image[0]
                : "",
              location: { coordinates: { lat: "", long: "" }, address: "" },
            };
            Object.keys(FieldValues).forEach((key) => {
              setFormData({ name: key, value: FieldValues[key] });
            });
            setImages(FieldValues.images);
          } else {
            if (response.data) {
            } else {
            }
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(error);
        });
    }
  };

  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: "handled",
    contentContainerStyle: {
      flex: 1,
      // justifyContent: "center",
    },
  };

  const onNextStep = () => {
    console.log("called next step");
  };

  const onPaymentStepComplete = () => {
    console.log("Payment step completed!");
  };

  const onPrevStep = () => {
    console.log("called previous step");
  };

  const onSubmitSteps = () => {
    console.log("called on submit step.");
  };

  const addEditData = async (data: any) => {
    let result: any;
    if (Id) {
      let carId = Id ? "/" + Id : "";
      result = await updateData(endPoints.api.ADSCAR + carId, data);
    } else {
      result = await addData(endPoints.api.ADSCAR, data);
    }
    return result;
  };

  const submitForm = async (isPublished: any) => {
    let data = {
      country: "Pakistan",
      city: formData.city,
      province: formData.province,
      "location.address": formData.location.address,
      "location.coordinates[0]": formData.location.coordinate.long,
      "location.coordinates[1]": formData.location.coordinate.lat,
      model: formData.carModel,
      make: formData.carMake,
      version: formData.modelVersion,
      transmission: formData.transmission,
      assembly: formData.assembly,
      registrationCity: formData.registeredIn,
      bodyColor: formData.bodyColor,
      milage: formData.mileage,
      condition: formData.bodyCondition,
      description: formData.description,
      bodyType: formData.bodyType,
      engineType: formData.engineType,
      engineCapacity: formData.engineCapacity,
      regNumber: formData.registrationNo,
      sellerType: formData.sellerType,
      modelYear: formData.modelYear,
      features: formData.features,
      price: formData.price,
      isPublished: isPublished,
      selectedImage: formData.selectedImage,
      image: formData.images,
    };

    setIsLoading(true);
    addEditData(data).then((response) => {
      setIsLoading(false);
      if (response && response.data && response.data.status === "success") {
        toast.show({
          title: "Advertisement Updated Successfully",
          status: "success",
        });
        let fieldValues: any = initialFieldValues;
        Object.keys(fieldValues).forEach((key) => {
          setFormData({ name: key, value: fieldValues[key] });
        });
        setFirst(true);
        setThird(false);
        navigation.navigate("CompletePost");
      } else {
        setIsLoading(false);
        let msg =
          response &&
          response.response &&
          response.response.data &&
          response.response.data.message
            ? response.response.data.message
            : response.response
            ? response.response
            : "Network Error";
        toast.show({
          title: response.response.data.message,
          status: "error",
        });
      }
    });
  };

  const needAssist = (needed: boolean = false) => {
    if (needed) {
      setIsLoading(true);
      let body = {
        description: "I Need assistance in creating my advertisement.",
      };
      addData(`${endPoints.api.NEED_ASSISTANCE}`, body)
        .then((response) => {
          setIsLoading(false);
          if (response && response.data && response.data.status === "success") {
            toast.show({
              title: response.data.message,
              status: "success",
            });

            const timer = setTimeout(() => {
              onHelp();
            }, 1000);
          } else {
            toast.show({
              title:
                response && response.message
                  ? response.message
                  : "Network Error",
              status: "success",
            });
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(error);
        });
    }
  };

  const onHelp = () => {
    Alert.alert(
      "Help Coming!!!",
      "Thank you for contacting us!! Customer Support will contact you within 24 hours!",
      [
        {
          text: "OK",
          onPress: () => {
            console.log("OK Pressed");
          },
        },
      ]
    );
  };
  const needAssistance = () =>
    Alert.alert(
      "Need Assistance?",
      "Do you need assistance in creating your advertisement?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => needAssist(true) },
      ]
    );

  const deleteAd = () => {
    if (Id) {
      setIsLoading(true);
      deleteData(`${endPoints.api.ADSCAR}/${Id}`)
        .then((response: any) => {
          if (response && response.data && response.data.status === "success") {
            toast.show({
              title: response.data.message,
              status: "success",
            });
          } else {
            toast.show({
              title: response.data.message,
              status: "error",
            });
          }

          setIsLoading(false);
          navigation.navigate("Your Add");
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(error);
        });
    }
  };

  const onDelete = () =>
    Alert.alert("Delete!", "Are you sure you want to delete this Car Ad?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => deleteAd() },
    ]);

  return (
    <View style={styles.container}>
      {/* <ProgressSteps
        labelColor={"black"}
        activeLabelColor="#05409D"
        activeStepIconBorderColor="#05409D"
        progressBarColor="#05409D"
        borderWidth={2}
      >
        <ProgressStep
          label="Enter Your Car Information"
          onNext={onPaymentStepComplete}
          onPrevious={onPrevStep}
          scrollViewProps={defaultScrollViewProps}
        >
          <ScrollView>
            <CarInformation onPaymentStepComplete={onPaymentStepComplete} />
          </ScrollView>
        </ProgressStep>

        <ProgressStep
          label="Upload Photos"
          labelColor={"red"}
          onNext={onPaymentStepComplete}
          onPrevious={onPrevStep}
          scrollViewProps={defaultScrollViewProps}
        >
          <UploadPhoto
            onPaymentStepComplete={onPaymentStepComplete}
            onPrevStep={onPrevStep}
          />
        </ProgressStep>
        <ProgressStep
          label="Additional Information"
          onNext={onPaymentStepComplete}
          onPrevious={onPrevStep}
          scrollViewProps={defaultScrollViewProps}
        >
          <ScrollView>
            <AddionalInformation />
          </ScrollView>
        </ProgressStep>
      </ProgressSteps> */}
      <View style={styles.circleMain}>
        <View style={styles.circleHeader}>
          <TouchableWithoutFeedback
            style={first ? styles.circle : styles.circleUnfilled}
          >
            <Text style={first ? styles.circleText : styles.unfilledText}>
              1
            </Text>
          </TouchableWithoutFeedback>

          <Text style={styles.line}>------------</Text>
          <TouchableWithoutFeedback
            style={second ? styles.circle : styles.circleUnfilled}
          >
            <Text style={second ? styles.circleText : styles.unfilledText}>
              2
            </Text>
          </TouchableWithoutFeedback>
          <Text style={styles.line}>------------</Text>

          <TouchableWithoutFeedback
            style={third ? styles.circle : styles.circleUnfilled}
          >
            <Text style={third ? styles.circleText : styles.unfilledText}>
              3
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.textView}>
          <Text style={styles.headerText}>Enter Your Car Information</Text>
          <Text style={styles.headerText}>Upload Photos</Text>
          <Text style={styles.headerText}>Additional Information</Text>
        </View>
      </View>

      <Loader loading={isLoading} />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {first && (
          <CarInformation
            onNext={onNext}
            setFormData={setFormData}
            formData={formData}
            Id={Id}
            onDelete={onDelete}
            needAssistance={needAssistance}
          />
        )}

        {second && (
          <UploadPhoto
            onNext={onNext}
            onBack={onBack}
            images={images}
            updateImagesState={updateImagesState}
            formData={formData}
            setFormData={setFormData}
            Id={Id}
            onDelete={onDelete}
          />
        )}
        {third && (
          <AddionalInformation
            onBack={onBack}
            setFormData={setFormData}
            formData={formData}
            submitForm={submitForm}
            Id={Id}
            onDelete={onDelete}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default AddPost;
