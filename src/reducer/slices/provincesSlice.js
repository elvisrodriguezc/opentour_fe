import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchProvinces = createAsyncThunk(
    'provinces/fetchProvinces',
    // eslint-disable-next-line no-unused-vars
    async (department, { dispatch }) => {
        const data = {
            type: "/provinces",
            method: "GET",
            params: { department_id: department },
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const provincesAdapter = createEntityAdapter({
    selectId: (provinces) => provinces.id
});

const provincesSlice = createSlice({
    name: 'provinces',
    initialState: provincesAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProvinces.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(fetchProvinces.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(fetchProvinces.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            provincesAdapter.setAll(state, payload)
        })

    },
});

export const provincesSelector = provincesAdapter.getSelectors(
    (state) => state.provinces
);

export default provincesSlice.reducer;
