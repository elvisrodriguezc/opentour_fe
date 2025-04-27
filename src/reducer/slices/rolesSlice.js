import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";
import Swal from "sweetalert2";

export const fetchRoles = createAsyncThunk(
    'roles/fetchRoles',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        let params = {};
        if (formData) {
            params = {
                headquarter: formData
            }
        }
        const data = {
            type: "/roles",
            method: "GET",
            params: params,
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postRoles = createAsyncThunk(
    'roles/postRoles',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/roles",
            method: "POST",
            params: [],
            data: formData,
        }
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const putRoles = createAsyncThunk(
    'roles/putRoles',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/roles",
            method: "PUT",
            params: [],
            data: formData,
            id: formData.id
        }
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const deleteRoles = createAsyncThunk(
    'roles/deleteRoles',
    // eslint-disable-next-line no-unused-vars
    async (id, { dispatch }) => {
        const data = {
            type: "/roles",
            method: "DELETE",
            params: [],
            data: {},
            id: id
        }
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const rolesAdapter = createEntityAdapter({
    selectId: (roles) => roles.id
});

const rolesSlice = createSlice({
    name: 'roles',
    initialState: rolesAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRoles.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(fetchRoles.rejected, (state) => {
            state.loading = 'error'
        })
        builder.addCase(fetchRoles.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            rolesAdapter.setAll(state, payload)
        })

        builder.addCase(postRoles.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(postRoles.rejected, (state) => {
            state.loading = 'error'
        })
        builder.addCase(postRoles.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            rolesAdapter.addOne(state, payload)
        })

        builder.addCase(putRoles.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(putRoles.rejected, (state) => {
            state.loading = 'error'
        })
        builder.addCase(putRoles.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            rolesAdapter.upsertOne(state, payload)
        })

        builder.addCase(deleteRoles.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(deleteRoles.rejected, (state) => {
            state.loading = 'error'
            Swal.fire({
                title: 'Error',
                text: 'No se pudo eliminar el Rol',
                icon: 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            })
        })
        builder.addCase(deleteRoles.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            rolesAdapter.removeOne(state, payload.id)
            Swal.fire({
                title: '¡Eliminado!',
                text: 'El Rol ha sido eliminado.',
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            })
        })
    },
});

export const rolesSelector = rolesAdapter.getSelectors(
    (state) => state.roles
);

export default rolesSlice.reducer;
