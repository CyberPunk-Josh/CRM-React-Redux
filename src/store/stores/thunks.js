import { collection, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadStore } from "../../helpers/loadStores";
import { addNewStore, savingNewStore, setStores, deleteStoreById } from "./storeSlice"

export const startNewStore = ({ country, city, name, wareHouse, officer }) => {
    
    return async ( dispatch, getState ) => {
        dispatch( savingNewStore() );

        // uid from user
        const { uid } = getState().auth;

        const newStore = {
            country: country[0],
            city: city[0],
            name: name[0],
            warehouse: wareHouse[0],
            officer: officer[0],
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/crm/store`));
        await setDoc(newDoc, newStore);

        // adding id to the store:
        newStore.id = newDoc.id
        const listStores = await loadStore(uid);

        //dispatch to add a new store
        dispatch(addNewStore());
        //dispatch to load all the stores
        dispatch(setStores(listStores));
        
    }
}

export const startLoadStores = () => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;

        const listStores = await loadStore(uid);

        dispatch(setStores(listStores));
    }
}

export const startDeleteStore = (store) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const {id} = store;

        //delete store from firebase
        const docRef = doc( FirebaseDB, `${uid}/crm/store/${id}`);
        await deleteDoc(docRef);

        //update list items
        dispatch( deleteStoreById(id) );
    }
}