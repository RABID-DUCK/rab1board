import VueCookies from "vue-cookies";
import axios from "axios";

export const moduleAuth = {
    state: {
        user: [],
        userLogged: false,
        token: sessionStorage.getItem('access_token') || VueCookies.get('access_token'),
        isFetching: false
    },
    mutations: {
        AUTH_LOGIN: (state, value) => {
            state.userLogged = true;
            state.user = value;
            state.token = sessionStorage.getItem('access_token') || VueCookies.get('access_token');
        },
        USER_LOGGED: (state, value) => {
            state.userLogged = value;
        },
        CLEAR_TOKEN: (state, value) => {
            state.token = value;
        }
    },
    actions: {
        initUserLogged: ({commit, getters}) => {
            commit('USER_LOGGED', getters.statusUser);
        },
        getInfoUser: ({commit, getters, state}) => {
            if(!getters.statusUser && state.token !== null && !state.isFetching){
                state.isFetching = true;
                axios.post('/api/user/getUser', {}, {
                    headers: {
                        Authorization: `Bearer ${state.token}`
                    }
                })
                    .then(res => {
                        commit('AUTH_LOGIN', res.data[1]);
                    })
            }
        },
        logout: ({commit, state}) => {
            let token = state.token;
            commit('CLEAR_TOKEN', null);
            axios.post('/api/user/logout', {
                'id': state.user.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    if(res.data.status === 401){
                        commit('AUTH_LOGIN', [])
                        commit('USER_LOGGED', false)
                        sessionStorage.removeItem('access_token')
                        VueCookies.remove('access_token');
                    }
                })
                .catch(err => {
                    commit('CLEAR_TOKEN', null);
                    VueCookies.remove('access_token');
                })
        }
    },
    getters: {
        statusUser(state){
            return state.userLogged;
        },
        infoUser(state){
            return state.user;
        },
        getToken(state){
            return state.token;
        }
    }
}
