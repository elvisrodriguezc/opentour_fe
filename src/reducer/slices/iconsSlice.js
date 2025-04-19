import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchIcons = createAsyncThunk(
  'icons/fetchIcons',
  // eslint-disable-next-line no-unused-vars
  async (_, { dispatch }) => {
    const data = {
      type: "/v1/icons",
      method: "GET",
      params: {},
      data: {},
    };
    return await loadAPIData(data)
      .then((res) => res.data)
  });

export const iconsAdapter = createEntityAdapter({
  selectId: (icons) => icons.id
});

const iconsSlice = createSlice({
  name: 'icons',
  initialState: iconsAdapter.getInitialState({
    loading: 'Completado',
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIcons.pending, (state) => {
      state.loading = 'Pendiente'
    })
    builder.addCase(fetchIcons.rejected, (state) => {
      state.loading = 'Completado'
    })
    builder.addCase(fetchIcons.fulfilled, (state, { payload }) => {
      state.loading = 'Completado';
      iconsAdapter.setAll(state, payload)
    })
  },
});

export const iconsSelectors = iconsAdapter.getSelectors(
  (state) => state.icons
);

export default iconsSlice.reducer;
