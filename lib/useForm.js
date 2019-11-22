"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultProps = exports.propTypes = void 0;

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var propTypes = {
  stateSchema: _propTypes.default.object.isRequired,
  validationSchema: _propTypes.default.object,
  callback: _propTypes.default.func
};
exports.propTypes = propTypes;
var defaultProps = {
  validationSchema: {},
  callback: null
};
exports.defaultProps = defaultProps;

var UseForm = function UseForm(props) {
  var stateSchema = props.stateSchema,
      validationSchema = props.validationSchema,
      callback = props.callback;

  var _useState = (0, _react.useState)(stateSchema),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      disable = _useState4[0],
      setDisable = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isDirty = _useState6[0],
      setIsDirty = _useState6[1]; // Disable button in initial render.


  (0, _react.useEffect)(function () {
    setDisable(true);
  }, []); // For every changed in our state this will be fired
  // To be able to disable the button

  (0, _react.useEffect)(function () {
    if (isDirty) {
      setDisable(validateState());
    }
  }, [state, isDirty]); // Used to disable submit button if there's an error in state
  // or the required field in state has no value.
  // Wrapped in useCallback to cached the function to avoid intensive memory leaked
  // in every re-render in component

  var validateState = (0, _react.useCallback)(function () {
    var hasErrorInState = Object.keys(validationSchema).some(function (key) {
      var isInputFieldRequired = validationSchema[key].required;
      var stateValue = state[key].value; // state value

      var stateError = state[key].error; // state error

      return isInputFieldRequired && !stateValue || stateError;
    });
    return hasErrorInState;
  }, [state, validationSchema]); // Used to handle every changes in every input

  var handleOnChange = (0, _react.useCallback)(function (event) {
    setIsDirty(true);
    var name = event.target.name;
    var value = event.target.value;
    var error = '';

    if (validationSchema[name].required) {
      if (!value) {
        error = "".concat(name.substr(0, 1).toUpperCase() + name.substr(1), " field is required.");
      }
    }

    if (validationSchema[name].validator !== null && _typeof(validationSchema[name].validator) === 'object') {
      if (value && !validationSchema[name].validator.regEx.test(value)) {
        error = validationSchema[name].validator.error;
      }
    }

    setState(function (prevState) {
      return _objectSpread({}, prevState, _defineProperty({}, name, {
        value: value,
        error: error
      }));
    });
  }, [validationSchema]);
  var handleOnSubmit = (0, _react.useCallback)(function (event) {
    event.preventDefault(); // Make sure that validateState returns false
    // Before calling the submit callback function

    if (!validateState()) {
      callback(state);
    }
  }, [state]);
  var handlePasswordShow = (0, _react.useCallback)(function (event) {
    var name = event.target.previousSibling.name;
    var type = event.target.previousSibling.type;

    if (name !== 'password') {
      return;
    }

    if (type === 'password') {
      event.target.previousSibling.type = 'text';
      return;
    }

    event.target.previousSibling.type = 'password';
  }, [state]);
  return {
    state: state,
    handleOnChange: handleOnChange,
    handleOnSubmit: handleOnSubmit,
    handlePasswordShow: handlePasswordShow,
    disable: disable
  };
};

UseForm.propTypes = propTypes;
UseForm.defaultProps = defaultProps;
var _default = UseForm;
exports.default = _default;