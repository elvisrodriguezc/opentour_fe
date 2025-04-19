import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchPrograms = createAsyncThunk(
    'programs/fetchPrograms',
    // eslint-disable-next-line no-unused-vars
    async (params, { dispatch }) => {
        const data = {
            type: "/v1/programs",
            method: "GET",
            params: {
                startdate: params[0],
                finishdate: params[1],
            },
            data: {
                startdate: params[0],
                finishdate: params[1],
            },
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const postProgram = createAsyncThunk(
    'programs/postProgram',
    // eslint-disable-next-line no-unused-vars
    async (service, { dispatch }) => {
        const data = {
            type: "/v1/programsall",
            method: "POST",
            params: {},
            data: {
                entity_id: service.entity_id,
                date: service.date,
                programaciones: service.servicios
            },
        };
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                console.log('operación concluida')
            })
    }
);

export const selectProgram = createAsyncThunk(
    'programs/selectProgram',
    // eslint-disable-next-line no-unused-vars
    async (program, { dispatch }) => {
        return program
    }
)

export const selectService = createAsyncThunk(
    'programs/selectService',
    // eslint-disable-next-line no-unused-vars
    async (service, { dispatch }) => {
        return service
    }
)

export const programsAdapter = createEntityAdapter({
    selectId: (programs) => programs.id
});

const programsSlice = createSlice({
    name: 'programs',
    initialState: programsAdapter.getInitialState({
        loading: 'empty',
        programSelected: null,
        serviceSelected: null,
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPrograms.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchPrograms.rejected, (state) => {
            state.loading = 'idle'
        })
        builder.addCase(fetchPrograms.fulfilled, (state, { payload }) => {
            state.loading = 'idle';
            programsAdapter.setAll(state, payload)
        })
        builder.addCase(postProgram.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(postProgram.rejected, (state) => {
            state.loading = 'idle'
        })
        builder.addCase(postProgram.fulfilled, (state, { payload }) => {
            state.loading = 'idle';
            programsAdapter.addOne(state, payload)
        })
        builder.addCase(selectProgram.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(selectProgram.rejected, (state) => {
            state.loading = 'idle'
        })
        builder.addCase(selectProgram.fulfilled, (state, { payload }) => {
            state.loading = 'idle';
            console.log(payload)
            state.programSelected = payload
        })
        builder.addCase(selectService.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(selectService.rejected, (state) => {
            state.loading = 'idle'
        })
        builder.addCase(selectService.fulfilled, (state, { payload }) => {
            state.loading = 'idle';
            state.serviceSelected = payload
        })
    },
});

export const programsSelectors = programsAdapter.getSelectors(
    (state) => state.programs
);

export default programsSlice.reducer;
