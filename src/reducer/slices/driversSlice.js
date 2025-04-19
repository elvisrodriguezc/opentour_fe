import { createSlice } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const driversSlice = createSlice({
    name: "drivers",
    initialState: {
        drivers: [],
        loadingDrivers: false
    },
    reducers: {
        setDrivers: (state, action) => {
            state.drivers = action.payload
        },
        addDrivers: (state, action) => {
            state.drivers.push(action.payload);
        },
        delDriver: (state, action) => {
            const driverFound = state.drivers.find(driver => driver.id === action.payload.id);
            if (driverFound) {
                state.drivers.splice(state.drivers.indexOf(driverFound), 1);
            }
        },
        setLoadingDrivers: (state, action) => {
            state.loadingDrivers = action.payload
        },
    }
})

export const { setDrivers, addDrivers, delDriver, setLoadingDrivers } = driversSlice.actions;
export default driversSlice.reducer;

export const fetchDrivers = () => (dispatch) => {
    dispatch(setLoadingDrivers(true))
    const data = {
        type: "/v1/drivers",
        method: "GET",
        params: {},
        data: {},
    };
    loadAPIData(data)
        .then((res) => {
            dispatch(setDrivers(res.data))
        })
        .catch((err) => {
            dispatch(setDrivers([]))
        })
        .finally(() => {
            dispatch(setLoadingDrivers(false))
        })
};

export const newDriver = (driver) => (dispatch) => {
    dispatch(setLoadingDrivers(true))
    const data = {
        type: "/v1/drivers",
        method: "POST",
        params: {},
        data: driver,
    };
    loadAPIData(data)
        .then((res) => {
            dispatch(addDrivers(res.data))
        })
        .catch((err) => {
            dispatch(setDrivers([]))
        })
        .finally(() => {
            dispatch(setLoadingDrivers(false))
        })
};

export const deleteDriver = (driverId) => (dispatch) => {
    dispatch(setLoadingDrivers(true))
    const data = {
        type: "/v1/drivers",
        method: "DELETE",
        params: {
        },
        data: {},
        id: driverId
    };
    loadAPIData(data)
        .then((res) => {
            console.log(res.data)
            dispatch(delDriver(res.data));
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            dispatch(setLoadingDrivers(false))
        })
}