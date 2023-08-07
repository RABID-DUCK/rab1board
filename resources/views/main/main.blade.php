@extends('layouts.app')

@section('content')
    <div class="panel left-side-main">
        @if(!auth()->user())
            <b>Здесь будет информация после авторизации</b>
            @else
        <div class="mini-info-panel d-flex flex-column justify-content-center">
            <div>
                <i class="fa-regular fa-chart-bar"></i>
                <a href="#">Boards</a>
            </div>
            <div>
                <i class="fa-solid fa-layer-group"></i>
                <a href="#">Patterns</a>
            </div>
            <div>
                <i class="fa-solid fa-gear"></i>
                <a href="#">Settings</a>
            </div>
        </div>
        <hr>
        <div class="info-left-panel">
            <div class="dropdown d-flex justify-content-center ">
                <button class="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-user-ninja"></i>
                    <b>{{auth()->user()->login}}</b>
                </button>
                <ul class="dropdown-menu">
                    <li><button class="dropdown-item" type="button">Boards</button></li>
                    <li><button class="dropdown-item" type="button">Colloborators</button></li>
                    <li><button class="dropdown-item" type="button">Settings</button></li>
                </ul>
            </div>
        </div>
        @endif
    </div>
    <div class="panel main-content">
        <div class="row">
            @if(!auth()->user())
                <b class="text-center">Чтобы создавать проекты нужно авторизоваться! <i class="bi bi-emoji-smile"></i></b>
                <a href="{{route('login')}}" class="btn btn-login">Авторизоваться</a>
            @else
        {{--            Array loop of card-boards            --}}
            @if(isset($dashboards))
                @foreach($dashboards as $dash)
            <div class="col-sm-6 mb-3 mb-sm-0">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{$dash->title}}</h5>
                        <a class="card-users"><img src="images/{{$dash->getUsers[0]->image}}" alt="Аватар по умолчанию" title="{{$dash->getUsers[0]->login}}"></a>
                        <a href="{{route('board.show', $dash->id)}}" class="btn btn-search">Перейти в проект</a>
                    </div>
                </div>
            </div>
                @endforeach
            @else
                <b class="text-center">Здесь будут ваши рабочие проекты <i class="bi bi-emoji-smile"></i></b>
                <button class="btn w-75 add-dashboard" id="btn-create-dashboard" onclick="openCreateDashboardModal({{auth()->user()->id}})">Добавить проект</button>
            @endif
        {{--      End loop of card-boards      --}}
            @endif
        </div>
    </div>
@endsection
