import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchVehicles = createAsyncThunk(
    'vehicles/fetchVehicles',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/vehicles",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const vehiclesAdapter = createEntityAdapter({
    selectId: (vehicles) => vehicles.id
});

const vehiclesSlice = createSlice({
    name: 'vehicles',
    initialState: vehiclesAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchVehicles.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchVehicles.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(fetchVehicles.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            vehiclesAdapter.setAll(state, payload)
        })
    },
});

export const vehiclesSelector = vehiclesAdapter.getSelectors(
    (state) => state.vehicles
);

export default vehiclesSlice.reducer;
