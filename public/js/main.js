/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./resources/js/main.js ***!
  \******************************/
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
      document.getElementById('add-column-panel').insertAdjacentHTML('beforebegin', "\n                     <div class=\"wrap\" data-column-id=\"".concat(data.column_id, "\">\n                        <div class=\"column\" onclick=\"clickRenameColumn(").concat(data.column_id, ")\" data-column-title=\"\">\n                            <span>").concat(data.columns[data.columns.length - 1].title, "</span>\n                            <i class=\"bi bi-check-lg save-column hide\"></i>\n                        </div>\n                        <div class=\"desk-block\">\n                        <div class=\"desk\">\n                            <p>").concat(data.desk.title, "</p>\n                            <img src=\"").concat(data.desk.image, "\" alt=\"").concat(data.desk.title, "\">\n                            <div class=\"data-desk\">\n                                <input class=\"custom-checkbox\" type=\"checkbox\" id=\"status\" name=\"status\" value=\"yes\">\n                                <time datetime=\"2011-11-18T14:54:39.929Z\" name=\"date\">").concat(data.desk.created_at, "</time>\n                            </div>\n                            <span>status</span>\n                        </div>\n                        <button class=\"add-desk\" id=\"add-task-title\" onclick=\"createDeskMiniModal(").concat(_dashboard, ", ").concat(data.column_id, ")\">+ Add desk</button>\n                    </div>\n                    </div>\n                "));
    } else {
      document.getElementById('add-column-panel').insertAdjacentHTML('beforebegin', "\n             <div class=\"wrap\" data-column-id=\"".concat(data.column_id, "\">\n                <div class=\"column\" onclick=\"clickRenameColumn(").concat(data.column_id, ")\" data-column-title=\"\">\n                    <span>").concat(data.columns[data.columns.length - 1].title, "</span>\n                    <i class=\"bi bi-check-lg save-column hide\"></i>\n                </div>\n                    <div class=\"desk-block\">\n                        <button class=\"add-desk\" id=\"add-task-title\" onclick=\"createDeskMiniModal(").concat(data.dashboard_id, ", ").concat(data.column_id, ")\">+ Add desk</button>\n                    </div>\n            </div>\n            "));
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
      alert("Произошла ошибка! Повторите попытку позже...");
      return;
    }
    deleteDeskModal(res.column_id);
    var condition = '[data-column-id="' + res.column_id + '"]';
    var data_column = document.querySelector(condition);
    data_column.querySelector('#add-task-title').insertAdjacentHTML('beforebegin', "\n                <div class=\"desk\" onclick=\"viewDesk(".concat(dashboard, ", ").concat(column, ", ").concat(res.desk.id, ")\">\n                    <p>").concat(res.desk.title, "</p>\n                    <img src=\"").concat(res.desk.image, "\" alt=\"").concat(res.desk.title, "\">\n                    <div class=\"data-desk\">\n                        <input class=\"custom-checkbox\" type=\"checkbox\" id=\"status\" name=\"status\" value=\"yes\">\n                        <time datetime=\"2011-11-18T14:54:39.929Z\" name=\"date\">2023-08-01 15:00</time>\n                    </div>\n                    <span>status</span>\n                </div>\n            "));
  });
};
clickRenameColumn = function clickRenameColumn(id) {
  var target = event.target.textContent.trim();
  var div = document.querySelector("[data-column-id=\"".concat(id, "\"] [data-column-title]"));
  div.style.cssText = "position: relative;";
  if (!div.querySelector('input')) {
    div.querySelector('span').insertAdjacentHTML('afterend', "\n        <input class=\"form-control\" value=\"".concat(target, "\" type=\"text\" data-new-title style=\"position: absolute; top: 4px;left: 5px;height: 25px;max-width: 200px;\">\n        "));
  }
  var saveColumn = div.querySelector('i');
  saveColumn.classList.remove('hide');
  saveColumn.onclick = function () {
    saveColumn.style.cssText = "background-color: green;";
    fetch('/api/column/rename', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        title: div.querySelector('input').value
      })
    }).then(function (response) {
      return response.json();
    }).then(function (res) {
      saveColumn.style.cssText = "background-color: gray;";
      div.querySelector('input').remove();
      div.querySelector('span').innerText = res.title;
      saveColumn.classList.add('hide');
    });
  };
};
renameDashboard = function renameDashboard(id) {
  var div = document.querySelector('[data-rename-dashboard]');
  var title = div.querySelector('h2').textContent.trim();
  div.querySelector('.bi-pen-fill').remove();
  div.querySelector('h2').classList.add('hide');
  div.insertAdjacentHTML('afterbegin', "\n        <div class=\"position-relative\" data-info-edit>\n        <input class=\"form-control\" data-rename-dashboard-title value=\"".concat(title, "\">\n            <i class=\"bi bi-check-lg save-column\" id=\"rename-dashboard\"\n             style=\"position: absolute;top: 7px;right: 5px;text-align: center;\"></i>\n        </div>\n    "));
  document.getElementById('rename-dashboard').addEventListener('click', function () {
    if (title) {
      fetch('/api/dashboard/rename', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          title: div.querySelector('[data-rename-dashboard-title]').value
        })
      }).then(function (response) {
        return response.json();
      }).then(function (res) {
        document.querySelector('[data-rename-dashboard] h2').innerText = res.title;
        document.querySelector('[data-rename-dashboard] h2').classList.remove('hide');
        document.querySelector('[data-rename-dashboard] input, #rename-dashboard').remove();
        document.querySelector('[data-rename-dashboard] [data-info-edit]').remove();
        div.insertAdjacentHTML('beforeend', "\n                        <i class=\"bi bi-pen-fill\" data-title-dashboard onclick=\"renameDashboard(".concat(res.id, ")\"></i>\n                    "));
        div.querySelector('.bi-pen-fill').classList.remove('hide');
      });
    }
  });
};
openDatePicker = function openDatePicker(dashboard_id, desk_id) {
  fetch('/api/desk/' + desk_id).then(function (response) {
    return response.json();
  }).then(function (res) {
    if (!document.getElementById('selectDate')) {
      var _res$data_start, _res$data_end;
      document.getElementById('calendarIcon').insertAdjacentHTML('afterbegin', "\n                <div class=\"selectDate bg-dark bg-gradient text-white\" id=\"selectDate\">\n                    <div>\n                    <label for=\"dateStart\">\u0414\u0430\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430</label>\n                    <input id=\"dateStart\" class=\"form-control\" type=\"datetime-local\" value=\"".concat((_res$data_start = res.data_start) !== null && _res$data_start !== void 0 ? _res$data_start : '', "\">\n                    <label for=\"dateEnd\">\u0414\u0430\u0442\u0430 \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F</label>\n                    <input id=\"dateEnd\" class=\"form-control\" type=\"datetime-local\" value=\"").concat((_res$data_end = res.data_end) !== null && _res$data_end !== void 0 ? _res$data_end : '', "\">\n                </div>\n                <div>\n                    <button class=\"btn text-white\" onclick=\"event.stopPropagation(); saveDate(").concat(dashboard_id, ",").concat(desk_id, ")\">Save</button>\n                    <button class=\"btn btn-danger\" onclick=\"event.stopPropagation(); closeSelectDate()\">Close</button>\n                </div>\n                </div>\n                "));
    }
  });
};
closeSelectDate = function closeSelectDate() {
  return document.getElementById('selectDate').remove();
};
viewDesk = function viewDesk(dashboard_id, column_id, desk_id) {
  if (event.target.id === 'status') {
    doneTask(dashboard_id, desk_id);
    return;
  }
  var modal = document.querySelector('[data-modal-desk]');
  var backModal = document.getElementById('backModal');
  var wrapModal = document.getElementById('wrapper-modal');
  backModal.classList.remove('hide');
  wrapModal.classList.remove('hide-animate');
  document.getElementById('left-panel-dash').style.cssText = "filter: blur(2px);";
  document.getElementById('desk-wrapper').style.cssText = "filter: blur(2px);";
  backModal.addEventListener('click', function () {
    closeModal();
  });
  fetch('/api/modalDesk/?dashboard_id=' + dashboard_id + '&column_id=' + column_id + '&desk_id=' + desk_id, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    return response.json();
  }).then(function (res) {
    var _res$data$description;
    if (!document.querySelector('[data-panel-modal-desk]')) {
      document.getElementById('wrapper-modal').insertAdjacentHTML('afterbegin', "\n               <div class=\"panel-desk bg-dark bg-gradient text-white\" data-panel-modal-desk>\n                <i id=\"calendarIcon\" class=\"bi bi-calendar\" onclick=\"openDatePicker(".concat(dashboard_id, ",").concat(desk_id, ")\" data-title=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0434\u0430\u0442\u0443 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F\"></i>\n                <i class=\"bi bi-image\" data-title=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0443\"></i>\n                <i class=\"bi bi-card-list\" data-title=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0434\u0437\u0430\u0434\u0430\u0447\u0438\"></i>\n                <i class=\"bi bi-bookmark-fill\" data-title=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432\u0430\u0436\u043D\u043E\u0441\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0438\" onclick=\"outputColors(").concat(desk_id, ")\"></i>\n                <i class=\"bi bi-arrows-move\" data-title=\"\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443\"></i>\n                <i class=\"bi bi-files\" data-title=\"\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u0444\u0430\u0439\u043B\u044B\"></i>\n            </div>\n            "));
    }

    // ----------Open modal----------
    modal.insertAdjacentHTML('beforeend', "\n             <span class=\"close-modal\" id=\"modal-desk\" onclick=\"closeModal()\">X</span>\n                <b>".concat(res.data.title, "</b>\n                <div class=\"users-desk\">\n                    <span><img src=\"/images/avatar_none.png\" alt=\"\"></span>\n                    <span><img src=\"/images/avatar_none.png\" alt=\"\"></span>\n                    <span><img src=\"/images/avatar_none.png\" alt=\"\"></span>\n                    <i class=\"bi bi-plus-circle\"></i>\n                </div>\n\n                <div id=\"output-date\" class=\"output-date\" style=\"").concat(!res.data.data_end ? 'display: none;' : '', "\">\n                    <span id=\"output-date-end\" class=\"").concat(differenceDate(res.data.data_end) ? 'text-danger fw-bold' : '', "\">\n                    \u0421\u0440\u043E\u043A \u0434\u043E: ").concat(convertData(res.data.data_end), "</span>\n                </div>\n\n                <div class=\"description\">\n                    <label for=\"description\" class=\"form-label\">Description of task</label>\n                    <textarea class=\"form-control\" id=\"description\" rows=\"3\" placeholder=\"This task mean...\">").concat((_res$data$description = res.data.description) !== null && _res$data$description !== void 0 ? _res$data$description : '', "</textarea>\n                    <button class=\"btn text-white hide\" id=\"save-desk\" onclick=\"updateDescription(").concat(dashboard_id, ",").concat(desk_id, ", ").concat(column_id, ")\"><i class=\"bi bi-check-lg\"></i>Save</button>\n                </div>\n                    <button class=\"btn text-white ").concat(res.data.list_task_id ? 'hide' : '', "\" id=\"add-menu-tasks\">Add tasks</button>\n            "));

    // --------Add Description-------
    var textareaClicked = false;
    document.getElementById('description').addEventListener('click', function () {
      if (!textareaClicked) {
        textareaClicked = true;
        document.getElementById('save-desk').classList.remove('hide');
      }
    });
    // --------End add Description-------

    loadCheckList(dashboard_id, desk_id, column_id);
  });
};
closeModal = function closeModal() {
  var modal = document.getElementById('wrapper-modal');
  modal.querySelector('[data-modal-desk]').innerHTML = "";
  document.getElementById('wrapper-modal').style.cssText = "filter: none;";
  document.getElementById('left-panel-dash').style.cssText = "filter: none;";
  document.getElementById('desk-wrapper').style.cssText = "filter: none;";
  document.getElementById('backModal').classList.add('hide');
  modal.classList.add('hide-animate');
  modal.querySelector('[data-panel-modal-desk]').remove();
  if (document.getElementById('selectDate')) {
    closeSelectDate();
  }
  modal.classList.add('hide-animate');
};
loadCheckList = function loadCheckList(dashboard_id, desk_id, column_id) {
  fetch('/api/getTasks?dashboard_id=' + dashboard_id + "&desk_id=" + desk_id, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    return response.json();
  }).then(function (res) {
    var addWindowTasks = document.getElementById('add-menu-tasks');
    addWindowTasks.classList.add('hide');
    if (res.list) {
      addWindowTasks.insertAdjacentHTML('beforebegin', "\n                    <div class=\"check-list-wrapper\">\n                        <span class=\"name-list bg-dark bg-gradient text-white\" data-name-list>".concat(res.list.title, "</span>\n                        <input type=\"text\" class=\"form-control name-list hide\">\n                        <i class=\"bi bi-check-lg save-column hide\" data-save-checkList></i>\n                        <div class=\"list-tasks d-flex flex-column\">\n                            <button class=\"btn text-white add-task\" id=\"btn-create-task\" onclick=\"createTask(").concat(dashboard_id, ", ").concat(desk_id, ")\">Add task</button>\n                        </div>\n                    </div>"));
      if (res.tasks) {
        res.tasks.forEach(function (item) {
          document.getElementById('btn-create-task').insertAdjacentHTML('beforebegin', "\n                        <div class=\"form-check form-switch\" data-task-id=\"".concat(item.id, "\">\n                            <input type=\"checkbox\" class=\"form-check-input\" role=\"switch\" id=\"checklist").concat(item.id, "\" ").concat(item.done === 0 ? "" : 'checked', "\n                             onclick=\"changeChecked(").concat(dashboard_id, ", ").concat(desk_id, ", ").concat(column_id, ", ").concat(item.id, ")\">\n                            <input type=\"text\" class=\"form-control hide\" id=\"saveTitleTask\" value=\"").concat(item.title, "\">\n                            <button class=\"btn text-white hide\" id=\"saveTask\" onclick=\"saveTask(").concat(dashboard_id, ", ").concat(desk_id, ")\">Save</button>\n                            <label for=\"checklist").concat(item.id, "\" class=\"form-check-label\">").concat(item.title, "</label>\n                        </div>\n                "));
        });
      }
    } else {
      addWindowTasks.insertAdjacentHTML('beforebegin', "\n                <div class=\"check-list-wrapper\">\n                    <span class=\"name-list bg-dark bg-gradient text-white hide\" data-name-list>Name list</span>\n                    <input type=\"text\" class=\"form-control name-list\">\n                    <i class=\"bi bi-check-lg save-column\" data-save-checkList></i>\n                    <div class=\"list-tasks d-flex flex-column\">\n                        <button class=\"btn text-white add-task\" id=\"btn-create-task\" onclick=\"createTask(".concat(dashboard_id, ", ").concat(desk_id, ")\">Add task</button>\n                    </div>\n                </div>\n                "));
    }
  });
};
createTask = function createTask(dashboard_id, desk_id) {
  var createTask = document.getElementById('btn-create-task');
  if (createTask) {
    var _createTask = document.getElementById('btn-create-task');
    _createTask.insertAdjacentHTML('beforebegin', "\n            <div class=\"form-check form-switch\" data-temp-task>\n                <input type=\"checkbox\" class=\"form-check-input\" role=\"switch\" id=\"checklist\">\n                <input type=\"text\" class=\"form-control\" id=\"saveTitleTask\">\n                <button class=\"btn text-white\" id=\"saveTask\" onclick=\"saveTask(".concat(dashboard_id, ", ").concat(desk_id, ")\">Save</button>\n            </div>\n        "));
  } else {
    addWindowTasks(dashboard_id, desk_id);
  }
};
changeChecked = function changeChecked(dashboard_id, desk_id, column_id, task_id) {
  var check = event.target;
  fetch('/api/modalUpdate', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      done: check.checked,
      id: desk_id,
      dashboard_id: dashboard_id,
      column_id: column_id,
      task_id: task_id
    })
  }).then(function (response) {
    return response.json();
  }).then(function (res) {
    check.setAttribute('checked', "checked");
  });
};
saveTask = function saveTask(dashboard_id, desk_id) {
  var title = document.querySelector('[data-temp-task]');
  fetch('/api/saveTask', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'title': title.querySelector('#saveTitleTask').value,
      'done': event.target.previousElementSibling.previousElementSibling.checked,
      'dashboard_id': dashboard_id,
      'desk_id': desk_id
    })
  }).then(function (response) {
    return response.json();
  }).then(function (res) {
    title.remove();
    var createTask = document.getElementById('btn-create-task');
    createTask.insertAdjacentHTML('beforebegin', "\n            <div class=\"form-check form-switch\" data-task-id=\"".concat(res.id, "\">\n                <input type=\"checkbox\" class=\"form-check-input\" role=\"switch\" id=\"checklist").concat(res.id, "\">\n                <input type=\"text\" class=\"form-control hide\" id=\"saveTitleTask\">\n                <button class=\"btn text-white hide\" id=\"saveTask\" onclick=\"saveTask(").concat(dashboard_id, ", ").concat(desk_id, ")\">Save</button>\n                <label for=\"checklist").concat(res.id, "\" class=\"form-check-label\">").concat(res.title, "</label>\n            </div>\n        "));
  });
};
addWindowTasks = function addWindowTasks(dashboard_id, desk_id) {
  var addWindowTasks = document.getElementById('add-menu-tasks');
  addWindowTasks.onclick = function () {
    addWindowTasks.classList.add('hide');
    var saveCheckList = document.querySelector('[data-save-checkList]');
    saveCheckList.addEventListener('click', function () {
      var input = saveCheckList.previousElementSibling.value;
      fetch('/api/createList', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'title': input,
          'dashboard_id': dashboard_id,
          'desk_id': desk_id
        })
      }).then(function (response) {
        return response.json();
      }).then(function (res) {
        saveCheckList.previousElementSibling.classList.add('hide');
        saveCheckList.classList.add('hide');
        document.querySelector('[data-name-list]').classList.remove('hide');
        document.querySelector('[data-name-list]').textContent = res.title;
      });
    });
  };
};
updateDescription = function updateDescription(dashboard_id, desk_id, column_id) {
  var desk = document.getElementById('description').value;
  fetch('/api/modalUpdate', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description: desk,
      id: desk_id,
      dashboard_id: dashboard_id,
      column_id: column_id
    })
  }).then(function (response) {
    return response.json();
  }).then(function (res) {
    desk.value = res.description;
  });
};
saveDate = function saveDate(dashboard_id, desk_id) {
  var dateStart = document.getElementById('dateStart').value;
  var dateEnd = document.getElementById('dateEnd').value;
  fetch('/api/modalUpdate', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      dashboard_id: dashboard_id,
      id: desk_id,
      data_start: dateStart,
      data_end: dateEnd
    })
  }).then(function (response) {
    return response.json();
  }).then(function (res) {
    var window = document.getElementById('output-date');
    var time = document.querySelector("[data-desk-id=\"".concat(desk_id, "\"]")).querySelector('time');
    closeSelectDate();
    if (window) {
      document.getElementById('output-date').innerHTML = "\n                <span id=\"output-date-end\" class=\"".concat(differenceDate(res.data_end) ? 'text-danger fw-bold' : '', "\">\u0421\u0440\u043E\u043A \u0434\u043E: ").concat(convertData(res.data_end), "</span>\n            ");
      // time.innerText = convertData(res.data_end);
    } else {
      document.getElementById('output-date').innerHTML = "\n                <div id=\"output-date\" class=\"output-date\">\n                    <span id=\"output-date-end\" class=\"".concat(differenceDate(res.data_end) ? 'text-danger fw-bold' : '', "\">\u0421\u0440\u043E\u043A \u0434\u043E: ").concat(convertData(res.data_end), "</span>\n                </div>\n            ");
    }
    document.getElementById('output-date').style.display = 'flex';
    differenceDate(res.data_end) ? time.classList.add('text-danger') : time.classList.remove('text-danger');
    time.innerText = convertData(res.data_end);
  });
};
convertData = function convertData(data) {
  var dateString = data;
  var date = new Date(dateString);
  var options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  var formattedDate = date.toLocaleDateString('ru-RU', options);
  var formattedTime = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  });
  var result = "".concat(formattedDate, " \u0432 ").concat(formattedTime);
  return result;
};

// разница времени
differenceDate = function differenceDate(data) {
  var currentDate = new Date();
  var newDate = new Date(data);
  var differenceInMilliseconds = newDate.getTime() - currentDate.getTime();
  var oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  return differenceInMilliseconds <= oneDayInMilliseconds;
};
doneTask = function doneTask(dashboard_id, desk_id) {
  var check = event.target.checked;
  fetch('/api/modalUpdate', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      dashboard_id: dashboard_id,
      id: desk_id,
      status: check
    })
  }).then(function (response) {
    return response.json();
  }).then(function (res) {
    if (document.getElementById('selectDate')) closeSelectDate();
    var status = document.querySelector("[data-desk-id=\"".concat(desk_id, "\"]")).querySelector('#status');
    if (res.status) {
      status.setAttribute('checked', '');
      status.style.backgroundColor = 'green';
    } else {
      status.style.backgroundColor = '#fafafa';
    }
  });
};
outputColors = function outputColors(desk_id) {
  var target = event.target;
  fetch('/api/colors').then(function (response) {
    return response.json();
  }).then(function (res) {
    target.insertAdjacentHTML('afterend', "\n                <div id=\"output-colors\" class=\"output-colors bg-dark bg-gradient text-white\">\n                </div>\n            ");
    res.forEach(function (item) {
      document.getElementById('output-colors').insertAdjacentHTML('afterbegin', "\n                    <span class=\"colors-all\" style=\"background-color: ".concat(item.color, ";\" onclick=\"saveColor(").concat(item.id, ", ").concat(desk_id, ")\"></span>\n                "));
    });
  });
};
saveColor = function saveColor(color_id, desk_id) {
  fetch('/api/colors/' + color_id + '/' + desk_id).then(function (response) {
    return response.json();
  }).then(function (res) {
    console.log(res[0]);
    document.getElementById('wrapper-modal').style.cssText = 'box-shadow: 0 0 15px 8px ' + res[0].color;
    document.querySelector("[data-desk-id='".concat(desk_id, "']")).style.cssText = 'box-shadow: 0 0 10px 3px ' + res[0].color;
  });
};
/******/ })()
;