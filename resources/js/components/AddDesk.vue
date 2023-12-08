<template>
	<div class="d-flex flex-column">
		<textarea class="desk" style="{'box-shadow: 0 0 10px 3px'}" cols="30" rows="2"></textarea>
		<div class="d-flex">
			<button class="add-desk" id="add-desk-title" @click.prevent="clickColumn(index, 'addDesk')">✔️ Add desk</button>
			<button class="add-desk" id="add-desk-title" @click.prevent="cancel">✖️</button>
		</div>
	</div>
</template>
<script>
export default {
	name: "AddDesk",
	props: ["title_", "id"],
	data() {
		return {
			title: this.title_,
		};
	},
	methods: {
		sendValue() {
			this.$emit("add", {
				id: this.id,
				title: this.title,
			});
		},

        cancel() {
            this.$emit("cancel");
        }
	},
};
</script>
<style lang=""></style>
