import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchCandidates = createAsyncThunk(
    'candidates/fetchCandidates',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/v1/candidates",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const postCandidates = createAsyncThunk(
    'candidates/postCandidates',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/candidates",
            method: "POST",
            params: [],
            data: formData,
            multipart: true
        }
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const candidatesAdapter = createEntityAdapter({
    selectId: (candidates) => candidates.id
});

const candidatesSlice = createSlice({
    name: 'candidates',
    initialState: candidatesAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCandidates.pending, (state) => {
            state.loading = 'active'
        })
        builder.addCase(fetchCandidates.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(fetchCandidates.fulfilled, (state, { payload }) => {
            state.loading = 'success';
            candidatesAdapter.setAll(state, payload)
        })
        builder.addCase(postCandidates.pending, (state) => {
            state.loading = 'active'
        })
        builder.addCase(postCandidates.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(postCandidates.fulfilled, (state, { payload }) => {
            state.loading = 'success';
            candidatesAdapter.addOne(state, payload)
        })
    },
});

export const candidatesSelector = candidatesAdapter.getSelectors((state) => state.candidates);
export default candidatesSlice.reducer;