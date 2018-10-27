/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/js/components/chat.js":
/*!***********************************!*\
  !*** ./app/js/components/chat.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Chat {\r\n\r\n    constructor() {\r\n        this.isTypingBool = false;\r\n        this.timeout = null;\r\n\r\n        this.msg_el_input = document.getElementById('chat_message');\r\n        this.msgs_el_container = document.querySelector('section#chat .messages');\r\n\r\n        this.socket = io();\r\n\r\n        this.init();\r\n    }\r\n\r\n    init () {\r\n        document.querySelector('.form_fields button').addEventListener('click', () => {\r\n            this.send(this.msg_el_input.value)\r\n        });\r\n\r\n        this.msg_el_input.addEventListener('input', () => {\r\n            this.socket.emit('typing');\r\n        })\r\n\r\n        this.socket.on('message', message => {\r\n            this.fetch(message);\r\n        });\r\n        this.socket.on('typing', () => {\r\n            this.isTyping();\r\n        });\r\n        this.socket.on('is not typing', () => {\r\n            console.log('We need to broadcast this!!!!');\r\n        });\r\n    }\r\n\r\n    send (message) {\r\n        this.socket.emit('message', { user: 'Zak', message });\r\n        \r\n        if(this.isTypingBool)\r\n            this.isTypingTimeout();\r\n\r\n        this.msg_el_input.value = '';\r\n        this.msg_el_input.focus();\r\n    }\r\n\r\n    fetch ({ user, message }){\r\n        let rowEl = document.createElement('div')\r\n        let messageEl = document.createElement('div');\r\n        rowEl.className = 'row';\r\n        messageEl.className = 'message user_message';\r\n        messageEl.innerHTML = message;\r\n\r\n        rowEl.appendChild(messageEl);\r\n        this.msgs_el_container.appendChild(rowEl);\r\n    }\r\n\r\n    isTypingTimeout () {\r\n        this.isTypingBool = false;\r\n        this.msgs_el_container.removeChild(this.msgs_el_container.querySelector('.is_typing'));\r\n        this.socket.emit('is not typing');\r\n    }\r\n\r\n    isTyping () {\r\n\r\n        // If typing-timeout already begun, refresh it.\r\n        if(this.isTypingBool) {\r\n            clearTimeout(this.timeout);\r\n            this.timeout = setTimeout(() => this.isTypingTimeout(), 3000);\r\n            return;\r\n        }\r\n\r\n        this.isTypingBool = true;\r\n        this.socket.emit('typing');\r\n        let rowEl = document.createElement('div');\r\n        let isTypingEl = document.createElement('div');\r\n        rowEl.className = 'is_typing';\r\n        isTypingEl.innerHTML = '- - -';\r\n\r\n        rowEl.appendChild(isTypingEl);\r\n        this.msgs_el_container.appendChild(rowEl);\r\n\r\n        this.timeout = setTimeout(() => this.isTypingTimeout(), 3000);\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Chat);\n\n//# sourceURL=webpack:///./app/js/components/chat.js?");

/***/ }),

/***/ "./app/js/components/profile.js":
/*!**************************************!*\
  !*** ./app/js/components/profile.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Profile {\r\n\r\n    constructor() {\r\n        \r\n    }\r\n\r\n    \r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Profile);\n\n//# sourceURL=webpack:///./app/js/components/profile.js?");

/***/ }),

/***/ "./app/js/general/layout.js":
/*!**********************************!*\
  !*** ./app/js/general/layout.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Layout {\r\n\r\n    constructor (...pages) {\r\n        // Layout takes multiple pages and calls their load method.\r\n        this.pages = pages;\r\n    }\r\n\r\n    load () {\r\n        // Call each page load method and return when all are resolved.\r\n        return Promise.all(this.pages.map(page => page.load()));\r\n    }\r\n\r\n    render (element) {\r\n        for (let page of this.pages) {\r\n            const div = document.createElement('div');\r\n            page.render(div);\r\n            element.appendChild(div);\r\n        }\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Layout);\n\n//# sourceURL=webpack:///./app/js/general/layout.js?");

/***/ }),

/***/ "./app/js/general/page.js":
/*!********************************!*\
  !*** ./app/js/general/page.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_profile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/profile */ \"./app/js/components/profile.js\");\n/* harmony import */ var _components_chat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/chat */ \"./app/js/components/chat.js\");\n\r\n\r\n\r\nclass Page {\r\n\r\n    constructor (url, script = null) {\r\n        this.url = `app/views/${url}`;\r\n        this.script = script;\r\n    }\r\n\r\n    load () {\r\n        return fetch(this.url)\r\n            .then(response => response.text())\r\n            .then(data => this.html = data)\r\n            .catch(err => this.html = 'Something went wrong!');\r\n    }\r\n\r\n    loadScript (script) {\r\n        switch(script) {\r\n            case 'profile':\r\n                new _components_profile__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n                break;\r\n            case 'chat':\r\n                new _components_chat__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n                break;\r\n            default:\r\n                return false;\r\n        }\r\n    }\r\n\r\n    render (element) {\r\n        element.innerHTML = this.html;\r\n        // Be sure that we render the html before the script\r\n        setTimeout(() => this.loadScript(this.script), 0);\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Page);\n\n//# sourceURL=webpack:///./app/js/general/page.js?");

/***/ }),

/***/ "./app/js/general/router.js":
/*!**********************************!*\
  !*** ./app/js/general/router.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_profile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/profile */ \"./app/js/components/profile.js\");\n/* harmony import */ var _components_chat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/chat */ \"./app/js/components/chat.js\");\n\r\n\r\n\r\nclass Router {\r\n\r\n    constructor(routes, element) {\r\n        this.routes = routes;\r\n        this.element = element;\r\n\r\n        window.onhashchange = this.hashChanged.bind(this);\r\n        this.hashChanged();\r\n    }\r\n\r\n    async hashChanged (event) {\r\n        if (window.location.hash.length) {\r\n            // Get the new page and render it.\r\n            const pageName = window.location.hash.substr(1);\r\n            this.render(pageName);\r\n        } else {\r\n            // If no path - render default\r\n            this.render('#default');\r\n        }\r\n    }\r\n\r\n    async render (pageName) {\r\n        let page = this.routes[pageName];\r\n        \r\n        if(!page)\r\n            page = this.routes['notFound'];\r\n\r\n        await page.load();\r\n        this.element.innerHTML = '';\r\n        page.render(this.element);\r\n    }\r\n    \r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Router);\n\n//# sourceURL=webpack:///./app/js/general/router.js?");

/***/ }),

/***/ "./app/js/main.js":
/*!************************!*\
  !*** ./app/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _general_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./general/router */ \"./app/js/general/router.js\");\n/* harmony import */ var _general_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./general/layout */ \"./app/js/general/layout.js\");\n/* harmony import */ var _general_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./general/page */ \"./app/js/general/page.js\");\n\r\n\r\n\r\n\r\nnew _general_router__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\r\n    {\r\n        start: new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('start.html'),\r\n        profile: new _general_layout__WEBPACK_IMPORTED_MODULE_1__[\"default\"](new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('nav.html'), new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('profile.html', 'profile')),\r\n        chat: new _general_layout__WEBPACK_IMPORTED_MODULE_1__[\"default\"](new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('nav.html'), new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('chat.html', 'chat')),\r\n        notFound: new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('404.html'),\r\n        '#default': new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('start.html'),\r\n    },\r\n    document.querySelector('main')\r\n);\n\n//# sourceURL=webpack:///./app/js/main.js?");

/***/ })

/******/ });