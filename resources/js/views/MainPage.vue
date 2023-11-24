<template>
    <div class="panel main-content">
        <div class="row" id="dashboard-list">
            <section class="unuathorized d-flex flex-column" v-if="!this.$store.getters.statusUser">
                <b class="text-center">Чтобы создавать проекты нужно авторизоваться! <i class="bi bi-emoji-smile"></i></b>
                <router-link to="/login" class="btn btn-login">Авторизоваться</router-link>
            </section>

            <div v-if="this.$store.getters.statusUser">
                <section class="authorize list-dashboards" v-if="dashboards">
                    <div class="col-sm-6 mb-3 mb-sm-0 wrapper-dash" v-for="dash in dashboards">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">{{dash.title}}</h5>
                                <a class="card-users"><img src="/images/avatar_none.png" alt="Аватар по умолчанию"></a>
                                <router-link :to="{name: 'dashboard', params: {id: dash.id}}" class="btn btn-search">Перейти в проект</router-link>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <b class="text-center" v-if="!dashboards">Здесь будут ваши рабочие проекты <i class="bi bi-emoji-smile"></i></b>
                    <button class="btn w-75 add-dashboard" id="btn-create-dashboard" @click.prevent="openCreateDashboardModal">Добавить проект</button>
                </section>
            </div>
        </div>
    </div>

    <div class="col-sm-6 mb-3 mb-sm-0 create-dashboard-window position-relative"
         id="create-dashboard-window" v-if="created">
        <close-panel @click.prevent="closeModal" />
        <div class="card">
            <div class="card-body">
                <label class="form-label card-title">Название проекта</label>
                <input v-model="dash_title" class="form-control" type="text" id="title-dashboard">
                <a class="btn btn-search mt-2" id="create-dashboard" @click.prevent="createDashboard" disabled>Создать</a>
            </div>
        </div>
    </div>
</template>

<script>
import ClosePanel from "../components/ClosePanel";
export default {
    name: "MainPage",
    components: {ClosePanel},

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
        createDashboard(){
            let btn = document.getElementById('create-dashboard');
            btn.classList.add('btn-disabled')
            this.created = true;

            fetch('/api/dashboard/create', {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: this.dash_title,
                    user_id: this.$store.state.auth.user.id
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.dashboards = data;

                    if (data.status === 401){
                        alert(data.message)
                        btn.classList.remove('btn-disabled')
                        return;
                    }
                    btn.classList.remove('btn-disabled')
                    this.created = false;
                    this.dash_title = '';
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
        }
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
