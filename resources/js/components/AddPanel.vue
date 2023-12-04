<template>
    <div class="backModal" id="backModal" v-if="backModal" @click="closeModal"></div>
    <div class="bg-dark bg-gradient text-white" :class="classProps ?? ''">
        <span class="close-modal" @click="closeModal">X</span>
        <input type="hidden" :value="id ?? null">
        <label class="form-label" for="user-email">{{ label_title }}</label>
        <input class="form-control" type="text" id="user-email" v-model="title" :placeholder="placeHolder ?? null">
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
            default: null
        },
        placeHolder: {
            type: String,
            default: ""
        },
    },
    emits: ['infoComponent'],
    data() {
        return {
            title: this.title,
            backModal: true
        }
    },
    methods: {
        sendInfo(){
            this.backModal = false;

            this.$emit('infoComponent', {
                info: this.title ?? null,
                id: this.id ?? null,
            })
            this.closeModal();

            this.title = '';
        },
    }
}
</script>

<style scoped>

</style>
