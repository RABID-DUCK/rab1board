import { mapGetters, mapState } from "vuex";

export const moduleNotifications = {
    computed: {
        ...mapGetters(['statusUser', 'infoUser', 'getToken']),
        ...mapState({
            authUser: state => state.auth.user // Добавляем геттер из модуля auth
        })
    },
    state: {
        notify_count: 0,
        notifs: []
    },
    mutations: {
        SET_NOTIFY_COUNT: (state, value) => {
            state.notify_count = value;
        }
    },
    actions: {
        getNotifications: ({commit, getters}) => {
            const user = getters.infoUser;
            window.Echo.private(`notification.${user.id}`)
                .listen('.notifications_created', function(e) {
                    commit('SET_NOTIFY_COUNT', Object.keys(e).length)
                })
        }
    },
    getters: {
        countNotifs(state){
            return state.notify_count;
        }
    }
}
