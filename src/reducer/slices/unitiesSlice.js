import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchUnities = createAsyncThunk(
    'unities/fetchUnities',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/v1/unities",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postUnities = createAsyncThunk(
    'unities/postUnities',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/unities",
            method: "POST",
            params: [],
            data: formData,
            multipart: true
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const unitiesAdapter = createEntityAdapter({
    selectId: (unities) => unities.id
});

const unitiesSlice = createSlice({
    name: 'unities',
    initialState: unitiesAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUnities.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchUnities.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchUnities.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            unitiesAdapter.setAll(state, payload)
        })
        builder.addCase(postUnities.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(postUnities.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(postUnities.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            unitiesAdapter.addOne(state, payload)
        })
    },
});

export const unitiesSelectors = unitiesAdapter.getSelectors(
    (state) => state.unities
);

export default unitiesSlice.reducer;
