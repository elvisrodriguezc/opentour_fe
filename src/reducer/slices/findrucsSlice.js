import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const findByRUC = createAsyncThunk(
    'findrucs/findByRUC',
    // eslint-disable-next-line no-unused-vars
    async (ruc, { dispatch }) => {
        const data = {
            type: "/v1/findruc",
            method: "GET",
            id: ruc,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });


export const findrucsAdapter = createEntityAdapter({
    selectId: (findrucs) => findrucs.id
});

const findrucsSlice = createSlice({
    name: 'findrucs',
    initialState: findrucsAdapter.getInitialState({
        loading: 'empty',
        foundRUC: null
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(findByRUC.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(findByRUC.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(findByRUC.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            state.found = payload;
        })
    },
});

export const findrucsSelector = findrucsAdapter.getSelectors(
    (state) => state.findrucs
);

export default findrucsSlice.reducer;
