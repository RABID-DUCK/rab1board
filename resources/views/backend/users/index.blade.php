@extends('backend.index')

@section('content')

    @if(!isset($users) || count($users) === 0)
        <b>{{__('messages.users_empty') || "Ленгов нет"}}</b>
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
            <th class="text-white">name</th>
            <th class="text-white">email</th>
            <th class="text-white">role</th>
            <th class="text-white">Action</th>
        </thead>
        <tbody class="table-light table-backend">
        @foreach($users as $user)
            <tr>
                <td>{{$user->id}}</td>
                <td>{{$user->name}}</td>
                <td>{{$user->email}}</td>
                <td class="{{$user->getRole->role === 'admin' ? 'text-danger font-weight-bold' : ''}}">{{$user->getRole->role}}</td>
                <td class="action">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@mdo" onclick="openModalUsers({{$user->id}})">
                        <i class="bi bi-pen-fill"></i>
                    </button>

                    {!! Form::open(['method' => 'delete', 'route' => ['backend.users.delete', $user->id]]) !!}
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
                    <h5 class="modal-title" id="exampleModalLabel">Добавить пользователя</h5>
                    <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="{{__('messages.close')}}">X</button>
                </div>
                <div class="modal-body">
                    <form method="POST" action="{{route('backend.users.create')}}">
                        @csrf
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Имя:</label>
                            <input type="text" name="name" class="form-control" id="username">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Почта:</label>
                            <input class="form-control" name="email" id="email">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Придумайте логин:</label>
                            <input class="form-control" name="login" id="login">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Придумайте пароль:</label>
                            <input type="password" class="form-control" name="password" id="password">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Повторите пароль:</label>
                            <input type="password" class="form-control" name="password_confirmation" id="password_confirmation">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Роль:</label>
                            <select class="form-control text-info" name="role_id" id="role">
                                @foreach($roles as $role)
                                    <option value="{{$role->id}}">{{$role->role}}</option>
                                @endforeach
                            </select>
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
                    <h5 class="modal-title" id="exampleModalLabel2">Изменить данные пользователя</h5>
                    <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="{{__('messages.close')}}">X</button>
                </div>
                <div class="modal-body">
                    <form method="POST" action="{{route('backend.users.update')}}">
                        @csrf
                        @method('PATCH')
                        <input type="hidden" name="user_id" id="user-id">
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Имя:</label>
                            <input type="text" name="name" class="form-control" id="user-name">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Почта:</label>
                            <input class="form-control" name="email" id="user-email">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Логин:</label>
                            <input class="form-control" name="login" id="user-login">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Роль:</label>
                            <select class="form-control text-info" name="role_id" id="user-role">

                            </select>
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
