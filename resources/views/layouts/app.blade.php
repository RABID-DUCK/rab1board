<!DOCTYPE html>
{{--<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">--}}
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

{{--        <title>{{__('messages.title')}}</title>--}}

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=marmelad:400" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/4a76de025c.js" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <link rel="stylesheet" href="{{ asset('css/UI.css') }}">
        <link rel="stylesheet" href="{{ asset('css/media.css') }}">
        <script src="{{asset('js/plugins/dropzone-min.js')}}"></script>
        <link href="{{asset('css/plugins/basic.css')}}" rel="stylesheet" type="text/css" />
        <link href="{{asset('css/plugins/dropzone.css')}}" rel="stylesheet" type="text/css" />
{{--        <script src="https://code.jquery.com/jquery-3.6.0.js"></script>--}}
{{--        <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>--}}
    </head>
    <body class="antialiased">
             @include('layouts/header')
           <div class="content-wrapper d-flex justify-content-between" id="wrapper">

            @yield('content')
            <div class="backModal hide" id="backModal">

            </div>
            <div id="wrapper-modal" class="wrapper-modal hide-animate">
                <div class="modal-desk bg-dark bg-gradient text-white" data-modal-desk data-keyboard="false" data-backdrop="static">
                </div>
            </div>
               <div class="modal-notification hide-slow bg-dark bg-gradient text-white" id="notification-modal">
                   <span class="close-modal" onclick="closeModalSlow('notification-modal')">X</span>
               </div>
            </div>

                {{--    Scripts--}}
            <script src="{{ asset('js/main.js') }}" ></script>
            <script src="{{ asset('js/helper.js') }}" ></script>
            <script src="{{ asset('js/app.js') }}"></script>
             <script>
                 window.Echo.channel('notifications')
                     .listen('.notifications', res => {
                         refreshNotifs(res.user_id)
                     })
             </script>

    </body>
</html>
