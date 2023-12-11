import axios from "axios";
import {mapGetters, mapState} from "vuex";
import router from '../router/index'

export const moduleDash = {
    computed: {
        ...mapGetters(['statusUser', 'infoUser']),
        ...mapState({
            authUser: state => state.auth.user
        })
    },
    state: {
        havePermission: false
    },
    mutations: {

    },
    actions: {
        havePermissions: ({commit, getters}, data) => {
            axios.post('/api/dashboard/permission', {
                user_id: getters.infoUser.id,
                dash_id: data
            })
                .then(res => {

                })
                .catch(err => {
                    if(err.response.status === 423){
                        router.push({name: 'main'})
                    }
                })
        }
    },
    getters: {
        statusPermission(state){
            return state.havePermission;
        }
    }
}
