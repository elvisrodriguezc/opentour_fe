import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchPurchases = createAsyncThunk(
    'purchases/fetchPurchases',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/v1/purchases",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postPurchases = createAsyncThunk(
    'purchases/postPurchases',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/purchases",
            method: "POST",
            params: [],
            data: formData,
            multipart: true
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const purchasesAdapter = createEntityAdapter({
    selectId: (purchases) => purchases.id
});

const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: purchasesAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPurchases.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchPurchases.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchPurchases.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            purchasesAdapter.setAll(state, payload)
        })
        builder.addCase(postPurchases.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(postPurchases.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(postPurchases.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            purchasesAdapter.addOne(state, payload)
        })
    },
});

export const purchasesSelector = purchasesAdapter.getSelectors(
    (state) => state.purchases
);

export default purchasesSlice.reducer;
