import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SinglePizza } from "../utils/interfaces";

type orderState = {
  orderList: SinglePizza[][];
  totalPrice: number;
  totalPizzas: number;
};

const initialState: orderState = {
  orderList: [],
  totalPrice: 0,
  totalPizzas: 0,
};

const isStateEqualsAction = (
  pizzaArray: SinglePizza[],
  action: SinglePizza
) => {
  if (
    pizzaArray[0].name === action.name &&
    pizzaArray[0].sizes[0] === action.sizes[0] &&
    pizzaArray[0].types[0] === action.types[0]
  ) {
    return true;
  }
  return false;
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addPizzaToOrder(state, action: PayloadAction<SinglePizza>) {
      const tempPrice = state.totalPrice;
      state.orderList.map((item) => {
        if (isStateEqualsAction(item, action.payload)) {
          item.push(action.payload);
          state.totalPrice += action.payload.price;
          state.totalPizzas += 1;
        }
      });
      if (tempPrice === state.totalPrice) {
        state.orderList.push([action.payload, action.payload]);
        state.totalPrice += action.payload.price;
        state.totalPizzas += 1;
      }
    },
    clearOrder(state) {
      state.orderList = [];
      state.totalPizzas = 0;
      state.totalPrice = 0;
    },
    removeExactTypeOfPizzaFromOrder(state, action: PayloadAction<SinglePizza>) {
      state.orderList.map((item) => {
        if (isStateEqualsAction(item, action.payload)) {
          if (item.length > 1) {
            item.pop();
            state.totalPrice -= action.payload.price;
            state.totalPizzas -= 1;
          }
        }
      });
    },
    removePizzaFromOrder(state, action: PayloadAction<SinglePizza>) {
      state.orderList.map((item, i) => {
        if (isStateEqualsAction(item, action.payload)) {
          state.totalPrice -= action.payload.price * (item.length - 1);
          state.totalPizzas -= item.length - 1;
          state.orderList.splice(i, 1);
        }
      });
    },
  },
});

export const {
  addPizzaToOrder,
  clearOrder,
  removeExactTypeOfPizzaFromOrder,
  removePizzaFromOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
