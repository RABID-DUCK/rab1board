<template>
    <div class="panel main-content">
        <div class="row" id="dashboard-list">
            <section class="unuathorized d-flex flex-column" v-if="!this.$store.getters.statusUser">
                <b class="text-center">Чтобы создавать проекты нужно авторизоваться! <i class="bi bi-emoji-smile"></i></b>
                <router-link to="/login" class="btn btn-login">Авторизоваться</router-link>
            </section>

            <b class="text-center mb-5">Здесь будут ваши рабочие проекты <i class="bi bi-emoji-smile"></i></b>

            <div v-if="this.$store.getters.statusUser">
                <section class="authorize list-dashboards" v-if="dashboards">
                    <div class="col-sm-6 mb-3 mb-sm-0 wrapper-dash" v-for="dash in dashboards">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">{{dash.title}}</h5>
                                <a class="card-users"><img src="/images/avatar_none.png" alt="Аватар по умолчанию"></a>
                                <router-link  :to="{ name: 'dashboard', params: {id: coder(dash.id), title: dash.title }}" class="btn btn-search">Перейти в проект</router-link>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="d-flex flex-column" v-if="!created">
                    <button class="btn w-75 add-dashboard" id="btn-create-dashboard" @click.prevent="openCreateDashboardModal">Добавить проект</button>
                </section>

                <add-panel v-else place-holder="Придумайте название" :class-props="'card-body add-dashboard-panel animate-window'" @infoComponent="createDashboard"
                          @closeModal="closeModal" label_title="Название проекта"/>
            </div>
        </div>


    </div>
</template>

<script>
import ClosePanel from "../components/ClosePanel";
import AddPanel from "../components/AddPanel";

export default {
    name: "MainPage",
    components: {ClosePanel, AddPanel},

    data() {
        return {
            dashboards: [],
            dash_title: '',
            created: false,
        }
    },
    watch: {
        '$store.getters.statusUser': function (value) {
            if (value){
                this.getDashboards()
            }
        }
    },
    methods: {
        openCreateDashboardModal(){
            this.created = true;
        },
        createDashboard(data){
            this.created = true;

            fetch('/api/dashboard/create', {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: data.info,
                    user_id: this.$store.state.auth.user.id
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 401){
                        alert(data.message)
                        return;
                    }
                    this.created = false;
                    this.dash_title = '';
                    this.getDashboards()
                    this.closeModal()
                })
        },
        getDashboards(){
            this.axios.get('/api/getDashboards', {
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getToken}`
                }
            })
                .then(res => {
                    this.dashboards = res.data;
                })
        },
        closeModal(){
            this.created = false;
        },
    }
}
</script>

<style lang="scss" scoped>
.wrapper-dash{
    max-width: 400px;
}

.list-dashboards{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

}
</style>
