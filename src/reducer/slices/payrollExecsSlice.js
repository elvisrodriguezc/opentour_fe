import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchPayrollExecs = createAsyncThunk(
    'payrolls/fetchPayrollExecs',
    // eslint-disable-next-line no-unused-vars
    async (payroll, { dispatch }) => {
        const data = {
            type: "/v1/payrollusers",
            method: "GET",
            params: {
                payroll: payroll,
            },
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const fetchPayroll = createAsyncThunk(
    'payrolls/fetchPayroll',
    // eslint-disable-next-line no-unused-vars
    async (payroll, { dispatch }) => {
        const data = {
            type: "/v1/payrolls",
            method: "GET",
            params: {
                payroll: payroll
            },
            id: payroll
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const payrollExecsAdapter = createEntityAdapter({
    selectId: (payrollExecs) => payrollExecs.id
});

const payrollExecsSlice = createSlice({
    name: 'payrollExecs',
    initialState: payrollExecsAdapter.getInitialState({
        loading: 'idle',
        payroll: {}
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPayrollExecs.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchPayrollExecs.rejected, (state) => {
            state.loading = 'idle'
        })
        builder.addCase(fetchPayrollExecs.fulfilled, (state, { payload }) => {
            state.loading = 'idle';
            payrollExecsAdapter.setAll(state, payload)
        })
        builder.addCase(fetchPayroll.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchPayroll.rejected, (state) => {
            state.loading = 'idle'
        })
        builder.addCase(fetchPayroll.fulfilled, (state, { payload }) => {
            state.loading = 'idle';
            state.payroll = payload
        })
    },
});

export const payrollExecsSelectors = payrollExecsAdapter.getSelectors(
    (state) => state.payrollExecs
);

export default payrollExecsSlice.reducer;
