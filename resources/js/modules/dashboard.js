import axios from "axios";
import {mapGetters, mapState} from "vuex";

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
        havePermissions() {
            
            console.log(this.user)
            axios.post('/api/permission/user', {
                user_id: this.user.id
            })
                .then(res => {
                    console.log(res);
                });
        }
    },
    getters: {
        statusPermission(state){
            return state.havePermission;
        }
    }
}
