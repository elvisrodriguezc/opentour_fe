import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchWorkShift = createAsyncThunk(
    'workshifts/fetchWorkShift',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/workshifts",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postWorkShift = createAsyncThunk(
    'workshifts/postWorkShift',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/workshifts",
            method: "POST",
            params: {},
            data: formData,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const workshiftsAdapter = createEntityAdapter({
    selectId: (workshifts) => workshifts.id
});

const workshiftsSlice = createSlice({
    name: 'workshifts',
    initialState: workshiftsAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWorkShift.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchWorkShift.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(fetchWorkShift.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            workshiftsAdapter.setAll(state, payload)
        })

        builder.addCase(postWorkShift.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(postWorkShift.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(postWorkShift.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.loading = 'completed';
            workshiftsAdapter.addOne(state, payload)
        })
    },
});

export const workshiftsSelector = workshiftsAdapter.getSelectors(
    (state) => state.workshifts
);

export default workshiftsSlice.reducer;
