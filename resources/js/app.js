import './bootstrap';
import {createApp} from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import {moduleAuth} from './modules/auth'
import {moduleDash} from './modules/dashboard';
import {moduleNotifications} from "./modules/notifications";
import {moduleTooltip} from "./modules/tooltip";

const app = createApp(App)

const store = createStore({
    modules: {
        auth: moduleAuth,
        dashboard: moduleDash,
        notifications: moduleNotifications,
        tooltip: moduleTooltip
    },
})

app.use(router)
    .use(store)
    .use(VueCookies, {expires: '30d'})

app.mixin({
    data() {
        return {
            tooltipOpen: false
        }
    },
    mounted() {
        if(!this.$store.getters.statusUser) {
            this.$store.dispatch('getInfoUser')
        }
        window.addEventListener('keydown', this.escCloseModal)
    },
    destroy(){
        window.removeEventListener('keydown', this.escCloseModal)
    },
    created: function(){
        this.$store.dispatch('initUserLogged')
    },
    methods: {
        coder(id){ // зашифровать
            return btoa(id);
        },
        decoder(id) { // расшифровать
            return parseInt(atob(id), 10);
        },
        closeModal(){
            this.$emit('closeModal', {
                isActive: false
            })
        },
        escCloseModal(e){
            if(e.key === 'Escape') this.closeModal();
        },
    },
})

app.config.globalProperties.axios = axios;
app.mount('#app');
