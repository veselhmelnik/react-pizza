import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FilterAndSorting, SinglePizza } from "../utils/interfaces";

const BASE_URL = "http://localhost:3000/pizzas";

type pizzasState = {
  pizzasList: SinglePizza[];
  loading: boolean;
  error: string | null;
};

export const fetchPizzas = createAsyncThunk<
  SinglePizza[],
  FilterAndSorting,
  { rejectValue: string }
>("pizzas/fetchPizzas", async function (values, { rejectWithValue }) {
  let response;
  if (values.filterValue === 0) {
    response = await fetch(
      `${BASE_URL}?_sort=${values.sortingValue}&_order=asc`
    );
  } else {
    response = await fetch(
      `${BASE_URL}?_sort=${values.sortingValue}&_order=asc&category=${values.filterValue}`
    );
  }

  if (!response.ok) {
    return rejectWithValue("Server Error");
  }
  const data = await response.json();
  return data;
});

const initialState: pizzasState = {
  pizzasList: [],
  loading: false,
  error: null,
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzasList = action.payload;
        state.loading = false;
      });
  },
});

export default pizzasSlice.reducer;
