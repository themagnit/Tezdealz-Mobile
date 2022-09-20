import { useDispatch, useSelector } from "react-redux";
//import { ICarCard } from "../interfaces/products.interface";

import { useState } from "react";
import { setShortlistCars } from "../Reducers/shortlistCarsSlice";

const useShortListCars = () => {
  const { shortlistCars } = useSelector((state: any) => state.shortlistCars);
  const dispatch = useDispatch();
  const [shortListResponse, setShortListResponse] = useState({
    status: "",
    message: "",
  });

  function ItemExists(itemId: string) {
    let newshortListCars = shortlistCars;
    return newshortListCars.some(function (item: any) {
      return item._id === itemId;
    });
  }

  const shortListItem = (newItem: any) => {
    let response = { status: "", message: "" };
    if (shortlistCars.length < 5) {
      if (!ItemExists(newItem._id)) {
        dispatch(setShortlistCars([...shortlistCars, newItem]));
        response = { status: "success", message: "Car added" };
      } else {
        response = {
          status: "error",
          message: "Car already selected",
        };
      }
    } else {
      response = {
        status: "error",
        message: "Can't select more than 5 cars",
      };
    }
    return response;
  };

  const removeShortListItem = (itemId: string) => {
    let response = { status: "", message: "" };
    let newState = shortlistCars.filter((item: any) => {
      return item._id !== itemId;
    });
    dispatch(setShortlistCars(newState));
    response = {
      status: "success",
      message: "Car removed",
    };
    return response;
  };

  const clearShortListedCars = () => {
    let temp: any[] = [];
    dispatch(setShortlistCars(temp));
    let response = { status: "", message: "" };
    response = {
      status: "success",
      message: "Removed all short listed cars",
    };
    return response;
  };

  return {
    clearShortListedCars,
    removeShortListItem,
    shortListItem,
    shortListResponse,
  };
};

export default useShortListCars;
