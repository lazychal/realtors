import firebase from 'firebase';
import {v1} from "uuid";

export const api = {
    async getRealtors() {
        return firebase.firestore().collection("realtors").get();
    },
    async updateRealtors (data) {
        const guid = v1();
        return firebase.firestore().collection("realtors").doc(data.id).set({
            firstName: data.firstName,
            lastName: data.lastName,
            registrationDate: data.registrationDate,
            guid: !data.guid ? guid : data.guid
        })
    },
    async createNew (data) {

        return firebase.firestore().collection("realtors").doc(String(data.id)).set(data)
    }
};

// при добавлении нового риелтора, в doc() указываем его id. Таким образом этот id Будет служить путем documentPath,
// для последующих запросов, для изменения или удаления этого пользователя
// Генерировать guid с помощью  UU ID



//////////////////////
////////////////////////////////
////////////////////////////////////////
