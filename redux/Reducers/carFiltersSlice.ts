import { createSlice } from '@reduxjs/toolkit';

export interface IInitialState {
  filters: any;

}

const initialState: IInitialState = {
  filters: {
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
    sort: '',
    condition: '',
    keyword: '',
    price: [0, 50000000],
    modelYear: [1971, 2021],
    milage: [0, 500000],
    engineCapacity: [0, 10000]
    
  }
};

const carFiltersSlice = createSlice({
  name: 'carFilters',
  initialState,
  reducers: {
    setFilter: (state, actions) => {
      state.filters[actions.payload.name] = actions.payload.value;
    },
    setArrayFilter: (state, actions) => {
      state.filters[actions.payload.name] = [
        ...state.filters[actions.payload.name],
        actions.payload.value
      ];
    },
    setFilters: (state, actions) => {
      Object.entries(actions.payload).map(([keys, values]: any) => {
        state.filters[keys] = values;
      });
    },
    removeArrayFilter: (state, actions) => {
      state.filters[actions.payload.name] = state.filters[
        actions.payload.name
      ].filter((item: string) => item !== actions.payload.value);
    },
    removeFilter: (state, actions) => {
      state.filters[actions.payload.name] = actions.payload.value;
    },
    resetFilters: (state) => {
      state.filters = {
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
        sort: '',
        condition: '',
        keyword: '',
        price: [0, 50000000],
        modelYear: [1971, 2021],
        milage: [0, 500000],
        engineCapacity: [0, 10000]
 
      };
    }
  }
});

export const {
  setFilter,
  setArrayFilter,
  setFilters,
  removeFilter,
  removeArrayFilter,
  resetFilters
} = carFiltersSlice.actions;

export default carFiltersSlice.reducer;
