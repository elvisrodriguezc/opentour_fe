import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchDistricts = createAsyncThunk(
    'districts/fetchDistricts',
    // eslint-disable-next-line no-unused-vars
    async (province, { dispatch }) => {
        const data = {
            type: "/districts",
            method: "GET",
            params: { province_id: province },
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const districtsAdapter = createEntityAdapter({
    selectId: (districts) => districts.id
});

const districtsSlice = createSlice({
    name: 'districts',
    initialState: districtsAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDistricts.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(fetchDistricts.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(fetchDistricts.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            districtsAdapter.setAll(state, payload)
        })

    },
});

export const districtsSelector = districtsAdapter.getSelectors(
    (state) => state.districts
);

export default districtsSlice.reducer;
