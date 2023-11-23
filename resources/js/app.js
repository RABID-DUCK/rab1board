import './bootstrap';
import {createApp} from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import {moduleAuth} from './modules/auth'

const app = createApp(App)

const store = createStore({
    modules: {
        auth: moduleAuth
    }
})

app.use(router)
    .use(store)
    .use(VueCookies, {expires: '30d'})

app.mixin({
    data(){
        return {
            isFetching: false
        }
    },
    mounted() {
        if(!this.$store.getters.statusUser && !this.isFetching) {
            this.isFetching = true;
            this.$store.dispatch('getInfoUser')
        }
    },
    created: function(){
        this.$store.dispatch('initUserLogged')
    },
    methods: {}
})

app.config.globalProperties.axios = axios;
app.mount('#app');
