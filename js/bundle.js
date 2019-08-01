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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/helper.js":
/*!**********************!*\
  !*** ./js/helper.js ***!
  \**********************/
/*! exports provided: resetComicArticleVisibility, toggleElement, fade, createBigImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resetComicArticleVisibility\", function() { return resetComicArticleVisibility; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toggleElement\", function() { return toggleElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fade\", function() { return fade; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createBigImage\", function() { return createBigImage; });\nfunction resetComicArticleVisibility() {\r\n    const comicMenu = document.querySelector('#comic-menu');\r\n    const comicPages = document.querySelectorAll('.comic-pages');\r\n    \r\n    comicPages.forEach(comic => {\r\n        if (!comic.classList.contains('hidden')) {\r\n            toggleElement(comic); // add hidden\r\n            toggleElement(comicMenu); // remove hidden\r\n        }\r\n    });\r\n}\r\n\r\nfunction toggleElement(elem) {\r\n    if (elem.classList.contains('hidden')) {\r\n        fade(elem, .05, 0, 1);\r\n        elem.classList.remove('hidden');\r\n    } else {\r\n        elem.classList.add('hidden');\r\n    }\r\n}\r\n\r\nfunction fade(elem, rate, start, end) {\r\n    let opacity = start;\r\n    elem.style.opacity = opacity;\r\n\r\n    const transform = _ => {\r\n        opacity += rate;\r\n        elem.style.opacity = opacity;\r\n\r\n        if (Math.sign(rate) === -1 && opacity <= end || opacity >= end) return;\r\n\r\n        window.requestAnimationFrame(transform);\r\n    };\r\n\r\n    window.requestAnimationFrame(transform)\r\n}\r\n\r\nfunction createBigImage(event) {\r\n    // create and add overlay\r\n    const overlay = document.createElement('div');\r\n    overlay.classList.add('big-img-overlay');\r\n    document.body.appendChild(overlay);\r\n\r\n    // generate big image src\r\n    const src = event.target.src\r\n\r\n    // create and add big-image\r\n    const bigImage = document.createElement('img');\r\n    bigImage.classList.add('big-img');\r\n    bigImage.src = src;\r\n    document.body.appendChild(bigImage);\r\n    fade(overlay, .05, 0, .5);\r\n    fade(bigImage, .05, 0, 1);\r\n\r\n    // click on image to remove it\r\n    bigImage.addEventListener('click', removeBigImage);\r\n    overlay.addEventListener('click', removeBigImage);\r\n}\r\n\r\nfunction removeBigImage(event) {\r\n    // remove overlay and big-image\r\n    const overlay = document.querySelector('.big-img-overlay');\r\n    document.body.removeChild(overlay);\r\n\r\n    const bigImage = document.querySelector('.big-img');\r\n    document.body.removeChild(bigImage);\r\n}\n\n//# sourceURL=webpack:///./js/helper.js?");

/***/ }),

/***/ "./js/logoMenu.js":
/*!************************!*\
  !*** ./js/logoMenu.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return LogoMenu; });\n/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper.js */ \"./js/helper.js\");\n\r\n\r\nclass LogoMenu {\r\n    constructor (...logoMenuItems) {\r\n        // elements\r\n        this.homepageElem = document.querySelector('#homepage');\r\n        this.header = document.querySelector('body > header');\r\n\r\n        this.menuItems = {};\r\n        logoMenuItems.forEach(item => this.menuItems[item.sectionName] = item);\r\n\r\n        this.selectedItem = null;\r\n    }\r\n\r\n    reset () {\r\n        if (this.selectedItem) {\r\n            this.selectedItem.selected = false;\r\n            this.selectedItem = null;\r\n        }\r\n        Object.values(this.menuItems).forEach(item => item.reset());\r\n\r\n        // hide main logo/menu\r\n        this.header.classList.toggle('to-left');\r\n    }\r\n\r\n    handleClick (event) {\r\n        // hide header\r\n        this.header.classList.toggle('to-left');\r\n\r\n        // change sections\r\n        const newSelectedItem = this.menuItems[event.target.id.split('-')[0]];\r\n        \r\n        if (this.selectedItem) {\r\n            if (this.selectedItem.sectionName === newSelectedItem.sectionName) return;\r\n            // for comic\r\n            if (this.selectedItem.sectionName === 'comic') Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"resetComicArticleVisibility\"])();\r\n\r\n            this.selectedItem.selected = false;\r\n            this.selectedItem.handleMouseLeave();\r\n\r\n            Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"toggleElement\"])(this.selectedItem.sectionElem);\r\n        } else {\r\n            Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"toggleElement\"])(this.homepageElem);\r\n        }\r\n        \r\n        this.selectedItem = newSelectedItem;\r\n        this.selectedItem.selected = true;\r\n        \r\n        window.cancelAnimationFrame(this.selectedItem.animationID);\r\n        this.selectedItem.animationID = undefined;\r\n        this.selectedItem.handleMouseEnter();\r\n\r\n        Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"toggleElement\"])(this.selectedItem.sectionElem);\r\n    }\r\n\r\n    setAnimations () {\r\n        Object.values(this.menuItems).forEach(item =>\r\n            item.parent.addEventListener('click', this.handleClick.bind(this))\r\n        );\r\n    }\r\n}\n\n//# sourceURL=webpack:///./js/logoMenu.js?");

/***/ }),

/***/ "./js/logoMenuItem.js":
/*!****************************!*\
  !*** ./js/logoMenuItem.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return LogoMenuItem; });\nclass LogoMenuItem {\r\n    constructor (id) {\r\n        this.id = id;\r\n        this.sectionName = id.split('-')[0];\r\n\r\n        // html elements\r\n        this.sectionElem = document.querySelector(`#${this.sectionName}`);\r\n        this.parent = document.querySelector(`#${id}`);\r\n        this.textElem = document.querySelector(`#${this.sectionName}-text`);\r\n        this.lineElem = document.querySelector(`#${this.sectionName}-line`);\r\n\r\n        // attributes\r\n        this.lineWidth = Number(this.lineElem.getAttribute('width'));\r\n        this.textX = Number(this.textElem.getAttribute('x'));\r\n        this.fill = this.lineElem.getAttribute('fill');\r\n\r\n        this.origAttributes = {\r\n            lineWidth: this.lineWidth,\r\n            textX: this.textX\r\n        };\r\n\r\n        // for animation\r\n        this.animationID = undefined;\r\n        this.selected = false;\r\n    }\r\n\r\n    reset () {\r\n        this.lineWidth = this.origAttributes.lineWidth;\r\n        this.textX = this.origAttributes.textX;\r\n\r\n        this.lineElem.setAttribute('width', this.lineWidth);\r\n        this.textElem.setAttribute('x', this.textX);\r\n        this.textElem.setAttribute('fill', '#000');\r\n    }\r\n\r\n    // animations\r\n    moveOut () {\r\n        // when hovering\r\n        this.lineWidth += 1;\r\n        this.textX += 1;\r\n\r\n        this.lineElem.setAttribute('width', this.lineWidth);\r\n        this.textElem.setAttribute('x', this.textX);\r\n\r\n        if (this.lineWidth > this.origAttributes.lineWidth + 8) return;\r\n\r\n        this.animationID = window.requestAnimationFrame(this.moveOut.bind(this));\r\n    }\r\n\r\n    moveIn () {\r\n        // when stop hovering\r\n        this.lineWidth -= 1;\r\n        this.textX -= 1;\r\n\r\n        this.lineElem.setAttribute('width', this.lineWidth);\r\n        this.textElem.setAttribute('x', this.textX);\r\n\r\n        if (this.lineWidth <= this.origAttributes.lineWidth) return;\r\n\r\n        this.animationID = window.requestAnimationFrame(this.moveIn.bind(this));\r\n    }\r\n\r\n    handleMouseEnter () {\r\n        if (this.selected) return;\r\n\r\n        this.textElem.setAttribute('fill', this.fill);\r\n        window.requestAnimationFrame(this.moveOut.bind(this));\r\n    }\r\n    \r\n    handleMouseLeave () {\r\n        if (this.selected) return;\r\n        \r\n        window.cancelAnimationFrame(this.animationID);\r\n        this.animationID = undefined;\r\n        this.textElem.setAttribute('fill', '#000');\r\n\r\n        window.requestAnimationFrame(this.moveIn.bind(this));\r\n    }\r\n\r\n    \r\n    setAnimations () {\r\n        this.parent.addEventListener('mouseenter', this.handleMouseEnter.bind(this));\r\n        this.parent.addEventListener('mouseleave', this.handleMouseLeave.bind(this));\r\n    }\r\n}\n\n//# sourceURL=webpack:///./js/logoMenuItem.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _logoMenu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logoMenu.js */ \"./js/logoMenu.js\");\n/* harmony import */ var _logoMenuItem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logoMenuItem.js */ \"./js/logoMenuItem.js\");\n/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper.js */ \"./js/helper.js\");\n\r\n\r\n\r\n\r\n// handle main logo\r\nconst aboutItem = new _logoMenuItem_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('about-item');\r\naboutItem.setAnimations();\r\n\r\nconst comicItem = new _logoMenuItem_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('comic-item');\r\ncomicItem.setAnimations();\r\n\r\nconst illustrationItem = new _logoMenuItem_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('illustration-item');\r\nillustrationItem.setAnimations();\r\n\r\nconst logoMenu = new _logoMenu_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](aboutItem, comicItem, illustrationItem);\r\nlogoMenu.setAnimations();\r\n\r\n// small logo\r\nconst smallLogos = document.querySelectorAll('.small-logo');\r\nconst homepageElem = document.querySelector('#homepage');\r\n\r\nconst closeBtn = document.querySelector('#main-header .close-btn');\r\n\r\nsmallLogos.forEach(logo => {\r\n    logo.addEventListener('click', event => {\r\n        // remove close-btn\r\n        if (!closeBtn.classList.contains('hidden')) closeBtn.classList.add('hidden');\r\n\r\n        // handle section change\r\n        const targetID = event.currentTarget.id.split('-')[0];\r\n        const originElem = document.querySelector(`#${targetID}`);\r\n        \r\n        // for comic\r\n        if (targetID === 'comic') Object(_helper_js__WEBPACK_IMPORTED_MODULE_2__[\"resetComicArticleVisibility\"])()\r\n\r\n        Object(_helper_js__WEBPACK_IMPORTED_MODULE_2__[\"toggleElement\"])(originElem);\r\n        Object(_helper_js__WEBPACK_IMPORTED_MODULE_2__[\"toggleElement\"])(homepageElem);\r\n        logoMenu.reset();\r\n    });\r\n});\r\n\r\n// #main-header close-btn\r\ncloseBtn.addEventListener('click', event => {\r\n    logoMenu.header.classList.toggle('to-left');\r\n})\r\n\r\n// section-header menu btn\r\nconst menuBtns = document.querySelectorAll('.menu-btn');\r\n\r\nmenuBtns.forEach(btn => {\r\n    btn.addEventListener('click', event => {\r\n        // show close-btn\r\n        if (closeBtn.classList.contains('hidden')) closeBtn.classList.remove('hidden');\r\n\r\n        logoMenu.header.classList.toggle('to-left');\r\n    });\r\n});\r\n\r\n// comic-link\r\nconst comicMenu = document.querySelector('#comic-menu');\r\nconst comicPages = document.querySelectorAll('.comic-pages');\r\nconst comicLinks = document.querySelectorAll('.comic-link');\r\n\r\ncomicLinks.forEach(link => {\r\n    link.addEventListener('click', event => {\r\n        const targetElem = document.querySelector(event.currentTarget.hash);\r\n        Object(_helper_js__WEBPACK_IMPORTED_MODULE_2__[\"toggleElement\"])(comicMenu);\r\n        Object(_helper_js__WEBPACK_IMPORTED_MODULE_2__[\"toggleElement\"])(targetElem);\r\n    });\r\n});\r\n\r\n// comic back link\r\ncomicPages.forEach(page => {\r\n    const backLink = page.querySelector('.back-link');\r\n\r\n    backLink.addEventListener('click', event => {\r\n        Object(_helper_js__WEBPACK_IMPORTED_MODULE_2__[\"toggleElement\"])(page);\r\n        Object(_helper_js__WEBPACK_IMPORTED_MODULE_2__[\"toggleElement\"])(comicMenu);\r\n    });\r\n});\r\n\r\n// Big image\r\ndocument.querySelectorAll('#illustration img, .comic-pages img').forEach(img => \r\n    img.addEventListener('click', _helper_js__WEBPACK_IMPORTED_MODULE_2__[\"createBigImage\"])\r\n);\r\n\r\n// lazy loading images\r\n// https://css-tricks.com/the-complete-guide-to-lazy-loading-images/\r\ndocument.addEventListener('DOMContentLoaded', _ => {\r\n    const lazyloadImgs = document.querySelectorAll('img[data-src]');\r\n\r\n    if ('IntersectionObserver' in window) {\r\n        const imageObserver = new IntersectionObserver((entries, observer) => {\r\n            entries.forEach(entry => {\r\n                if (entry.isIntersecting) {\r\n                    const img = entry.target;\r\n                    img.src = img.dataset.src;\r\n                    imageObserver.unobserve(img);\r\n                }\r\n            });\r\n        });\r\n\r\n        lazyloadImgs.forEach(img => imageObserver.observe(img));\r\n    } else {\r\n        // fallback\r\n        lazyloadImgs.forEach(img => img.src = img.dataset.src);\r\n    }\r\n});\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ })

/******/ });