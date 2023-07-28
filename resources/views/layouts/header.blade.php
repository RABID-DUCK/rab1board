<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">CapiBoard</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                       aria-expanded="false">
                        Your boards
                    </a>

                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <hr>
                        <li><a class="dropdown-item" href="{{route('backend.index')}}">Admin</a></li>
                        @if(Auth::check())
                        <li><a class="dropdown-item" href="{{route('logout')}}">Выйти</a></li>
                        @else
                        <li><a class="dropdown-item" href="{{route('login')}}">Войти</a></li>
                        <li><a class="dropdown-item" href="{{route('register')}}">Зарегистрироваться</a></li>
                            @endif
                    </ul>

                </li>

                <li class="nav-item dropdown">
                    <select class="form-select" aria-label="Default select example">
                        <option value="ru" selected>Russian</option>
                        <option value="en">English</option>
                    </select>

                </li>
            </ul>
            <form class="d-flex" role="search">
                <input class="form-control search me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-search" type="submit">Search</button>
            </form>
        </div>
    </div>
</nav>
