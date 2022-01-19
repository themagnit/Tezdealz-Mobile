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
  Image,
  Alert,
  FlatList,
  ImageBackground,
} from "react-native";
import styles from "../styles";

import * as FileSystem from "expo-file-system";
import SelectBox from "react-native-multi-selectbox-typescript";
import { COLOR } from "../../../constants/Colors";
import { Loader, TextInput } from "../../../components";
import { addFormData, getAllData } from "../../../Utility/API";
import { endPoints } from "../../../constants/Environment";
import addEditCarData from "../../../constants/addEditCarData";
import { nameValidator } from "../../../Utility/commonUtils";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

export const getFileInfo = async (fileURI: string) => {
  const fileInfo = await FileSystem.getInfoAsync(fileURI);
  return fileInfo;
};

const UploadPhoto = ({
  navigation,
  onNext,
  onBack,
  Id,
  updateImagesState,
  images,
  setFormData,
  formData,
  onDelete,
}: any) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [infoMessage, setInfoMessage] = useState("");
  const [imageError, setImageError] = useState(false);

  const removePhoto = (item: any, index: number) => {
    let temp = [...images];
    if (temp[index] === formData.selectedImage) {
      setFormData({ name: "selectedImage", value: false });
    }
    temp.splice(index, 1);
    updateImagesState(temp);
  };

  const checkFileSize = async (fileURI: string) => {
    const fileSizeInBytes = await FileSystem.getInfoAsync(fileURI);

    return fileSizeInBytes;
  };
  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    let oneMb = 1024 * 1024;

    // const { uri, type } = result;
    let imageType = `${result.type}/${result.uri.split(".")[1]}`;

    const fileSize = await checkFileSize(result.uri);
    let imageName = `${fileSize.modificationTime}.${result.uri.split(".")[1]}`;
    result = [
      {
        name: imageName, //fileSize.modificationTime,
        type: imageType,
        uri: result.uri,
        size: fileSize.size,
      },
    ];
    let temp = [...images];
    let imageFiles = result; //e.target.files;
    let sizeError = false;
    let arrayLengthError = false;
    for (let i = 0; i < imageFiles.length; i++) {
      let imageSize = imageFiles[i].size;
      if (imageSize > 5 * oneMb) {
        sizeError = true;
        break;
      } else {
        if (temp.length > 19) {
          arrayLengthError = true;
          break;
        }
        temp.push(imageFiles[i]);
      }
    }

    // setInfoTitle('Error!');
    let errorText =
      sizeError && arrayLengthError
        ? addEditCarData.imageArrayLength
        : sizeError
        ? addEditCarData.infoText
        : arrayLengthError
        ? addEditCarData.imageArrayLength
        : "";
    setInfoMessage(errorText);
    // setOpenInfoModel(sizeError || arrayLengthError);
    if (!sizeError && !arrayLengthError) {
      setIsLoading(true);
      let imageUploadPromises: any[] = [];
      let fd: any;
      for (let i = 0; i < imageFiles.length; i++) {
        fd = new FormData();
        fd.append("image", imageFiles[i]);
        // imageUploadPromises.push(
        //   addFormData(`${endPoints.api.IMAGE_UPLOAD}`, fd)
        // );
      }
      addFormData(`${endPoints.api.IMAGE_UPLOAD}`, fd)
        .then((response) => {
          setIsLoading(false);

          if (response && response.data) {
            let imagesArray: any[] = [...images];
            //  response.forEach((response) => {

            response.data.data.result.images.map((image: any) =>
              imagesArray.push(image)
            );
            // });
            setIsLoading(false);
            console.log("imagesArray", imagesArray);
            updateImagesState(imagesArray);
          } else {
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);

          console.error(error);
        });

      // Promise.all(imageUploadPromises)
      //   .then((responses) => {
      //     let imagesArray: any[] = [...images];
      //     responses.forEach((response) => {
      //       response.data.data.result.images.map((image: any) =>
      //         imagesArray.push(image)
      //       );
      //     });
      //     setIsLoading(false);
      //     updateImagesState(imagesArray);
      //   })
      //   .then(() => {
      //     debugger;
      //     setIsLoading(false);
      //     console.log("succes");
      //   })
      //   .catch((error) => {
      //     setIsLoading(false);
      //     debugger;
      //     console.error(error);
      //   });
    } else {
      setImageError(true);
      console.log(errorText);
      Alert.alert("ERROR !!!", errorText, [
        {
          text: "OK",
          onPress: () => {
            console.log("OK Pressed");
          },
        },
      ]);
    }
    //e.target.value = null;
  };

  return (
    <View style={[styles.containerStyle]}>
      <View>
        <Text style={styles.uploadText}>Upload Photos</Text>
      </View>
      <Loader loading={isLoading} />
      <FlatList
        horizontal
        data={images}
        renderItem={({ item, index }) => (
          <View style={{ marginHorizontal: 4, marginBottom: 10 }}>
            <ImageBackground
              source={{ uri: item.location }}
              resizeMode="cover"
              style={{ width: 100, height: 150 }}
            >
              <Ionicons
                name="ios-close-circle-outline"
                size={24}
                color={COLOR.primary}
                style={{ alignSelf: "flex-end" }}
                onPress={() => {
                  removePhoto(item, index);
                }}
              />
            </ImageBackground>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.imageCard}>
        <TouchableOpacity
          style={styles.imageView}
          onPress={() => {
            pickImage();
          }}
        >
          <MaterialIcons name="camera-enhance" size={28} color="black" />
          <Text style={styles.imageText}>
            Try to upload images in these dimensions for better appearance
            930x620 700x465 (Max limit 5 MB per image)
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.needBtn}
          onPress={() => {
            onBack("carInfo");
          }}
        >
          <Text style={styles.needBtnText}>Back</Text>
        </TouchableOpacity>
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
            onNext("additional");
          }}
        >
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadPhoto;
