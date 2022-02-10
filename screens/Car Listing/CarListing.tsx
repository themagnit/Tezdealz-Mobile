import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  SectionList,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TextInput,
  ImageBackground,
} from "react-native";
import moment from "moment";
import {
  MaterialIcons,
  EvilIcons,
  Ionicons,
  FontAwesome,
  AntDesign,
  Feather,
  Entypo as Icon,
  Entypo,
} from "@expo/vector-icons";
import { Searchbar, Appbar, FAB } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import FilterModal from "../Modal/FilterModal";
import { COLOR } from "../../constants/Colors";
import {
  addToFav,
  deleteData,
  getAllData,
  updateData,
} from "../../Utility/API";
import { endPoints } from "../../constants/Environment";
import {
  Carfilters,
  sortingOptions,
} from "../../constants/language/en/filterData";
import { useToast } from "native-base";
import { Loader, WaterMark } from "../../components";
import ConvertDate from "../../Utility/ConvertDate";
import {
  setFilter,
  removeArrayFilter,
  setArrayFilter,
  resetFilters,
  removeFilter,
} from "../../redux/Reducers/carFiltersSlice";
import { getKeyValue } from "../../constants/helperFunctions";
import useShortListCars from "../../redux/hooks/useShortListCars";
import CarCard from "./CarCard/CarCard";
import styles from "./styles";
import CarGridCard from "./CarGridCard/CarGridCard";

const initialValues: any = {
  province: [],
  city: [],
  registrationCity: [],
  make: [],
  model: [],
  transmission: [],
  assembly: [],
  engineType: [],
  bodyColor: [],
  bodyType: [],
  sellerType: [],
  adType: [],
  sort: "",
  condition: "",
  keyword: "",
};

const initialRangeValues: any = {
  price: [0, 50000000],
  modelYear: [1971, 2021],
  milage: [0, 500000],
  engineCapacity: [0, 10000],
};

const CarListing = ({ navigation }: any) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const carFilters = useSelector((state: any) => state.carFilters.filters);
  const { shortlistCars } = useSelector((state: any) => state.shortlistCars);

  const { clearShortListedCars, removeShortListItem, shortListItem } =
    useShortListCars();
  // const carFilters = useSelector((state) => state);

  const [modalVisible, setModalVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [grid, setGrid] = useState(true);
  const [row, setRow] = useState(false);
  const [responseData, setResponseData] = useState<any | null>();
  const [result, setResult] = useState<any[] | []>([]);
  const [page, setPage] = useState(1);

  const [isFavorite, setIsfavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortActive, setSortActive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadBtn, setLoadBtn] = useState(true);

  const [searchIcon, setSearchIcon] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);

  const [rangeValues, setRangeValues] = useState<any>({
    price: [0, 50000000],
    modelYear: [1971, 2021],
    milage: [0, 500000],
    engineCapacity: [0, 10000],
  });

  const [bodyTypes, setBodyTypes] = useState<any>([]);
  const [bodyColors, setBodyColors] = useState<any>([]);
  const [citiesWithCars, setCitiesWithCars] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [modalPage, setModalPage] = useState(100);
  const [transmissions, setTransmissions] = useState([]);
  const [engineType, setEngineType] = useState([]);
  const [assembly, setAssembly] = useState([]);
  const [sellarType, setSellarType] = useState([]);
  const [sorting, setSorting] = useState([]);

  const [cities, setCities] = useState([]);
  const [province, setProvince] = useState([]);

  const getBodyTypes = async () => {
    setIsLoading(true);
    let param = "?sort=bodyType";
    await getAllData(endPoints.api.BODY_TYPES + param).then((response) => {
      setIsLoading(false);
      if (response && response && response.status === "success") {
        let result: any = response.data.result.map((item: any, i: any) => ({
          ...item,
          isChecked: false,
        }));
        setBodyTypes(result);
      } else {
        console.error(response);
      }
    });
  };

  const getBodyColors = async () => {
    let param = "?sort=name";
    await getAllData(endPoints.api.CAR_COLORS + param).then((response) => {
      if (response && response && response.status === "success") {
        let result = response.data.result.map((item: any, i: any) => ({
          ...item,
          isChecked: false,
        }));
        setBodyColors(result);
      } else {
        console.error(response);
      }
    });
  };

  const getMakes = async () => {
    let param = "?sort=name";
    await getAllData(endPoints.api.CAR_MAKES + param)
      .then((response) => {
        if (response && response && response.status === "success") {
          let result = response.data.result.map((item: any, i: any) => ({
            ...item,
            isChecked: false,
          }));
          setMakes(result);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getModels = async () => {
    // setModelsLoading(true);
    let param = `?limit=${modalPage}&sort=name`;
    if (carFilters.make.length > 0) {
      // eslint-disable-next-line
      carFilters.make.map((item: any) => {
        let selectedMake: any = makes.filter((make: any) => make.name === item);
        if (selectedMake.length > 0) {
          param += "&make_id=" + selectedMake[0].make_id;
        }
      });
    }
    await getAllData(endPoints.api.CAR_MODELS + param).then((response) => {
      if (response && response && response.status === "success") {
        let result = response.data.result.map((item: any, i: any) => ({
          ...item,
          isChecked: false,
        }));
        setModels(result);
        // setModalPageCount(response.total);
        // setModelsLoading(false);
      }
    });
  };

  const getCitiesWithCars = async () => {
    let param = "?sort=city";
    if (carFilters.province.length > 0) {
      // eslint-disable-next-line
      carFilters.province.map((item: string) => {
        param += "&province=" + item;
      });
    }
    await getAllData(endPoints.api.CITIES_WITH_CARS + param)
      .then((response) => {
        if (response && response && response.status === "success") {
          let result = response.data.result.map((item: any, i: any) => ({
            ...item,
            isChecked: false,
          }));
          setCitiesWithCars(result);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getTransmission = () => {
    let result: any = Carfilters.TRANSMISSION.map((item, i) => ({
      ...item,
      isChecked: false,
    }));
    setTransmissions(result);
  };
  const getEngineType = () => {
    let result: any = Carfilters.ENGINE_TYPE.map((item, i) => ({
      ...item,
      isChecked: false,
    }));
    setEngineType(result);
  };
  const getAssembly = () => {
    let result: any = Carfilters.ASSEMBLY.map((item, i) => ({
      ...item,
      isChecked: false,
    }));
    setAssembly(result);
  };
  const getSellarType = () => {
    let result: any = Carfilters.SELLER_TYPE.map((item, i) => ({
      ...item,
      isChecked: false,
    }));
    setSellarType(result);
  };

  const getSortData = () => {
    let result: any = sortingOptions.map((item, i) => ({
      ...item,
      isActive: false,
    }));
    setSorting(result);
  };
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
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getStateData = async () => {
    let param = "?sort=name";

    await getAllData(endPoints.api.STATES + param)
      .then((response) => {
        if (response && response && response.status === "success") {
          let result = response.data.result.map((item: any, i: any) => ({
            ...item,
            isChecked: false,
          }));
          setProvince(result);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // setCityFilter
  };

  useEffect(() => {
    getCitiesWithCars();
    getMakes();
    getModels();
    getBodyTypes();
    getBodyColors();
    getTransmission();
    getEngineType();
    getAssembly();
    getSellarType();
    getSortData();
    getCitiesData();
    getStateData();
    // eslint-disable-next-line
  }, []);

  const handleTextBoxSubmit = (name: any) => {
    let filter = {
      name: name,
      value: getKeyValue(rangeValues)(name),
    };

    dispatch(setFilter(filter));
  };

  const handleInputChange = (option: any) => {
    const { label, value } = option;
    if (label === "condition" && value === "any") {
      let filter = {
        name: "sort",
        value: "",
      };
      dispatch(setFilter(filter));
    } else {
      let filter = {
        name: "sort",
        value: value,
      };
      dispatch(setFilter(filter));
    }
    sortByModal(option);

    const index = sorting.indexOf(option);
    let result: any = sorting.map((item: any, i) =>
      index === i ? { ...item, isActive: true } : { ...item, isActive: false }
    );
    setSorting(result);

    setModalVisible(!modalVisible);
  };
  const filterApply = () => {
    setFilterVisible(!filterVisible);
    getAllCars();
  };

  const handleCheckboxChange = (name: string, data: any) => {
    let filter = {
      name: name,
      value:
        name === "bodyType"
          ? data.bodyType
          : name === "city"
          ? data.city
          : data.name,
    };
    const currentName =
      name === "bodyType"
        ? data.bodyType
        : name === "city"
        ? data.city
        : data.name;
    if (name === "make") {
      let result: any = makes.map((item: any, i: any) =>
        currentName === item.name
          ? { ...item, isChecked: !item.isChecked }
          : { ...item }
      );
      setMakes(result);
    } else if (name === "model") {
      let result: any = models.map((item: any, i: any) =>
        currentName === item.name
          ? { ...item, isChecked: !item.isChecked }
          : { ...item }
      );
      setModels(result);
    } else if (name === "bodyType") {
      let result: any = bodyTypes.map((item: any, i: any) =>
        currentName === item.bodyType
          ? { ...item, isChecked: !item.isChecked }
          : { ...item }
      );
      setBodyTypes(result);
    } else if (name === "bodyColor") {
      let result: any = bodyColors.map((item: any, i: any) =>
        currentName === item.name
          ? { ...item, isChecked: !item.isChecked }
          : { ...item }
      );
      setBodyColors(result);
    } else if (name === "transmission") {
      let result: any = transmissions.map((item: any, i: any) =>
        currentName === item.name
          ? { ...item, isChecked: !item.isChecked }
          : { ...item }
      );
      setTransmissions(result);
    } else if (name === "sellerType") {
      let result: any = sellarType.map((item: any, i: any) =>
        currentName === item.name
          ? { ...item, isChecked: !item.isChecked }
          : { ...item }
      );
      setSellarType(result);
    } else if (name === "assembly") {
      let result: any = assembly.map((item: any, i: any) =>
        currentName === item.name
          ? { ...item, isChecked: !item.isChecked }
          : { ...item }
      );
      setAssembly(result);
    } else if (name === "engineType") {
      let result: any = engineType.map((item: any, i: any) =>
        currentName === item.name
          ? { ...item, isChecked: !item.isChecked }
          : { ...item }
      );
      setEngineType(result);
    } else if (name === "province") {
      let result: any = province.map((item: any, i: any) =>
        currentName === item.name
          ? { ...item, isChecked: !item.isChecked }
          : { ...item }
      );
      setProvince(result);
    } else if (name === "registrationCity") {
      let result: any = cities.map((item: any, i: any) =>
        currentName === item.name
          ? { ...item, isChecked: !item.isChecked }
          : { ...item }
      );
      setCities(result);
    } else if (name === "city") {
      let result: any = citiesWithCars.map((item: any, i: any) =>
        currentName === item.city
          ? { ...item, isChecked: !item.isChecked }
          : { ...item }
      );
      setCitiesWithCars(result);
    }

    if (!data.isChecked) {
      dispatch(setArrayFilter(filter));
    } else {
      dispatch(removeArrayFilter(filter));
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    getAllCars();
  };

  const getFiltersValues = (keys: string, values: string[]) => {
    if (keys === "make") {
      getModels();
    } else if (keys === "province") {
      getCitiesWithCars();
    }
  };
  const serachHandle = () => {
    let queryParams = {
      keyword: searchQuery,
    };
    // dispatch(setFilter(queryParams));

    getAllCars(searchQuery);
  };

  const getAllCars = async (keyword: any = "") => {
    let params = `?limit=20&page=${page.toString()}`;
    debugger;
    Object.entries(carFilters).map(([keys, values]: any) => {
      debugger;
      if (values !== initialValues[keys]) {
        if (typeof values === typeof [] && !(keys in initialRangeValues)) {
          // eslint-disable-next-line
          values.map((value: string) => {
            params += `&${keys}=${value}`;
          });
          if (values.length > 0) {
            getFiltersValues(keys, values);
          }
        } else if (keys in initialRangeValues) {
          if (values[0] !== initialRangeValues[keys][0]) {
            params += `&${keys}[gte]=${values[0]}`;
          }
          if (values[1] !== initialRangeValues[keys][1]) {
            params += `&${keys}[lte]=${values[1]}`;
          }
        } else {
          params += `&${keys}=${values}`;
        }
      }
    });
    if (keyword) {
      params += `&${"keyword"}=${keyword}`;
    }

    console.log("params------", params);
    await getAllData(endPoints.api.ADSCAR + params)
      .then((response) => {
        setIsLoading(false);
        if (response && response.status === "success") {
          setResponseData(response);
          setRefreshing(false);
          setLoadBtn(true);
          if (response.data.result.length > 0) {
            setResult(
              page === 1
                ? response.data.result
                : [...result, ...response.data.result]
            );
            setLoadBtn(response.data.result.length === 20 ? true : false);
          }
        } else {
          setResponseData(null);
          setLoadBtn(false);
          setRefreshing(false);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const favs = (isFav: any, id: string) => {
    setIsLoading(true);
    addToFav(
      isFav
        ? endPoints.api.ADSCAR + endPoints.api.REMOVE_FAVS
        : endPoints.api.ADSCAR + endPoints.api.ADD_TO_FAVS,
      id
    )
      .then((response) => {
        setIsLoading(false);
        if (response && response.status === "success") {
          toast.show({
            title: isFav
              ? "Removed from Favourites Successfully"
              : "Added to Favourites Successfully",
            status: "success",
          });
          getAllCars();
        } else {
          console.log("response", response);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const resetForm = () => {
    setRangeValues({
      price: [0, 50000000],
      modelYear: [1971, 2021],
      milage: [0, 500000],
      engineCapacity: [0, 10000],
    });
    dispatch(resetFilters());
    // setFilterVisible(!filterVisible);
    // getAllCars();
  };

  useEffect(() => {
    getAllCars();
  }, []);

  useEffect(() => {
    setResult([]);
    setPage(1);
    getAllCars();
    // eslint-disable-next-line
  }, [carFilters]);
  useEffect(() => {
    getModels();
    // eslint-disable-next-line
  }, [modalPage, carFilters.make, makes]);

  const sortByModal = (option: any) => {
    setModalVisible(!modalVisible);
    setSortActive(false);
  };

  const toggleShortListCar = (car: any) => {
    if (shortlistCars.filter((item: any) => item._id === car._id).length > 0) {
      removeShortListed && removeShortListed(car._id);
    } else {
      handleShortList && handleShortList(car);
    }
  };

  const handleShortList = (car: any) => {
    let result = shortListItem(car);
    toast.show({
      title: result.message,
      status: result.status,
    });
  };

  const resetCampare = () => {
    clearShortListedCars();
  };

  const removeShortListed = (itemId: string) => {
    let result = removeShortListItem(itemId);
    toast.show({
      title: result.message,
      status: result.status,
    });
  };

  const toggleActive = (item: any) => {
    let activeInactive = item.active
      ? endPoints.api.INACTIVE
      : endPoints.api.ACTIVE;
    setIsLoading(true);
    updateData(`${endPoints.api.ADSCAR}${activeInactive}/${item._id}`)
      .then((response: any) => {
        setIsLoading(false);

        if (response && response.data && response.data.status === "success") {
          toast.show({
            title: response.data.message,
            status: "success",
          });
          getAllCars();
        } else {
          toast.show({
            title: response.data.message,
            status: "error",
          });
          console.log(response);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const toggleSold = (item: any, soldHere: boolean = false) => {
    let isSoldMark = item.isSold;
    let soldUnsold = item.isSold
      ? endPoints.api.MARK_UNSOLD
      : endPoints.api.MARK_SOLD;

    let requestBody = { soldByUs: soldHere };
    setIsLoading(true);
    updateData(
      `${endPoints.api.ADSCAR}${soldUnsold}/${item._id}`,
      !isSoldMark ? requestBody : undefined
    )
      .then((response: any) => {
        if (response && response.data && response.data.status === "success") {
          toast.show({
            title: response.data.message,
            status: "success",
          });
          getAllCars();
        } else {
          toast.show({
            title: response.data.message,
            status: "error",
          });
          console.log(response);
        }

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };
  const deleteAd = (data: any) => {
    setIsLoading(true);
    deleteData(`${endPoints.api.ADSCAR}/${data._id}`)
      .then((response: any) => {
        if (response && response.data && response.data.status === "success") {
          toast.show({
            title: response.data.message,
            status: "success",
          });
          getAllCars();
        } else {
          toast.show({
            title: response.data.message,
            status: "error",
          });
        }

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const publishAd = (data: any) => {
    setIsLoading(true);
    updateData(`${endPoints.api.ADSCAR}${endPoints.api.PUBLISH}/${data._id}`)
      .then((response: any) => {
        if (response && response.data && response.data.status === "success") {
          toast.show({
            title: response.data.message,
            status: "success",
          });
          getAllCars();
        } else {
          toast.show({
            title: response.data.message,
            status: "error",
          });
        }

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const footer = () => {
    if (!loadBtn) return null;
    return (
      <View style={{ marginBottom: 50 }}>
        <TouchableOpacity
          style={{
            padding: 10,
            width: "40%",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 5,
            backgroundColor: COLOR.tabInctive,
            marginVertical: 20,
          }}
          onPress={() => {
            handleLoadMore();
          }}
        >
          <Text style={{ color: "white", fontFamily: "Roboto-Medium" }}>
            Show More
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleRefresh = () => {
    setPage(1);
    setRefreshing(true);
    getAllCars();
  };
  const _renderitem = ({ item }: any) => (
    <CarCard
      item={item}
      favs={favs}
      shortlistCars={shortlistCars}
      toggleShortListCar={toggleShortListCar}
      navigation={navigation}
      toggleActive={toggleActive}
      deleteAd={deleteAd}
      toggleSold={toggleSold}
      publishAd={publishAd}
    />
  );

  const _renderitemGrid = ({ item }: any) => (
    <CarGridCard
      item={item}
      favs={favs}
      shortlistCars={shortlistCars}
      toggleShortListCar={toggleShortListCar}
      navigation={navigation}
      toggleActive={toggleActive}
      deleteAd={deleteAd}
      toggleSold={toggleSold}
      publishAd={publishAd}
    />
  );

  return (
    <View style={[styles.container]}>
      <View>
        <Appbar.Header style={{ backgroundColor: COLOR.White }}>
          {searchIcon && (
            <View style={styles.headerContainer}>
              <View style={styles.input1}>
                <Ionicons
                  name="close"
                  size={24}
                  color="black"
                  style={styles.spaceMargin}
                  onPress={() => {
                    setSearchQuery("");
                    setSearchIcon(false);
                    getAllCars()
                  }}
                />

                <TextInput
                  style={{ flex: 1 }}
                  placeholder="Enter Your Name Here"
                  underlineColorAndroid="transparent"
                  value={searchQuery}
                  onChangeText={(val) => {
                    setSearchQuery(val);
                  }}
                />
                <Ionicons
                  name="search"
                  size={24}
                  color="black"
                  style={styles.spaceMargin}
                  onPress={() => {
                    serachHandle();
                  }}
                />
              </View>
            </View>
          )}
          {!searchIcon && (
            <>
              <Icon
                name="menu"
                style={styles.modalRow}
                size={30}
                color={COLOR.headerColor}
                onPress={() => {
                  navigation.openDrawer({
                    side: "right",
                    animated: true,
                    to: "closed",
                  });
                }}
              />
              <View style={styles.subHeader}>
                <TouchableOpacity style={styles.subHeader}>
                  <EvilIcons
                    name="location"
                    size={20}
                    color={COLOR.headerColor}
                    style={{ marginTop: 2 }}
                  />
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{ color: COLOR.headerColor, fontSize: 14 }}>
                      Islamabad
                    </Text>
                    <Text style={{ color: COLOR.tabActive, fontSize: 9 }}>
                      Change location
                    </Text>
                  </View>

                  <AntDesign name="down" size={18} color={COLOR.headerColor} />
                </TouchableOpacity>
                {!searchIcon && (
                  <Feather
                    name="search"
                    size={24}
                    color={COLOR.headerColor}
                    style={{ marginHorizontal: 15 }}
                    onPress={() => {
                      setSearchIcon(true);
                    }}
                  />
                )}
              </View>
            </>
          )}
        </Appbar.Header>
      </View>

      <View style={styles.filterRow}>
        <TouchableHighlight
          underlayColor={COLOR.White}
          onPress={() => setModalVisible(true)}
          style={[styles.sortBtn]}
        >
          <View style={styles.row}>
            <MaterialIcons name="sort" size={18} color={COLOR.headerColor} />
            <Text style={styles.filterText}>Sort</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={COLOR.White}
          onPress={() => setFilterVisible(true)}
          style={styles.filterBtn}
        >
          <View style={styles.row}>
            <Ionicons name="filter-sharp" size={18} color={COLOR.headerColor} />
            <Text style={styles.filterText}>Filter</Text>
          </View>
        </TouchableHighlight>
      </View>
      <Loader loading={isLoading} />
      <View style={[styles.rowSpace]}>
        <View>
          <Text style={styles.carText}>Your Next Dream Car</Text>

          <Text style={styles.resultText}>
            {responseData !== null ? responseData?.totalCount : 0} results in
            islamabad
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={grid ? styles.gridActive : styles.gridInactive}
            onPress={() => {
              setGrid(true);
              setRow(false);
            }}
          >
            <FontAwesome
              name="th-list"
              size={24}
              color={grid ? COLOR.tabActive : COLOR.secondary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={row ? styles.gridActive : styles.gridInactive}
            onPress={() => {
              setGrid(false);
              setRow(true);
            }}
          >
            <Ionicons
              name="grid"
              size={24}
              color={row ? COLOR.tabActive : COLOR.secondary}
            />
          </TouchableOpacity>
        </View>
      </View>
      {responseData !== null && (
        <View style={{ flex: 1 }}>
          {grid && result && (
            <FlatList
              extraData={result}
              data={result}
              renderItem={_renderitem}
              // keyExtractor={(item, index) => String(index)}
              keyExtractor={(item, index) => `${item}{+}${index}`}
              //  onEndReached={handleLoadMore}
              ListFooterComponent={footer}
              onEndReachedThreshold={50}
              onRefresh={handleRefresh}
              refreshing={refreshing}
            />
          )}
          {row && result && (
            <FlatList
              extraData={result}
              data={result}
              numColumns={2}
              renderItem={_renderitemGrid}
              // keyExtractor={(contact, index) => String(index)}
              keyExtractor={(item, index) => `${item}{+}${index}`}
              ListFooterComponent={footer}
              onEndReachedThreshold={50}
              onRefresh={handleRefresh}
              refreshing={refreshing}
            />
          )}
          {/* {shortlistCars.length >= 1 && (
            <>
              <TouchableOpacity
                onPress={() => resetCampare()}
                style={[styles.fab, { bottom: 120 }]}
              >
                <MaterialIcons
                  name="clear"
                  size={20}
                  color={COLOR.White}
                  style={{ marginHorizontal: 5 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Compare")}
                style={styles.fab}
              >
                <MaterialIcons
                  name="compare"
                  size={20}
                  color={COLOR.White}
                  style={{ marginHorizontal: 5 }}
                />
              </TouchableOpacity>
            </>
          )} */}
        </View>
      )}
      {responseData === null && (
        <Text style={styles.resultNotFound}>
          Sorry! No results found against your search criteria.
        </Text>
      )}

      {/* sort modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.modalRow}>
              <Text style={styles.sortText}>Sort By</Text>
            </View>
            <View style={styles.horizontalLine} />
            {sorting.map((option: any) => (
              <TouchableOpacity
                style={styles.sortContainer}
                onPress={() => handleInputChange(option)}
              >
                <Text style={styles.sortLabel}>{option.label}</Text>
                <Ionicons
                  name={
                    option.isActive
                      ? "ios-radio-button-on-outline"
                      : "ios-radio-button-off-sharp"
                  }
                  size={18}
                  color={option.isActive ? COLOR.tabActive : COLOR.headerColor}
                  onPress={() => handleInputChange(option)}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      {/* sort modal */}
      {/* filter  modal */}
      {filterVisible && (
        <FilterModal
          setFilterVisible={() => {
            setFilterVisible(!filterVisible);
          }}
          filterVisible={filterVisible}
          // filterProps={filtersProps}
          bodyTypes={bodyTypes}
          bodyColors={bodyColors}
          citiesWithCars={citiesWithCars}
          makes={makes}
          models={models}
          handleCheckboxChange={handleCheckboxChange}
          filterApply={filterApply}
          resetForm={resetForm}
          transmissions={transmissions}
          engineType={engineType}
          assembly={assembly}
          sellarType={sellarType}
          rangeValues={rangeValues}
          setRangeValues={setRangeValues}
          handleTextBoxSubmit={handleTextBoxSubmit}
          cities={cities}
          province={province}
        />
      )}
      {/* filter modal */}
    </View>
  );
};

export default CarListing;
