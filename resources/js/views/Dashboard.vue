<template>
	<!--    Левая панель-->
	<div class="d-flex h-100">
		<div class="panel dashboard-single" id="left-panel-dash">
			<input type="hidden" id="dashboard-id" :value="dash_id" />
			<div class="info-left-panel">
				<div class="dashboard-single-user">
					<div>
						<img :src="'/images/' + this.$store.state.auth.user.image" alt="Фото профиля" width="50" height="60" />
					</div>
					<div>
						<b>{{ this.$store.state.auth.user.login }}</b>
						<span :class="{ 'text-danger': this.$store.state.auth.user.premium, 'text-secondary': !this.$store.state.auth.premium }">
							{{ this.$store.state.auth.user.premium ? "Premium" : "Free" }}
						</span>
					</div>
				</div>
			</div>

			<div class="position-relative name-dashboard" data-rename-dashboard>
				<h2 v-if="!rename_dash" class="text-center" title="Название вашего проекта">
					{{ dash_title }}
				</h2>
				<i class="bi bi-pen-fill text-white" v-if="!rename_dash" data-title-dashboard @click.prevent="rename_dash = true"></i>
				<input-save v-if="rename_dash" @valueTitle="renameDashboard" :title_="dash_title" />
			</div>

			<div class="dashboard-single-left-panel">
				<button class="btn-participiants" @click.prevent="addUsersModal(dash_id)">
					Participants
					<span>+</span>
				</button>
				<add-panel
					v-if="clickedAddUser"
					label_title="Пригласить пользователя в проект"
					:id="dash_id"
					:class-props="'dinamycal-modal card-body add-dashboard-panel animate-window'"
					@infoComponent="clickAddUser"
					:place-holder="'Введите почту пользователя'"
					@closeModal="clickedAddUser = false"
				/>
				<a href="">Chart</a>
				<a href="">Scheduled events</a>
                <router-link :to="'/chat/'+ coderDashId + '/' + this.dash_title">Чат проекта</router-link>
			</div>
		</div>
		<!--        Конец левой панели-->

		<!--        вывод колонок-->
		<div class="desk-wrapper d-flex justify-content-start" id="desk-wrapper">
            <Columns :dash_id="decoder(this.$route.params.id)" />
			<!--            Конец вывода колонок-->
		</div>
	</div>
</template>

<script>
import inputSave from "../components/InputSave";
import addDesk from "../components/AddDesk.vue";
import CreatePanel from "../components/CreatePanel";
import AddPanel from "../components/AddPanel";
import Columns from "../components/main/Columns";

export default {
	name: "Dashboard",
	components: { inputSave, addDesk, CreatePanel, AddPanel, Columns },

	props: ["title", "columnsList"],
	data() {
		return {
			dash_id: null,
			dash_title: null,
			rename_dash: false,
			clickedAddUser: false,
		};
	},
    computed: {
        coderDashId(){
            return this.coder(this.dash_id)
        }
    },
    watch: {
        '$store.getters.statusUser': function (value){
            if (value){
                this.$store.dispatch('havePermissions', this.decoder(this.$route.params.id));
            }
        },
        '$store.getters.getToken': function (value) {
            if(!value) this.$router.push({name: 'main'})
        }
    },
	mounted() {
		this.dash_id = this.decoder(this.$route.params.id);
		this.dash_title = this.$route.params.title;
	},
	methods: {
		renameDashboard(data) {
			this.rename_dash = true;
			this.axios.post("/api/dashboard/rename", {
					id: this.dash_id,
					title: data.title,
				})
				.then((res) => {
					this.dash_title = res.data.title;
					this.$router.replace("/dashboard/" + this.coder(this.dash_id) + "/" + res.data.title);
					this.rename_dash = false;
				})
				.catch((err) => {
					this.rename_dash = false;
				});
		},
		addUsersModal(id) {
			this.clickedAddUser = true;
		},
		clickAddUser(data) {
			this.axios.post("/api/dashboard/addUser", {
				dashboard_id: data.id,
				email: data.info,
			})
                .then(res => {
                    this.$store.commit('SET_CLASSES', res.data.err ? 'bg-danger text-white' : 'bg-success text-white')
                    this.$store.commit('SET_TEXT', res.data.message)
                })
		},
		clickAddColumn(column_id) {

		},
		addDesk(deskID) {},
	},
};
</script>

<style scoped></style>
