@extends('layouts.app')

@section('content')
    <div class="panel left-side-main">
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
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-user-ninja"></i>
                    <b>Name name</b>
                </button>
                <ul class="dropdown-menu">
                    <li><button class="dropdown-item" type="button">Boards</button></li>
                    <li><button class="dropdown-item" type="button">Colloborators</button></li>
                    <li><button class="dropdown-item" type="button">Settings</button></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="panel main-content">

    </div>
@endsection
