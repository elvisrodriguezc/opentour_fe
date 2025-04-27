import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchHeadquarters = createAsyncThunk(
    'headquarters/fetchHeadquarters',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/headquarters",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const postHeadquarters = createAsyncThunk(
    'headquarters/postHeadquarters',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/headquarters",
            method: "POST",
            params: [],
            data: formData,
            multipart: false
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const putHeadquarters = createAsyncThunk(
    'headquarters/putHeadquarters',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/headquarters",
            method: "PUT",
            params: [],
            data: formData,
            multipart: false,
            id: formData.id
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const deleteHeadquarters = createAsyncThunk(
    'headquarters/deleteHeadquarters',
    // eslint-disable-next-line no-unused-vars
    async (id, { dispatch }) => {
        const data = {
            type: "/headquarters",
            method: "DELETE",
            params: [],
            data: {},
            id: id
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

// Warehouse CRUD

export const postWarehouses = createAsyncThunk(
    'headquarters/postWarehouses',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/warehouses",
            method: "POST",
            params: [],
            data: formData,
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const putWarehouses = createAsyncThunk(
    'headquarters/putWarehouses',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/warehouses",
            method: "PUT",
            params: [],
            data: formData,
            id: formData.id
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const deleteWarehouses = createAsyncThunk(
    'headquarters/deleteWarehouses',
    // eslint-disable-next-line no-unused-vars
    async (id, { dispatch }) => {
        const data = {
            type: "/warehouses",
            method: "DELETE",
            params: [],
            data: {},
            id: id
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });


export const headquartersAdapter = createEntityAdapter({
    selectId: (headquarters) => headquarters.id
});

const headquartersSlice = createSlice({
    name: 'headquarters',
    initialState: headquartersAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchHeadquarters.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(fetchHeadquarters.rejected, (state) => {
            state.loading = 'error'
        })
        builder.addCase(fetchHeadquarters.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            headquartersAdapter.setAll(state, payload)
        })

        builder.addCase(postHeadquarters.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(postHeadquarters.rejected, (state) => {
            state.loading = 'error'
        })
        builder.addCase(postHeadquarters.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            headquartersAdapter.addOne(state, payload)
        })

        builder.addCase(putHeadquarters.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(putHeadquarters.rejected, (state) => {
            state.loading = 'error'
        })
        builder.addCase(putHeadquarters.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            headquartersAdapter.upsertOne(state, payload)
        })

        builder.addCase(deleteHeadquarters.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(deleteHeadquarters.rejected, (state) => {
            state.loading = 'error'
        })
        builder.addCase(deleteHeadquarters.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            headquartersAdapter.removeOne(state, payload.id)
        })

        // Warehouse Slice

        builder.addCase(postWarehouses.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(postWarehouses.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(postWarehouses.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            if (payload.headquarter_id && state.entities[payload.headquarter_id]) {
                const existingHeadquarter = state.entities[payload.headquarter_id]
                headquartersAdapter.updateOne(state, {
                    id: payload.headquarter_id,
                    changes: {
                        warehouses: [...existingHeadquarter.warehouses || [], payload]
                    }
                })
            } else {
                headquartersAdapter.addOne(state, payload)
            }
        })

        builder.addCase(putWarehouses.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(putWarehouses.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(putWarehouses.fulfilled, (state, { payload }) => {
            state.loading = 'completed';


            if (payload.headquarter_id && state.entities[payload.headquarter_id]) {
                const existingHeadquarter = state.entities[payload.headquarter_id]
                headquartersAdapter.updateOne(state, {
                    id: payload.headquarter_id,
                    changes: {
                        warehouses: existingHeadquarter.warehouses.map((warehouse) => {
                            return warehouse.id === payload.id ? payload : warehouse
                        })
                    }
                })
            } else {
                headquartersAdapter.upsertOne(state, payload)
            }
        })

        builder.addCase(deleteWarehouses.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(deleteWarehouses.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(deleteWarehouses.fulfilled, (state, { payload }) => {
            state.loading = 'completed';


            if (payload.headquarter_id && state.entities[payload.headquarter_id]) {
                const existingHeadquarter = state.entities[payload.headquarter_id]
                headquartersAdapter.updateOne(state, {
                    id: payload.headquarter_id,
                    changes: {
                        warehouses: existingHeadquarter.warehouses.filter((warehouse) => warehouse.id !== payload.id)
                    }
                })
            }
        })

    },
});

export const headquartersSelector = headquartersAdapter.getSelectors(
    (state) => state.headquarters
);

export default headquartersSlice.reducer;
