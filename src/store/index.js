import Vue from 'vue';
import Vuex from 'vuex';
import {api} from '../api/api';
import {v1} from "uuid";

Vue.use(Vuex);

const realtorsModule = {
    namespaced: true,
    state: () => ({
        items: [],
        searchValue: 'кадо'
    }),
    getters: {
        realtorsItems: state => {
            return state.items
        },
        getSearchValue: state => {
            return state.searchValue
        }
    },
    // Actions
    mutations: {
        setRealtors(state, items) {

            console.log(items);
            state.items = items;
        },

        setRealtor(state, item) {

            state.items = [...state.items, item];
        },
        updateRealtors(state) {

            // state.items.forEach(i => i.firstName = i.firstName + "1")
        },
        saveRealtorSuccess(state, item) {
            console.log(item);
            let itemIndex = -1;
            state.items.forEach((i, index) => {
                if (i.id === item.id) {
                    itemIndex = index;
                    i.registrationDate = item.registrationDate;
                }
            });
        },
        createRealtorSuccess(state, item) {
            console.log('createRealtorSuccess')
        },
        setSearchValue (state, value) {
            state.searchValue = value;
        }
    },
    // Thunks
    actions: {
        async updateRealtors(context) {
            setInterval(() => {
                context.commit('updateRealtors')
            }, 3000)
        },
        async fetchRealtors(context) {
            const snapShot = await api.getRealtors();
            const arrayDoc = snapShot.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }));

            context.commit('setRealtors', arrayDoc)
        },
        async saveRealtor(context, data) {
            await api.updateRealtors(data);
            context.commit('saveRealtorSuccess', data);
        },
        async createRealtor(context, data) {
            const maxId = context.state.items.reduce((acc, item) => {
                if (acc < +item.id) {
                    acc = +item.id
                }
                return acc
            }, 1);
            try {
                await api.createNew({...data, guid: v1(), id: maxId + 1});
            } catch (error) {
                console.log(error)
            }

            context.commit('setRealtor', data)
        },

    },
};

export default new Vuex.Store({
    state: () => ({}),
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        realtors: realtorsModule
    }
})


