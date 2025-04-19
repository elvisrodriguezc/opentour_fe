import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchOrderservices = createAsyncThunk(
    'orderservices/fetchOrderservices',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/v1/orderservices",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postOrderservices = createAsyncThunk(
    'orderservices/postOrderservices',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/orderservices",
            method: "POST",
            params: [],
            data: formData,
            multipart: true,
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const editOrderservices = createAsyncThunk(
    'orderservices/editOrderservices',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/orderserviceitems",
            method: "PUT",
            params: [],
            data: formData,
            multipart: false,
            id: formData.id,
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const orderservicesAdapter = createEntityAdapter({
    selectId: (orderservices) => orderservices.id
});

const orderserviceservicesSlice = createSlice({
    name: 'orderservices',
    initialState: orderservicesAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOrderservices.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchOrderservices.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchOrderservices.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            orderservicesAdapter.setAll(state, payload)
        })
        builder.addCase(postOrderservices.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(postOrderservices.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(postOrderservices.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            orderservicesAdapter.addOne(state, payload)
        })
        builder.addCase(editOrderservices.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(editOrderservices.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(editOrderservices.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            orderservicesAdapter.updateOne(state, payload)
        })
    },
});

export const orderservicesSelector = orderservicesAdapter.getSelectors(
    (state) => state.orderservices
);

export default orderserviceservicesSlice.reducer;
