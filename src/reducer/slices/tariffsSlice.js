import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchTariffs = createAsyncThunk(
    'tariffs/fetchTariffs',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/v1/tariffs",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const postTariffs = createAsyncThunk(
    'tariffs/postTariffs',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/tariffs",
            method: "POST",
            params: {},
            data: formData,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const tariffsAdapter = createEntityAdapter({
    selectId: (tariffs) => tariffs.id
});

const tariffsSlice = createSlice({
    name: 'tariffs',
    initialState: tariffsAdapter.getInitialState({
        loading: 'vacio'
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTariffs.pending, (state) => {
            state.loading = 'procesando'
        })
        builder.addCase(fetchTariffs.rejected, (state) => {
            state.loading = 'fallido'
        })
        builder.addCase(fetchTariffs.fulfilled, (state, { payload }) => {
            state.loading = 'completado';
            tariffsAdapter.setAll(state, payload)
        })

        builder.addCase(postTariffs.pending, (state) => {
            state.loading = 'procesando'
        })
        builder.addCase(postTariffs.rejected, (state) => {
            state.loading = 'fallido'

        })
        builder.addCase(postTariffs.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.loading = 'completado';
            tariffsAdapter.addOne(state, payload)
        })
    },
});

export const tariffsSelector = tariffsAdapter.getSelectors(
    (state) => state.tariffs
);

export default tariffsSlice.reducer;
