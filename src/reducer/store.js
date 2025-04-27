import { configureStore } from "@reduxjs/toolkit";
import advancementsReducer from "./slices/advancementsSlice.js";
import brandsReducer from "./slices/brandsSlice.js";
import categoriesReducer from "./slices/categoriesSlice.js";
import currenciesReducer from "./slices/currenciesSlice.js";
import entitiesReducer from "./slices/entitiesSlice.js";
import guidesReducer from "./slices/guidesSlice.js";
import iconsReducer from "./slices/iconsSlice.js";
import invoicesSlice from "./slices/invoicesSlice.js";
import loginSlice from "./slices/loginSlice.js";
import officesReducer from "./slices/officesSlice.js";
import ordersReducer from "./slices/ordersSlice.js";
import orderservicesReducer from "./slices/orderservicesSlice.js";
import payrollExecsReducer from "./slices/payrollExecsSlice.js";
import payrollsReducer from "./slices/payrollsSlice.js";
import productsReducer from "./slices/productsSlice.js";
import programationsReducer from "./slices/programationsSlice.js";
import progservicesReducer from "./slices/progservicesSlice.js";
import resumendiarioReducer from "./slices/resumendiarioSlice.js";
import servicesReducer from "./slices/servicesSlice.js";
import tariffsReducer from "./slices/tariffsSlice.js";
import taxesReducer from "./slices/taxesSlice.js";
import typesvaluesReducer from "./slices/typesvaluesSlice.js";
import typesReducer from "./slices/typesSlice.js";
import ubigeoReducer from "./slices/ubigeoSlice.js";
import unitiesReducer from "./slices/unitiesSlice.js";
import usersReducer from "./slices/usersSlice.js";
import vehiclesReducer from "./slices/vehiclesSlice.js";
import datakeysReducer from "./slices/datakeysSlice.js";
import purchasesReducer from "./slices/purchasesSlice.js";
import requirementsReducer from "./slices/requirementsSlice.js";
import stockReducer from "./slices/stockSlice.js";
import kardexReducer from "./slices/kardexSlice.js";
import warehousesReducer from "./slices/warehousesSlice.js";
import transfersReducer from "./slices/transfersSlice.js";
import numeratorsReducer from "./slices/numeratorsSlice.js";
import findrucsReducer from "./slices/findrucsSlice.js";
import candidatesReducer from "./slices/candidatesSlice.js";
import workshiftsReducer from "./slices/workshiftsSlice.js";
import journeypassesReducer from "./slices/journeypassesSlice.js";

export const store = configureStore({
    reducer: {
        advancements: advancementsReducer,
        brands: brandsReducer,
        datakeys: datakeysReducer,
        categories: categoriesReducer,
        currencies: currenciesReducer,
        entities: entitiesReducer,
        guides: guidesReducer,
        icons: iconsReducer,
        invoices: invoicesSlice,
        login: loginSlice,
        offices: officesReducer,
        orders: ordersReducer,
        orderservices: orderservicesReducer,
        payrollExecs: payrollExecsReducer,
        payrolls: payrollsReducer,
        products: productsReducer,
        programations: programationsReducer,
        progservices: progservicesReducer,
        resumendiario: resumendiarioReducer,
        services: servicesReducer,
        tariffs: tariffsReducer,
        taxes: taxesReducer,
        transfers: transfersReducer,
        types: typesReducer,
        typevalues: typesvaluesReducer,
        ubigeos: ubigeoReducer,
        unities: unitiesReducer,
        users: usersReducer,
        vehicles: vehiclesReducer,
        purchases: purchasesReducer,
        requirements: requirementsReducer,
        stock: stockReducer,
        kardex: kardexReducer,
        warehouses: warehousesReducer,
        numerator: numeratorsReducer,
        findrucs: findrucsReducer,

        candidates: candidatesReducer,
        workshifts: workshiftsReducer,
        journeypasses: journeypassesReducer,
    },
})