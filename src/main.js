import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'

axios.defaults.baseURL = "http://127.0.0.1:8000/"
Vue.config.productionTip = false

//export const EventBus = new Vue();


// // ici je renvois une liste des ids des matieres choisies pour le prof dans le formulaire
/* if (this.editedItem.matiereEnseigne.length > 1) {
   this.editedItem.matiereEnseigne.forEach((matiere) => {
     matieres_ids.push(
       this.allMatieres.find((x) => x.nomMatiere == matiere).id
     );
   });
   console.log(
     "liste des ids des matières sélectionnées " + matieres_ids
   );
   this.editedItem.matiereEnseigne = matieres_ids;*/


new Vue({
    router,
    store,
    vuetify,
    axios,
    render: h => h(App)
}).$mount('#app')