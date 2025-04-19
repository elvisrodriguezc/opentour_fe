import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchEntities = createAsyncThunk(
    'entities/fetchEntities',
    async (_, { dispatch }) => {
        const data = {
            type: "/entities",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const insertEntities = createAsyncThunk(
    'entities/insertEntities',
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/entities",
            method: "POST",
            params: {},
            data: formData,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const entitiesAdapter = createEntityAdapter({
    selectId: (entity) => entity.id
});

const entitiesSlice = createSlice({
    name: 'entities',
    initialState: entitiesAdapter.getInitialState({ loading: 'empty' }),
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEntities.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchEntities.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchEntities.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            entitiesAdapter.setAll(state, payload)
        })
        builder.addCase(insertEntities.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(insertEntities.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(insertEntities.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            entitiesAdapter.addOne(state, payload)
        })
    },
});

export const entitiesSelector = entitiesAdapter.getSelectors(
    (state) => state.entities
);

export default entitiesSlice.reducer;
