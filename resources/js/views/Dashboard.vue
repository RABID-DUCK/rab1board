<template>
<!--    Левая панель-->
    <div class="d-flex h-100">
        <div class="panel dashboard-single" id="left-panel-dash">
            <input type="hidden" id="dashboard-id" :value="dash_id">
            <div class="info-left-panel">
                <div class="dashboard-single-user">
                    <div>
                        <img :src="'/images/'+this.$store.state.auth.user.image" alt="Фото профиля" width="50" height="60">
                    </div>
                    <div>
                        <b>{{this.$store.state.auth.user.login}}</b>
                        <span :class="{'text-danger': this.$store.state.auth.user.premium, 'text-secondary': !this.$store.state.auth.premium}">
                        {{this.$store.state.auth.user.premium ? "Premium" : "Free"}}
                    </span>
                    </div>
                </div>
            </div>

            <div class="position-relative name-dashboard" data-rename-dashboard>
                <h2 v-if="!rename_dash" class="text-center " title="Название вашего проекта" >
                    {{dash_title}}
                </h2>
                <i class="bi bi-pen-fill" v-if="!rename_dash" data-title-dashboard @click.prevent="rename_dash = true"></i>
                <input-save v-if="rename_dash" @valueTitle="renameDashboard" :title_="dash_title" />
            </div>

            <div class="dashboard-single-left-panel">
                <button class="btn-participiants" @click.prevent="addUsersModal(dash_id)">
                    Participants
                    <span>+</span>
                </button>
                <add-panel v-if="clickedAddUser" label_title="Пригласить пользователя в проект" :id="dash_id"
                           :class-props="'add-user'" @infoComponent="clickAddUser" :place-holder="'Введите почту пользователя'" />
                <a href="">Chart</a>
                <a href="">Scheduled events</a>
                <button class="btn disabled" type="button">Chat dashboard</button>
            </div>
        </div>
<!--        Конец левой панели-->

<!--        вывод колонок-->
        <div class="desk-wrapper d-flex justify-content-start" id="desk-wrapper" >
            <div v-if="columns" class="wrap" v-for="(column, index) in columns" :key="column.id" :data-column-id="column.id" :data-order="column.order">
                <div v-show="!columnClicked[index]" class="column" @click.prevent="columnClicked[index] = true" data-column-title="">
                    <span>{{ column.title }}</span>
                    <i class="bi bi-check-lg save-column hide"></i>
                </div>
                <input-save v-if="columnClicked[index]" @valueTitle="clickRenameColumn" :title_="column.title" :id="column.id" />

    <!--                Вывод задач-->
                <div class="desk-block" id="desk-list">
                    <div v-for="desk in column.desks" class="desk" @click="viewDesk(desk.id)" :data-desk-id="desk.id"
                         style="{'box-shadow: 0 0 10px 3px' + desk.color[0].color: desk.color_id}">
                        <p>{{ desk.title }}</p>
                        <img v-if="desk.image" :src="desk.image" :alt="desk.title">
                        <div class="data-desk">
                            <input class="custom-checkbox" type="checkbox" id="status" name="status" value="yes"
                                   v-bind:checked="desk.status" @click="doneTask(desk.id)">
                            <time datetime='2011-11-18T14:54:39.929Z' name='date' id='data-desk'
                                  :class="{'text-muted': !desk.data_end,'text-danger fw-bold': today(desk.data_end),
                          'fw-bold': !today(desk.data_end)}">
                                {{ desk.data_end ? today(desk.data_end) ? 'Сегодня' : 'До ' + desk.data_end : 'Сроков нет' }}
                            </time>
                        </div>
                        <span>status</span>
                    </div>

                        <!--                    Добавить задачу-->
                    <button class="add-desk" id="add-task-title" @click="createDeskMiniModal(column.id)">+ Add desk</button>
                        <!--                    конец добавления задачи-->
                </div>
    <!--                Конец вывода задач-->

            </div>
<!--            Конец вывода колонок-->

                        <!--            создание колонки-->
            <div class="add-column-panel" id="add-column-panel">
                <button class="add-column" @click.prevent="addColumnModal(dash_id)">+ Add column</button>
                <create-panel v-if="create_column" :dash_id="dash_id"
                              :user_id="this.$store.state.auth.user.id" :title_event="'column'" @columnsList="clickAddColumn" />
            </div>
                        <!--           конец создание колонки -->
        </div>
    </div>
</template>

<script>
import inputSave from "../components/InputSave";
import CreatePanel from "../components/CreatePanel";
import AddPanel from "../components/AddPanel";

export default {
    name: "Dashboard",
    components: {inputSave, CreatePanel, AddPanel},

    props: ['title', 'columnsList'],
    data() {
        return {
            columns: null,
            dash_id: null,
            dash_title: null,
            rename_dash: false,
            create_column: false,
            columnClicked: [],
            clickedAddUser: false
        };
    },
    mounted() {
        this.dash_id = this.decoder(this.$route.params.id);
        this.dash_title = this.$route.params.title;
        this.getColumns();
    },
    methods: {
        renameDashboard(data){
            this.rename_dash = true
            this.axios.post('/api/dashboard/rename', {
                id: this.dash_id,
                title: data.title
            })
                .then(res => {
                    this.dash_title = res.data.title
                    this.$router.replace('/dashboard/'+this.coder(this.dash_id)+'/'+res.data.title);
                    this.rename_dash = false
                })
                .catch(err => {
                    this.rename_dash = false
                })
        },
        addUsersModal(id){
            this.clickedAddUser = true;
        },
        clickAddUser(data){
            this.axios.post('/api/dashboard/addUser', {
                dashboard_id: data.id,
                email: data.info
            })
        },
        clickAddColumn(column_id){
            this.create_column = false;
            this.getColumns()
        },
        clickRenameColumn(data){
            this.axios.post('/api/column/rename', {
                id: data.id,
                title: data.title
            })
                .then(res => {
                    this.columnClicked = false;
                    this.getColumns()
                })
        },
        viewDesk(deskID){

        },
        doneTask(deskID){

        },
        today(date){

        },
        createDeskMiniModal(columnID){

        },
        addColumnModal(dashID){
            this.create_column = true;
        },
        getColumns(){
            this.axios('/api/getColumns/'+this.dash_id)
                .then(res => {
                    this.columns = res.data;
                    this.columnClicked = this.columns.map(() => false);
                })
        }
    }
}
</script>

<style scoped>

</style>
