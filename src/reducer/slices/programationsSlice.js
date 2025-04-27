import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchProgramations = createAsyncThunk(
    'programations/fetchProgramations',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/programations",
            method: "GET",
            params: {
                startdate: formData.startdate,
                finishdate: formData.finishdate,
            },
            data: {
                startdate: formData.startdate,
                finishdate: formData.finishdate,
            },
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const fetchOneProgramation = createAsyncThunk(
    'programations/fetchOneProgramation',
    // eslint-disable-next-line no-unused-vars
    async (id, { dispatch }) => {
        const data = {
            type: `/programations/${id}`,
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const newProgramation = createAsyncThunk(
    'programations/newProgramation',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/programations",
            method: "POST",
            params: {},
            data: formData,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const newProgService = createAsyncThunk(
    'programations/newProgService',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/progservices",
            method: "POST",
            params: {},
            data: formData,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });


export const programationsAdapter = createEntityAdapter({
    selectId: (programations) => programations.id
});

const programationsSlice = createSlice({
    name: 'programations',
    initialState: programationsAdapter.getInitialState({
        loading: 'empty',
        programSelected: null,
        serviceSelected: null,
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProgramations.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchProgramations.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(fetchProgramations.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            programationsAdapter.setAll(state, payload)
        })

        builder.addCase(fetchOneProgramation.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchOneProgramation.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(fetchOneProgramation.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            programationsAdapter.setOne(state, payload)
        })

        builder.addCase(newProgramation.pending, (state) => {
            state.loading = 'saving'
        })
        builder.addCase(newProgramation.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(newProgramation.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            programationsAdapter.addOne(state, payload)
        })

        builder.addCase(newProgService.pending, (state) => {
            state.loading = 'saving'
        })
        builder.addCase(newProgService.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(newProgService.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            // Find the programation to which this service belongs
            const programId = payload.programation_id;
            if (programId && state.entities[programId]) {
                const programation = state.entities[programId];
                // Create or update the services array
                const services = Array.isArray(programation.services)
                    ? [...programation.services, payload]
                    : [payload];

                // Update the programation with the new services array
                programationsAdapter.updateOne(state, {
                    id: programId,
                    changes: { services }
                });
            }
        })
    }
});

export const programationsSelectors = programationsAdapter.getSelectors(
    (state) => state.programations
);

export default programationsSlice.reducer;
