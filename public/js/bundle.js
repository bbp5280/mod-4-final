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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const submitNewItem = event => {
  event.preventDefault();
  let itemToPost = {
    itemName: $('.item-name').val(),
    lingerReason: $('.item-linger-reason').val(),
    cleanliness: $('.dropdown-option').val()
  };
  postNewItem(itemToPost);
};

const postNewItem = itemObject => {
  fetch('/api/v1/garage_items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemObject)
  }).then(response => response.json()).then(parsed => console.log(parsed)).catch(error => console.log(error));
};

const appendNewItem = () => {};

const getItems = () => {
  fetch('/api/v1/garage_items').then(response => response.json()).then(parsed => appendGarageItems(parsed)).catch(error => console.log(error));
};

const appendGarageItems = items => {
  items.forEach(item => {
    $('.items-list').append(`<li class='garage-item item-id-${item.id}'>${item.itemName}</li>`);
  });
  numberOfGarageItems(items);
  numberOfItemCleanliness(items);
};

const numberOfGarageItems = items => {
  $('.items-count-container').append(`<p class='item-count'>You Have ${items.length} In Your Garage</p>`);
};

const filterCondition = (items, condition) => {
  const filteredItems = items.filter(item => item.cleanliness === condition);
  return filteredItems.length;
};

const numberOfItemCleanliness = items => {
  const numRancid = filterCondition(items, 'Rancid');
  $('.items-count-container').append(`<p class='item-cleanliness-count sparkling'>You Have ${filterCondition(items, 'Sparkling')} Sparkling Items In Your Garage</p>
    <p class='item-cleanliness-count dusty'>You Have ${filterCondition(items, 'Dusty')} Dusty Items In Your Garage</p>
    <p class='item-cleanliness-count rancid'>You Have ${filterCondition(items, 'Rancid')} Rancid Items In Your Garage</p>`);
};

$('.add-items-form').on('click', '.submit-button', event => submitNewItem(event));
$(document).ready(() => getItems());

/***/ })
/******/ ]);