import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchTransfer = createAsyncThunk(
    'transfer/fetchTransfer',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        console.log(formData)
        const data = {
            type: "/v1/transfers",
            method: "GET",
            params: formData,
            data: formData,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postTransfer = createAsyncThunk(
    'transfer/postTransfer',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/transfers",
            method: "POST",
            params: [],
            data: formData,
            multipart: true,
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const updateTransfer = createAsyncThunk(
    'transfer/updateTransfer',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/transfers",
            method: "PATCH",
            params: [],
            data: formData,
            multipart: false,
            id: formData.id,
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });
export const emptyTransfer = createAsyncThunk(
    'transfer/emptyTransfer',
    async (_, { dispatch }) => {
        console.log(dispatch)
        return 'empty'
    }
)

export const transferAdapter = createEntityAdapter({
    selectId: (transfer) => transfer.id
});

const transferSlice = createSlice({
    name: 'transfer',
    initialState: transferAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTransfer.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchTransfer.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchTransfer.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            transferAdapter.setAll(state, payload)
        })
        builder.addCase(postTransfer.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(postTransfer.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(postTransfer.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            transferAdapter.addOne(state, payload)
        })
        builder.addCase(updateTransfer.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(updateTransfer.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(updateTransfer.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            transferAdapter.setOne(state, payload)
        })
        builder.addCase(emptyTransfer.pending, (state) => {
            state.loading = 'pending';
        })
        builder.addCase(emptyTransfer.rejected, (state) => {
            state.loading = 'inactivo';
        })
        builder.addCase(emptyTransfer.fulfilled, (state, { payload }) => {
            state.loading = payload;
        })
    },
});

export const transferSelector = transferAdapter.getSelectors(
    (state) => state.transfers
);

export default transferSlice.reducer;
