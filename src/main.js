import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app';
import "firebase/auth"
import "firebase/database"
import 'firebase/storage'
import 'firebase/firestore'


Vue.config.productionTip = false;

let config = {
  apiKey: 'AIzaSyAXdNLKdGvXTkMMky40W8_8-emGA2Pf9JM',
  authDomain: 'realtorsdatabase-9bfb2.firebaseapp.com',
  databaseURL: 'https://realtorsdatabase-9bfb2.firebaseio.com',
  projectId: 'realtorsdatabase-9bfb2',
  storageBucket: 'realtorsdatabase-9bfb2.appspot.com',
  messagingSenderId: '865831037890',
  appId: '1:865831037890:web:58286468c1bfe8334a845b',
};
firebase.initializeApp(config);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
