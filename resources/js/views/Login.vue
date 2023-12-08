<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header text-center">Login</div>
                    <div class="card-body">
                        <form method="POST">
                            <div v-if="errors" class="alert alert-danger">
                                <b>Ошибка заполнения полей!</b>
                                <ul>
                                    <li v-for="error in errors">{{error[0]}}</li>
                                </ul>
                            </div>

                            <div class="row mb-3">
                                <label for="email" class="col-md-4 col-form-label text-md-end">Email address</label>

                                <div class="col-md-6">
                                    <input v-model="email" id="email" type="email" class="form-control" :class="{'is-invalid': errors.email || errors.user_not_found}"
                                           name="email" required autocomplete="email" autofocus>

                                    <span v-if="errors.email" class="invalid-feedback" role="alert">
                                        <strong>{{ errors.email[0] }}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>

                                <div class="col-md-6">
                                    <input v-model="password"  id="password" type="password" class="form-control" :class="{'is-invalid': errors.password}"
                                           name="password" required autocomplete="current-password">

                                    <span v-if="errors.password" class="invalid-feedback" role="alert">
                                        <strong>{{ errors.password[0] }}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-6 offset-md-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember" v-model="checked">

                                        <label class="form-check-label" for="remember">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn" @click.prevent="sendLogin">
                                        Login
                                    </button>

                                    <a class="btn btn-link forgot-pass" href="reset-password">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueCookies from "vue-cookies";

export default {
    name: "Login",
    data(){
        return {
            errors: "",
            email: '',
            password: '',
            checked: false
        }
    },
    mounted() {
        if(this.$store.getters.statusUser) this.$router.push({name: 'main'})
    },
    methods: {
        sendLogin(){
            this.axios.post('/api/login', {
                "email": this.email,
                "password": this.password,
                "checked": this.checked
            })
                .then(res => {
                    if(this.checked){
                        VueCookies.set('access_token', res.data.access_token, {expires: '30d'});
                    }else{
                        sessionStorage.setItem('access_token', res.data.access_token);
                    }
                    this.$store.commit('AUTH_LOGIN', res.data.user);
                    this.$router.push({name: 'main'});
                })
                .catch(err => {
                    this.errors = err.response.data.errors;
                })
        }
    }
}
</script>

<style scoped>
.forgot-pass{
    margin-left: 15px;
}
</style>
