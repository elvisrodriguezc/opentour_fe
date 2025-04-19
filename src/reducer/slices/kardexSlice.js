import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchKardex = createAsyncThunk(
    'kardex/fetchKardex',
    // eslint-disable-next-line no-unused-vars
    async (set, { dispatch }) => {
        const data = {
            type: "/v1/warehousekardexs",
            method: "GET",
            params: set,
            data: set,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postKardex = createAsyncThunk(
    'kardex/postKardex',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/warehousekardexs",
            method: "POST",
            params: [],
            data: formData,
            multipart: true
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const updateKardex = createAsyncThunk(
    'kardex/updateKardex',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/warehousekardexs",
            method: "PUT",
            params: [],
            data: formData,
            multipart: true
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });
export const emptyKardex = createAsyncThunk(
    'kardex/emptyKardex',
    async (_, { dispatch }) => {
        console.log(dispatch)
        return 'empty'
    }
)

export const kardexAdapter = createEntityAdapter({
    selectId: (kardex) => kardex.id
});

const kardexSlice = createSlice({
    name: 'kardex',
    initialState: kardexAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchKardex.pending, (state) => {
            state.loading = 'procesando'
        })
        builder.addCase(fetchKardex.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchKardex.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            kardexAdapter.setAll(state, payload)
        })
        builder.addCase(postKardex.pending, (state) => {
            state.loading = 'procesando'
        })
        builder.addCase(postKardex.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(postKardex.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            kardexAdapter.addOne(state, payload)
        })
        builder.addCase(updateKardex.pending, (state) => {
            state.loading = 'procesando'
        })
        builder.addCase(updateKardex.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(updateKardex.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            kardexAdapter.updateOne(state, payload)
        })
        builder.addCase(emptyKardex.pending, (state) => {
            state.loading = 'procesando';
        })
        builder.addCase(emptyKardex.rejected, (state) => {
            state.loading = 'inactivo';
        })
        builder.addCase(emptyKardex.fulfilled, (state, { payload }) => {
            state.loading = payload;
        })
    },
});

export const kardexSelector = kardexAdapter.getSelectors(
    (state) => state.kardex
);

export default kardexSlice.reducer;
