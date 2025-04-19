import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchAdvancements = createAsyncThunk(
    'advancements/fetchAdvancements',
    // eslint-disable-next-line no-unused-vars
    async (dateRange, { dispatch }) => {
        const data = {
            type: "/v1/advancements",
            method: "GET",
            params: {
                dateRange: dateRange
            },
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postAdvancement = createAsyncThunk(
    'advancements/postAdvancement',
    // eslint-disable-next-line no-unused-vars
    async (datos, { dispatch }) => {
        console.log('Grabando')
        const data = {
            type: "/v1/advancements",
            method: "POST",
            params: {},
            data: datos,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const advancementsAdapter = createEntityAdapter({
    selectId: (advancement) => advancement.id
});

const advancementsSlice = createSlice({
    name: 'advancements',
    initialState: advancementsAdapter.getInitialState({ loading: 'inactivo' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAdvancements.pending, (state) => {
            state.loading = 'pendiente'
        })
        builder.addCase(fetchAdvancements.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchAdvancements.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            advancementsAdapter.setAll(state, payload)
        })
        builder.addCase(postAdvancement.pending, (state) => {
            state.loading = 'pendiente'
        })
        builder.addCase(postAdvancement.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(postAdvancement.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            advancementsAdapter.addOne(state, payload)
        })
    },
});

export const advancementsSelectors = advancementsAdapter.getSelectors(
    (state) => state.advancements
);

export default advancementsSlice.reducer;
