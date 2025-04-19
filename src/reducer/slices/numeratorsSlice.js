import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchNumerator = createAsyncThunk(
    'numerator/fetchNumerator',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/v1/numerators",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const numeratorAdapter = createEntityAdapter({
    selectId: (numerator) => numerator.id
});

const numeratorSlice = createSlice({
    name: 'numerator',
    initialState: numeratorAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNumerator.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchNumerator.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchNumerator.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            numeratorAdapter.setAll(state, payload)
        })
    },
});

export const numeratorSelector = numeratorAdapter.getSelectors(
    (state) => state.numerator
);

export default numeratorSlice.reducer;
