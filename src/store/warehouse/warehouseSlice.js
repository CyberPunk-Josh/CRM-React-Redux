import { createSlice } from '@reduxjs/toolkit';

export const wareHouseSlice = createSlice({
    name: 'warehouse',
    initialState: {
        isSaving: false,
        messageSaved: '',
        wareHouses: [],
    },
    reducers: {
        setWareHouses: (state, action) => {
            state.wareHouses = action.payload
        },
        savingNewWarehouse: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyWarehouse: (state, action) => {
            state.wareHouses.push(action.payload);
            state.isSaving = false;
        },
        deleteWarehouseById: (state, action) => {
            state.wareHouses = state.wareHouses.filter(warehouse => warehouse.id !== action.payload);
        },
        updateWarehouse: (state, action) => {
            state.isSaving = false;
            state.wareHouses = state.wareHouses.map((warehouse) => {
                if(warehouse.id === action.payload.id) {
                    return action.payload
                }

                return warehouse;
            })

            state.messageSaved = `${action.payload.name}, has been updated`;
        }
    }
});


// Action creators are generated for each case reducer function
export const { setWareHouses, savingNewWarehouse, addNewEmptyWarehouse, deleteWarehouseById, updateWarehouse } = wareHouseSlice.actions;