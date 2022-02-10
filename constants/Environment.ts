export const endPoints = {
  apiBaseUrl: "http://api.tezdealz.com/",
  //  apiBaseUrl:"https://beta-api.carokta.com/",

  api: {
    LOGIN_ENDPOINT: "v1/Users/login",
    SIGNUP_ENDPOINT: "v1/Users/signup",
    CAR_MAKES: "v1/ads/cars/makes/",
    CAR_MODELS: "/v1/ads/cars/models",
    MAKE_MODELS: "/v1/ads/cars/models/?make_id=",
    MODEL_VERSION: "/v1/ads/cars/versions?model_id=",
    BODY_TYPES: "v1/ads/cars/body-types/",
    ADSCAR: "/v1/ads/cars",
    CAR_FEATURES: "/features",
    ADD_TO_FAVS: "/add-to-fav",
    REMOVE_FAVS: "/remove-from-fav",
    ACTIVE: "/mark-active",
    INACTIVE: "/mark-inactive",
    MARK_UNSOLD: "/mark-unsold",
    MARK_SOLD: "/mark-sold",
    PUBLISH: "/publish-ad",
    GET_FAV: "/favourites",
    MY_CARS: "/myCars",
    UPDATE_PROFILE: "/v1/Users/updateMe",
    UPDATE_PASSWORD: "/v1/Users/updateMyPassword",
    CURRENT_USER: "/v1/Users/currentUser",
    CAR_COLORS: "v1/ads/cars/colors",
    ADS: "/ads",
    CARS: "/cars",
    FILTER: "/filter",
    CITIES_WITH_CARS: "v1/ads/cars/filter/cities-with-cars",
    CITIES: "/v1/ads/cars/cities",
    STATES: "/v1/ads/cars/states",
    PROVINCE: "/v1/ads/cars/states/country-code/",
    NEED_ASSISTANCE: "/v1/tickets/advAssistance",
    IMAGE_UPLOAD: "/v1/ads/cars/car-images",
  },
  mode: "Development",
};

export default {};

// export const getFavs = "ads/cars/favourites?limit=4&page=";
// export const addToFavs = "ads/cars/add-to-fav";
// export const removeFavs = "ads/cars/remove-from-fav";
