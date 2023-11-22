<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header text-center">Login</div>
                    <div class="card-body">
                        <form method="POST" action="login">
                            <div class="row mb-3">
                                <label for="email" class="col-md-4 col-form-label text-md-end">Email address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control is-invalid" name="email" value="" required autocomplete="email" autofocus>

<!--                                    @error('email')-->
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ message }}</strong>
                                    </span>
<!--                                    @enderror-->
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control is-invalid" name="password" required autocomplete="current-password">

<!--                                    @error('password')-->
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ message }}</strong>
                                    </span>
<!--                                    @enderror-->
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-6 offset-md-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember">

                                        <label class="form-check-label" for="remember">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn">
                                        Login
                                    </button>

<!--                                    @if (Route::has('password.request'))-->
                                    <a class="btn btn-link" href="reset-password">
                                        Forgot your password?
                                    </a>
<!--                                    @endif-->
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
export default {
    name: "Login",
    data(){
        return {
            message: ''
        }
    }
}
</script>

<style scoped>

</style>
