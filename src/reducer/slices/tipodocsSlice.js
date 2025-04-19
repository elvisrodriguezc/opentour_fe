import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchTipodocs = createAsyncThunk('tipodocs/fetchTipodocs', async (_, { dispatch }) => {
  const data = {
    type: "/v1/tipodocumentos",
    method: "GET",
    params: {},
    data: {},
  };
  return loadAPIData(data)
    .then((res) => res.data)
});

export const addTipodoc = createAsyncThunk(
  'tipodocs/addTipodoc',
  async (newTipodoc) => {
    const data = {
      type: "/v1/tipodocumentos",
      method: "POST",
      params: {},
      data: newTipodoc,
    };
    return loadAPIData(data)
      .then((res) => res.data)
  }
);

export const deleteTipodoc = createAsyncThunk(
  'tipodocs/deleteTipodoc',
  async (id) => {
    const data = {
      type: "/v1/tipodocumentos",
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

export const tipodocsAdapter = createEntityAdapter({
  selectId: (tipodoc) => tipodoc.id
});

const tipodocsSlice = createSlice({
  name: 'tipodocs',
  initialState: tipodocsAdapter.getInitialState({ loading: false }),
  reducers: {
    // addTipodocs: tipodocsAdapter.addMany,
    // deleteTipodocs: tipodocsAdapter.removeOne,
    // cleatTipodocs: tipodocsAdapter.removeAll,
    // updateTipodocs: tipodocsAdapter.updateOne,
    setAllTipodocs: tipodocsAdapter.setAll
  },
  extraReducers: {
    [fetchTipodocs.pending](state) {
      state.loading = true
    },
    [fetchTipodocs.rejected](state) {
      state.loading = false
    },
    [fetchTipodocs.fulfilled](state, { payload }) {
      tipodocsAdapter.setAll(state, payload)
      state.loading = false
    },

    [addTipodoc.pending](state) {
      state.loading = true
    },
    [addTipodoc.rejected](state) {
      state.loading = false
    },
    [addTipodoc.fulfilled](state, { payload }) {
      tipodocsAdapter.addOne(state, payload)
      state.loading = false
    },

    [deleteTipodoc.pending](state) {
      state.loading = true
    },
    [deleteTipodoc.rejected](state) {
      state.loading = false
    },
    [deleteTipodoc.fulfilled](state, { payload }) {
      tipodocsAdapter.removeOne(state, payload)
      state.loading = false
    },
  },
});

export const {
  // addTipodocs,
  // deleteTipodocs,
  // cleatTipodocs,
  // updateTipodocs,
  setAllTipodocs,
} = tipodocsSlice.actions;

export const tipodocsSelectors = tipodocsAdapter.getSelectors(
  state => state.tipodocs
);
//     selectIds,
//     selectById,
//     selectTotal,
//     selectEntities,
//     selectAll,

export default tipodocsSlice.reducer;
