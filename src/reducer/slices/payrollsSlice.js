import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchPayrolls = createAsyncThunk(
    'payrolls/fetchPayrolls',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/v1/payrolls",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postPayroll = createAsyncThunk(
    'payrolls/postPayroll',
    // eslint-disable-next-line no-unused-vars
    async (formValues, { dispatch }) => {
        const data = {
            type: "/v1/payrolls",
            method: "POST",
            params: {},
            data: {
                startdate: formValues.startdate,
                finishdate: formValues.finishdate,
                payrolltype: 1,
                users: formValues.users,
            },
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });


export const payrollsAdapter = createEntityAdapter({
    selectId: (payrolls) => payrolls.id
});

const payrollsSlice = createSlice({
    name: 'payrolls',
    initialState: payrollsAdapter.getInitialState({
        loading: 'idle',
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPayrolls.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchPayrolls.rejected, (state) => {
            state.loading = 'idle'
        })
        builder.addCase(fetchPayrolls.fulfilled, (state, { payload }) => {
            state.loading = 'idle';
            payrollsAdapter.setAll(state, payload)
        })
        builder.addCase(postPayroll.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(postPayroll.rejected, (state) => {
            state.loading = 'idle'
        })
        builder.addCase(postPayroll.fulfilled, (state, { payload }) => {
            state.loading = 'idle'
            payrollsAdapter.addOne(state, payload)
        })
    },
});

export const payrollsSelectors = payrollsAdapter.getSelectors(
    (state) => state.payrolls
);

export default payrollsSlice.reducer;
