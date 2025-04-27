import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchProgServices = createAsyncThunk(
    'progservices/fetchProgServices',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/progservices",
            method: "GET",
            params: {
                startdate: formData.startdate,
                finishdate: formData.finishdate,
            },
            data: {
                startdate: formData.startdate,
                finishdate: formData.finishdate,
            },
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const fetchOneProgService = createAsyncThunk(
    'progservices/fetchOneProgService',
    // eslint-disable-next-line no-unused-vars
    async (id, { dispatch }) => {
        const data = {
            type: `/progservices/${id}`,
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const newProgService = createAsyncThunk(
    'progservices/newProgService',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/progservices",
            method: "POST",
            params: {},
            data: formData,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });




export const progservicesAdapter = createEntityAdapter({
    selectId: (progservices) => progservices.id
});

const progservicesSlice = createSlice({
    name: 'progservices',
    initialState: progservicesAdapter.getInitialState({
        loading: 'empty',
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProgServices.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchProgServices.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(fetchProgServices.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            progservicesAdapter.setAll(state, payload)
        })

        builder.addCase(fetchOneProgService.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchOneProgService.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(fetchOneProgService.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            progservicesAdapter.setOne(state, payload)
        })

        builder.addCase(newProgService.pending, (state) => {
            state.loading = 'saving'
        })
        builder.addCase(newProgService.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(newProgService.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            progservicesAdapter.addOne(state, payload)
        })
    }
});

export const progservicesSelectors = progservicesAdapter.getSelectors(
    (state) => state.progservices
);

export default progservicesSlice.reducer;
