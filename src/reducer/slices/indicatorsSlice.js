import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchIndicators = createAsyncThunk('indicators/fetchIndicators', async (_, { dispatch }) => {
    const data = {
        type: "/v1/indicators",
        method: "GET",
        params: {},
        data: {},
    };
    return loadAPIData(data)
        .then((res) => res.data)
});

export const addIndicator = createAsyncThunk(
    'indicators/addIndicator',
    async (newIndicator) => {
        const data = {
            type: "/v1/indicators",
            method: "POST",
            params: {},
            data: newIndicator,
        };
        return loadAPIData(data)
            .then((res) => res.data)
    }
);


export const deleteIndicator = createAsyncThunk(
    'indicators/deleteIndicator',
    async (id) => {
        const data = {
            type: "/v1/indicators",
            method: "DELETE",
            params: {},
            data: {},
            id: id
        }
        loadAPIData(data)
            .then((res) => res.data)
        return id
    }
);

export const indicatorsAdapter = createEntityAdapter({
    selectId: (indicator) => indicator.id
});

const indicatorsSlice = createSlice({
    name: 'indicators',
    initialState: indicatorsAdapter.getInitialState({ loading: false }),
    reducers: {
        // addGuides: guidesAdapter.addMany,
        // deleteGuides: guidesAdapter.removeOne,
        // cleatGuides: guidesAdapter.removeAll,
        // updateGuides: guidesAdapter.updateOne,
        setAllIndicators: indicatorsAdapter.setAll
    },
    extraReducers: {
        [fetchIndicators.pending](state) {
            state.loading = true
        },
        [fetchIndicators.rejected](state) {
            state.loading = false
        },
        [fetchIndicators.fulfilled](state, { payload }) {
            indicatorsAdapter.setAll(state, payload)
            state.loading = false
        },
        [addIndicator.pending](state) {
            state.loading = true
        },
        [addIndicator.rejected](state) {
            state.loading = false
        },
        [addIndicator.fulfilled](state, { payload }) {
            indicatorsAdapter.addOne(state, payload)
            state.loading = false
        },

        [deleteIndicator.pending](state) {
            state.loading = true
        },
        [deleteIndicator.rejected](state) {
            state.loading = false
        },
        [deleteIndicator.fulfilled](state, { payload }) {
            indicatorsAdapter.removeOne(state, payload)
            state.loading = false
        },
    },
});

export const {
    // addGuides,
    // deleteGuides,
    // cleatGuides,
    // updateGuides,
    setAllIndicators,
} = indicatorsSlice.actions;

export const indicatorsSelectors = indicatorsAdapter.getSelectors(
    state => state.indicators
);
//     selectIds,
//     selectById,
//     selectTotal,
//     selectEntities,
//     selectAll,

export default indicatorsSlice.reducer;
