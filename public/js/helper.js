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
/******/ })()
;