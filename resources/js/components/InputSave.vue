<template>
    <div class="position-relative" data-info-edit>
        <input type="hidden" :value="id">
        <input class="form-control" data-rename-dashboard-title v-model="title">
        <i @click="sendValue" class="bi bi-check-lg save-column" id="rename-dashboard"
           style="position: absolute;top: 7px;right: 5px;text-align: center;"></i>
    </div>
</template>

<script>
export default {
    name: "InputSave",
    props: ['title_', 'id'],
    data(){
        return {
            title: this.title_
        }
    },
    methods: {
        sendValue(){
            this.$emit('valueTitle', {
                id: this.id ?? null,
                title: this.title
            })
        }
    }
}
</script>

<style scoped>

</style>
