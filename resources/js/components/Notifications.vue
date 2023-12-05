<template>
    <div v-if="panel_open" class="modal-notification  bg-dark bg-gradient text-white">
        <span class="close-modal" @click="panel_open = false">X</span>
        <div v-if="notifs && notifs.length > 0" v-for="not in notifs">
            <section class="notif position-relative" :data-notif="not.id">
                <span>{{findDashId(not.message).message}}</span>
                <div class="notif-btns" v-if="not.type === 'invite_dashboard'">
                    <button class='btn btn-success' @click.prevent="setConfirm(this.$store.state.auth.user.id, findDashId(not.message).dash_id, true, not.id)">Принять</button>
                    <button class='btn btn-danger' @click.prevent="setConfirm(this.$store.state.auth.user.id, findDashId(not.message).dash_id, false, not.id)">Отклонить</button>
                </div>
                <i v-else class="bi bi-check-square read-not" style="cursor: pointer;" @click.prevent="notifRead(not.id)"></i>
            </section>
        </div>
        <b v-else class="text-white text-center" style="position: absolute; top: 45%;">Здесь будут ваши непрочитанные уведомления<i class="bi bi-bell"></i></b>
    </div>

    <i class="notification bi bi-bell" @click.prevent="openNotif(this.$store.state.user)">
        <span class="count-not" v-if="notifs_count > 0">{{notifs_count}}</span>
    </i>
</template>

<script>
import AddPanel from "./AddPanel";

export default {
    name: "Notifications",
    components: {AddPanel},

    data(){
        return {
            notifs_count: 0,
            notifs: [],
            panel_open: false
        }
    },
    watch: {
        '$store.getters.statusUser': function (value){
            if(value){
                this.refreshNotifs_count()
            }
        }
    },
    methods: {
        openNotif(){
            this.panel_open = true;
            this.refreshNotifs_count();
        },
        refreshNotifs_count(){
            this.axios.post('/api/getNotification',{
                user_id: this.$store.state.auth.user.id,
            })
                .then(res => {
                    this.notifs_count = Object.keys(res.data).length;
                    this.notifs = res.data
                })
        },
        notifRead(id){
            this.axios.post('/api/notif/check', {
                'id': id,
                'read': true
            })
                .then(res => {
                    this.refreshNotifs_count(this.$store.state.auth.user.id);
                })
        },
        setConfirm(user_id, dash_id, action, not_id){
            this.axios.post('/api/dashboard/confirmInvite', {
                user_id: user_id,
                dashboard_id: dash_id,
                not_id: not_id,
                confirmed: action
            })
                .then(res => {
                    this.refreshNotifs_count();
                })
        },
        findDashId(message) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = message;
            const input = wrapper.querySelector('input[type="hidden"]');
            const value = input ? input.value : null;
            if (input) {
                input.parentNode.removeChild(input);
            }
            return {'dash_id': value, 'message': message.replace(/<(.|\n)*?>/g, '')};
        }
    }
}
</script>

<style scoped>
.notif{
    word-wrap: break-word;
    padding: 10px;
    margin-bottom: 15px;
}

.modal-notification{
    padding-top: 30px;
}

.read-not{
    cursor: pointer;
    position: absolute;
    top: -4px;
    right: 0;
    font-size: 18px;
}
</style>
