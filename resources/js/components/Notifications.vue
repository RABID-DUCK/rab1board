<template>
    <div v-if="panel_open" class="modal-notification  bg-dark bg-gradient text-white">
        <span class="close-modal" @click="panel_open = false">X</span>
        <div v-if="notifs && notifs.length > 0" v-for="not in notifs">
            <section class="notif" data-notif="${item.id}">
                <span>{{not.message}}</span>
                <div class="notif-btns" v-if="not.type === 'invite_dashboard'">
                    <button class='btn btn-success' @click.prevent="setConfirm(user.id, this.decoder(this.$route.params.id), true)">Принять</button>
                    <button class='btn btn-danger' @click.prevent="setConfirm(user.id, this.decoder(this.$route.params.id), false)">Отклонить</button>
                </div>
<!--                <i class="bi bi-check-square read-not" style="cursor: pointer;" @click.prevent="notifRead(not.id)"></i>-->
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
                    if(res.status === 200) refreshNotifs(this.$store.state.user.id);
                })
        },
        setConfirm(user_id, dash_id, action){

        },
    }
}
</script>

<style scoped>

</style>
