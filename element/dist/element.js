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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _service = __webpack_require__(1);

var _root = __webpack_require__(2);

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2017 Quip


var Root = function (_React$Component) {
    _inherits(Root, _React$Component);

    function Root(props) {
        _classCallCheck(this, Root);

        var _this = _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).call(this, props));

        _this.toggleInput = _this.toggleInput.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleUpdate = _this.handleUpdate.bind(_this);
        _this.fetchAccountTicker = _this.fetchAccountTicker.bind(_this);
        _this.state = {
            news: null,
            ticker: 'CRM',
            tickerStorage: '',
            close: null,
            open: null,
            priceChange: null,
            inputShow: false,
            records: [],
            error: []
        };
        return _this;
    }

    _createClass(Root, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var ticker = this.state.ticker;
            this.fetchNews(ticker);
            this.fetchDetails(ticker);
            this.fetchAccounts();
        }
    }, {
        key: "fetchAccounts",
        value: function fetchAccounts() {
            var _this2 = this;

            var sfClient = new _service.SalesforceClient();
            sfClient.fetchRecordTypeData("Account").then(function (response) {
                var records = response.records;
                _this2.setState({ records: records });
            }).catch(function (error) {
                _this2.setState({ error: [].concat(_toConsumableArray(_this2.state.error), [err]) });
            });
        }
    }, {
        key: "fetchAccountTicker",
        value: function fetchAccountTicker(event) {
            var _this3 = this;

            var accountID = event.target.value;
            var sfClient = new _service.SalesforceClient();
            sfClient.fetchRecord(accountID).then(function (response) {
                var record = response.results[0].result.fields.TickerSymbol.value;
                _this3.setState({ ticker: record });
            }).catch(function (error) {
                _this3.setState({ error: [].concat(_toConsumableArray(_this3.state.error), [err]) });
            });
            this.toggleInput();
        }
    }, {
        key: "fetchDetails",
        value: function fetchDetails(ticker) {
            var _this4 = this;

            fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + ticker + "&apikey=AU2Q75AJK6FBD0KQ").then(function (response) {
                return response.json();
            }).then(function (json) {
                //Clean array
                var cleanArray = Object.keys(json['Time Series (Daily)']).map(function (key) {
                    return json['Time Series (Daily)'][key];
                });
                //Save only today's and yesterday's details
                var todayDetails = cleanArray[0];
                var yesterdayDetails = cleanArray[1];

                _this4.setState({
                    close: todayDetails["4. close"],
                    open: todayDetails["1. open"],
                    priceChange: (todayDetails["4. close"] - yesterdayDetails["4. close"]).toFixed(2)
                });
            }).catch(function (err) {
                _this4.setState({ error: [].concat(_toConsumableArray(_this4.state.error), [err]) });
            });
        }
    }, {
        key: "fetchNews",
        value: function fetchNews(ticker) {
            var _this5 = this;

            var api_key = '60c438deac3f44ee98d47227f06193e1';
            var search_url = 'https://api.cognitive.microsoft.com/bing/v7.0/news/search';
            var fetchHeaders = {
                'Ocp-Apim-Subscription-Key': "" + api_key
            };

            fetch(search_url + "?q=$" + ticker + "+stock&sortby=date&count=3", { headers: fetchHeaders }).then(function (response) {
                return response.json();
            }).then(function (json) {
                _this5.setState({ news: json.value });
            }).catch(function (error) {
                _this5.setState({ error: [].concat(_toConsumableArray(_this5.state.error), [error]) });
            });
        }

        //Calculate the article's time since published

    }, {
        key: "timeSince",
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

        //Render the tickerNews

    }, {
        key: "tickerNews",
        value: function tickerNews() {
            var _this6 = this;

            return this.state.news.map(function (article, index) {
                return React.createElement(
                    "div",
                    { className: _root2.default.newsContainer, key: index },
                    React.createElement(
                        "h4",
                        { className: _root2.default.truncate },
                        React.createElement(
                            "a",
                            { href: article.url, target: "_blank" },
                            article.name
                        )
                    ),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "span",
                            null,
                            article.provider[0].name,
                            " | ",
                            _this6.timeSince(article.datePublished)
                        )
                    )
                );
            });
        }

        //Input component functions

    }, {
        key: "toggleInput",
        value: function toggleInput() {
            return this.state.inputShow ? this.setState({ inputShow: false }) : this.setState({ inputShow: true });
        }
    }, {
        key: "handleUpdate",
        value: function handleUpdate(event) {
            this.setState({ tickerStorage: event.target.value });
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit() {
            if (this.state.tickerStorage) {
                this.setState({ ticker: this.state.tickerStorage });
                this.fetchDetails(this.state.tickerStorage);
                this.fetchNews(this.state.tickerStorage);
                this.toggleInput();
                this.setState({ tickerStorage: '' });
                //TODO: Handle an error state when ticker isn't valid
            }
        }

        //Render the input

    }, {
        key: "tickerInput",
        value: function tickerInput() {
            if (this.state.inputShow) {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { className: _root2.default.newsInput },
                        React.createElement("input", { placeholder: "Change Ticker",
                            value: this.state.tickerStorage, onChange: this.handleUpdate }),
                        React.createElement(
                            "button",
                            { onClick: this.handleSubmit },
                            "Change"
                        )
                    ),
                    React.createElement(
                        "a",
                        { onClick: this.toggleInput },
                        "Close"
                    ),
                    React.createElement(
                        "div",
                        { className: _root2.default.selectAccount },
                        this.state.records ? this.selectAccountTicker() : null
                    )
                );
            } else {
                return React.createElement(
                    "a",
                    { onClick: this.toggleInput },
                    "Change Ticker Symbol"
                );
            }
        }
    }, {
        key: "tickerDetails",
        value: function tickerDetails() {
            var priceChangeStatus = this.state.priceChange < 0 ? _root2.default.statusDown : _root2.default.statusUp;
            var priceChange = this.state.priceChange < 0 ? this.state.priceChange : "+ " + this.state.priceChange;
            return React.createElement(
                "div",
                { className: _root2.default.details },
                React.createElement(
                    "h3",
                    null,
                    this.state.ticker
                ),
                React.createElement(
                    "div",
                    { className: priceChangeStatus + " " + _root2.default.priceChange },
                    priceChange
                )
            );
        }
    }, {
        key: "selectAccountTicker",
        value: function selectAccountTicker() {
            var _this7 = this;

            var options = function options() {
                return _this7.state.records.map(function (record, index) {
                    return React.createElement(
                        "option",
                        { key: index, value: record.Id },
                        record.Name
                    );
                });
            };
            return React.createElement(
                "div",
                { "class": "slds-form-element" },
                React.createElement(
                    "label",
                    { "class": "slds-form-element__label", "for": "select-01" },
                    "Select An Account"
                ),
                React.createElement(
                    "div",
                    { "class": "slds-form-element__control" },
                    React.createElement(
                        "div",
                        { "class": "slds-select_container" },
                        React.createElement(
                            "select",
                            { "class": "slds-select", id: "select-01", onChange: this.fetchAccountTicker },
                            React.createElement(
                                "option",
                                null,
                                "Select Option"
                            ),
                            options()
                        )
                    )
                )
            );
        }

        //Render APP

    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: _root2.default.news },
                this.state.priceChange ? this.tickerDetails() : null,
                React.createElement(
                    "div",
                    { className: _root2.default.myBook },
                    React.createElement(
                        "div",
                        { className: _root2.default.leftColumn },
                        React.createElement(
                            "span",
                            { className: _root2.default.label },
                            "Clients Affected"
                        ),
                        React.createElement(
                            "h4",
                            null,
                            "60%"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: _root2.default.rightColumn },
                        React.createElement(
                            "span",
                            { className: _root2.default.label },
                            "Total AUM"
                        ),
                        React.createElement(
                            "h4",
                            null,
                            "$2,130,000"
                        )
                    )
                ),
                React.createElement(
                    "span",
                    { className: _root2.default.label },
                    "Recent ",
                    this.state.ticker,
                    " News"
                ),
                this.state.news ? this.tickerNews() : null,
                this.tickerInput()
            );
        }
    }]);

    return Root;
}(React.Component);

quip.elements.initialize({
    initializationCallback: function initializationCallback(root) {
        var rootRecord = quip.elements.getRootRecord();
        ReactDOM.render(React.createElement(Root, null), root);
    }
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import "whatwg-fetch";

var DEV_LOCALLY = true;

var INSTANCE_URL = "https://aaiu-dev-ed.my.salesforce.com";
var BASE_URL = "services/data/v40.0";
var URL = INSTANCE_URL + "/" + BASE_URL;

var OBJECT_INFO_ENDPOINT = "ui-api/object-info";

var RECORDS_ENDPOINT = "ui-api/records";
var RECORDS_BATCH_ENDPOINT = "ui-api/records/batch";

var SOQL_ENDPOINT = "query";

var ACCESS_TOKEN = "00Df4000001dlcK!ARkAQFyamQu4LVd1PEjl6OmIhzR727eYgzErpadDFzEC64Is.goFMwlVGXgBP8zOwI5eButkjR7hpfgJibraxYmgGiELSAg8";

var SalesforceClient = exports.SalesforceClient = function () {
    function SalesforceClient() {
        _classCallCheck(this, SalesforceClient);
    }

    _createClass(SalesforceClient, [{
        key: "toQueryString",
        value: function toQueryString(params) {
            var queryParams = [];
            for (var key in params) {
                queryParams.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
            }
            return queryParams.join("&");
        }
    }, {
        key: "fetchListViewsData",
        value: function fetchListViewsData(recordType) {
            var url = URL + "/sobjects/" + recordType + "/listviews/";
            return this.fetch(url, {});
        }
    }, {
        key: "fetchListViewContent",
        value: function fetchListViewContent(resultsUrl) {
            var url = INSTANCE_URL + "/" + resultsUrl;
            return this.fetch(url);
        }
    }, {
        key: "fetchRecordTypeData",
        value: function fetchRecordTypeData(recordType) {
            var params = { q: "SELECT id, name from " + recordType };
            var soqlUrl = URL + "/" + SOQL_ENDPOINT + "/";

            return this.fetch(soqlUrl, params);
        }
    }, {
        key: "fetchObjectInfo",
        value: function fetchObjectInfo(recordType) {
            var objectInfoUrl = URL + "/" + OBJECT_INFO_ENDPOINT + "/" + recordType;
            return this.fetch(objectInfoUrl);
        }
    }, {
        key: "fetchRecord",
        value: function fetchRecord(recordId) {
            return this.fetchRecords([recordId]);
        }
    }, {
        key: "fetchRecords",
        value: function fetchRecords(recordIds) {
            var params = { layoutTypes: "Full" };
            var recordsUrl = URL + "/" + RECORDS_BATCH_ENDPOINT + "/" + recordIds.join(",");
            return this.fetch(recordsUrl, params);
        }
    }, {
        key: "fetchRelatedInfo",
        value: function fetchRelatedInfo(relatedType, attribute, condValue) {
            var params = {
                q: "SELECT id, name from " + relatedType + " WHERE " + attribute + "='" + condValue + "'"
            };
            var soqlUrl = URL + "/" + SOQL_ENDPOINT + "/";
            return this.fetch(soqlUrl, params);
        }
    }, {
        key: "fetch",
        value: function (_fetch) {
            function fetch(_x) {
                return _fetch.apply(this, arguments);
            }

            fetch.toString = function () {
                return _fetch.toString();
            };

            return fetch;
        }(function (baseUrl) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var queryString = this.toQueryString(params);
            var url = queryString ? baseUrl + "?" + queryString : baseUrl;
            return fetch(url, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + ACCESS_TOKEN
                }
            }).then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            });
        })
    }, {
        key: "update",
        value: function update(recordId) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var url = URL + "/" + RECORDS_ENDPOINT + "/" + recordId;
            var fields = {};
            fields.fields = params;
            var body = JSON.stringify(fields);
            return fetch(url, {
                method: "PATCH",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + ACCESS_TOKEN
                },
                body: body
            }).then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            });
        }
    }]);

    return SalesforceClient;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"news":"wZCJ5NZMxDLOtvkTS64kN","newsInput":"_3j3n8vdkkF4_zxLwhIScaf","newsContainer":"_2G9IqEX8QmQBQoiXWRSzJY","truncate":"_3yQEETRaRRRH5T6uLam7nM","details":"_3Lffc8eoLpgx_3GWIc5TCY","priceChange":"_1i3ysy_yFq_F-ea1ZQd6nH","statusDown":"_31IPUlBZ_uEzKoUoF6sUJR","statusUp":"_1_6_qmXCKDzYQO7sZsfZOg","myBook":"_3DVh3MLswjZefuyrVBl-P0","rightColumn":"_2hBBA2kFVQqpgHh4eailtM","label":"_2XTaHLy_sm9L3H0yspMQx7","selectAccount":"_1A1yfEwhtQ9NgnyhuPOuqP"};

/***/ })
/******/ ]);
//# sourceMappingURL=element.js.map