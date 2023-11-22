<template>
    <div class="modal-notification hide-slow bg-dark bg-gradient text-white" id="notification-modal">
        <span class="close-modal" onclick="closeModalSlow('notification-modal')">X</span>
        <div v-if="notifs && notifs.length > 0" v-for="notif in notifs">
            <div class="notif" data-notif="${item.id}">
                {{notif.message}}
                <i class="bi bi-check-square read-not" style="cursor: pointer;" @click.prevent="notifRead(notif.id)"></i>
            </div>
        </div>
        <b v-else class="text-white text-center" style="position: absolute; top: 45%;">Здесь будут ваши непрочитанные уведомления <i class="bi bi-bell"></i></b>
    </div>

    <i class="notification bi bi-bell" @click.prevent="openNotif(this.$store.state.user)"><span class="count-not" id="countNot" v-if="notifs_count > 0">{{notifs_count}}</span></i>
</template>

<script>
export default {
    name: "Notifications",
    data(){
        return {
            notifs_count: 0,
            notifs: []
        }
    },
    methods: {
        openNotif(){
            const modal = document.getElementById('notification-modal');
            modal.classList.remove('hide-slow')
            this.refreshnotifs_count();
        },
        refreshnotifs_count(){
            this.axios.post('/api/getNotification',{
                'user_id': this.$store.state.user.id,
            })
                .then(res => {
                    this.notifs_count = res.length === 0 ? 0 : res.length;
                    this.notifs = res
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
        }
    }
}
</script>

<style scoped>

</style>
