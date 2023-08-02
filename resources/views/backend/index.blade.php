<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>{{__('messages.title')}}</title>
    <!-- plugins:css -->
    <link rel="stylesheet" href="{{asset('admin/vendors/materialdesignicons.min.css')}}">
    <link rel="stylesheet" href="{{asset('admin/vendors/vendor.bundle.base.css')}}">
    <!-- endinject -->
    <!-- Plugin css for this page -->
    <link rel="stylesheet" href="{{asset('admin/vendors/jquery-jvectormap.css')}}">
    <link rel="stylesheet" href="{{asset('admin/vendors/flag-icon.min.css')}}">
    <link rel="stylesheet" href="{{asset('admin/vendors/owl.carousel.min.css')}}">
    <link rel="stylesheet" href="{{asset('admin/vendors/owl.theme.default.min.css')}}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <!-- endinject -->
    <!-- Layout styles -->
    <link rel="stylesheet" href="{{asset('admin/vendors/style.css')}}">
    <link rel="stylesheet" href="{{ asset('css/UI.css') }}">
    <link rel="stylesheet" href="{{ asset('css/backend.css') }}">
    <!-- End layout styles -->
{{--    <link rel="shortcut icon" href="assets/images/favicon.png" />--}}
</head>
<body>
<div class="container-scroller">
    <div class="row p-0 m-0 proBanner" id="proBanner">
        <div class="col-md-12 p-0 m-0">
            <div class="card-body card-body-padding d-flex align-items-center justify-content-between">
                <div class="ps-lg-1">
                    <div class="d-flex align-items-center justify-content-between">
                        <p class="mb-0 font-weight-medium me-3 buy-now-text">{{__('messages.admin_panel')}}</p>
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                    <a class="icon" href="{{route('backend.index')}}"><i class="bi bi-house-door-fill"></i></a>
                </div>
            </div>
        </div>
    </div>
    <!-- partial:partials/_sidebar.html -->
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
            <li class="nav-item profile">
                <div class="profile-desc">
                    <div class="profile-pic">
                        <div class="count-indicator">
                            <img class="img-xs rounded-circle " src="{{asset('images/avatar_none.png')}}" alt="">
                            <span class="count bg-success"></span>
                        </div>
                        <div class="profile-name">
                            <h5 class="mb-0 font-weight-normal">Henry Klein</h5>
                            <span>Gold Member</span>
                        </div>
                    </div>
                    <a class="icon" href="#" id="profile-dropdown" data-bs-toggle="dropdown"><i class="bi bi-three-dots-vertical"></i></a>
                    <div class="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list" aria-labelledby="profile-dropdown">
                        <a href="#" class="dropdown-item preview-item">
                            <div class="preview-thumbnail">
                                <div class="preview-icon bg-dark rounded-circle">
                                    <i class="bi bi-gear"></i>
                                </div>
                            </div>
                            <div class="preview-item-content">
                                <p class="preview-subject ellipsis mb-1 text-small">{{__('messages.account_settings')}}</p>
                            </div>
                        </a>
                    </div>
                </div>
            </li>
            <li class="nav-item nav-category">
                <span class="nav-link">{{__('messages.backend_navigation')}}</span>
            </li>
            <li class="nav-item menu-items">
                <a class="nav-link" href="{{route('backend.langs.index')}}">
              <span class="menu-icon">
                <i class="bi bi-translate"></i>
              </span>
                    <span class="menu-title">{{__('messages.langs')}}</span>
                </a>
            </li>
            <li class="nav-item menu-items">
                <a class="nav-link" href="{{route('backend.langs.index')}}">
              <span class="menu-icon">
                <i class="bi bi-translate"></i>
              </span>
                    <span class="menu-title">{{__('messages.users')}}</span>
                </a>
            </li>
            <li class="nav-item menu-items">
                <a class="nav-link" href="{{route('backend.langs.index')}}">
              <span class="menu-icon">
                <i class="bi bi-translate"></i>
              </span>
                    <span class="menu-title">{{__('messages.dashboards')}}</span>
                </a>
            </li>
            <li class="nav-item menu-items">
                <a class="nav-link" href="{{route('backend.langs.index')}}">
              <span class="menu-icon">
                <i class="bi bi-translate"></i>
              </span>
                    <span class="menu-title">{{__('messages.tasks')}}</span>
                </a>
            </li>
            <li class="nav-item menu-items">
                <a class="nav-link" href="{{route('backend.langs.index')}}">
              <span class="menu-icon">
                <i class="bi bi-translate"></i>
              </span>
                    <span class="menu-title">{{__('messages.roles')}}</span>
                </a>
            </li>
            <li class="nav-item menu-items">
                <a class="nav-link" href="{{route('backend.langs.index')}}">
              <span class="menu-icon">
                <i class="bi bi-translate"></i>
              </span>
                    <span class="menu-title">{{__('messages.comments')}}</span>
                </a>
            </li>
            <li class="nav-item menu-items">
                <a class="nav-link" href="{{route('backend.langs.index')}}">
              <span class="menu-icon">
                <i class="bi bi-translate"></i>
              </span>
                    <span class="menu-title">{{__('messages.columns')}}</span>
                </a>
            </li>
            <li class="nav-item menu-items">
                <a class="nav-link" href="{{route('backend.langs.index')}}">
              <span class="menu-icon">
                <i class="bi bi-translate"></i>
              </span>
                    <span class="menu-title">{{__('messages.desks')}}</span>
                </a>
            </li>
            <li class="nav-item menu-items">
                <a class="nav-link" href="{{route('backend.langs.index')}}">
              <span class="menu-icon">
                <i class="bi bi-translate"></i>
              </span>
                    <span class="menu-title">{{__('messages.color_desks')}}</span>
                </a>
            </li>
            <hr>
            <li class="nav-item menu-items">
                <a class="nav-link" href="{{route('board.index')}}">
              <span class="menu-icon">
                <img src="{{asset('images/avatar_none.png')}}"  width="20" height="20" alt="go to dashboard">
              </span>
                    <span class="menu-title">{{__('messages.dashboard')}}</span>
                </a>
            </li>
        </ul>
    </nav>
    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
        <div class="main-panel">
            <div class="content-wrapper backend">

                @if(\Illuminate\Support\Facades\Request::is('backend/admin'))
                    @include('backend.main')
                @else
                    @yield('content')
                @endif
            </div>
            <!-- content-wrapper ends -->
            <!-- partial:partials/_footer.html -->
            <footer class="footer">
                <div class="d-sm-flex justify-content-center justify-content-sm-between">
                    <span class="text-muted d-block text-center text-sm-left d-sm-inline-block">{{__('messages.copyright')}}</span>
                </div>
            </footer>
            <!-- partial -->
        </div>
        <!-- main-panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
</div>
<!-- container-scroller -->
<!-- plugins:js -->
<script src="{{asset('admin/vendors/vendor.bundle.base.js')}}"></script>
<!-- endinject -->
<!-- Plugin js for this page -->
<script src="{{asset('admin/vendors/Chart.min.js')}}"></script>
<script src="{{asset('admin/vendors/progressbar.min.js')}}"></script>
<script src="{{asset('admin/vendors/jquery-jvectormap.min.js')}}"></script>
<script src="{{asset('admin/vendors/jquery-jvectormap-world-mill-en.js')}}"></script>
<script src="{{asset('admin/vendors/owl.carousel.min.js')}}"></script>
<script src="{{asset('admin/js/jquery.cookie.js')}}" type="text/javascript"></script>
<!-- End plugin js for this page -->
<!-- inject:js -->
<script src="{{asset('admin/js/off-canvas.js')}}"></script>
<script src="{{asset('admin/js/hoverable-collapse.js')}}"></script>
<script src="{{asset('admin/js/misc.js')}}"></script>
<script src="{{asset('admin/js/settings.js')}}"></script>
<script src="{{asset('admin/js/todolist.js')}}"></script>
<!-- endinject -->
<!-- Custom js for this page -->
<script src="{{asset('admin/js/dashboard.js')}}"></script>
<!-- End custom js for this page -->
</body>
</html>
