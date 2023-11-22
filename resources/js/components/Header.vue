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
<!--                        @if(Auth::check())-->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                login user
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <hr>
                                <li><a class="dropdown-item" href="backend.index">Admin</a></li>
                                <li>
                                    <a class="dropdown-item" href="logout"
                                       onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                                        Logout
                                    </a>

                                    <form id="logout-form" action="logout" method="POST" class="d-none">

                                    </form>
                                </li>
                            </ul>
<!--                            @else-->
                        <li><a class="dropdown-item auth-link" href="login">Войти/</a></li>
                        <li><a class="dropdown-item auth-link" href="register">Зарегистрироваться</a></li>
<!--                        @endif-->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
<!--        @if(Auth::check())-->
        <i class="notification bi bi-bell" @click.prevent="openNotif(user)"><span class="count-not" id="countNot">{{notifs}}</span></i>
<!--        @endif-->
    </nav>
</template>

<script>
export default {
    name: "header",
    data() {
        return {
            user: null,
            notifs: 0
        }
    }
}
</script>

<style scoped>

</style>
