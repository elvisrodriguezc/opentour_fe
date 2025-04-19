import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchCategories = createAsyncThunk(
    'services/fetchCategories',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/v1/categories",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postCategories = createAsyncThunk(
    'services/postCategories',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/categories",
            method: "POST",
            params: {},
            data: formData,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const categoriesAdapter = createEntityAdapter({
    selectId: (categories) => categories.id
});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: categoriesAdapter.getInitialState({ loading: 'vacio' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = 'procesando'
        })
        builder.addCase(fetchCategories.rejected, (state) => {
            state.loading = 'fallido'
        })
        builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
            state.loading = 'completo';
            categoriesAdapter.setAll(state, payload)
        })
        builder.addCase(postCategories.pending, (state) => {
            state.loading = 'procesando'
        })
        builder.addCase(postCategories.rejected, (state) => {
            state.loading = 'fallido'
        })
        builder.addCase(postCategories.fulfilled, (state, { payload }) => {
            state.loading = 'completo';
            categoriesAdapter.addOne(state, payload)
        })
    },
});

export const categoriesSelectors = categoriesAdapter.getSelectors(
    (state) => state.categories
);

export default categoriesSlice.reducer;
