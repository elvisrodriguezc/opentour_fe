import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchRequirements = createAsyncThunk(
    'requirements/fetchRequirements',
    // eslint-disable-next-line no-unused-vars
    async (set, { dispatch }) => {
        const data = {
            type: "/v1/requirements",
            method: "GET",
            params: set,
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const postRequirement = createAsyncThunk(
    'requirements/postRequirement',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/requirements",
            method: "POST",
            params: {},
            data: formData,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const updateRequirement = createAsyncThunk(
    'requirements/updateRequirement',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/requirements",
            method: "PUT",
            params: {},
            data: formData,
            id: formData.id
        };
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const requirementsAdapter = createEntityAdapter({
    selectId: (requirements) => requirements.id
});

const requirementsSlice = createSlice({
    name: 'requirements',
    initialState: requirementsAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRequirements.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchRequirements.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(fetchRequirements.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            requirementsAdapter.setAll(state, payload)
        })
        builder.addCase(postRequirement.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(postRequirement.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(postRequirement.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            requirementsAdapter.addOne(state, payload)
        })
        builder.addCase(updateRequirement.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(updateRequirement.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(updateRequirement.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            console.log(payload)
            requirementsAdapter.setOne(state, payload)
        })
    },
});

export const requirementsSelector = requirementsAdapter.getSelectors(
    (state) => state.requirements
);

export default requirementsSlice.reducer;
