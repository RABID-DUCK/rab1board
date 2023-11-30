import './bootstrap';
import {createApp} from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import {moduleAuth} from './modules/auth'
import {moduleDash} from './modules/dashboard';

const app = createApp(App)

const store = createStore({
    modules: {
        auth: moduleAuth,
        dashboard: moduleDash
    },
})

app.use(router)
    .use(store)
    .use(VueCookies, {expires: '30d'})

app.mixin({
    mounted() {
        if(!this.$store.getters.statusUser) {
            this.$store.dispatch('getInfoUser')
        }
    },
    created: function(){
        this.$store.dispatch('initUserLogged')
    },
    methods: {
        coder(id){ // зашифровать
            return btoa(id.toString());
        },
        decoder(id) { // расшифровать
            return parseInt(atob(id), 10);
        },
    },
})

app.config.globalProperties.axios = axios;
app.mount('#app');
