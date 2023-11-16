/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************!*\
  !*** ./resources/js/helper.js ***!
  \********************************/
window.explode = function (str, symbol) {
  var name = str;
  var index = name.lastIndexOf(symbol);
  return name.slice(index + symbol.length);
};
window.popupTooltip = function (text) {
  if (!document.getElementById('tooltip')) {
    document.querySelector('body').insertAdjacentHTML('beforeend', "\n        <div class=\"toast align-items-center bg-danger text-white\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\" id=\"tooltip\">\n          <div class=\"d-flex\">\n            <div class=\"toast-body\">\n                ".concat(text, "\n            </div>\n            <button type=\"button\" class=\"btn-close me-2 m-auto\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>\n          </div>\n        </div>\n    "));
    setTimeout(function () {
      deleteColumnModal('tooltip');
    }, 1900);
  }
};
window.scrollDashboard = function () {
  var speed = 2;
  var scroll = document.getElementById('desk-wrapper');
  var left = 0;
  var drag = false;
  var coorX = 0;
  scroll.addEventListener('mousedown', function (e) {
    if (!e.target.classList.contains('desk') || e.target.nodeName !== "TIME" || e.target.nodeName !== "p") {
      drag = true;
      coorX = e.pageX - this.offsetLeft;
    }
  });
  document.addEventListener('mouseup', function () {
    drag = false;
    left = scroll.scrollLeft;
  });
  scroll.addEventListener('mousemove', function (e) {
    if (!e.target.classList.contains('desk') || e.target.nodeName !== "TIME" || e.target.nodeName !== "p") {
      if (drag) {
        this.scrollLeft = left - (e.pageX - this.offsetLeft - coorX) * speed;
      }
    }
  });
};
scrollDashboard();
/******/ })()
;