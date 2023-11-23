<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header text-center">Register</div>

                    <div class="card-body">
                        <form method="POST" action="register">
                            <div class="row mb-3">
                                <label for="name" class="col-md-4 col-form-label text-md-end">Name</label>

                                <div class="col-md-6">
                                    <input id="name" v-model="name" type="text" class="form-control " name="name" required autocomplete="name" autofocus>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="name" class="col-md-4 col-form-label text-md-end">Login</label>

                                <div class="col-md-6">
                                    <input id="login" v-model="login" type="text" class="form-control " name="login" value="" required autocomplete="login" autofocus>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="email" class="col-md-4 col-form-label text-md-end">Email address</label>

                                <div class="col-md-6">
                                    <input id="email" v-model="email" type="email" class="form-control" name="email" value="" required autocomplete="email">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>

                                <div class="col-md-6">
                                    <input id="password" v-model="password" type="password" class="form-control" name="password" required autocomplete="new-password">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-end">Confirm password</label>

                                <div class="col-md-6">
                                    <input id="password-confirm" v-model="password_confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                                </div>
                            </div>

                            <div class="row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary" @click.prevent="register">
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
            message: '',
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
        }
    }
}
</script>

<style scoped>

</style>
