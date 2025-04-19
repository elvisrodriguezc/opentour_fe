import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchInvoices = createAsyncThunk(
    'invoices/fetchInvoices',
    async (selectedDate, { dispatch }) => {
        const data = {
            type: "/invoices",
            method: "GET",
            params: {
                fecha: selectedDate
            },
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const updateSelectedRows = createAsyncThunk(
    'invoices/updateSelectedRows',
    async (datos, { dispatch }) => {
        console.log(datos.idList)
        console.log(datos.date)
        const data = {
            type: "/updateselectedrows",
            method: "PATCH",
            params: {
            },
            data: {
                invoice_ids: datos.idList,
                fecha: datos.date,
                estado: 1,
            },
        };
        return loadAPIData(data)
            .then((res) => res.data)
    });

export const sendResumenDiario = createAsyncThunk(
    'invoices/sendResumenDiario',
    async (datos, { dispatch }) => {
        console.log(datos.correlativo)
        console.log(datos.date)
        const data = {
            type: "/resumen",
            method: "GET",
            params: {
                fecha: datos.date,
            },
            data: {
            },
        };
        loadAPIData(data)
            .then((res) => {
                console.log(res)
                const data = {
                    type: "/resumendiario",
                    method: "POST",
                    params: {
                    },
                    data: res,
                };
                loadAPIData(data)
                    .then((res1) => {
                        console.log(res1)
                    })

            })
    });

export const addInvoice = createAsyncThunk(
    'invoices/addInvoice',
    async (newInvoice) => {
        const data = {
            type: "/invoices",
            method: "POST",
            params: {},
            data: newInvoice,
        };
        return loadAPIData(data)
            .then((res) => res.data)
    }
);

export const deleteInvoice = createAsyncThunk(
    'invoices/deleteInvoice',
    async (id) => {
        const data = {
            type: "/invoices",
            method: "DELETE",
            params: {},
            data: {},
            id: id
        }
        loadAPIData(data)
            .then((res) => res.data)
        return id
    }
);

export const invoicesAdapter = createEntityAdapter({
    selectId: (invoice) => invoice.id
});

const invoicesSlice = createSlice({
    name: 'invoices',
    initialState: invoicesAdapter.getInitialState({ loading: 'idle' }),
    reducers: {
        // addInvoices: invoicesAdapter.addMany,
        // deleteInvoices: invoicesAdapter.removeOne,
        // cleatInvoices: invoicesAdapter.removeAll,
        // updateInvoices: invoicesAdapter.updateOne,
    },
    extraReducers: (builder) => {
        builder.addCase(updateSelectedRows.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(updateSelectedRows.rejected, (state) => {
            state.loading = 'idle'
        })
        builder.addCase(updateSelectedRows.fulfilled, (state, { payload }) => {
            state.loading = 'idle';
            invoicesAdapter.setAll(state, payload)
        })
        builder.addCase(fetchInvoices.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchInvoices.rejected, (state) => {
            state.loading = 'idle'
        })
        builder.addCase(fetchInvoices.fulfilled, (state, { payload }) => {
            state.loading = 'idle';
            invoicesAdapter.setAll(state, payload)
        })
        builder.addCase(sendResumenDiario.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(sendResumenDiario.rejected, (state) => {
            state.loading = 'idle'
        })
        builder.addCase(sendResumenDiario.fulfilled, (state, { payload }) => {
            state.loading = 'idle';
        })
    },
});

export const invoicesSelectors = invoicesAdapter.getSelectors(
    (state) => state.invoices
);

export default invoicesSlice.reducer;
