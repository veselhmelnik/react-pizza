import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterAndSorting } from "../utils/interfaces";

const initialState: FilterAndSorting = {
    filterValue: 0,
    sortingValue: 'rating'
}
const filtersSlice = createSlice ({
    name: 'filters',
    initialState,
    reducers: {
        toggleFilter(state, action: PayloadAction<number>) {
            state.filterValue = action.payload;
        },
        toggleSort(state, action: PayloadAction<string>) {
            state.sortingValue = action.payload;
        }
    }
});

export const {toggleFilter, toggleSort} = filtersSlice.actions;

export default filtersSlice.reducer;