<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header text-center">Register</div>

                    <div class="card-body">
                        <form method="POST" action="register">
                            <div v-if="errors" class="alert alert-danger">
                                <b>Ошибка заполнения полей!</b>
                                <ul>
                                    <li v-for="error in errors">{{error[0]}}</li>
                                </ul>
                            </div>

                            <div class="row mb-3">
                                <label for="name" class="col-md-4 col-form-label text-md-end">Name</label>

                                <div class="col-md-6">
                                    <input id="name" v-model="name" type="text" class="form-control" :class="{'is-invalid': errors.name}" name="name" required autocomplete="name" autofocus>
                                    <span v-if="errors.name" class="invalid-feedback" role="alert">
                                        <strong>{{errors.name[0]}}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="name" class="col-md-4 col-form-label text-md-end">Login</label>

                                <div class="col-md-6">
                                    <input id="login" v-model="login" type="text" class="form-control" :class="{'is-invalid': errors.login}" name="login" required autocomplete="login" autofocus>
                                    <span v-if="errors.login" class="invalid-feedback" role="alert">
                                        <strong>{{errors.login[0]}}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="email" class="col-md-4 col-form-label text-md-end">Email address</label>

                                <div class="col-md-6">
                                    <input id="email" v-model="email" type="email" class="form-control" :class="{'is-invalid': errors.email}" name="email" required autocomplete="email">
                                    <span v-if="errors.email" class="invalid-feedback" role="alert">
                                        <strong>{{errors.email[0]}}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>

                                <div class="col-md-6">
                                    <input id="password" v-model="password" type="password" :class="{'is-invalid': errors.password}"  class="form-control" name="password" required autocomplete="new-password">
                                    <span v-if="errors.password" class="invalid-feedback" role="alert">
                                        <strong>{{errors.password[0]}}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-end">Confirm password</label>

                                <div class="col-md-6">
                                    <input id="password-confirm" v-model="password_confirm" :class="{'is-invalid': errors.password}" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                                    <span v-if="errors.password" class="invalid-feedback" role="alert">
                                        <strong>{{errors.password[0]}}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-search" @click.prevent="register">
                                        Register
                                    </button>
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
    name: "Register",
    data(){
        return {
            errors: '',
            name: '',
            login: '',
            email: '',
            password: '',
            password_confirm: ''
        }
    },
    mounted() {
        if(this.$store.getters.statusUser) this.$router.push({name: 'main'})
    },
    methods: {
        register(){
            this.axios.post('/api/user/register', {
                name: this.name,
                login: this.login,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirm,
            })
                .then(res => {
                    VueCookies.set('access_token', res.data.access_token, {expires: '30d'})
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

</style>
