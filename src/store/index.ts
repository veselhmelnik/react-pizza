import {configureStore} from '@reduxjs/toolkit';
import pizzasReducer from './pizzasSlice';
import filtersReducer from './filtersSlice'
import orderReducer from './orderSlice';

const store = configureStore({
    reducer: {
        pizzas: pizzasReducer,
        filters: filtersReducer,
        order: orderReducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;