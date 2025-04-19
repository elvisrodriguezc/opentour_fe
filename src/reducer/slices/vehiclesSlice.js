import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchVehicles = createAsyncThunk(
    'vehicles/fetchVehicles',
    // eslint-disable-next-line no-unused-vars
    async (set, { dispatch }) => {
        const data = {
            type: "/v1/vehicles",
            method: "GET",
            params: set,
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const postVehicles = createAsyncThunk(
    'vehicles/postVehicles',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/vehicles",
            method: "POST",
            params: {},
            data: formData,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const vehiclesAdapter = createEntityAdapter({
    selectId: (vehicles) => vehicles.id
});

const vehiclesSlice = createSlice({
    name: 'vehicles',
    initialState: vehiclesAdapter.getInitialState({ loading: 'inactivo' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchVehicles.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchVehicles.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchVehicles.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            vehiclesAdapter.setAll(state, payload)
        })
        builder.addCase(postVehicles.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(postVehicles.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(postVehicles.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.loading = 'inactivo';
            vehiclesAdapter.addOne(state, payload)
        })
    },
});

export const vehiclesSelector = vehiclesAdapter.getSelectors(
    (state) => state.vehicles
);

export default vehiclesSlice.reducer;
