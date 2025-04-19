import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchWarehouses = createAsyncThunk(
    'warehouse/fetchWarehouses',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/warehouses",
            method: "GET",
            params: formData,
            data: formData,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const warehouseAdapter = createEntityAdapter({
    selectId: (warehouse) => warehouse.id
});

const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState: warehouseAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWarehouses.pending, (state) => {
            state.loading = 'procesando'
        })
        builder.addCase(fetchWarehouses.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchWarehouses.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            warehouseAdapter.setAll(state, payload)
        })
    },
});

export const warehouseSelector = warehouseAdapter.getSelectors(
    (state) => state.warehouses
);

export default warehouseSlice.reducer;