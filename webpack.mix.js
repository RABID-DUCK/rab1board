let mix = require('laravel-mix');
mix.js('resources/js/app.js', 'public/js')
    .js('resources/js/main.js', 'public/js')
    .sass('resources/css/app.scss', 'public/css')
    .sass('resources/css/variables.scss', 'public/css')
    .sass('resources/css/UI.scss', 'public/css')
    .sass('resources/css/backend.scss', 'public/css')
