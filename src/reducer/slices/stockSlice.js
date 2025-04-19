import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchStock = createAsyncThunk(
    'stock/fetchStock',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/warehousestocks",
            method: "GET",
            params: {},
            data: formData,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postStock = createAsyncThunk(
    'stock/postStock',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/warehousestocks",
            method: "POST",
            params: [],
            data: formData,
            multipart: true
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const updateStock = createAsyncThunk(
    'stock/updateStock',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/warehousestocks",
            method: "PUT",
            params: [],
            data: formData,
            multipart: true
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });
export const emptyStock = createAsyncThunk(
    'stock/emptyStock',
    async (_, { dispatch }) => {
        return 'empty'
    }
)

export const stockAdapter = createEntityAdapter({
    selectId: (stock) => stock.id
});

const stockSlice = createSlice({
    name: 'stock',
    initialState: stockAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStock.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchStock.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchStock.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            stockAdapter.setAll(state, payload)
        })
        builder.addCase(postStock.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(postStock.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(postStock.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            stockAdapter.addOne(state, payload)
        })
        builder.addCase(updateStock.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(updateStock.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(updateStock.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            stockAdapter.updateOne(state, payload)
        })
        builder.addCase(emptyStock.pending, (state) => {
            state.loading = 'pending';
        })
        builder.addCase(emptyStock.rejected, (state) => {
            state.loading = 'inactivo';
        })
        builder.addCase(emptyStock.fulfilled, (state, { payload }) => {
            state.loading = payload;
        })
    },
});

export const stockSelector = stockAdapter.getSelectors(
    (state) => state.stock
);

export default stockSlice.reducer;
