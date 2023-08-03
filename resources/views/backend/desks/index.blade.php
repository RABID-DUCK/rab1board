@extends('backend.index')

@section('content')

    @if(!isset($desks) || count($desks) === 0)
        <b>{{__('messages.desks_empty') || "Ленгов нет"}}</b>
    @endif
    @if($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <button class="btn btn-add" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
        {{__('messages.add')}}</button>
    <b>{{ __('messages.main') }}</b>
    <table class="table">
        <thead class="table-dark text-white">
            <th class="text-white">ID</th>
            <th class="text-white">title</th>
            <th class="text-white">status</th>
            <th class="text-white">data_start</th>
            <th class="text-white">data_end</th>
        </thead>
        <tbody class="table-light table-backend">
        @foreach($desks as $desk)
            <tr>
                <td>{{$desk->id}}</td>
                <td>{{$desk->title}}</td>
                <td>{{$desk->status}}</td>
                <td>{{$desk->data_start}}</td>
                <td>{{$desk->data_end}}</td>
                <td class="action">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@mdo" onclick="openModalDesk({{$desk->id}})">
                        <i class="bi bi-pen-fill"></i>
                    </button>

                    {!! Form::open(['method' => 'delete', 'route' => ['backend.desks.delete', $desk->id]]) !!}
                    <button type="submit="><i class="bi bi-trash"></i></button>
                    {!! Form::close() !!}
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Добавить доску</h5>
                    <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="{{__('messages.close')}}">X</button>
                </div>
                <div class="modal-body">
                    <form method="POST" action="{{route('backend.desks.create')}}">
                        @csrf
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Название:</label>
                            <input type="text" name="title" class="form-control" id="title">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Описание:</label>
                            <input class="form-control" name="description" id="description">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Картинка:</label>
                            <input type="file" class="form-control" name="image" id="image">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Дата начала:</label>
                            <input type="date" class="form-control" name="data_start" id="data_start">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Дата окончания::</label>
                            <input type="date" class="form-control" name="data_end" id="data_end">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Статус:</label>
                            <input type="text" class="form-control" name="status" id="status">
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">{{__('messages.close')}}</button>
                            <input type="submit" class="btn" value="{{__('messages.add')}}" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel2">Изменить данные доски</h5>
                    <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="{{__('messages.close')}}">X</button>
                </div>
                <div class="modal-body">
                    <form method="POST" action="{{route('backend.desks.update')}}">
                        @csrf
                        @method('PATCH')
                        <input type="hidden" name="desk_id" id="desk-id">
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Название:</label>
                            <input type="text" name="title" class="form-control" id="desk-title" placeholder="Type title for desk">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Описание:</label>
                            <input class="form-control" name="description" id="desk-description" placeholder="Type description for desk">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Дата начала:</label>
                            <input type="datetime-local" class="form-control text-white" name="data_start" id="data_start">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Дата окончания::</label>
                            <input type="datetime-local" class="form-control" name="data_end" id="data_end">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Статус:</label>
                            <input type="text" class="form-control" name="status" id="status">
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">{{__('messages.close')}}</button>
                            <input type="submit" class="btn" value="{{__('messages.replace')}}" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

<script>

</script>
