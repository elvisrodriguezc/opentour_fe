import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchTypes = createAsyncThunk(
    'types/fetchTypes',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/types",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postTypes = createAsyncThunk(
    'types/postTypes',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/types",
            method: "POST",
            params: {},
            data: formData,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const putTypes = createAsyncThunk(
    'types/putTypes',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/types",
            method: "PUT",
            params: {},
            data: formData,
            id: formData.id,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const deleteTypes = createAsyncThunk(
    'types/deleteTypes',
    // eslint-disable-next-line no-unused-vars
    async (id, { dispatch }) => {
        const data = {
            type: "/types",
            method: "DELETE",
            params: {},
            data: {},
            id: id,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

// Typevalues Slice
export const postTypevalues = createAsyncThunk(
    'types/postTypevalues',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/typevalues",
            method: "POST",
            params: {},
            data: formData,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const putTypevalues = createAsyncThunk(
    'types/putTypevalues',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/typevalues",
            method: "PATCH",
            params: {},
            data: formData,
            id: formData.type_id
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const deleteTypevalues = createAsyncThunk(
    'types/deleteTypevalues',
    // eslint-disable-next-line no-unused-vars
    async (id, { dispatch }) => {
        const data = {
            type: "/typevalues",
            method: "DELETE",
            params: {},
            data: {},
            id: id,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });


export const typesAdapter = createEntityAdapter({
    selectId: (types) => types.id
});

const typesSlice = createSlice({
    name: 'types',
    initialState: typesAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTypes.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(fetchTypes.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(fetchTypes.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            typesAdapter.setAll(state, payload)
        })

        builder.addCase(postTypes.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(postTypes.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(postTypes.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            typesAdapter.addOne(state, payload)
        })

        builder.addCase(putTypes.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(putTypes.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(putTypes.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            typesAdapter.upsertOne(state, payload)
        })

        builder.addCase(deleteTypes.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(deleteTypes.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(deleteTypes.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            typesAdapter.removeOne(state, payload.id)
        })

        // Typevalues Slice
        builder.addCase(postTypevalues.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(postTypevalues.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(postTypevalues.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            if (payload.type_id && state.entities[payload.type_id]) {
                const existingType = state.entities[payload.type_id];
                typesAdapter.updateOne(state, {
                    id: payload.type_id,
                    changes: {
                        typevalues: [...(existingType.typevalues || []), payload]
                    }
                });
            } else {
                typesAdapter.addOne(state, payload);
            }
        })

        builder.addCase(putTypevalues.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(putTypevalues.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(putTypevalues.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            if (payload.type_id && state.entities[payload.type_id]) {
                const existingType = state.entities[payload.type_id];
                typesAdapter.updateOne(state, {
                    id: payload.type_id,
                    changes: {
                        typevalues: existingType.typevalues.map((typevalue) => {
                            if (typevalue.id === payload.id) {
                                return payload;
                            }
                            return typevalue;
                        })
                    }
                });
            } else {
                typesAdapter.addOne(state, payload);
            }
        })

        builder.addCase(deleteTypevalues.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(deleteTypevalues.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(deleteTypevalues.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            if (payload.type_id && state.entities[payload.type_id]) {
                const existingType = state.entities[payload.type_id];
                typesAdapter.updateOne(state, {
                    id: payload.type_id,
                    changes: {
                        typevalues: existingType.typevalues.filter((typevalue) => typevalue.id !== payload.id)
                    }
                });
            }
        })

    },
});

export const typesSelector = typesAdapter.getSelectors(
    (state) => state.types
);

export default typesSlice.reducer;
