import Vue from 'vue'

export const EventBus = new Vue({
    methods: {
        eleveClique(eleve) {
            this.$emit("AfficheEleve", eleve);
        }

    }
});