<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="board.index">Rab1Board</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                           aria-expanded="false">
                            Your boards
                        </a>

                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <select class="form-select" aria-label="Default select example">
                            <option value="ru" selected>Russian</option>
                            <option value="en">English</option>
                        </select>

                    </li>
                </ul>

                <form class="d-flex w-50" role="search">
                    <input class="form-control search me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-search" type="submit">Search</button>
                </form>

                <div class="user">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown" v-if="isLogged">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                {{user.login}}
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <hr>
                                <li><a class="dropdown-item" href="backend.index">Admin</a></li>
                                <li class="logout">
                                    <a class="dropdown-item" @click.prevent="logout">
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li v-if="!isLogged"><router-link class="dropdown-item auth-link" to="/login">Войти/</router-link></li>
                        <li v-if="!isLogged"><router-link class="dropdown-item auth-link" to="/register">Зарегистрироваться</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
        <Notifications />
    </nav>
</template>

<script>
import Notifications from "./Notifications";

export default {
    name: "Header",
    components: {Notifications},

    data() {
        return {
            user: null,
            isLogged: false
        }
    },
    mounted(){
        this.user = this.$store.state.user;
        this.isLogged = this.$store.getters.statusUser;
    },
    watch: {
        '$store.getters.statusUser': function (value){
            this.isLogged = value;
            this.user = this.$store.getters.infoUser;
        }
    },
    methods: {
        logout(){
            this.$store.dispatch('logout');
        }
    }

}
</script>

<style scoped>
.logout{
    cursor: pointer;
}
</style>
