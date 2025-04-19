import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchTaxes = createAsyncThunk(
  'taxes/fetchTaxes',
  // eslint-disable-next-line no-unused-vars
  async (_, { dispatch }) => {
    const data = {
      type: "/v1/taxes",
      method: "GET",
      params: {},
      data: {},
    };
    return await loadAPIData(data)
      .then((res) => res.data)
  });

export const taxesAdapter = createEntityAdapter({
  selectId: (taxes) => taxes.id
});

const taxesSlice = createSlice({
  name: 'taxes',
  initialState: taxesAdapter.getInitialState({
    loading: 'Vacío',
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTaxes.pending, (state) => {
      state.loading = 'Pendiente'
    })
    builder.addCase(fetchTaxes.rejected, (state) => {
      state.loading = 'Rechazado'
    })
    builder.addCase(fetchTaxes.fulfilled, (state, { payload }) => {
      state.loading = 'Completado';
      taxesAdapter.setAll(state, payload)
    })
  },
});

export const taxesSelector = taxesAdapter.getSelectors(
  (state) => state.taxes
);

export default taxesSlice.reducer;