/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./resources/js/main.js ***!
  \******************************/
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
placeContentMain = function placeContentMain() {
  var content = document.getElementById('wrapper');
  if (document.querySelector('.dashboard-single')) {
    content.style.cssText = "margin: 1rem 1rem 1rem 0; width: 100% !important;";
    content.classList.remove('justify-content-between');
  } else {
    content.style.cssText = "margin: 1rem auto;";
  }
};
placeContentMain();
openModalLangs = function openModalLangs(id) {
  fetch('/api/langs/' + id).then(function (response) {
    return response.json();
  }).then(function (data) {
    document.getElementById('id-lang').value = data[0].id;
    document.getElementById('key-lang').value = data[0].name;
    document.getElementById('text-lang-ru').value = data[0].ru;
    document.getElementById('text-lang-en').value = data[0].en;
  });
};
openModalUsers = function openModalUsers(id) {
  fetch('/api/user/' + id).then(function (response) {
    return response.json();
  }).then(function (data) {
    document.getElementById('user-name').value = data.user.name;
    document.getElementById('user-email').value = data.user.email;
    document.getElementById('user-login').value = data.user.login;
    document.getElementById('user-id').value = data.user.id;
    var select = document.getElementById('user-role');
    select.innerHTML = "";
    var _iterator = _createForOfIteratorHelper(data.roles),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var role = _step.value;
        var option = document.createElement('option');
        option.value = role.id;
        option.innerText = role.role;
        if (role.id === data.user_role.id) option.selected = true;
        select.appendChild(option);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
};
openModalDesk = function openModalDesk(id) {
  fetch('/api/desk/' + id).then(function (response) {
    return response.json();
  }).then(function (data) {
    document.getElementById('desk-id').value = data.id;
    document.getElementById('desk-title').value = data.title;
    document.getElementById('desk-description').value = data.description;
    document.getElementById('status').value = data.status;
    document.getElementById('desk-start').value = data.data_start;
    document.getElementById('desk-end').value = data.data_end;
  });
};
openCreateDashboardModal = function openCreateDashboardModal(user_id) {
  document.getElementById('btn-create-dashboard').insertAdjacentHTML('afterend', "\n        <div class=\"col-sm-6 mb-3 mb-sm-0 create-dashboard-window\" id=\"create-dashboard-window\">\n                <div class=\"card\">\n                    <div class=\"card-body\">\n                        <label class=\"form-label card-title\">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0430</label>\n                        <input class=\"form-control\" type=\"text\" id=\"title-dashboard\">\n                        <input type=\"hidden\" type=\"text\" id=\"id-user\">\n                        <p class=\"card-text\">Users</p>\n                        <a class=\"btn btn-search\" id=\"create-dashboard\">\u0421\u043E\u0437\u0434\u0430\u0442\u044C</a>\n                    </div>\n                </div>\n            </div>\n    ");
  document.getElementById('create-dashboard').addEventListener('click', function () {
    var title = document.getElementById('title-dashboard').value;
    fetch('/api/dashboard/create', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        user_id: user_id
      })
    }).then(function (response) {
      return response.json();
    }).then(function (data) {})["catch"](function (error) {
      console.log(error);
    });
  });
};
/******/ })()
;