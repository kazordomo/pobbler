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
eval("__webpack_require__.r(__webpack_exports__);\nclass Chat {\r\n\r\n    constructor(user) {\r\n\r\n        this.DOMElement = document.querySelector('section#chat');\r\n\r\n        this.user = user;\r\n        this.isTypingBool = false;\r\n        this.timeout = null;\r\n\r\n        this.msg_el_input = document.getElementById('section#chat chat_message');\r\n        this.msgs_el_container = document.querySelector('section#chat .messages');\r\n\r\n        this.socket = io();\r\n\r\n        this.init();\r\n    }\r\n\r\n    init () {\r\n\r\n        // Init the send button.\r\n        this.DOMElement.querySelector('.form_fields button').addEventListener('click', () => {\r\n            this.send(this.msg_el_input.value)\r\n        });\r\n\r\n        // Init the text input.\r\n        this.msg_el_input.addEventListener('input', () => {\r\n            this.socket.emit('typing', this.user.id);\r\n        })\r\n\r\n        // Init the socket listeners.\r\n        this.socket.on('message', (user, message) => {\r\n            this.fetch(user, message);\r\n        });\r\n        this.socket.on('typing', user => {\r\n            this.isTyping(user);\r\n        });\r\n        this.socket.on('is not typing', () => {\r\n            // TODO:\r\n        });\r\n    }\r\n\r\n    send (message) {\r\n        this.socket.emit('message', { user: this.user.id, message });\r\n\r\n        // Reset the text-input.\r\n        this.msg_el_input.value = '';\r\n        this.msg_el_input.focus();\r\n    }\r\n\r\n    fetch ({ user, message }){\r\n\r\n        // Show the message  on either the users or the friends side of the chat.\r\n        let userClass = (user === this.user.id) ? 'user_message' : 'friend_message';\r\n        let rowEl = document.createElement('div')\r\n        let messageEl = document.createElement('div');\r\n\r\n        this.isTypingTimeout();\r\n\r\n        rowEl.className = 'row';\r\n        messageEl.className = `message ${userClass}`;\r\n        messageEl.innerHTML = message;\r\n\r\n        rowEl.appendChild(messageEl);\r\n        this.msgs_el_container.appendChild(rowEl);\r\n    }\r\n\r\n    isTypingTimeout (isUser) {\r\n\r\n        // Ignore the rest of the function if user is stil typing.\r\n        if(!this.isTypingBool)\r\n            return;\r\n\r\n        this.isTypingBool = false;\r\n\r\n        // TODO: user \"ifUser\" to check instead of the element\r\n        if(this.msgs_el_container.querySelector('.is_typing')) {\r\n            this.msgs_el_container.removeChild(this.msgs_el_container.querySelector('.is_typing'));\r\n        }\r\n\r\n        this.socket.emit('is not typing');\r\n    }\r\n\r\n    isTyping (user) {\r\n\r\n        // TODO: Fix this part\r\n        \r\n        // If typing-timeout already begun, refresh it.\r\n        if(this.isTypingBool) {\r\n            clearTimeout(this.timeout);\r\n            this.timeout = setTimeout(() => this.isTypingTimeout(), 3000);\r\n            return;\r\n        }\r\n\r\n        // Show the \"is typing\" icon on either the users or the friends side of the chat.\r\n        let isUser = (user === this.user.id);\r\n        let userClass = isUser ? '' : 'friend_message';\r\n\r\n        this.socket.emit('typing', { user: this.user });\r\n\r\n        this.isTypingBool = true;\r\n\r\n\r\n        // If its not the user typing -> create the \"is typing\" element.\r\n        if(!isUser) {\r\n\r\n            let rowEl = document.createElement('div');\r\n            let isTypingEl = document.createElement('div');\r\n            \r\n            rowEl.className = `is_typing ${userClass}`;\r\n            isTypingEl.innerHTML = '- - -';\r\n    \r\n            rowEl.appendChild(isTypingEl);\r\n            this.msgs_el_container.appendChild(rowEl);\r\n        }\r\n\r\n        // Check every third second if user is typing\r\n        this.timeout = setTimeout(() => this.isTypingTimeout(isUser), 3000);\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Chat);\n\n//# sourceURL=webpack:///./app/js/components/chat.js?");

/***/ }),

/***/ "./app/js/components/custom.js":
/*!*************************************!*\
  !*** ./app/js/components/custom.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Custom {\r\n\r\n    constructor () {\r\n        \r\n        this.DOMElement = document.querySelector('section#custom');\r\n        this.init();\r\n\r\n    }\r\n\r\n    init () {\r\n\r\n        this.DOMElement.querySelector('form button').addEventListener('click', event => {\r\n\r\n            event.preventDefault();\r\n            this._onClick();    \r\n        });\r\n    }\r\n\r\n    _onClick () {\r\n\r\n        const checkboxes = this.DOMElement.querySelectorAll('form input[type=\"checkbox');\r\n\r\n        let values = Array.from(checkboxes)\r\n                        .filter(checkbox => checkbox.checked)\r\n                        .map(checkbox => checkbox.value);\r\n\r\n        console.log('Find a proper chatroom with the values: ', values);\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Custom);\n\n//# sourceURL=webpack:///./app/js/components/custom.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_profile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/profile */ \"./app/js/components/profile.js\");\n/* harmony import */ var _components_chat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/chat */ \"./app/js/components/chat.js\");\n/* harmony import */ var _components_custom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/custom */ \"./app/js/components/custom.js\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/index.js\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_3__);\n\r\n\r\n\r\n\r\n\r\nclass Page {\r\n\r\n    constructor (url, script = null) {\r\n        this.url = `app/views/${url}`;\r\n        this.script = script;\r\n    }\r\n\r\n    load () {\r\n        return fetch(this.url)\r\n            .then(response => response.text())\r\n            .then(data => this.html = data)\r\n            .catch(err => this.html = 'Something went wrong!');\r\n    }\r\n\r\n    loadScript (script) {\r\n        switch(script) {\r\n            case 'profile':\r\n                new _components_profile__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n                break;\r\n            case 'chat':\r\n                new _components_chat__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ id: uuid__WEBPACK_IMPORTED_MODULE_3___default()(), name: uuid__WEBPACK_IMPORTED_MODULE_3___default()() });\r\n                break;\r\n            case 'custom':\r\n                new _components_custom__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\r\n                break;\r\n            default:\r\n                return false;\r\n        }\r\n    }\r\n\r\n    render (element) {\r\n        element.innerHTML = this.html;\r\n        // Be sure that we render the html before the script\r\n        setTimeout(() => this.loadScript(this.script), 0);\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Page);\n\n//# sourceURL=webpack:///./app/js/general/page.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _general_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./general/router */ \"./app/js/general/router.js\");\n/* harmony import */ var _general_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./general/layout */ \"./app/js/general/layout.js\");\n/* harmony import */ var _general_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./general/page */ \"./app/js/general/page.js\");\n\r\n\r\n\r\n\r\nnew _general_router__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\r\n    {\r\n        start: new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('start.html'),\r\n        profile: new _general_layout__WEBPACK_IMPORTED_MODULE_1__[\"default\"](new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('nav.html'), new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('profile.html', 'profile')),\r\n        chat: new _general_layout__WEBPACK_IMPORTED_MODULE_1__[\"default\"](new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('nav.html'), new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('chat.html', 'chat')),\r\n        custom: new _general_layout__WEBPACK_IMPORTED_MODULE_1__[\"default\"](new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('nav.html'), new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('custom.html', 'custom')),\r\n        notFound: new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('404.html'),\r\n        '#default': new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('start.html'),\r\n    },\r\n    document.querySelector('main')\r\n);\n\n//# sourceURL=webpack:///./app/js/main.js?");

/***/ }),

/***/ "./node_modules/uuid/index.js":
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var v1 = __webpack_require__(/*! ./v1 */ \"./node_modules/uuid/v1.js\");\nvar v4 = __webpack_require__(/*! ./v4 */ \"./node_modules/uuid/v4.js\");\n\nvar uuid = v4;\nuuid.v1 = v1;\nuuid.v4 = v4;\n\nmodule.exports = uuid;\n\n\n//# sourceURL=webpack:///./node_modules/uuid/index.js?");

/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\nvar byteToHex = [];\nfor (var i = 0; i < 256; ++i) {\n  byteToHex[i] = (i + 0x100).toString(16).substr(1);\n}\n\nfunction bytesToUuid(buf, offset) {\n  var i = offset || 0;\n  var bth = byteToHex;\n  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4\n  return ([bth[buf[i++]], bth[buf[i++]], \n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]],\n\tbth[buf[i++]], bth[buf[i++]],\n\tbth[buf[i++]], bth[buf[i++]]]).join('');\n}\n\nmodule.exports = bytesToUuid;\n\n\n//# sourceURL=webpack:///./node_modules/uuid/lib/bytesToUuid.js?");

/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Unique ID creation requires a high quality random # generator.  In the\n// browser this is a little complicated due to unknown quality of Math.random()\n// and inconsistent support for the `crypto` API.  We do the best we can via\n// feature-detection\n\n// getRandomValues needs to be invoked in a context where \"this\" is a Crypto\n// implementation. Also, find the complete implementation of crypto on IE11.\nvar getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||\n                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));\n\nif (getRandomValues) {\n  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto\n  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef\n\n  module.exports = function whatwgRNG() {\n    getRandomValues(rnds8);\n    return rnds8;\n  };\n} else {\n  // Math.random()-based (RNG)\n  //\n  // If all else fails, use Math.random().  It's fast, but is of unspecified\n  // quality.\n  var rnds = new Array(16);\n\n  module.exports = function mathRNG() {\n    for (var i = 0, r; i < 16; i++) {\n      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;\n      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;\n    }\n\n    return rnds;\n  };\n}\n\n\n//# sourceURL=webpack:///./node_modules/uuid/lib/rng-browser.js?");

/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var rng = __webpack_require__(/*! ./lib/rng */ \"./node_modules/uuid/lib/rng-browser.js\");\nvar bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ \"./node_modules/uuid/lib/bytesToUuid.js\");\n\n// **`v1()` - Generate time-based UUID**\n//\n// Inspired by https://github.com/LiosK/UUID.js\n// and http://docs.python.org/library/uuid.html\n\nvar _nodeId;\nvar _clockseq;\n\n// Previous uuid creation time\nvar _lastMSecs = 0;\nvar _lastNSecs = 0;\n\n// See https://github.com/broofa/node-uuid for API details\nfunction v1(options, buf, offset) {\n  var i = buf && offset || 0;\n  var b = buf || [];\n\n  options = options || {};\n  var node = options.node || _nodeId;\n  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;\n\n  // node and clockseq need to be initialized to random values if they're not\n  // specified.  We do this lazily to minimize issues related to insufficient\n  // system entropy.  See #189\n  if (node == null || clockseq == null) {\n    var seedBytes = rng();\n    if (node == null) {\n      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)\n      node = _nodeId = [\n        seedBytes[0] | 0x01,\n        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]\n      ];\n    }\n    if (clockseq == null) {\n      // Per 4.2.2, randomize (14 bit) clockseq\n      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;\n    }\n  }\n\n  // UUID timestamps are 100 nano-second units since the Gregorian epoch,\n  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so\n  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'\n  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.\n  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();\n\n  // Per 4.2.1.2, use count of uuid's generated during the current clock\n  // cycle to simulate higher resolution clock\n  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;\n\n  // Time since last uuid creation (in msecs)\n  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;\n\n  // Per 4.2.1.2, Bump clockseq on clock regression\n  if (dt < 0 && options.clockseq === undefined) {\n    clockseq = clockseq + 1 & 0x3fff;\n  }\n\n  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new\n  // time interval\n  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {\n    nsecs = 0;\n  }\n\n  // Per 4.2.1.2 Throw error if too many uuids are requested\n  if (nsecs >= 10000) {\n    throw new Error('uuid.v1(): Can\\'t create more than 10M uuids/sec');\n  }\n\n  _lastMSecs = msecs;\n  _lastNSecs = nsecs;\n  _clockseq = clockseq;\n\n  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch\n  msecs += 12219292800000;\n\n  // `time_low`\n  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;\n  b[i++] = tl >>> 24 & 0xff;\n  b[i++] = tl >>> 16 & 0xff;\n  b[i++] = tl >>> 8 & 0xff;\n  b[i++] = tl & 0xff;\n\n  // `time_mid`\n  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;\n  b[i++] = tmh >>> 8 & 0xff;\n  b[i++] = tmh & 0xff;\n\n  // `time_high_and_version`\n  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version\n  b[i++] = tmh >>> 16 & 0xff;\n\n  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)\n  b[i++] = clockseq >>> 8 | 0x80;\n\n  // `clock_seq_low`\n  b[i++] = clockseq & 0xff;\n\n  // `node`\n  for (var n = 0; n < 6; ++n) {\n    b[i + n] = node[n];\n  }\n\n  return buf ? buf : bytesToUuid(b);\n}\n\nmodule.exports = v1;\n\n\n//# sourceURL=webpack:///./node_modules/uuid/v1.js?");

/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var rng = __webpack_require__(/*! ./lib/rng */ \"./node_modules/uuid/lib/rng-browser.js\");\nvar bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ \"./node_modules/uuid/lib/bytesToUuid.js\");\n\nfunction v4(options, buf, offset) {\n  var i = buf && offset || 0;\n\n  if (typeof(options) == 'string') {\n    buf = options === 'binary' ? new Array(16) : null;\n    options = null;\n  }\n  options = options || {};\n\n  var rnds = options.random || (options.rng || rng)();\n\n  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n  rnds[6] = (rnds[6] & 0x0f) | 0x40;\n  rnds[8] = (rnds[8] & 0x3f) | 0x80;\n\n  // Copy bytes to buffer, if provided\n  if (buf) {\n    for (var ii = 0; ii < 16; ++ii) {\n      buf[i + ii] = rnds[ii];\n    }\n  }\n\n  return buf || bytesToUuid(rnds);\n}\n\nmodule.exports = v4;\n\n\n//# sourceURL=webpack:///./node_modules/uuid/v4.js?");

/***/ })

/******/ });