@extends('layouts.app')

@section('content')
    <div class="panel dashboard-single">
            <div class="info-left-panel">
                <div class="dashboard-single-user">
                    <div>
                        <img src="{{asset('images/'.$user->image)}}" alt="Фото профиля" width="50" height="60">
                    </div>
                    <div>
                        <b>{{$user->login}}</b>
                        <span class="{{$user->premium ? "text-danger" : "text-secondary"}}">{{$user->premium ? "Premium" : "Free"}}</span>
                    </div>
                </div>
            </div>
            <hr>
        <div class="dashboard-single-left-panel">
                <button class="btn-participiants">
                    Participants
                    <span>+</span>
                </button>

            <a href="">Chart</a>
            <a href="">Scheduled events</a>
        </div>

    </div>
    <div class="desk-wrapper d-flex justify-content-start" id="desk-wrapper">
        @if(isset($columns))
            @foreach($columns as $column)
                <div class="wrap" data-column-id="{{$column->id}}">
                    <div class="column">
                        <span>{{$column->title}}</span>
                    </div>
                    <div class="desk-block">
                        <div class="desk">
                            <p>Title task</p>
                            <img src="" alt="">
                            <div class="data-desk">
                                <input class="custom-checkbox" type="checkbox" id="status" name="status" value="yes">
                                <time datetime="2011-11-18T14:54:39.929Z" name="date">2023-08-01 15:00</time>
                            </div>
                            <span>status</span>
                        </div>
                        <button class="add-desk" id="add-task-title" onclick="createDeskMiniModal({{$dashboard->id}}, {{$column->id}})">+ Add desk</button>
                    </div>

                </div>
            @endforeach

                <div class="add-column-panel" id="add-column-panel">
                    <button class="add-column" onclick="addColumnModal({{$dashboard->id}})">+ Add column</button>
                </div>
        @endif

    </div>
@endsection
