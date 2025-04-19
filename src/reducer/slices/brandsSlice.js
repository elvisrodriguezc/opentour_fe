import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchBrands = createAsyncThunk(
    'brands/fetchBrands',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/v1/brands",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postBrands = createAsyncThunk(
    'brands/postBrands',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/brands",
            method: "POST",
            params: [],
            data: formData,
            multipart: true
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const brandsAdapter = createEntityAdapter({
    selectId: (brands) => brands.id
});

const brandsSlice = createSlice({
    name: 'brands',
    initialState: brandsAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBrands.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchBrands.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchBrands.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            brandsAdapter.setAll(state, payload)
        })
        builder.addCase(postBrands.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(postBrands.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(postBrands.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            brandsAdapter.addOne(state, payload)
        })
    },
});

export const brandsSelectors = brandsAdapter.getSelectors(
    (state) => state.brands
);

export default brandsSlice.reducer;
