import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/users",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const newUsers = createAsyncThunk(
    'users/newUsers',
    // eslint-disable-next-line no-unused-vars
    async (formData, { dispatch }) => {
        const data = {
            type: "/v1/users",
            method: "POST",
            params: {},
            data: formData,
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const usersAdapter = createEntityAdapter({
    selectId: (user) => user.id
});

const usersSlice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState({
        loading: 'empty',
        user: {}
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchUsers.rejected, (state) => {
            state.loading = 'rejected'
        })
        builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
            state.loading = 'completed';
            usersAdapter.setAll(state, payload)
        })

        builder.addCase(newUsers.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(newUsers.rejected, (state) => {
            state.loading = 'inactivo'
        })
        builder.addCase(newUsers.fulfilled, (state, { payload }) => {
            state.loading = 'inactivo';
            usersAdapter.addOne(state, payload)
        })
    },
});

export const usersSelector = usersAdapter.getSelectors(
    (state) => state.users
);

export default usersSlice.reducer;
