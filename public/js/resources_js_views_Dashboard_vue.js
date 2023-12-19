(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Dashboard_vue"],{

/***/ "./node_modules/click-outside-vue3/dist/v-click-outside.umd.js":
/*!*********************************************************************!*\
  !*** ./node_modules/click-outside-vue3/dist/v-click-outside.umd.js ***!
  \*********************************************************************/
/***/ (function(module) {

!function(e,n){ true?module.exports=n():0}(this,function(){var e="__v-click-outside",n="undefined"!=typeof window,t="undefined"!=typeof navigator,r=n&&("ontouchstart"in window||t&&navigator.msMaxTouchPoints>0)?["touchstart"]:["click"],i=function(e){var n=e.event,t=e.handler;(0,e.middleware)(n)&&t(n)},a=function(n,t){var a=function(e){var n="function"==typeof e;if(!n&&"object"!=typeof e)throw new Error("v-click-outside: Binding value must be a function or an object");return{handler:n?e:e.handler,middleware:e.middleware||function(e){return e},events:e.events||r,isActive:!(!1===e.isActive),detectIframe:!(!1===e.detectIframe),capture:Boolean(e.capture)}}(t.value),o=a.handler,d=a.middleware,c=a.detectIframe,u=a.capture;if(a.isActive){if(n[e]=a.events.map(function(e){return{event:e,srcTarget:document.documentElement,handler:function(e){return function(e){var n=e.el,t=e.event,r=e.handler,a=e.middleware,o=t.path||t.composedPath&&t.composedPath();(o?o.indexOf(n)<0:!n.contains(t.target))&&i({event:t,handler:r,middleware:a})}({el:n,event:e,handler:o,middleware:d})},capture:u}}),c){var l={event:"blur",srcTarget:window,handler:function(e){return function(e){var n=e.el,t=e.event,r=e.handler,a=e.middleware;setTimeout(function(){var e=document.activeElement;e&&"IFRAME"===e.tagName&&!n.contains(e)&&i({event:t,handler:r,middleware:a})},0)}({el:n,event:e,handler:o,middleware:d})},capture:u};n[e]=[].concat(n[e],[l])}n[e].forEach(function(t){var r=t.event,i=t.srcTarget,a=t.handler;return setTimeout(function(){n[e]&&i.addEventListener(r,a,u)},0)})}},o=function(n){(n[e]||[]).forEach(function(e){return e.srcTarget.removeEventListener(e.event,e.handler,e.capture)}),delete n[e]},d=n?{beforeMount:a,updated:function(e,n){var t=n.value,r=n.oldValue;JSON.stringify(t)!==JSON.stringify(r)&&(o(e),a(e,{value:t}))},unmounted:o}:{};return{install:function(e){e.directive("click-outside",d)},directive:d}});
//# sourceMappingURL=v-click-outside.umd.js.map


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AddDesk.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AddDesk.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "AddDesk",
  props: ["title_", "dash_id", 'column_id'],
  data: function data() {
    return {
      title: this.title_,
      text: ''
    };
  },
  methods: {
    sendValue: function sendValue(desk) {
      this.$emit("addedDesk", {
        id: this.id,
        title: this.title,
        desk: desk
      });
    },
    createDesk: function createDesk() {
      var _this = this;
      this.axios.post('/api/desk/create', {
        title: this.text,
        dashboard_id: this.dash_id,
        column_id: this.column_id,
        user_id: this.$store.getters.infoUser.id
      }).then(function (res) {
        _this.sendValue(res.data.desk);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/CreatePanel.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/CreatePanel.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "CreatePanel",
  props: ['dash_id', 'user_id', 'title_event'],
  data: function data() {
    return {
      title: ''
    };
  },
  methods: {
    addColumn: function addColumn() {
      var _this = this;
      fetch('/api/column/create', {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.title,
          dashboard_id: this.dash_id
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this.title = '';
        _this.$emit('columnsList', {
          columnsList: data.columns
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/InputSave.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/InputSave.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var click_outside_vue3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! click-outside-vue3 */ "./node_modules/click-outside-vue3/dist/v-click-outside.umd.js");
/* harmony import */ var click_outside_vue3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(click_outside_vue3__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "InputSave",
  props: ['title_', 'id'],
  directives: {
    clickOutside: (click_outside_vue3__WEBPACK_IMPORTED_MODULE_0___default().directive)
  },
  data: function data() {
    return {
      title: this.title_
    };
  },
  methods: {
    sendValue: function sendValue() {
      this.$emit('valueTitle', {
        id: this.id,
        title: this.title
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/main/Columns.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/main/Columns.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _InputSave__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../InputSave */ "./resources/js/components/InputSave.vue");
/* harmony import */ var _Desks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Desks */ "./resources/js/components/main/Desks.vue");
/* harmony import */ var _CreatePanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CreatePanel */ "./resources/js/components/CreatePanel.vue");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Columns",
  components: {
    inputSave: _InputSave__WEBPACK_IMPORTED_MODULE_0__["default"],
    Desks: _Desks__WEBPACK_IMPORTED_MODULE_1__["default"],
    CreatePanel: _CreatePanel__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  props: ['dash_id'],
  data: function data() {
    return {
      columns: null,
      create_column: false,
      rename_col: false,
      columnClicked: []
    };
  },
  mounted: function mounted() {
    this.getColumns();
  },
  methods: {
    clickColumn: function clickColumn() {
      var col_index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (col_index != null) {
        for (var i in this.columnClicked) {
          this.columnClicked[i] = false;
        }
        this.columnClicked[col_index] = true;
      }
      if (action != null) {
        this.add_desk = false;
        this.rename_col = false;
        switch (action) {
          case "rename":
            {
              this.rename_col = true;
            }
            break;
          case "addDesk":
            {
              this.add_desk = true;
            }
            break;
          default:
            break;
        }
      }
    },
    renameColumn: function renameColumn(data) {
      var _this = this;
      this.axios.post("/api/column/rename", {
        id: data.id,
        title: data.title
      }).then(function (res) {
        _this.rename_col = false;
        _this.getColumns();
      });
    },
    getColumns: function getColumns() {
      var _this2 = this;
      this.axios("/api/getColumns/" + this.dash_id).then(function (res) {
        _this2.columns = res.data;
        _this2.columnClicked = _this2.columns.map(function () {
          return false;
        });
      });
    },
    handleColumnList: function handleColumnList(data) {
      this.create_column = false;
      this.columns.push(data.columnsList);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/main/Desks.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/main/Desks.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AddDesk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AddDesk */ "./resources/js/components/AddDesk.vue");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Desks",
  components: {
    addDesk: _AddDesk__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: ['desks', 'column_clicked', 'index', 'columnId', 'dash_id'],
  data: function data() {
    return {
      add_desk: false,
      desks_list: this.desks
    };
  },
  watch: {
    desks: function desks(newVal) {
      this.desks_list = newVal;
    }
  },
  methods: {
    viewDesk: function viewDesk(deskID) {},
    today: function today(date) {},
    updateDeskInColumn: function updateDeskInColumn(column_id) {
      var _this = this;
      this.axios.post('/api/column/getDesks', {
        col_id: column_id
      }).then(function (res) {
        _this.desks_list = res.data;
        _this.add_desk = !_this.add_desk;
      });
    },
    doneDesk: function doneDesk(desk_id) {},
    clickColumn: function clickColumn() {
      var col_index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (col_index != null) {
        for (var i in this.column_clicked) {
          this.column_clicked[i] = false;
        }
        this.column_clicked[col_index] = true;
      }
      if (action != null) {
        this.add_desk = false;
        this.rename_col = false;
        switch (action) {
          case "addDesk":
            {
              this.add_desk = true;
            }
            break;
          default:
            break;
        }
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Dashboard.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Dashboard.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_InputSave__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/InputSave */ "./resources/js/components/InputSave.vue");
/* harmony import */ var _components_AddDesk_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/AddDesk.vue */ "./resources/js/components/AddDesk.vue");
/* harmony import */ var _components_CreatePanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/CreatePanel */ "./resources/js/components/CreatePanel.vue");
/* harmony import */ var _components_AddPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/AddPanel */ "./resources/js/components/AddPanel.vue");
/* harmony import */ var _components_main_Columns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/main/Columns */ "./resources/js/components/main/Columns.vue");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Dashboard",
  components: {
    inputSave: _components_InputSave__WEBPACK_IMPORTED_MODULE_0__["default"],
    addDesk: _components_AddDesk_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    CreatePanel: _components_CreatePanel__WEBPACK_IMPORTED_MODULE_2__["default"],
    AddPanel: _components_AddPanel__WEBPACK_IMPORTED_MODULE_3__["default"],
    Columns: _components_main_Columns__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  props: ["title", "columnsList"],
  data: function data() {
    return {
      dash_id: null,
      dash_title: null,
      rename_dash: false,
      clickedAddUser: false
    };
  },
  computed: {
    coderDashId: function coderDashId() {
      return this.coder(this.dash_id);
    }
  },
  watch: {
    '$store.getters.statusUser': function $storeGettersStatusUser(value) {
      if (value) {
        this.$store.dispatch('havePermissions', this.decoder(this.$route.params.id));
      }
    },
    '$store.getters.getToken': function $storeGettersGetToken(value) {
      if (!value) this.$router.push({
        name: 'main'
      });
    }
  },
  mounted: function mounted() {
    this.dash_id = this.decoder(this.$route.params.id);
    this.dash_title = this.$route.params.title;
  },
  methods: {
    renameDashboard: function renameDashboard(data) {
      var _this = this;
      this.rename_dash = true;
      this.axios.post("/api/dashboard/rename", {
        id: this.dash_id,
        title: data.title
      }).then(function (res) {
        _this.dash_title = res.data.title;
        _this.$router.replace("/dashboard/" + _this.coder(_this.dash_id) + "/" + res.data.title);
        _this.rename_dash = false;
      })["catch"](function (err) {
        _this.rename_dash = false;
      });
    },
    addUsersModal: function addUsersModal(id) {
      this.clickedAddUser = true;
    },
    clickAddUser: function clickAddUser(data) {
      var _this2 = this;
      this.axios.post("/api/dashboard/addUser", {
        dashboard_id: data.id,
        email: data.info
      }).then(function (res) {
        _this2.$store.commit('SET_CLASSES', res.data.err ? 'bg-danger text-white' : 'bg-success text-white');
        _this2.$store.commit('SET_TEXT', res.data.message);
      });
    },
    clickAddColumn: function clickAddColumn(column_id) {},
    addDesk: function addDesk(deskID) {}
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AddDesk.vue?vue&type=template&id=4b024182":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AddDesk.vue?vue&type=template&id=4b024182 ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "d-flex flex-column"
};
var _hoisted_2 = {
  "class": "d-flex"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.text = $event;
    }),
    "class": "desk",
    style: {
      "{'box-shadow": "0 0 10px 3px'}"
    },
    cols: "30",
    rows: "2"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.text]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "class": "add-desk",
    id: "add-desk-title",
    onClick: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
      return $options.createDesk && $options.createDesk.apply($options, arguments);
    }, ["prevent"]))
  }, "✔️ Add desk"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "class": "add-desk",
    id: "add-desk-title",
    onClick: _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
      _ctx.$emit('cancel');
    }, ["prevent"]))
  }, "✖️")])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/CreatePanel.vue?vue&type=template&id=3aea3d4d":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/CreatePanel.vue?vue&type=template&id=3aea3d4d ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "column-modal-wrapper text-center",
  id: "modal-column"
};
var _hoisted_2 = {
  "class": "mb-2",
  "for": "col-form-label desk-title"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Type title for " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.title_event), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.title = $event;
    }),
    "class": "form-control",
    type: "text",
    name: "desk-title",
    id: "text-column-create",
    placeholder: "Make auth"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.title]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "class": "btn mt-2",
    onClick: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
      return $options.addColumn($props.dash_id, $props.user_id);
    }, ["prevent"]))
  }, "Create"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": "remove-column-modal text-black-50",
    onClick: _cache[2] || (_cache[2] = function () {
      return _ctx.closeModal && _ctx.closeModal.apply(_ctx, arguments);
    })
  }, "X")]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/InputSave.vue?vue&type=template&id=5e8091e8":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/InputSave.vue?vue&type=template&id=5e8091e8 ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "position-relative",
  "data-info-edit": ""
};
var _hoisted_2 = ["value"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_click_outside = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveDirective)("click-outside");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "hidden",
    value: $props.id
  }, null, 8 /* PROPS */, _hoisted_2), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "class": "form-control",
    "data-rename-dashboard-title": "",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.title = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.title]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    onClick: _cache[1] || (_cache[1] = function () {
      return $options.sendValue && $options.sendValue.apply($options, arguments);
    }),
    "class": "bi bi-check-lg save-column",
    id: "rename-dashboard",
    style: {
      "position": "absolute",
      "top": "7px",
      "right": "5px",
      "text-align": "center"
    }
  })])), [[_directive_click_outside, $options.sendValue]]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/main/Columns.vue?vue&type=template&id=70dbcdb2":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/main/Columns.vue?vue&type=template&id=70dbcdb2 ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = ["data-column-id", "data-order"];
var _hoisted_2 = ["onClick"];
var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "bi bi-check-lg save-column hide"
}, null, -1 /* HOISTED */);
var _hoisted_4 = {
  "class": "add-column-panel",
  id: "add-column-panel"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_input_save = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("input-save");
  var _component_Desks = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Desks");
  var _component_create_panel = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("create-panel");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [$data.columns ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 0
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.columns, function (column, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      "class": "wrap",
      key: column.id,
      "data-column-id": column.id,
      "data-order": column.order
    }, [$data.columnClicked[index] && $data.rename_col ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_input_save, {
      key: 0,
      onValueTitle: $options.renameColumn,
      title_: column.title,
      id: column.id
    }, null, 8 /* PROPS */, ["onValueTitle", "title_", "id"])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 1,
      "class": "column",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
        return $options.clickColumn(index, 'rename');
      }, ["prevent"]),
      "data-column-title": ""
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(column.title), 1 /* TEXT */), _hoisted_3], 8 /* PROPS */, _hoisted_2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("                Вывод задач"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Desks, {
      desks: column.desks,
      index: index,
      columnId: column.id,
      dash_id: $props.dash_id,
      column_clicked: $data.columnClicked
    }, null, 8 /* PROPS */, ["desks", "index", "columnId", "dash_id", "column_clicked"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("                Конец вывода задач")], 8 /* PROPS */, _hoisted_1);
  }), 128 /* KEYED_FRAGMENT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("            создание колонки"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "class": "add-column",
    onClick: _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
      return $data.create_column = true;
    }, ["prevent"]))
  }, "+ Add column"), $data.create_column ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_create_panel, {
    key: 0,
    dash_id: $props.dash_id,
    user_id: this.$store.state.auth.user.id,
    title_event: 'column',
    onColumnsList: $options.handleColumnList
  }, null, 8 /* PROPS */, ["dash_id", "user_id", "onColumnsList"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("           конец создание колонки ")], 64 /* STABLE_FRAGMENT */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/main/Desks.vue?vue&type=template&id=2c907f8f":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/main/Desks.vue?vue&type=template&id=2c907f8f ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "desk-block",
  id: "desk-list"
};
var _hoisted_2 = ["onClick", "data-desk-id"];
var _hoisted_3 = ["src", "alt"];
var _hoisted_4 = {
  "class": "data-desk"
};
var _hoisted_5 = ["checked", "onClick"];
var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "status", -1 /* HOISTED */);
var _hoisted_7 = {
  key: 1,
  "class": "d-flex"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_add_desk = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("add-desk");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.desks_list, function (desk) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      "class": "desk",
      onClick: function onClick($event) {
        return $options.viewDesk(desk.id);
      },
      "data-desk-id": desk.id,
      key: desk.id,
      style: {
        "{'box-shadow": "0 0 10px 3px' + desk.color[0].color: desk.color_id}"
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(desk.title), 1 /* TEXT */), desk.image ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("img", {
      key: 0,
      src: desk.image,
      alt: desk.title
    }, null, 8 /* PROPS */, _hoisted_3)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      "class": "custom-checkbox",
      type: "checkbox",
      id: "status",
      name: "status",
      value: "yes",
      checked: desk.status,
      onClick: function onClick($event) {
        return $options.doneDesk(desk.id);
      }
    }, null, 8 /* PROPS */, _hoisted_5), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("time", {
      datetime: "2011-11-18T14:54:39.929Z",
      name: "date",
      id: "data-desk",
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
        'text-muted': !desk.data_end,
        'text-danger fw-bold': $options.today(desk.data_end),
        'fw-bold': !$options.today(desk.data_end)
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(desk.data_end ? $options.today(desk.data_end) ? "Сегодня" : "До " + desk.data_end : "Сроков нет"), 3 /* TEXT, CLASS */)]), _hoisted_6], 8 /* PROPS */, _hoisted_2);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("                    Добавить задачу"), $props.column_clicked[$props.index] && $data.add_desk ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_add_desk, {
    key: 0,
    dash_id: $props.dash_id,
    column_id: $props.columnId,
    onCancel: _cache[0] || (_cache[0] = function ($event) {
      return $data.add_desk = false;
    }),
    onAddedDesk: _cache[1] || (_cache[1] = function ($event) {
      return $options.updateDeskInColumn($props.columnId, $props.index);
    })
  }, null, 8 /* PROPS */, ["dash_id", "column_id"])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "class": "add-desk",
    id: "add-desk-title",
    onClick: _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
      return $options.clickColumn($props.index, 'addDesk');
    }, ["prevent"]))
  }, "➕ Add desk")])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("                    конец добавления задачи")]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Dashboard.vue?vue&type=template&id=1f79daf6":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Dashboard.vue?vue&type=template&id=1f79daf6 ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "d-flex h-100"
};
var _hoisted_2 = {
  "class": "panel dashboard-single",
  id: "left-panel-dash"
};
var _hoisted_3 = ["value"];
var _hoisted_4 = {
  "class": "info-left-panel"
};
var _hoisted_5 = {
  "class": "dashboard-single-user"
};
var _hoisted_6 = ["src"];
var _hoisted_7 = {
  "class": "position-relative name-dashboard",
  "data-rename-dashboard": ""
};
var _hoisted_8 = {
  key: 0,
  "class": "text-center",
  title: "Название вашего проекта"
};
var _hoisted_9 = {
  "class": "dashboard-single-left-panel"
};
var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Participants ");
var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "+", -1 /* HOISTED */);
var _hoisted_12 = [_hoisted_10, _hoisted_11];
var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
  href: ""
}, "Chart", -1 /* HOISTED */);
var _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
  href: ""
}, "Scheduled events", -1 /* HOISTED */);
var _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Чат проекта");
var _hoisted_16 = {
  "class": "desk-wrapper d-flex justify-content-start",
  id: "desk-wrapper"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_input_save = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("input-save");
  var _component_add_panel = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("add-panel");
  var _component_router_link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-link");
  var _component_Columns = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Columns");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("    Левая панель"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "hidden",
    id: "dashboard-id",
    value: $data.dash_id
  }, null, 8 /* PROPS */, _hoisted_3), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: '/images/' + this.$store.state.auth.user.image,
    alt: "Фото профиля",
    width: "50",
    height: "60"
  }, null, 8 /* PROPS */, _hoisted_6)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(this.$store.state.auth.user.login), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
      'text-danger': this.$store.state.auth.user.premium,
      'text-secondary': !this.$store.state.auth.premium
    })
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(this.$store.state.auth.user.premium ? "Premium" : "Free"), 3 /* TEXT, CLASS */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [!$data.rename_dash ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("h2", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.dash_title), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !$data.rename_dash ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", {
    key: 1,
    "class": "bi bi-pen-fill text-white",
    "data-title-dashboard": "",
    onClick: _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
      return $data.rename_dash = true;
    }, ["prevent"]))
  })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.rename_dash ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_input_save, {
    key: 2,
    onValueTitle: $options.renameDashboard,
    title_: $data.dash_title
  }, null, 8 /* PROPS */, ["onValueTitle", "title_"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "class": "btn-participiants",
    onClick: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
      return $options.addUsersModal($data.dash_id);
    }, ["prevent"]))
  }, _hoisted_12), $data.clickedAddUser ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_add_panel, {
    key: 0,
    label_title: "Пригласить пользователя в проект",
    id: $data.dash_id,
    "class-props": 'dinamycal-modal card-body add-dashboard-panel animate-window',
    onInfoComponent: $options.clickAddUser,
    "place-holder": 'Введите почту пользователя',
    onCloseModal: _cache[2] || (_cache[2] = function ($event) {
      return $data.clickedAddUser = false;
    })
  }, null, 8 /* PROPS */, ["id", "onInfoComponent"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _hoisted_13, _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_link, {
    to: '/chat/' + $options.coderDashId + '/' + this.dash_title
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_hoisted_15];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["to"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("        Конец левой панели"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("        вывод колонок"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Columns, {
    dash_id: _ctx.decoder(this.$route.params.id)
  }, null, 8 /* PROPS */, ["dash_id"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("            Конец вывода колонок")])])], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */);
}

/***/ }),

/***/ "./resources/js/components/AddDesk.vue":
/*!*********************************************!*\
  !*** ./resources/js/components/AddDesk.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AddDesk_vue_vue_type_template_id_4b024182__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddDesk.vue?vue&type=template&id=4b024182 */ "./resources/js/components/AddDesk.vue?vue&type=template&id=4b024182");
/* harmony import */ var _AddDesk_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddDesk.vue?vue&type=script&lang=js */ "./resources/js/components/AddDesk.vue?vue&type=script&lang=js");
/* harmony import */ var D_OSPanel_domains_rab1board_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_OSPanel_domains_rab1board_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_AddDesk_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AddDesk_vue_vue_type_template_id_4b024182__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/AddDesk.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/CreatePanel.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/CreatePanel.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CreatePanel_vue_vue_type_template_id_3aea3d4d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreatePanel.vue?vue&type=template&id=3aea3d4d */ "./resources/js/components/CreatePanel.vue?vue&type=template&id=3aea3d4d");
/* harmony import */ var _CreatePanel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreatePanel.vue?vue&type=script&lang=js */ "./resources/js/components/CreatePanel.vue?vue&type=script&lang=js");
/* harmony import */ var D_OSPanel_domains_rab1board_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_OSPanel_domains_rab1board_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_CreatePanel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_CreatePanel_vue_vue_type_template_id_3aea3d4d__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/CreatePanel.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/InputSave.vue":
/*!***********************************************!*\
  !*** ./resources/js/components/InputSave.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _InputSave_vue_vue_type_template_id_5e8091e8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InputSave.vue?vue&type=template&id=5e8091e8 */ "./resources/js/components/InputSave.vue?vue&type=template&id=5e8091e8");
/* harmony import */ var _InputSave_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InputSave.vue?vue&type=script&lang=js */ "./resources/js/components/InputSave.vue?vue&type=script&lang=js");
/* harmony import */ var D_OSPanel_domains_rab1board_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_OSPanel_domains_rab1board_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_InputSave_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_InputSave_vue_vue_type_template_id_5e8091e8__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/InputSave.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/main/Columns.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/main/Columns.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Columns_vue_vue_type_template_id_70dbcdb2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Columns.vue?vue&type=template&id=70dbcdb2 */ "./resources/js/components/main/Columns.vue?vue&type=template&id=70dbcdb2");
/* harmony import */ var _Columns_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Columns.vue?vue&type=script&lang=js */ "./resources/js/components/main/Columns.vue?vue&type=script&lang=js");
/* harmony import */ var D_OSPanel_domains_rab1board_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_OSPanel_domains_rab1board_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Columns_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Columns_vue_vue_type_template_id_70dbcdb2__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/main/Columns.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/main/Desks.vue":
/*!************************************************!*\
  !*** ./resources/js/components/main/Desks.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Desks_vue_vue_type_template_id_2c907f8f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Desks.vue?vue&type=template&id=2c907f8f */ "./resources/js/components/main/Desks.vue?vue&type=template&id=2c907f8f");
/* harmony import */ var _Desks_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Desks.vue?vue&type=script&lang=js */ "./resources/js/components/main/Desks.vue?vue&type=script&lang=js");
/* harmony import */ var D_OSPanel_domains_rab1board_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_OSPanel_domains_rab1board_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Desks_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Desks_vue_vue_type_template_id_2c907f8f__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/main/Desks.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/views/Dashboard.vue":
/*!******************************************!*\
  !*** ./resources/js/views/Dashboard.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Dashboard_vue_vue_type_template_id_1f79daf6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=template&id=1f79daf6 */ "./resources/js/views/Dashboard.vue?vue&type=template&id=1f79daf6");
/* harmony import */ var _Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=script&lang=js */ "./resources/js/views/Dashboard.vue?vue&type=script&lang=js");
/* harmony import */ var D_OSPanel_domains_rab1board_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_OSPanel_domains_rab1board_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Dashboard_vue_vue_type_template_id_1f79daf6__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/views/Dashboard.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/AddDesk.vue?vue&type=script&lang=js":
/*!*********************************************************************!*\
  !*** ./resources/js/components/AddDesk.vue?vue&type=script&lang=js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AddDesk_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AddDesk_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AddDesk.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AddDesk.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/CreatePanel.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./resources/js/components/CreatePanel.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreatePanel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreatePanel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CreatePanel.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/CreatePanel.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/InputSave.vue?vue&type=script&lang=js":
/*!***********************************************************************!*\
  !*** ./resources/js/components/InputSave.vue?vue&type=script&lang=js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_InputSave_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_InputSave_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./InputSave.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/InputSave.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/main/Columns.vue?vue&type=script&lang=js":
/*!**************************************************************************!*\
  !*** ./resources/js/components/main/Columns.vue?vue&type=script&lang=js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Columns_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Columns_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Columns.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/main/Columns.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/main/Desks.vue?vue&type=script&lang=js":
/*!************************************************************************!*\
  !*** ./resources/js/components/main/Desks.vue?vue&type=script&lang=js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Desks_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Desks_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Desks.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/main/Desks.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/views/Dashboard.vue?vue&type=script&lang=js":
/*!******************************************************************!*\
  !*** ./resources/js/views/Dashboard.vue?vue&type=script&lang=js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Dashboard.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Dashboard.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/AddDesk.vue?vue&type=template&id=4b024182":
/*!***************************************************************************!*\
  !*** ./resources/js/components/AddDesk.vue?vue&type=template&id=4b024182 ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AddDesk_vue_vue_type_template_id_4b024182__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AddDesk_vue_vue_type_template_id_4b024182__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AddDesk.vue?vue&type=template&id=4b024182 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AddDesk.vue?vue&type=template&id=4b024182");


/***/ }),

/***/ "./resources/js/components/CreatePanel.vue?vue&type=template&id=3aea3d4d":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/CreatePanel.vue?vue&type=template&id=3aea3d4d ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreatePanel_vue_vue_type_template_id_3aea3d4d__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreatePanel_vue_vue_type_template_id_3aea3d4d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CreatePanel.vue?vue&type=template&id=3aea3d4d */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/CreatePanel.vue?vue&type=template&id=3aea3d4d");


/***/ }),

/***/ "./resources/js/components/InputSave.vue?vue&type=template&id=5e8091e8":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/InputSave.vue?vue&type=template&id=5e8091e8 ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_InputSave_vue_vue_type_template_id_5e8091e8__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_InputSave_vue_vue_type_template_id_5e8091e8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./InputSave.vue?vue&type=template&id=5e8091e8 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/InputSave.vue?vue&type=template&id=5e8091e8");


/***/ }),

/***/ "./resources/js/components/main/Columns.vue?vue&type=template&id=70dbcdb2":
/*!********************************************************************************!*\
  !*** ./resources/js/components/main/Columns.vue?vue&type=template&id=70dbcdb2 ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Columns_vue_vue_type_template_id_70dbcdb2__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Columns_vue_vue_type_template_id_70dbcdb2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Columns.vue?vue&type=template&id=70dbcdb2 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/main/Columns.vue?vue&type=template&id=70dbcdb2");


/***/ }),

/***/ "./resources/js/components/main/Desks.vue?vue&type=template&id=2c907f8f":
/*!******************************************************************************!*\
  !*** ./resources/js/components/main/Desks.vue?vue&type=template&id=2c907f8f ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Desks_vue_vue_type_template_id_2c907f8f__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Desks_vue_vue_type_template_id_2c907f8f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Desks.vue?vue&type=template&id=2c907f8f */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/main/Desks.vue?vue&type=template&id=2c907f8f");


/***/ }),

/***/ "./resources/js/views/Dashboard.vue?vue&type=template&id=1f79daf6":
/*!************************************************************************!*\
  !*** ./resources/js/views/Dashboard.vue?vue&type=template&id=1f79daf6 ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dashboard_vue_vue_type_template_id_1f79daf6__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dashboard_vue_vue_type_template_id_1f79daf6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Dashboard.vue?vue&type=template&id=1f79daf6 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Dashboard.vue?vue&type=template&id=1f79daf6");


/***/ })

}]);