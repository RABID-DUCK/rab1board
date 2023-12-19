<template>
	<div class="d-flex flex-column">
		<textarea v-model="text" class="desk" style="{'box-shadow: 0 0 10px 3px'}" cols="30" rows="2"></textarea>
		<div class="d-flex">
			<button class="add-desk" id="add-desk-title" @click.prevent="createDesk">✔️ Add desk</button>
			<button class="add-desk" id="add-desk-title" @click.prevent="$emit('cancel');">✖️</button>
		</div>
	</div>
</template>
<script>
export default {
	name: "AddDesk",
	props: ["title_", "dash_id", 'column_id'],
	data() {
		return {
			title: this.title_,
            text: ''
		};
	},
	methods: {
		sendValue(desk) {
			this.$emit("addedDesk", {
				id: this.id,
				title: this.title,
                desk: desk
			});
		},
        createDesk(){
            this.axios.post('/api/desk/create', {
                title: this.text,
                dashboard_id: this.dash_id,
                column_id: this.column_id,
                user_id: this.$store.getters.infoUser.id
            })
                .then(res => {
                    this.sendValue(res.data.desk)
                })
        }
	},
};
</script>
<style lang=""></style>
