<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Capiboard</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=marmelad:400" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/4a76de025c.js" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <link rel="stylesheet" href="{{ asset('css/UI.css') }}">
    </head>
    <body class="antialiased">
            @include('layouts/header')

        <div class="content-wrapper d-flex justify-content-between" id="wrapper">

            @yield('content')
        </div>
                    {{--    Scripts--}}
        <script src="{{ asset('js/main.js') }}"></script>
        <script src="{{asset('js/app.js')}}"></script>

    </body>
</html>
