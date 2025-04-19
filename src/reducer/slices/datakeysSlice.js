import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchDatakeys = createAsyncThunk(
    'datakeys/fetchDatakeys',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/v1/datakeys",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch(error => {
                console.log(error)
            })
    });

export const postDatakey = createAsyncThunk(
    'datakeys/postDatakey',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/datakeys",
            method: "POST",
            params: [],
            data: formData,
            multipart: true
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const editDatakey = createAsyncThunk(
    'datakeys/editDatakey',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/datakeys",
            method: "PUT",
            params: [],
            data: formData,
            multipart: true,
            id: formData.id
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const datakeysAdapter = createEntityAdapter({
    selectId: (datakeys) => datakeys.id
});

const datakeysSlice = createSlice({
    name: 'datakeys',
    initialState: datakeysAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDatakeys.pending, (state) => {
            state.loading = 'procesando'
        })
        builder.addCase(fetchDatakeys.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchDatakeys.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            datakeysAdapter.setAll(state, payload)
        })
        builder.addCase(postDatakey.pending, (state) => {
            state.loading = 'procesando'
        })
        builder.addCase(postDatakey.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(postDatakey.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            datakeysAdapter.addOne(state, payload)
        })
        builder.addCase(editDatakey.pending, (state) => {
            state.loading = 'procesando'
        })
        builder.addCase(editDatakey.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(editDatakey.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            datakeysAdapter.updateOne(state, payload)
        })
    },
});

export const datakeysSelector = datakeysAdapter.getSelectors(
    (state) => state.datakeys
);

export default datakeysSlice.reducer;
