import './bootstrap';
import {createApp} from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    getters: {}
})

app.use(router)
    .use(store)

app.mixin({})

app.config.globalProperties.axios = axios;
app.mount('#app');
