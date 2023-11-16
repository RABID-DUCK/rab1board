/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************!*\
  !*** ./resources/js/websockets.js ***!
  \************************************/
window.moveDesksWS = function (user_id) {
  window.Echo["private"]('desks').listen('.desk_move', function (res) {
    var column = document.querySelector("[data-column-id='".concat(res.desks.column_id, "']"));
    var items;
    fetch('/api/column/getDesks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: JSON.stringify({
        col_id: res.desks.column_id
      })
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      var block = column.querySelector('.desk-block');
      block.innerHTML = "";
      if (data.length > 1) {
        data.forEach(function (item) {
          block.insertAdjacentHTML('beforeend', "\n                                <div class=\"desk\" onclick=\"viewDesk(".concat(item.dashboard_id, ", ").concat(item.column_id, ", ").concat(item.id, ")\" onmousedown=\"dragDropDesks()\" data-desk-id=\"").concat(item.id, "\">\n                                    <p>").concat(item.title, "</p>\n                                    <img class=\"").concat(item.image ? '' : 'hide', "\" src=\"").concat(item.image, "\" alt=\"").concat(item.title, "\">\n                                    <div class=\"data-desk\">\n                                        <input class=\"custom-checkbox\" type=\"checkbox\" id=\"status\" name=\"status\" value=\"yes\">\n                                        <time class=\"text-muted\" datetime=\"2011-11-18T14:54:39.929Z\" name=\"date\">\u0421\u0440\u043E\u043A\u043E\u0432 \u043D\u0435\u0442</time>\n                                    </div>\n                                    <span>status</span>\n                                </div>\n                            "));
          var oldDesks = document.querySelectorAll("[data-desk-id='".concat(item.id, "']"));
          oldDesks.forEach(function (item2) {
            if (item2.closest('.wrap').dataset.columnId != item.column_id) {
              item2.remove();
            }
          });
        });
      } else {
        block.insertAdjacentHTML('beforeend', "\n                            <div class=\"desk\" onclick=\"viewDesk(".concat(data[0].dashboard_id, ", ").concat(data[0].column_id, ", ").concat(data[0].id, ")\" onmousedown=\"dragDropDesks()\">\n                                <p>").concat(data[0].title, "</p>\n                                <img class=\"").concat(data[0].image ? '' : 'hide', "\" src=\"").concat(data[0].image, "\" alt=\"").concat(data[0].title, "\">\n                                <div class=\"data-desk\">\n                                    <input class=\"custom-checkbox\" type=\"checkbox\" id=\"status\" name=\"status\" value=\"yes\">\n                                    <time class=\"text-muted\" datetime=\"2011-11-18T14:54:39.929Z\" name=\"date\">\u0421\u0440\u043E\u043A\u043E\u0432 \u043D\u0435\u0442</time>\n                                </div>\n                                <span>status</span>\n                            </div>"));
        var oldDesks = document.querySelectorAll("[data-desk-id='".concat(data[0].id, "']"));
        oldDesks.forEach(function (item2) {
          if (item2.closest('.wrap').dataset.columnId != data[0].column_id) {
            item2.remove();
          }
        });
      }
      block.insertAdjacentHTML('beforeend', "\n                        <button class=\"add-desk\" id=\"add-task-title\" onclick=\"createDeskMiniModal(".concat(data[0].dashboard_id, ", ").concat(column.dataset.columnId, ", ").concat(user_id, ")\">+ Add desk</button>\n                    "));
      items = data;
    })["catch"](function (error) {
      console.log('Error:', error);
    })["finally"](function () {
      updateDeskOrder(items);
    });
  });
};
window.updateNotifWS = function (user_id) {
  window.Echo["private"]('notifications').listen('.notifications', function (res) {
    refreshNotifs(user_id);
  });
};
window.moveColumn = function () {
  window.Echo["private"]('columns').listen('.column_moves', function (data) {
    var columnList = document.getElementById('desk-wrapper');
    var listElements = Array.from(columnList.querySelectorAll('.wrap')); // Конвертирование в массив
    listElements = listElements.sort(function (a, b) {
      return a.getAttribute('data-column-id') - b.getAttribute('data-column-id');
    }); // Сортировка
    // Обновление списка элементов на странице
    listElements.forEach(function (element) {
      columnList.insertBefore(element, null); // Вставка в начало родителя
    });

    columnList.appendChild(document.getElementById('add-column-panel'));
  });
};
/******/ })()
;