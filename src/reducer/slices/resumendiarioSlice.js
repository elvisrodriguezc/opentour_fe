import {
    createEntityAdapter,
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit"
import { loadAPIData } from "../../services/loadAPIData";

export const fetchResumendiario = createAsyncThunk('resumendiario/fetchResumendiario', async (_, { dispatch }) => {
    const data = {
        type: "/resumendiarios",
        method: "GET",
        params: {},
        data: {},
    };
    return loadAPIData(data)
        .then((res) => res.data)
});

export const requestTicket = createAsyncThunk('resumendiario/requestTicket', async (resumenDiario, { dispatch }) => {
    const data = {
        type: "/reqticket",
        method: "GET",
        params: {
            idCdr: resumenDiario.sentfile,
            ticket: resumenDiario.ticket
        },
        data: {},
    };
    return loadAPIData(data)
        .then((res) => res.data)
});

export const resumendiarioAdapter = createEntityAdapter({
    selectId: (resumendiario) => resumendiario.id
});

const resumendiarioSlice = createSlice({
    name: 'resumendiario',
    initialState: resumendiarioAdapter.getInitialState({ loading: 'idle' }),
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchResumendiario.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchResumendiario.rejected, (state) => {
            state.loading = 'idle'
        })
        builder.addCase(fetchResumendiario.fulfilled, (state, action) => {
            state.loading = 'idle';
            resumendiarioAdapter.setAll(state, action.payload)
        })
        builder.addCase(requestTicket.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(requestTicket.rejected, (state) => {
            state.loading = 'idle'
        })
        builder.addCase(requestTicket.fulfilled, (state, { payload }) => {
            state.loading = 'idle';
            resumendiarioAdapter.updateOne(state, {
                id: payload.id,
                changes: payload
            })
        })
    },
});


export const resumendiarioSelectors = resumendiarioAdapter.getSelectors(
    state => state.resumendiario
);

export default resumendiarioSlice.reducer;
