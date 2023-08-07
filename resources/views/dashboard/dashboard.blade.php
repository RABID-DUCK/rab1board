@extends('layouts.app')

@section('content')
    <div class="panel dashboard-single">
            <div class="info-left-panel">
                <div class="dashboard-single-user">
                    <div>
                        <img src="{{asset('images/'.$user->image)}}" alt="Фото профиля" width="50" height="60">
                    </div>
                    <div>
                        <b>{{$user->name}}</b>
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
    <div class="desk-wrapper">

    </div>
@endsection
