import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchOffices = createAsyncThunk(
    'offices/fetchOffices',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/v1/offices",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postOffices = createAsyncThunk(
    'offices/postOffices',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/offices",
            method: "POST",
            params: [],
            data: formData,
            multipart: true
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const officesAdapter = createEntityAdapter({
    selectId: (offices) => offices.id
});

const officesSlice = createSlice({
    name: 'offices',
    initialState: officesAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOffices.pending, (state) => {
            state.loading = 'procesando'
        })
        builder.addCase(fetchOffices.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchOffices.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            officesAdapter.setAll(state, payload)
        })
        builder.addCase(postOffices.pending, (state) => {
            state.loading = 'procesando'
        })
        builder.addCase(postOffices.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(postOffices.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            officesAdapter.addOne(state, payload)
        })
    },
});

export const officesSelector = officesAdapter.getSelectors(
    (state) => state.offices
);

export default officesSlice.reducer;
