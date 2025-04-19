import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchServices = createAsyncThunk(
    'services/fetchServices',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/v1/services",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const updateService = createAsyncThunk(
    'services/updateServices',
    // eslint-disable-next-line no-unused-vars
    async (datos, { dispatch }) => {
        const data = {
            type: "/v1/servicios",
            method: "PUT",
            params: {},
            data: datos,
            id: datos.id
        };
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) =>
                console.log(error)
            )
    });

export const selectService = createAsyncThunk(
    'services/selectService',
    // eslint-disable-next-line no-unused-vars
    async (service, { dispatch }) => {
        return service
    }
)

export const servicesAdapter = createEntityAdapter({
    selectId: (services) => services.id
});

const servicesSlice = createSlice({
    name: 'services',
    initialState: servicesAdapter.getInitialState({
        loading: 'empty',
        serviceSelected: null,
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchServices.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchServices.rejected, (state) => {
            state.loading = 'idle'
        })
        builder.addCase(fetchServices.fulfilled, (state, { payload }) => {
            state.loading = 'idle';
            servicesAdapter.setAll(state, payload)
        })
        builder.addCase(selectService.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(selectService.rejected, (state) => {
            state.loading = 'idle'
        })
        builder.addCase(selectService.fulfilled, (state, { payload }) => {
            state.loading = 'idle';
            state.serviceSelected = payload
        })
        builder.addCase(updateService.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(updateService.rejected, (state) => {
            state.loading = 'idle'
        })
        builder.addCase(updateService.fulfilled, (state, { payload }) => {
            state.loading = 'idle';
            state.entities[payload.id] = payload
        })
    },
});

export const servicesSelectors = servicesAdapter.getSelectors(
    (state) => state.services
);

export default servicesSlice.reducer;
