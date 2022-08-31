import { createSlice } from '@reduxjs/toolkit';

export const storeSlice = createSlice({
    name: 'store',
    initialState: {
        isSaving: false,
        messageSaved: '',
        stores: []
    },
    reducers: {
        setStores: (state, action ) => {
            state.stores = action.payload
        },
        savingNewStore: (state) => {
            state.isSaving = true;
        },
        addNewStore: (state, action) => {
            state.stores.push(action.payload);
            state.isSaving = false;
        },
        deleteStoreById: (state, action) => {
            state.stores = state.stores.filter(store => store.id !== action.payload);
        },
    }
});


// Action creators are generated for each case reducer function
export const { setStores, savingNewStore, addNewStore, deleteStoreById } = storeSlice.actions;