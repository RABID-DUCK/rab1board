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
    content.style.cssText = "margin: 1rem 1rem 1rem 0; width: 100% !important;height: 90vh;";
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
  document.getElementById('btn-create-dashboard').insertAdjacentHTML('afterend', "\n        <div class=\"col-sm-6 mb-3 mb-sm-0 create-dashboard-window\" id=\"create-dashboard-window\">\n                <div class=\"card\">\n                    <div class=\"card-body\">\n                        <label class=\"form-label card-title\">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0430</label>\n                        <input class=\"form-control\" type=\"text\" id=\"title-dashboard\">\n                        <input type=\"hidden\" type=\"text\" id=\"id-user\">\n                        <p class=\"card-text\">Users</p>\n                        <a class=\"btn btn-search\" id=\"create-dashboard\" disabled>\u0421\u043E\u0437\u0434\u0430\u0442\u044C</a>\n                    </div>\n                </div>\n            </div>\n    ");
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
    }).then(function (data) {
      document.getElementById('create-dashboard').classList.add('btn-disabled');
      if (data.status === 401) {
        alert(data.message);
        document.getElementById('create-dashboard').classList.remove('btn-disabled');
        return;
      }
      if (data.message) {
        alert(data.message);
        document.getElementById('create-dashboard').classList.remove('btn-disabled');
        return;
      }
      window.location.reload();
    })["catch"](function (error) {});
  });
};
addColumnModal = function addColumnModal(dashboard) {
  if (!document.getElementById('modal-column')) {
    document.getElementById('add-column-panel').insertAdjacentHTML('beforeend', "\n            <div class=\"column-modal-wrapper text-center\" id=\"modal-column\">\n                <label class=\" mb-2\" for=\"col-form-label desk-title\"><b>Type title for desk</b></label>\n                <input class=\"form-control\" type=\"text\" name=\"desk-title\" id=\"text-column-create\" placeholder=\"Make auth\">\n                <button class=\"btn mt-2\" onclick=\"addColumn(".concat(dashboard, ")\">Create</button>\n                <span class=\"remove-column-modal text-black-50\" onclick=\"deleteColumnModal('modal-column')\">X</span>\n            </div>\n    "));
  }
};
deleteColumnModal = function deleteColumnModal(id_name) {
  return document.getElementById(id_name).remove();
};
addColumn = function addColumn(dashboard) {
  var _this = this;
  var title = document.getElementById('text-column-create').value;
  fetch('/api/column/create', {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      dashboard_id: dashboard
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    _this.title = "";
    deleteColumnModal('modal-column');
    if (!document.querySelector('.column')) {
      var _dashboard = document.getElementById('dashboard-id').value;
      document.getElementById('add-column-panel').insertAdjacentHTML('beforebegin', "\n                     <div class=\"wrap\" data-column-id=\"".concat(data.column_id, "\">\n                        <div class=\"column\">\n                            <span>").concat(data.columns[data.columns.length - 1].title, "</span>\n                        </div>\n                        <div class=\"desk-block\">\n                        <div class=\"desk\">\n                            <p>").concat(data.desk.title, "</p>\n                            <img src=\"").concat(data.desk.image, "\" alt=\"").concat(data.desk.title, "\">\n                            <div class=\"data-desk\">\n                                <input class=\"custom-checkbox\" type=\"checkbox\" id=\"status\" name=\"status\" value=\"yes\">\n                                <time datetime=\"2011-11-18T14:54:39.929Z\" name=\"date\">").concat(data.desk.created_at, "</time>\n                            </div>\n                            <span>status</span>\n                        </div>\n                        <button class=\"add-desk\" id=\"add-task-title\" onclick=\"createDeskMiniModal(").concat(_dashboard, ", ").concat(data.column_id, ")\">+ Add desk</button>\n                    </div>\n                    </div>\n                "));
    } else {
      document.getElementById('add-column-panel').insertAdjacentHTML('beforebegin', "\n             <div class=\"wrap\" data-column-id=\"".concat(data.column_id, "\">\n                <div class=\"column\">\n                    <span>").concat(data.columns[data.columns.length - 1].title, "</span>\n                </div>\n                    <div class=\"desk-block\">\n                        <button class=\"add-desk\" id=\"add-task-title\" onclick=\"createDeskMiniModal(").concat(data.dashboard_id, ", ").concat(data.column_id, ")\">+ Add desk</button>\n                    </div>\n            </div>\n            "));
    }
  });
};
createDeskMiniModal = function createDeskMiniModal(dashboard, column) {
  var condition = '[data-column-id="' + column + '"]';
  var data_column = document.querySelector(condition);
  if (document.querySelector(condition).getAttribute('data-column-id') !== column && !data_column.querySelector('#create-modal-desk')) {
    data_column.querySelector('#add-task-title').insertAdjacentHTML('beforebegin', "\n        <div class=\"desk text-center\" id=\"create-modal-desk\">\n            <label class=\" mb-2\" for=\"col-form-label desk-title\"><b>Type title for desk</b></label>\n            <input class=\"form-control\" type=\"text\" name=\"desk-title\" id=\"desk-title-modal\" placeholder=\"Make auth\">\n            <button class=\"btn mt-2\" onclick=\"createDesk(".concat(dashboard, ", ").concat(column, ")\">Create</button>\n            <span class=\"remove-column-modal text-black-50\" onclick=\"deleteDeskModal(").concat(column, ")\">X</span>\n        </div>\n        "));
  }
};
deleteDeskModal = function deleteDeskModal(column) {
  var condition = '[data-column-id="' + column + '"]';
  var data_column = document.querySelector(condition);
  data_column.querySelector('#create-modal-desk').remove();
};
createDesk = function createDesk(dashboard, column) {
  var title = document.getElementById('desk-title-modal').value;
  fetch('/api/desk/create', {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      column_id: column,
      dashboard_id: dashboard
    })
  }).then(function (response) {
    return response.json();
  }).then(function (res) {
    if (res.message) {
      alert(res.message);
      return;
    }
    deleteDeskModal(res.column_id);
    var condition = '[data-column-id="' + res.column_id + '"]';
    var data_column = document.querySelector(condition);
    data_column.querySelector('#add-task-title').insertAdjacentHTML('beforebegin', "\n                <div class=\"desk\">\n                    <p>".concat(res.desk.title, "</p>\n                    <img src=\"").concat(res.desk.image, "\" alt=\"").concat(res.desk.title, "\">\n                    <div class=\"data-desk\">\n                        <input class=\"custom-checkbox\" type=\"checkbox\" id=\"status\" name=\"status\" value=\"yes\">\n                        <time datetime=\"2011-11-18T14:54:39.929Z\" name=\"date\">2023-08-01 15:00</time>\n                    </div>\n                    <span>status</span>\n                </div>\n            "));
  });
};
/******/ })()
;