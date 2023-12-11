<template>
    <div class="position-relative" data-info-edit v-click-outside="sendValue">
        <input type="hidden" :value="id">
        <input class="form-control" data-rename-dashboard-title v-model="title">
        <i @click="sendValue" class="bi bi-check-lg save-column" id="rename-dashboard"
           style="position: absolute;top: 7px;right: 5px;text-align: center;"></i>
    </div>
</template>

<script>
import vClickOutside from 'click-outside-vue3'

export default {
    name: "InputSave",
    props: ['title_', 'id'],
    directives: {
        clickOutside: vClickOutside.directive
    },
    data(){
        return {
            title: this.title_
        }
    },
    methods: {
        sendValue(){
            this.$emit('valueTitle', {
                id: this.id,
                title: this.title
            })
        }
    }
}
</script>

<style scoped>

</style>
