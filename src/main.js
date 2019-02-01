import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueResource from 'vue-resource';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCalendar)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Buefy,{defaultIconPack: 'fa'})
Vue.use(VueResource)

Vue.config.productionTip = false;


const config = {
  apiKey: "AIzaSyB1KU4uBhahk89s_B8D2oydmKa23994B8c",
  authDomain: "campusbuddy-dd715.firebaseapp.com",
  databaseURL: "https://campusbuddy-dd715.firebaseio.com/",
  projectId: "campusbuddy-dd715"
};

firebase.initializeApp(config);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
