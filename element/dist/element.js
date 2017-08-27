/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"news":"wZCJ5NZMxDLOtvkTS64kN","newsInput":"_3j3n8vdkkF4_zxLwhIScaf","newsContainer":"_2G9IqEX8QmQBQoiXWRSzJY","truncate":"_3yQEETRaRRRH5T6uLam7nM"};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _root = __webpack_require__(0);

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2017 Quip
//import Service from "./service.jsx"


var Root = function (_React$Component) {
    _inherits(Root, _React$Component);

    function Root(props) {
        _classCallCheck(this, Root);

        var _this = _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).call(this, props));

        _this.state = {
            news: null,
            ticker: 'CRM',
            close: null,
            open: null,
            priceChange: null,
            error: []
        };
        return _this;
    }

    _createClass(Root, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var ticker = this.state.ticker;
            this.fetchNews(ticker);
            this.fetchDetails(ticker);
        }
    }, {
        key: 'fetchDetails',
        value: function fetchDetails(ticker) {
            var _this2 = this;

            fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + ticker + '&apikey=AU2Q75AJK6FBD0KQ').then(function (response) {
                return response.json();
            }).then(function (json) {
                //Clean array
                var cleanArray = Object.keys(json['Time Series (Daily)']).map(function (key) {
                    return json['Time Series (Daily)'][key];
                });
                //Save only today's and yesterday's details
                var todayDetails = cleanArray[0];
                var yesterdayDetails = cleanArray[1];

                _this2.setState({
                    close: todayDetails["4. close"],
                    open: todayDetails["1. open"],
                    priceChange: (todayDetails["4. close"] - yesterdayDetails["4. close"]).toFixed(2)
                });
            }).catch(function (err) {
                _this2.setState({ error: [].concat(_toConsumableArray(_this2.state.error), [error]) });
            });
        }
    }, {
        key: 'fetchNews',
        value: function fetchNews(ticker) {
            var _this3 = this;

            var api_key = '60c438deac3f44ee98d47227f06193e1';
            var search_url = 'https://api.cognitive.microsoft.com/bing/v7.0/news/search';
            var fetchHeaders = {
                'Ocp-Apim-Subscription-Key': '' + api_key
            };

            fetch(search_url + '?q=$' + ticker + '+stock&sortby=date&count=3', { headers: fetchHeaders }).then(function (response) {
                return response.json();
            }).then(function (json) {
                _this3.setState({ news: json.value });
                console.log(_this3.state.news);
            }).catch(function (error) {
                _this3.setState({ error: [].concat(_toConsumableArray(_this3.state.error), [error]) });
            });
        }
    }, {
        key: 'timeSince',
        value: function timeSince(date) {
            var seconds = Math.floor((new Date() - new Date(date)) / 1000);

            var interval = Math.floor(seconds / 31536000);
            if (interval >= 1) {
                if (interval == 1) {
                    return interval + ' year ago';
                }
                return interval + ' years ago';
            }

            interval = Math.floor(seconds / 2592000);
            if (interval >= 1) {
                if (interval == 1) {
                    return interval + ' month ago';
                }
                return interval + ' months ago';
            }

            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                if (interval == 1) {
                    return interval + ' day ago';
                }
                return interval + ' days ago';
            }

            interval = Math.floor(seconds / 3600);

            if (interval >= 1) {
                if (interval == 1) {
                    return interval + ' hour ago';
                }
                return interval + ' hours ago';
            }

            interval = Math.floor(seconds / 60);

            if (interval >= 1) {
                if (interval == 1) {
                    return interval + ' minute ago';
                }
                return interval + ' minutes ago';
            }

            interval = Math.floor(seconds);

            if (interval == 1) {
                return interval + ' second ago';
            }

            return interval + ' seconds ago';
        }
    }, {
        key: 'tickerNews',
        value: function tickerNews() {
            var _this4 = this;

            return this.state.news.map(function (article, index) {
                return React.createElement(
                    'div',
                    { className: _root2.default.newsContainer, key: index },
                    React.createElement(
                        'h4',
                        { className: _root2.default.truncate },
                        React.createElement(
                            'a',
                            { href: article.url, target: '_blank' },
                            article.name
                        )
                    ),
                    React.createElement(
                        'div',
                        null,
                        article.provider[0].name,
                        ' | ',
                        _this4.timeSince(article.datePublished)
                    )
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                { className: _root2.default.news },
                React.createElement(
                    'div',
                    { className: _root2.default.newsInput },
                    React.createElement('input', { placeholder: 'Add Ticker' }),
                    React.createElement(
                        'button',
                        null,
                        'Submit'
                    )
                ),
                this.state.news ? this.tickerNews() : null
            );
        }
    }]);

    return Root;
}(React.Component);

quip.elements.initialize({
    initializationCallback: function initializationCallback(root) {
        ReactDOM.render(React.createElement(Root, null), root);
    }
});

/***/ })
/******/ ]);
//# sourceMappingURL=element.js.map