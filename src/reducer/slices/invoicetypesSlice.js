import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchInvoiceTypes = createAsyncThunk('invoicetypes/fetchInvoiceTypes', async (_, { dispatch }) => {
    const data = {
        type: "/v1/invoicetypes",
        method: "GET",
        params: {},
        data: {},
    };
    return loadAPIData(data)
        .then((res) => res.data)
});

export const addInvoiceType = createAsyncThunk(
    'invoicetypes/addInvoiceType',
    async (newObj) => {
        const data = {
            type: "/v1/invoicetypes",
            method: "POST",
            params: {},
            data: newObj,
        };
        return loadAPIData(data)
            .then((res) => res.data)
    }
);

export const deleteInvoiceType = createAsyncThunk(
    'invoicetypes/deleteInvoiceType',
    async (id) => {
        const data = {
            type: "/v1/invoicetypes",
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

export const invoicetypesAdapter = createEntityAdapter({
    selectId: (invoicetype) => invoicetype.id
});

const invoicetypesSlice = createSlice({
    name: 'invoicetypes',
    initialState: invoicetypesAdapter.getInitialState({ loading: false }),
    reducers: {
        setAllInvoiceTypes: invoicetypesAdapter.setAll
    },
    extraReducers: {
        [fetchInvoiceTypes.pending](state) {
            state.loading = true
        },
        [fetchInvoiceTypes.rejected](state) {
            state.loading = false
        },
        [fetchInvoiceTypes.fulfilled](state, { payload }) {
            invoicetypesAdapter.setAll(state, payload)
            state.loading = false
        },
        [addInvoiceType.pending](state) {
            state.loading = true
        },
        [addInvoiceType.rejected](state) {
            state.loading = false
        },
        [addInvoiceType.fulfilled](state, { payload }) {
            invoicetypesAdapter.addOne(state, payload)
            state.loading = false
        },

        [deleteInvoiceType.pending](state) {
            state.loading = true
        },
        [deleteInvoiceType.rejected](state) {
            state.loading = false
        },
        [deleteInvoiceType.fulfilled](state, { payload }) {
            invoicetypesAdapter.removeOne(state, payload)
            state.loading = false
        },
    },
});

export const {
    // addInvoiceTypes,
    // deleteInvoiceTypes,
    // cleatInvoiceTypes,
    // updateInvoiceTypes,
    setAllInvoiceTypes,
} = invoicetypesSlice.actions;

export const invoicetypesSelector = invoicetypesAdapter.getSelectors(
    state => state.invoicetypes
);
//     selectIds,
//     selectById,
//     selectTotal,
//     selectEntities,
//     selectAll,

export default invoicetypesSlice.reducer;
