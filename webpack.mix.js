let mix = require('laravel-mix');
const path = require('path');

mix.js('resources/js/app.js', 'public/js')
    .js('resources/js/main.js', 'public/js')
    .js('resources/js/module.js', 'public/js')
    .react()
    .sass('resources/css/app.scss', 'public/css')
    .sass('resources/css/variables.scss', 'public/css')
    .sass('resources/css/UI.scss', 'public/css')
    .sass('resources/css/backend.scss', 'public/css')
    .sass('resources/css/media.scss', 'public/css')
    // .setPublicPath("public");
