import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchDepartments = createAsyncThunk(
    'departments/fetchDepartments',
    // eslint-disable-next-line no-unused-vars
    async (set, { dispatch }) => {
        const data = {
            type: "/departments",
            method: "GET",
            params: set,
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
            .catch((error) => console.log(error))
    });


export const departmentsAdapter = createEntityAdapter({
    selectId: (departments) => departments.id
});

const departmentsSlice = createSlice({
    name: 'departments',
    initialState: departmentsAdapter.getInitialState({ loading: 'empty' }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDepartments.pending, (state) => {
            state.loading = 'pendig'
        })
        builder.addCase(fetchDepartments.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(fetchDepartments.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            departmentsAdapter.setAll(state, payload)
        })

    },
});

export const departmentsSelector = departmentsAdapter.getSelectors(
    (state) => state.departments
);

export default departmentsSlice.reducer;
