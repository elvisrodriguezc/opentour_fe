import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchTypevalues = createAsyncThunk(
    'typevalues/fetchTypevalues',
    // eslint-disable-next-line no-unused-vars
    async (type, { dispatch }) => {
        const data = {
            type: "/typevalues",
            method: "GET",
            params: {
                type: type
            },
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const newTypevalues = createAsyncThunk(
    'typevalues/newTypevalues',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        console.log('Grabando')
        const data = {
            type: "/v1/typevalues",
            method: "POST",
            params: {},
            data: formData,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const editTypevalues = createAsyncThunk(
    'typevalues/editTypevalues',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        console.log('Editando')
        const data = {
            type: "/v1/typevalues",
            method: "PATCH",
            params: {},
            data: formData,
            id: formData.id
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const typevaluesAdapter = createEntityAdapter({
    selectId: (typevalue) => typevalue.id
});

const typevaluesSlice = createSlice({
    name: 'typevalues',
    initialState: typevaluesAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTypevalues.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchTypevalues.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(fetchTypevalues.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            typevaluesAdapter.setAll(state, payload)
        })

        builder.addCase(newTypevalues.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(newTypevalues.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(newTypevalues.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            typevaluesAdapter.addOne(state, payload)
        })

        builder.addCase(editTypevalues.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(editTypevalues.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(editTypevalues.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            typevaluesAdapter.updateOne(state, payload)
        })
    },
});

export const typevaluesSelector = typevaluesAdapter.getSelectors(
    (state) => state.typevalues
);

export default typevaluesSlice.reducer;
