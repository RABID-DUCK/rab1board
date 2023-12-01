<template>
    <div v-if="modalClosing" class="modal-desk bg-dark bg-gradient text-white add-user" id="addUserModal">
        <span class="close-modal" @click.prevent="closeModal()">X</span>
        <label class="form-label" for="user-email">Почта пользователя</label>
        <input class="form-control" type="text" id="user-email">
        <button class="btn text-white" @click.prevent="sendInvite(desk_id)">Отправить</button>
    </div>
</template>

<script>
export default {
    name: "AddUserModal",
    props: ['desk_id'],
    data(){
        return {
            modalClosing: false
        }
    },
    methods: {
        closeModal(){
            this.modalClosing = false;
        },
        sendInvite(){

        }
    }
}
</script>

<style scoped>

</style>
