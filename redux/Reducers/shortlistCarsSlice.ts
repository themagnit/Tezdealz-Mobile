import { createSlice } from '@reduxjs/toolkit';
//import { ICarCard } from '../../Utils/interfaces/products.interface';

export interface IInitialState {
  shortlistCars: any[] | [];
}

const initialState: IInitialState = {
  shortlistCars: []
};

const shortlistCarsSlice = createSlice({
  name: 'shortlistCars',
  initialState,
  reducers: {
    setShortlistCars: (state, action) => {
      state.shortlistCars = action.payload;
    },
    removeShortlistItem: (state, action) => {
      state.shortlistCars =  state.shortlistCars.filter((item: any) => {
        return item._id !== action.payload;
      });
    },
  }
});

export const { setShortlistCars, removeShortlistItem } = shortlistCarsSlice.actions;

export default shortlistCarsSlice.reducer;
