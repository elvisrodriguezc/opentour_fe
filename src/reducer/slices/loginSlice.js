import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";
import axios from "axios"
import Swal from "sweetalert2";

const fetchManifest = async () => {
  try {
    const response = await fetch('/manifest.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch manifest.json: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading manifest.json:', error);
    return null;
  }
};

const apiUrlFromManifest = async () => {
  const manifest = await fetchManifest();
  return manifest?.api_url || null;
};

const http = axios.create({
  baseURL: apiUrlFromManifest,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true
});

export const login = createAsyncThunk(
  'login/login',
  async (formData, { rejectWithValue }) => {
    const data = {
      type: "/login",
      method: "POST",
      params: {},
      data: formData,
    };
    try {
      try {
        await http.get('/sanctum/csrf-cookie');
      } catch (err) {
        Swal.fire({
          title: 'Error de Conexión',
          text: 'No se pudo conectar con el servidor DB. Por favor, inténtelo de nuevo más tarde.',
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
        return rejectWithValue({ status: 503, statusText: 'No se pudo conectar con el servidor' });
      }
      const response = await loadAPIData(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response ? { status: err.response.status, statusText: err.response.status === 401 ? "Las Credenciales ingresadas, no son válidas, revíselas e intente nuevamente." : "Demasiados intentos fallidos, inténtelo más tarde" } : err.message);
    }
  })

export const activeuser = createAsyncThunk(
  'login/user',
  async (_, { dispatch }) => {
    const data = {
      type: "/user",
      method: "GET",
      params: {},
      data: {},
    };
    return await loadAPIData(data)
      .then((res) => res)
      .catch((err) => console.log(err))
  })

export const logout = createAsyncThunk(
  'login/logout',
  async (_, { dispatch }) => {
    const data = {
      type: "/logout",
      method: "GET",
      params: {},
      data: {},
    };
    return await loadAPIData(data)
      .then((res) =>
        res.data
      )
      .catch((err) => console.log(err))
  })

export const loginAdapter = createEntityAdapter({
  selectId: (login) => login.id
});

const loginSlice = createSlice({
  name: 'login',
  initialState: loginAdapter.getInitialState({
    loading: 'empty',
    logged: false
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = 'procesando'
    })
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = 'inactivo'
      state.logged = false
      Swal.fire({
        title: `Error de Acceso ${payload.status}`,
        text: payload.statusText,
        timer: 5000,
        icon: "error",
        footer: "Tendrá 5 oportunidades, luego puede intentarlo en 10 minutos",
        confirmButtonText: "Entendido",
        timerProgressBar: true,
        // toast: true,
        // position: "top-end"
      })
    })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = 'inactivo'
      state.logged = true
      loginAdapter.setOne(state, { ...payload, id: 1 })
      const user = {
        uid: payload.user.id,
        user: payload.user.user,
        name: payload.user.label,
        wid: payload.user.warehouse_id,
        cid: payload.user.company_id,
        company: payload.user.company,
        logo: payload.user.company_logo,
        role: payload.user.role,
      }
      localStorage.setItem("token", JSON.stringify(payload.access_token));
      localStorage.setItem("user", JSON.stringify(user))
      Swal.fire({
        title: 'Bienvenido',
        text: 'Es un gusto verte nuevamente.',
        timer: 4000,
        icon: "success",
        confirmButtonText: "Comencemos",
        timerProgressBar: true,
        // toast: true,
        // position: "top-end"
      })
    })

    builder.addCase(activeuser.pending, (state) => {
      state.loading = 'procesando'
    })
    builder.addCase(activeuser.rejected, (state) => {
      state.loading = 'inactivo'
      state.logged = false
    })
    builder.addCase(activeuser.fulfilled, (state, { payload }) => {
      state.loading = 'inactivo'
      state.logged = true
      loginAdapter.setOne(state, payload)
      Swal.fire({
        title: 'Bienvenido',
        text: 'Es un gusto verte nuevamente.',
        timer: 4000,
        icon: "success",
        confirmButtonText: "Comencemos",
        timerProgressBar: true,
        // toast: true,
        // position: "top-end"
      })
    })

    builder.addCase(logout.pending, (state) => {
      state.loading = 'procesando'
    })
    builder.addCase(logout.rejected, (state) => {
      state.loading = 'inactivo'
    })
    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.loading = 'inactivo'
      state.logged = false
      localStorage.clear()
    })
  },
});

export const loginSelector = loginAdapter.getSelectors(
  (state) => state.login
);

export default loginSlice.reducer;
