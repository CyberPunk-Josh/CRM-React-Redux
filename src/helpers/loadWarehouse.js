import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const loadWarehouse = async(uid = '') => {
    if(!uid) throw new Error('Uid not found');

    const collectionRef = collection( FirebaseDB, `${uid}/crm/warehouse`);
    const docs = await getDocs(collectionRef);

    const wareHouses = [];
    docs.forEach( doc => {
        wareHouses.push({
            id: doc.id,
            ...doc.data()
        })
    })

    return wareHouses;
}