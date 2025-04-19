import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchGuides = createAsyncThunk(
    'guides/fetchGuides',
    // eslint-disable-next-line no-unused-vars
    async (set, { dispatch }) => {
        const data = {
            type: "/v1/guidecarriers",
            method: "GET",
            params: set,
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const postGuide = createAsyncThunk(
    'guides/postGuide',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/guidecarriers",
            method: "POST",
            params: {},
            data: formData,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const updateGuide = createAsyncThunk(
    'guides/updateGuide',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/guidecarriers",
            method: "PUT",
            params: {},
            data: formData,
            id: formData.id
        };
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });

export const guidesAdapter = createEntityAdapter({
    selectId: (guides) => guides.id
});

const guidesSlice = createSlice({
    name: 'guides',
    initialState: guidesAdapter.getInitialState({ loading: 'vacio' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGuides.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchGuides.rejected, (state) => {
            state.loading = 'rechazado'
        })
        builder.addCase(fetchGuides.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            guidesAdapter.setAll(state, payload)
        })

        builder.addCase(postGuide.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(postGuide.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(postGuide.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            guidesAdapter.addOne(state, payload)
        })
        builder.addCase(updateGuide.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(updateGuide.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(updateGuide.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            console.log(payload)
            guidesAdapter.updateOne(state, payload)
        })
    },
});

export const guidesSelector = guidesAdapter.getSelectors(
    (state) => state.guides
);

export default guidesSlice.reducer;
