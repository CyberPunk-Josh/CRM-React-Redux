import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadStore = async(uid = '') => {
    if(!uid) throw new Error('Uid not specified');

    const collectionRef = collection( FirebaseDB, `${uid}/crm/store`);
    const docs = await getDocs(collectionRef);

    const stores = [];
    docs.forEach( doc => {
        stores.push({
            id: doc.id,
            ...doc.data()
        })
    })

    return stores;
}