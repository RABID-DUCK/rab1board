<template>
    <div class="column-modal-wrapper text-center" id="modal-column">
        <label class=" mb-2" for="col-form-label desk-title"><b>Type title for {{title_event}}</b></label>
        <input v-model="title" class="form-control" type="text" name="desk-title" id="text-column-create" placeholder="Make auth">
        <button class="btn mt-2" @click.prevent="addColumn(dash_id, user_id)">Create</button>
        <span class="remove-column-modal text-black-50" @click="closeModal">X</span>
    </div>
</template>

<script>
export default {
    name: "CreatePanel",
    props: ['dash_id', 'user_id', 'title_event'],
    data(){
        return {
            title: ''
        }
    },
    methods: {
        addColumn(){
            fetch('/api/column/create', {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: this.title,
                    dashboard_id: this.dash_id
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.title = '';

                    this.$emit('columnsList', {
                        columnsList: data.columns
                    })
                })
        }
    }
}
</script>

<style scoped>

</style>
