import { createSlice } from "@reduxjs/toolkit";
import { loadAPIData } from "../../services/loadAPIData";

export const customersSlice = createSlice({
    name: "customers",
    initialState: {
        customers: [],
        branches: [],
        branches2: [],
        loadingCustomers: false,
        loadingBranches: false
    },
    reducers: {
        setCustomers: (state, action) => {
            state.customers = action.payload
        },
        addCustomers: (state, action) => {
            state.customers.push(action.payload);
        },
        deleteCustomer: (state, action) => {
            const customerFound = state.customers.find(customer => customer.id === action.payload.id);
            if (customerFound) {
                state.customers.splice(state.customers.indexOf(customerFound), 1);
            }
        },
        addBranch: (state, action) => {
            const customerIndex = state.customers.findIndex(customer => customer.id === action.payload.customer_id);
            const newBranches = state.customers[customerIndex].branches;
            console.log(newBranches)
            newBranches.push(action.payload);
            state.customers[customerIndex].branches = newBranches;
        },
        delBranch: (state, action) => {
            const customerIndex = state.customers.findIndex(customer => customer.id === action.payload.customer_id);
            const newBranches = state.customers[customerIndex].branches;
            newBranches.splice(newBranches.indexOf(action.payload), 1);
            state.customers[customerIndex].branches = newBranches
        },
        setBranches: (state, action) => {
            state.branches = action.payload
        },
        setBranches2: (state, action) => {
            state.branches2 = action.payload
        },
        setLoadingCustomers: (state, action) => {
            state.loadingCustomers = action.payload
        },
        setLoadingBranches: (state, action) => {
            state.loadingBranches = action.payload
        },
        stBranch: (state, action) => {
            const customerIndex = state.customers.findIndex(customer => customer.id === action.payload.customer_id);
            const newBranches = state.customers[customerIndex].branches;
            const idxBranches = newBranches.indexOf(action.payload)
            state.customers[customerIndex].branches[idxBranches].status = !state.customers[customerIndex].branches[idxBranches].status
        },
    },
})

export const { setCustomers, addCustomers, deleteCustomer, setBranches, addBranch, delBranch, setBranches2, setLoadingCustomers, setLoadingBranches, stBranch } = customersSlice.actions;
export default customersSlice.reducer;

export const fetchCustomers = () => (dispatch) => {
    dispatch(setLoadingCustomers(true))
    const data = {
        type: "/v1/customers",
        method: "GET",
        params: {},
        data: {},
    };
    loadAPIData(data)
        .then((res) => {
            dispatch(setCustomers(res.data))
        })
        .catch((err) => {
            dispatch(setCustomers([]))
        })
        .finally(() => {
            dispatch(setLoadingCustomers(false))
        })
};
export const newCustomer = (customer) => (dispatch) => {
    dispatch(setLoadingBranches(true))
    const data = {
        type: "/v1/customers",
        method: "POST",
        params: {},
        data: customer,
    };
    loadAPIData(data)
        .then((res) => {
            dispatch(addCustomers(res.data))
        })
        .catch((err) => {
            dispatch(setCustomers([]))
        })
        .finally(() => {
            dispatch(setLoadingBranches(false))
        })
};
export const delCustomer = (customer) => (dispatch) => {
    dispatch(setLoadingBranches(true))
    const data = {
        type: "/v1/customers",
        method: "DELETE",
        params: {
        },
        data: {},
        id: customer
    };
    loadAPIData(data)
        .then((res) => {
            dispatch(deleteCustomer(res.data));
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            dispatch(setLoadingBranches(false))
        })
}
export const fetchBranches = (customer) => (dispatch) => {
    dispatch(setLoadingBranches(true))
    const data = {
        type: "/v1/customerbranches",
        method: "GET",
        params: {
            customer: customer
        },
        data: {},
    };
    loadAPIData(data)
        .then((res) => {
            dispatch(setBranches(res.data))
        })
        .catch((err) => {
            dispatch(setBranches([]))
        })
        .finally(() => {
            dispatch(setLoadingBranches(false))
        })
};
export const fetchBranches2 = (customer) => (dispatch) => {
    dispatch(setLoadingBranches(true))
    const data = {
        type: "/v1/customerbranches",
        method: "GET",
        params: {
            customer: customer
        },
        data: {},
    };
    loadAPIData(data)
        .then((res) => {
            dispatch(setBranches2(res.data))
        })
        .catch((err) => {
            dispatch(setBranches2([]))
        })
        .finally(() => {
            dispatch(setLoadingBranches(false))
        })
};

export const newBranch = (customer) => (dispatch) => {
    dispatch(setLoadingBranches(true))
    const data = {
        type: "/v1/customerbranches",
        method: "POST",
        params: {},
        data: customer,
    };
    loadAPIData(data)
        .then((res) => {
            dispatch(addBranch(res.data))
        })
        .catch((err) => {
            console.log('Error')
        })
        .finally(() => {
            dispatch(setLoadingBranches(false))
        })
};

export const deleteBranch = (branchId) => (dispatch) => {
    dispatch(setLoadingBranches(true))
    const data = {
        type: "/v1/customerbranches",
        method: "DELETE",
        params: {},
        data: {},
        id: branchId
    };
    loadAPIData(data)
        .then((res) => {
            console.log(res)
            dispatch(delBranch(res.data))
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setLoadingBranches(false))
        })
};

export const statusBranch = (branch) => (dispatch) => {
    dispatch(setLoadingBranches(true))
    const data = {
        type: "/v1/customerbranches",
        method: "PUT",
        params: {},
        data: {
            "status": !branch.status
        },
        id: branch.id
    };
    loadAPIData(data)
        .then((res) => {
            console.log(res)
            dispatch(stBranch(res.data))
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setLoadingBranches(false))
        })
};


