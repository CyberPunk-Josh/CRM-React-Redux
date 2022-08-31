import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadWarehouse } from "../../helpers/loadWarehouse";
import { addNewEmptyWarehouse, deleteWarehouseById, savingNewWarehouse, setWareHouses, updateWarehouse } from "./warehouseSlice";

export const startNewWarehouse = ({country, city, name, capacity, officer, category}) => {

    return async ( dispatch, getState ) => {
        dispatch( savingNewWarehouse() );
        //uid from user
        const { uid } = getState().auth;

        const newWarehouse = {
            country: country,
            city: city,
            name: name,
            capacity: capacity,
            officer: officer,
            category: category,
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/crm/warehouse`));
        await setDoc(newDoc, newWarehouse);

        // adding id to the note:
        newWarehouse.id = newDoc.id
        const listWarehouses = await loadWarehouse( uid );

        //dispatch to add a new warehouse
        dispatch(addNewEmptyWarehouse());
        //dispatch to load all warehouses
        dispatch( setWareHouses(listWarehouses));
    }
}

export const startLoadWarehouses = () => {
    return async ( dispatch, getState ) => {
        const {uid} = getState().auth;

        const listWarehouses = await loadWarehouse( uid );

        dispatch( setWareHouses(listWarehouses));
    }
}

export const startDeleteWarehouse = (wareHouse) => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        const {id} = wareHouse;
        // delete note from firebase
        const docRef = doc( FirebaseDB, `${uid}/crm/warehouse/${id}`);
        await deleteDoc(docRef);

        //TODO: Update list items 
        dispatch( deleteWarehouseById(id) );
    }
}

export const startUpdateWarehouse = (wareHouse) => {
    return async ( dispatch, getState ) => {
        dispatch( savingNewWarehouse() );

        // uid from user
        const { uid } = getState().auth;
        const {id} = wareHouse;

        const wareHouseToFirestore = {...wareHouse}

        delete wareHouseToFirestore.id;

        const docRef = doc( FirebaseDB, `${uid}/crm/warehouse/${id}`);
        await setDoc( docRef, wareHouseToFirestore, {merge: true} );

        dispatch(updateWarehouse(wareHouse));

    }
}