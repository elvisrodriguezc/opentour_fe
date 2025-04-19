import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/v1/orders",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postOrders = createAsyncThunk(
    'orders/postOrders',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/orders",
            method: "POST",
            params: [],
            data: formData,
            multipart: true
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const ordersAdapter = createEntityAdapter({
    selectId: (orders) => orders.id
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState: ordersAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchOrders.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            ordersAdapter.setAll(state, payload)
        })
        builder.addCase(postOrders.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(postOrders.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(postOrders.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            ordersAdapter.addOne(state, payload)
        })
    },
});

export const ordersSelector = ordersAdapter.getSelectors(
    (state) => state.orders
);

export default ordersSlice.reducer;
