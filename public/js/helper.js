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
/******/ })()
;