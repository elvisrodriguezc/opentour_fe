import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchTypes = createAsyncThunk(
    'types/fetchTypes',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/v1/types",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postTypes = createAsyncThunk(
    'types/postTypes',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/types",
            method: "POST",
            params: {},
            data: formData,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const fetchTypeById = createAsyncThunk(
    'types/fetchTypeById',
    // eslint-disable-next-line no-unused-vars
    async (id, { dispatch }) => {
        console.log('first')
        const data = {
            type: "/v1/typevalues",
            method: "GET",
            params: {
                type: id
            },
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const typesAdapter = createEntityAdapter({
    selectId: (types) => types.id
});

const typesSlice = createSlice({
    name: 'types',
    initialState: typesAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTypeById.pending, (state) => {
            state.loading = 'procesando'
        })
        builder.addCase(fetchTypeById.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchTypeById.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            typesAdapter.setAll(state, payload)
        })
        builder.addCase(fetchTypes.pending, (state) => {
            state.loading = 'procesando'
        })
        builder.addCase(fetchTypes.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchTypes.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            typesAdapter.setAll(state, payload)
        })
        builder.addCase(postTypes.pending, (state) => {
            state.loading = 'procesando'
        })
        builder.addCase(postTypes.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(postTypes.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            typesAdapter.addOne(state, payload)
        })
    },
});

export const typesSelector = typesAdapter.getSelectors(
    (state) => state.types
);

export default typesSlice.reducer;
