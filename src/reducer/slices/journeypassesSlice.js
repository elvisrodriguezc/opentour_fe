import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";
import Swal from "sweetalert2";

export const fetchJourneypasses = createAsyncThunk(
    'journeypasses/fetchJourneypasses',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/journeypasses",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postRoles = createAsyncThunk(
    'journeypasses/postRoles',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/journeypasses",
            method: "POST",
            params: [],
            data: formData,
        }
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const putRoles = createAsyncThunk(
    'journeypasses/putRoles',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/journeypasses",
            method: "PUT",
            params: [],
            data: formData,
            id: formData.id
        }
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const deleteRoles = createAsyncThunk(
    'journeypasses/deleteRoles',
    // eslint-disable-next-line no-unused-vars
    async (id, { dispatch }) => {
        const data = {
            type: "/journeypasses",
            method: "DELETE",
            params: [],
            data: {},
            id: id
        }
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const journeypassesAdapter = createEntityAdapter({
    selectId: (journeypasses) => journeypasses.id
});

const journeypassesSlice = createSlice({
    name: 'journeypasses',
    initialState: journeypassesAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchJourneypasses.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(fetchJourneypasses.rejected, (state) => {
            state.loading = 'rejected'
            Swal.fire({
                text: 'Los datos no son accesibles',
                icon: 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
        })
        builder.addCase(fetchJourneypasses.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            journeypassesAdapter.setAll(state, payload)
            Swal.fire({
                text: 'Los Boletos han sido cargados.',
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
        })

        builder.addCase(postRoles.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(postRoles.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(postRoles.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            journeypassesAdapter.addOne(state, payload)
        })

        builder.addCase(putRoles.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(putRoles.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(putRoles.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            journeypassesAdapter.upsertOne(state, payload)
        })

        builder.addCase(deleteRoles.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(deleteRoles.rejected, (state) => {
            state.loading = 'rejected'
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
            journeypassesAdapter.removeOne(state, payload.id)
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

export const journeypassesSelector = journeypassesAdapter.getSelectors(
    (state) => state.journeypasses
);

export default journeypassesSlice.reducer;
