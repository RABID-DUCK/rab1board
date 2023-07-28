@extends('backend.index')

@section('content')
    <button class="btn btn-add" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
        {{__('messages.add')}}</button>
    @if(!isset($langs))
        <b>{{__('messages.langs_empty')}}</b>
    @endif
    @if($errors->any())
        <div class="alert alert-danger">{{$errors->first('name')}}</div>
    @endif
    <b>{{ __('messages.main') }}</b>
    <table class="table">
        <thead class="table-dark text-white">
            <th class="text-white">ID</th>
            <th class="text-white">name</th>
            <th class="text-white">ru</th>
            <th class="text-white">en</th>
            <th class="text-white">Action</th>
        </thead>
        <tbody class="table-light table-langs">
        @foreach($langs as $lang)
            <tr>
                <td>{{$lang->id}}</td>
                <td>{{$lang->name}}</td>
                <td>{{$lang->ru}}</td>
                <td>{{$lang->en}}</td>
                <td class="action">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@mdo" onclick="openModalLangs({{$lang->id}})">
                        <i class="bi bi-pen-fill"></i>
                    </button>

                    {!! Form::open(['method' => 'delete', 'route' => ['backend.langs.delete', $lang->id]]) !!}
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
                    <h5 class="modal-title" id="exampleModalLabel">{{__('messages.add_lang')}}</h5>
                    <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="{{__('messages.close')}}">X</button>
                </div>
                <div class="modal-body">
                    <form method="POST" action="{{route('backend.langs.create')}}">
                        @csrf
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">{{__('messages.key_lang')}}:</label>
                            <input type="text" name="name" class="form-control" id="name-key">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">{{__('messages.russian')}}:</label>
                            <textarea class="form-control" name="ru" id="text-ru"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">{{__('messages.english')}}:</label>
                            <textarea class="form-control" name="en" id="text-en"></textarea>
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
                    <h5 class="modal-title" id="exampleModalLabel2">{{__('messages.add_lang')}}</h5>
                    <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="{{__('messages.close')}}">X</button>
                </div>
                <div class="modal-body">
                    <form method="POST" action="{{route('backend.langs.update')}}">
                        @csrf
                        @method('PATCH')

                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">{{__('messages.key_lang')}}:</label>
                            <input type="hidden" name="id" id="id-lang">
                            <input type="text" name="name" class="form-control" id="key-lang">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">{{__('messages.russian')}}:</label>
                            <textarea class="form-control" name="ru" id="text-lang-ru"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">{{__('messages.english')}}:</label>
                            <textarea class="form-control" name="en" id="text-lang-en"></textarea>
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
function openModalLangs(id){
    fetch('/api/langs/'+id)
        .then(response => response.json())
        .then(data => {
            document.getElementById('id-lang').value = data[0].id;
            document.getElementById('key-lang').value = data[0].name;
            document.getElementById('text-lang-ru').value = data[0].ru;
            document.getElementById('text-lang-en').value = data[0].en;
        })
}
</script>
