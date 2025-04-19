import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchOrderitems = createAsyncThunk(
    'orderitems/fetchOrderitems',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/v1/orderitems",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postOrderitems = createAsyncThunk(
    'orderitems/postOrderitems',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/orderitems",
            method: "POST",
            params: [],
            data: formData,
            multipart: true
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const orderitemsAdapter = createEntityAdapter({
    selectId: (orderitems) => orderitems.id
});

const orderitemsSlice = createSlice({
    name: 'orderitems',
    initialState: orderitemsAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOrderitems.pending, (state) => {
            state.loading = 'procesando'
        })
        builder.addCase(fetchOrderitems.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchOrderitems.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            orderitemsAdapter.setAll(state, payload)
        })
        builder.addCase(postOrderitems.pending, (state) => {
            state.loading = 'procesando'
        })
        builder.addCase(postOrderitems.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(postOrderitems.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            orderitemsAdapter.addOne(state, payload)
        })
    },
});

export const orderitemsSelector = orderitemsAdapter.getSelectors(
    (state) => state.orderitems
);

export default orderitemsSlice.reducer;
