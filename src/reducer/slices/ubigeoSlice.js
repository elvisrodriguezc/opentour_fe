import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const fetchRegiones = createAsyncThunk(
    'ubigeos/fetchRegiones',
    // eslint-disable-next-line no-unused-vars
    async (_, { dispatch }) => {
        const data = {
            type: "/v1/regiones",
            method: "GET",
            params: {},
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    });

export const fetchProvincias = createAsyncThunk(
    'ubigeos/fetchProvincias',
    // eslint-disable-next-line no-unused-vars
    async (region, { dispatch }) => {
        const data = {
            type: "/v1/provincias",
            method: "GET",
            params: {
                region: region
            },
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    })

export const fetchDistritos = createAsyncThunk(
    'ubigeos/fetchDistritos',
    // eslint-disable-next-line no-unused-vars
    async (provincia, { dispatch }) => {
        const data = {
            type: "/v1/ubigeodists",
            method: "GET",
            params: {
                provincia: provincia
            },
            data: {},
        };
        return await loadAPIData(data)
            .then((res) => res.data)
    })

export const ubigeosAdapter = createEntityAdapter({
    selectId: (ubigeos) => ubigeos.id
})

export const UbigeoSlice = createSlice({
    name: "ubigeos",
    initialState: ubigeosAdapter.getInitialState({
        loading: 'Completado',
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDistritos.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchDistritos.rejected, (state) => {
            state.loading = 'Completado'
        })
        builder.addCase(fetchDistritos.fulfilled, (state, { payload }) => {
            state.loading = 'Completado';
            ubigeosAdapter.setAll(state, payload)
        })
    },
})

export const ubigeosSelectors = ubigeosAdapter.getSelectors(
    (state) => state.ubigeos
)
export default UbigeoSlice.reducer;