<template>
    <div v-if="isActive" class="modal-desk bg-dark bg-gradient text-white" :class="classProps">
        <span class="close-modal" @click.prevent="clicked = false">X</span>
        <input type="hidden" :value="id">
        <label class="form-label" for="user-email">{{label_title}}</label>
        <input class="form-control" type="text" id="user-email" v-model="title" :placeholder="placeHolder">
        <button class="btn text-white" @click.prevent="sendInfo">Отправить</button>
    </div>
</template>

<script>
export default {
    name: "AddPanel",
    props: {
        title_input: {
            type: String,
            default: ""
        },
        label_title: {
            type: String,
            default: ""
        },
        classProps: {
            type: String,
            default: ""
        },
        id: {
            type: Number,
            default: ''
        },
        placeHolder: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            title: this.title,
            isActive: true
        }
    },
    methods: {
        sendInfo(){
            this.title = '';
            this.isActive = false;

            this.$emit('infoComponent', {
                info: this.title,
                id: this.id
            })
        }

    }
}
</script>

<style scoped>

</style>
