import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/v1/products",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const postProducts = createAsyncThunk(
    'products/postProducts',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/products",
            method: "POST",
            params: [],
            data: formData,
            multipart: true
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const updateProducts = createAsyncThunk(
    'products/updateProducts',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/products",
            method: "PUT",
            params: {},
            data: formData,
            multipart: false,
            id: formData.id
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const productsAdapter = createEntityAdapter({
    selectId: (products) => products.id
});

const productsSlice = createSlice({
    name: 'products',
    initialState: productsAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(fetchProducts.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            productsAdapter.setAll(state, payload)
        })

        builder.addCase(postProducts.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(postProducts.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(postProducts.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            productsAdapter.addOne(state, payload)
        })
        builder.addCase(updateProducts.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(updateProducts.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(updateProducts.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            productsAdapter.setOne(state, payload)
        })
    },
});

export const productsSelector = productsAdapter.getSelectors(
    (state) => state.products
);

export default productsSlice.reducer;
