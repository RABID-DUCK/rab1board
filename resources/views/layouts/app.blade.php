<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{__('messages.title')}}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=marmelad:400" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/4a76de025c.js" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
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
            <div class="modal-desk hide" data-modal-desk>
            </div>
    </body>
</html>
