import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchCurrencies = createAsyncThunk(
    'currencies/fetchCurrencies',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/v1/currencies",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const currenciesAdapter = createEntityAdapter({
    selectId: (currencies) => currencies.id
});

const currenciesSlice = createSlice({
    name: 'currencies',
    initialState: currenciesAdapter.getInitialState({ loading: 'idle' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCurrencies.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchCurrencies.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchCurrencies.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            currenciesAdapter.setAll(state, payload)
        })
    },
});

export const currenciesSelector = currenciesAdapter.getSelectors(
    (state) => state.currencies
);

export default currenciesSlice.reducer;
