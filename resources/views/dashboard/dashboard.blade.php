@extends('layouts.app')

@section('content')
    <div class="panel dashboard-single" id="left-panel-dash">
        <input type="hidden" id="dashboard-id" value="{{$dashboard->id}}">
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

        <div class="position-relative name-dashboard" data-rename-dashboard>
            <h2 class="text-center " title="Название вашего проекта" >
                {{$dashboard->title}}
            </h2>
            <i class="bi bi-pen-fill" data-title-dashboard onclick="renameDashboard({{$dashboard->id}})"></i>
        </div>

        <div class="dashboard-single-left-panel">
            <button class="btn-participiants" onclick="addUsersModal({{$dashboard->id}})">
                Participants
                <span>+</span>
            </button>

            <a href="">Chart</a>
            <a href="">Scheduled events</a>
            <button class="btn disabled" type="button" onclick="tester()">Chat dashboard</button>
        </div>

    </div>
    <div class="desk-wrapper d-flex justify-content-start" id="desk-wrapper">
        @if(isset($columns))
            @foreach($columns->sortBy('order') as $column)
                <div class="wrap" data-column-id="{{ $column->id }}" data-order="{{$column->order}}">
                    <div class="column" onclick="clickRenameColumn({{ $column->id }})" data-column-title="" onmousedown="dragDropColumns()">
                        <span>{{ $column->title }}</span>
                        <i class="bi bi-check-lg save-column hide"></i>
                    </div>
                    <div class="desk-block" id="desk-list">
                        @foreach($column->desks->sortBy('order') as $desk)
                            <div class="desk" onclick="viewDesk({{$dashboard->id}},{{$column->id}},{{$desk->id}})" data-desk-id="{{$desk->id}}"
                                 onmousedown="dragDropDesks()"
                             style="{{$desk->color_id ? "box-shadow: 0 0 10px 3px ".$desk->color[0]->color : '' }}">
                                <p>{{ $desk->title }}</p>
                                @if($desk->image)
                                <img src="{{ $desk->image }}" alt="{{ $desk->title }}">
                                @endif
                                <div class="data-desk">
                                    <input class="custom-checkbox" type="checkbox" id="status" name="status" value="yes"
                                        {{$desk->status ? "checked" : ''}}   onclick="doneTask({{$dashboard->id}}, {{$desk->id}})">
                                    <time datetime='2011-11-18T14:54:39.929Z' name='date' id='data-desk'
                                          class="{{ !$desk->data_end ? 'text-muted' : (\Carbon\Carbon::parse($desk->data_end)->isPast() ? 'text-danger fw-bold' : 'fw-bold') }}">
                                        {{ $desk->data_end ?
                                            (\Carbon\Carbon::parse($desk->data_end)->isToday() ? 'Сегодня' : 'До '.\Carbon\Carbon::parse($desk->data_end)->translatedFormat('j F Y H:i')) :
                                            'Сроков нет' }}
                                    </time>
                                </div>
                                <span>status</span>
                            </div>
                        @endforeach
                        <button class="add-desk" id="add-task-title" onclick="createDeskMiniModal({{ $dashboard->id }}, {{ $column->id }}, {{auth()->user()->id}})">+ Add desk</button>
                    </div>
                </div>
            @endforeach
                <div class="add-column-panel" id="add-column-panel">
                    <button class="add-column" onclick="addColumnModal({{$dashboard->id}}, {{auth()->user()->id}})">+ Add column</button>
                </div>
        @endif

    </div>

    <script>
        document.addEventListener("DOMContentLoaded", (event) => {
            @if(auth()->user())
                moveDesksWS({{auth()->user()->id ?? null}});
                moveColumn();
            @endif
        });
    </script>
@endsection
